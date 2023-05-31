import React, { useState, useEffect, useRef } from "react";
import Peer from "peerjs";
import MicButton from "./MicButton";
import VideoButton from "./VideoButton";
import axios from "axios";
import { getCurrentUser, getUserProfile } from "../../../utils/user.auth.service";
import { useParams } from "react-router-dom";
import { IonIcon } from "react-ion-icon";

const Receiver = () => {
  const {id_receiver,id_peer}=useParams()

  const [socket, setSocket] = useState(null);
  const [connectedUser, setConnectedUser] = useState('');
  const [peer, setPeer] = useState(null);
  const [conn, setConn] = useState(null);
  const [call, setCall] = useState(null);
  const [receiverUser, setReceiverUser] = useState('');

  const [localStream, setLocalStream] = useState(null);
  const [remotePeerId, setRemotePeerId] = useState(null);
  // const [displayUser, setDisplayUser] = useState({
  //   username: "",
  //   name: "",
  //   photo: "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
  // });
  const [callingStatus, setCallingStatus] = useState("calling");
  const getUserMedia =
    navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  useEffect(() => {
    setRemotePeerId(id_peer)
    const fetchUser = async () => {
      try {
        const response = await getCurrentUser();
        setConnectedUser(response);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const fetchRUser = async () => {
      console.log(id_receiver)
      try {
        const response = await getUserProfile(id_receiver);
        setReceiverUser(response);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchRUser();
  }, []);

  useEffect(() => {
    const initializePeer = () => {
      const newPeer = new Peer();
      newPeer.on("open", (id) => {
        setPeer(newPeer);
        console.log("My peer id:", id);
      });

      newPeer.on("connection", (connection) => {
        connection.on("data", (data) => {
          console.log("received", data);
        });
      });

      initializeWebSocket(remotePeerId);
    };

    initializePeer();

    return () => {
      if (peer) {
        peer.destroy();
      }
    };
  }, []);

  const answerCall = () => {
    getUserMedia(
      { video: true, audio: true },
      (stream) => {
        setCallingStatus("connected");
        setLocalStream(stream);
        const newCall = peer.call(remotePeerId, stream);
        setCall(newCall);
        console.log("newcall**",newCall)
        newCall?.on("stream", streamRemoteCall);
    
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
          localVideoRef.current.play();
        }
      },
      (error) => {
        console.error(error);
      }
    );
  };

  // const streamCall = (stream) => {
  //   setCallingStatus("connected");
  //   setLocalStream(stream);
  //   const newCall = peer.call(remotePeerId, stream);
  //   setCall(newCall);
  //   console.log("newcall**",newCall)
  //   newCall?.on("stream", streamRemoteCall);

  //   if (localVideoRef.current) {
  //     localVideoRef.current.srcObject = stream;
  //     localVideoRef.current.play();
  //   }
  // };

  const streamRemoteCall = (remoteStream) => {
    console.log("remote test")
    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = remoteStream;
      remoteVideoRef.current.play();
    }
    console.log("remote stream");
  };

  const toggleLocalVideo = () => {
    if (localStream) {
      localStream.getTracks().forEach((track) => {
        if (track.readyState === "live" && track.kind === "video") {
          track.enabled = !track.enabled;
        }
      });
    }
  };

  const toggleLocalAudio = () => {
    if (localStream) {
      localStream.getTracks().forEach((track) => {
        if (track.readyState === "live" && track.kind === "audio") {
          track.enabled = !track.enabled;
        }
      });
    }
  };

  const rejectCall = () => {
    const data = {
      receiver: id_receiver?.id,
      sender: connectedUser?.id, 
      peer_js: remotePeerId
    };
    axios
      .post("http://localhost:8000/api/end-call/", data)
      .then((response) => {
        console.log(response);
        setTimeout(() => {
          window.close();
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const initializeWebSocket = (peerId) => {
    const newSocket = new WebSocket(`ws://127.0.0.1:8000/ws/message/${peerId}/`);

    newSocket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      switch (message.status) {
        case "end_call":
          endCall();
          break;
        default:
          console.log(message);
      }
    };

    setSocket(newSocket);
  };

  const endCall = () => {
    setCallingStatus("rejected");
    setTimeout(() => {
      window.close();
    }, 2000);
  };

  return (
    <div style={{ height: "100vh" }} className="d-flex justify-content-center align-items-center">
      <div className="text-center align-self-center" style={{ display: callingStatus === "calling" ? "block" : "none" }}>
        <center>
          <div className="pulse">
            <img height="250" src={receiverUser?.image_url} className="rounded-circle" alt="" />
          </div>
        </center>

        <h1 className="mt-5 text-black-50 mb-5">Incoming call from <strong>{receiverUser?.first_name +" "+receiverUser?.last_name}</strong></h1>
        <button type="button" onClick={answerCall} className="btn btn-lg btn-success rounded-pill px-5 me-3">
          <ion-icon name="call-outline" ></ion-icon> Answer
        </button>
        <button type="button" onClick={rejectCall} className="btn btn-lg btn-danger rounded-pill px-5">
          <ion-icon name="call-outline"  style={{ transform: "rotate(133deg)" }}></ion-icon> Reject
        </button>
      </div>

      <div style={{ display: callingStatus === "connected" ? "block" : "none" }}>
        <video ref={localVideoRef} src="" id="localVideo" autoPlay></video>

        <video ref={remoteVideoRef} src="" id="remoteVideo" autoPlay></video>

        <div className="call-controls text-center align-self-center p-3  bg-opacity-10">
          <MicButton clickCallback={toggleLocalAudio} />
          <VideoButton clickCallback={toggleLocalVideo} />
          <button onClick={rejectCall} className="btn btn-lg">
          <img src="/front/img/decline.png" width="80px" className='rounded-circle mx-1'></img>

          {/* <ion-icon name="call-outline"  style={{ transform: "rotate(133deg)" }}></ion-icon> */}
          </button>
        </div>
      </div>

      <div style={{ display: callingStatus === "rejected" ? "block" : "none" }}>
        <h1>Call Rejected, closing the window</h1>
      </div>
    </div>
  );
};

export default Receiver;
