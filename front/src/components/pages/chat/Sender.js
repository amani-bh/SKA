import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

import MicButton from './MicButton';
import VideoButton from './VideoButton';
import {Peer} from "peerjs"
import { getCurrentUser, getUserProfile } from '../../../utils/user.auth.service';
import { useParams } from 'react-router';

const Sender = () => {
    const id_receiver=useParams()
  // const [displayUser, setDisplayUser] = useState({
  //   username: '',
  //   name: '',
  //   photo:
  //     'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png',
  // });
  const [peerId, setPeerId] = useState(null);
  const [peer, setPeer] = useState(null);
  const [conn, setConn] = useState(null);
  const [call, setCall] = useState(null);
  const [localStream, setLocalStream] = useState(null);
  const [callingStatus, setCallingStatus] = useState('calling');
  const [connectedUser, setConnectedUser] = useState('');
  const [receiverUser, setReceiverUser] = useState('');

  const getUserMedia =
    navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia;

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  useEffect(() => {
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
      try {
        const response = await getUserProfile(id_receiver?.id);
        setReceiverUser(response);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchRUser();
  }, []);

  useEffect(() => {
    initializePeer();

    return () => {
      endCall();
    };
  }, []);

  const initializePeer = () => {
    const peer = new Peer();

    peer.on('open', (id) => {
      setPeerId(id);
      startCall(id);
      initializeWebSocket(id);
      console.log('My peer id', id);
    });

    peer.on('connection', handleConnection);

    peer.on('call', handleCall);

    peer.on('error', (data) => {
      console.log('peer errors');
    });

    setPeer(peer);
  };

  const handleConnection = (connection) => {
    setConn(connection);

    connection.on('data', (data) => {
      console.log('Received', data);
    });
  };

  const handleCall = (receivedCall) => {
    setCall(receivedCall);
    getUserMedia({ video: true, audio: true },  (stream) => {
      console.log("stream")
      setCallingStatus('connected');
      receivedCall?.answer(stream);
      setLocalStream(stream);
      localVideoRef.current.srcObject = stream;
      localVideoRef.current.play();
      receivedCall?.on('stream', streamRemoteCall);
    }
  );
  }

  // const streamCall = (stream) => {
  //   console.log("stream")
  //   setCallingStatus('connected');
  //   call?.answer(stream);
  //   setLocalStream(stream);
  //   localVideoRef.current.srcObject = stream;
  //   localVideoRef.current.play();
  //   call?.on('stream', streamRemoteCall);
  // };

  const streamRemoteCall = (remoteStream) => {
    console.log("test")
    remoteVideoRef.current.srcObject = remoteStream;
    remoteVideoRef.current.play();
    console.log('remote stream');
  };

  const startCall = async(pid) => {
    console.log("peer**",pid)
    const user = await getCurrentUser();

    const data = {
      receiver: id_receiver?.id, // Replace with the appropriate value
      sender: user?.id, // Replace with the appropriate value
      peer_id: pid,
    };

    console.log(data);
    axios
      .post('http://localhost:8000/api/start-call/', data)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const toggleLocalVideo = () => {
    localStream.getTracks().forEach((track) => {
      if (track.readyState === 'live' && track.kind === 'video') {
        track.enabled = !track.enabled;
      }
    });
  };

  const toggleLocalAudio = () => {
    localStream.getTracks().forEach((track) => {
      if (track.readyState === 'live' && track.kind === 'audio') {
        track.enabled = !track.enabled;
      }
    });
  };

  const cancelCall = async() => {
    const user = await getCurrentUser();

    const data = {
      receiver: id_receiver?.id, 
      sender: connectedUser?.id, 
      peer_js: peerId,
    };
    console.log(data)

    axios
      .post('http://localhost:8000/api/end-call/', data)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const initializeWebSocket = (peerId) => {
    const socket = new WebSocket(`ws://127.0.0.1:8000/ws/message/${peerId}/`);
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      switch (message.status) {
        case 'end_call':
          endCall();
          break;
        default:
          break;
      }
      console.log(message);
    };
  };

  const endCall = () => {
    setCallingStatus('rejected');
    setTimeout(() => {
      window.close();
    }, 2000);
  };

  return (
    <div style={{ height: '100vh' }} className="d-flex justify-content-center align-items-center">
      <div className="text-center align-self-center" style={{ display: callingStatus === 'calling' ? 'block' : 'none' }}>
        <center>
          <div className="pulse">
            <img
              height="250"
              src={receiverUser?.image_url}
              className="rounded-circle"
              alt=""
            />
          </div>
        </center>
        <h2 className="mt-5 text-black-50 mb-5">Calling <strong>{receiverUser?.first_name +" "+receiverUser?.last_name}</strong> .....</h2>
        <button type="button" onClick={cancelCall} className="btn btn-lg btn-danger rounded-pill px-5">
        <ion-icon name="call-outline"  style={{ transform: "rotate(133deg)" }}></ion-icon> Cancel Call
        </button>
      </div>

      <div style={{ display: callingStatus === 'connected' ? 'block' : 'none' }}>
        <video ref={localVideoRef} src="" id="localVideo" autoPlay={true}></video>

        <video ref={remoteVideoRef} src="" id="remoteVideo" autoPlay={true}></video>

        <div className="call-controls text-center align-self-center p-3 bg-opacity-10">
          <MicButton clickCallback={toggleLocalAudio} />
          <VideoButton clickCallback={toggleLocalVideo} />

          <button onClick={cancelCall} className="btn btn-lg ">
            <img src="/front/img/decline.png" width="80px" className='rounded-circle mx-1'></img>
          {/* <ion-icon name="call-outline"  style={{ transform: "rotate(133deg)" }}></ion-icon> */}
          </button>
        </div>
      </div>

      {callingStatus === 'rejected' && (
        <div>
          <h1>Call Rejected, closing the window</h1>
        </div>
      )}
    </div>
  );
};

export default Sender;
