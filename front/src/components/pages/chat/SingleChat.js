import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { w3cwebsocket as WebSocketClient } from 'websocket';
import { allMessages, getConversation } from '../../../utils/Chat';
import { getCurrentUser } from '../../../utils/user.auth.service';
import moment from 'moment';

export default function SingleChat(conversationId ) {
  
  const id=conversationId.conversationId
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [conversation, setConversation] = useState('');
    const [websocket, setWebsocket] = useState(null);
   const [user, setUser] = useState('');

   useEffect(() => {

    const fetchConversation = async () => {
      try{
        const result = await getConversation(id);
        setConversation(result);
      } catch (error) {
        console.error('Error fetching conversation:', error);
      }
    }
    fetchConversation()
  },[])
    
  useEffect(() => {
    const fetchMessages = async () => {
      
        const result = await getCurrentUser();
        setUser(result);
      
      try {
        const response = await allMessages(id,result?.id);
        setMessages(response);
        console.log(response);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    const ws = new WebSocket(`ws://localhost:8000/ws/chat/${id}/`);
    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          action: 'join',
          conversation_id: id,
        })
      );
    };
    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log(message)

      if (message.type === 'message') {
        setMessages((prevMessages) => [...prevMessages, message]);
      }
    };

    setWebsocket(ws);

    fetchMessages();

    return () => {
      if (websocket) {
        websocket.send(
          JSON.stringify({
            action: 'leave',
            conversation_id: id,
          })
        );
        websocket.close();
      }
    };
  }, [id]);

  
  const handleMessageSubmit = (e) => {
    e.preventDefault();
    if (websocket && websocket.readyState === WebSocket.OPEN) {
    console.log(message)

        websocket.send(
            JSON.stringify({
                action: 'message',
                conversation_id: id,
                message: message,
                user: {
                  id: user?.id,
                  user_id:user?.id,
                  user_name: user?.first_name+" "+user?.last_name,
                  user_image: user?.image_url,
                },
            })
        );
        setMessage("");
    }
};

const openCallViewWindow = (e,receiver) => {
  console.log('openCallViewWindow', receiver);
  let routeData = {
    name: 'receiverView',
    params: { username: receiver?.user_name, sender: user },
    query: {
      display: JSON.stringify(receiver.display),
      peer_id: 1,
    },
  };
  window.open(
    `${routeData.name}?username=${routeData.params.username}&sender=${routeData.params.sender}&display=${routeData.query.display}&peer_id=${routeData.query.peer_id}`,
    '_blank',
    'popup,height=650,width=550,resizable=0,location=no,toolbar=no,menubar=no,resizable=no'
  );
};


const makeCall = (e,receiver) => {
  let routeData = {
    name: 'callerView',
    params: {
      username: user?.first_name,
      receiver: receiver?.user_name,
    },
    query: {
      display: JSON.stringify({
        username: receiver?.user_name,
        photo: receiver?.user_image,
        name: receiver?.user_name,
      })
    }
  };
  window.open(`http://localhost:3000/sender/${receiver?.user_id}`,
    '_blank',
    'popup,height=650,width=550,resizable=0,location=no,toolbar=no,menubar=no,resizable=no'
  );
};


// const renderMessages = () => {
//   let currentDay = null; 
// console.log("mess**",messages)
//   return messages?.map((message, index) => {
//     const messageDay = new Date(message?.created_at).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    
//     if (messageDay !== currentDay) {
//       currentDay = messageDay; 

//       return (
//         <div
//           key={`divider-${index}`}
//           className="message-divider sticky-top pb-2"
//           data-label={messageDay}
//         >&nbsp;</div>
//       );
//     }
   

    
//     return (
//       <div key={index} className={message.sender.user_id === user?.id ? "message self" : "message"}>
//         <div className="message-wrapper">
//           <div className="message-content">
//             <span>{message.message}</span>
//           </div>
//         </div>
//         <div className="message-options">
//           <div className="avatar avatar-sm">
//             <img alt="" src={message?.sender?.user_image} />
//           </div>
//           <span className="message-date">{moment(message?.created_at).fromNow()}</span>
//           {(message.sender.user_id === user?.id)&&(message.is_read) && (
//             <span className="message-status">seen</span>
//           )}
//           <div className="dropdown">
//             {/* Dropdown content */}
//           </div>
//         </div>
//       </div>
//     );
//   });
// };

  return (
    <main className="main main-visible">
    {/* Chats Page Start */}
    <div className="chats">
      <div className="chat-body">
        {/* Chat Header Start*/}
        <div className="chat-header">
          {/* Chat Back Button (Visible only in Small Devices) */}
          <button className="btn btn-secondary btn-icon btn-minimal btn-sm text-muted d-xl-none" type="button" data-close>
            {/* Default :: Inline SVG */}
            <svg className="hw-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            {/* Alternate :: External File link */}
            {/* <img class="injectable hw-20" src="./../../assets/media/heroicons/outline/arrow-left.svg" alt=""> */}
          </button>
          {/* Chat participant's Name */}
          <div className="media chat-name align-items-center text-truncate">
            <div className="avatar avatar-online d-none d-sm-inline-block mr-3">
              <img src="https://firebasestorage.googleapis.com/v0/b/ska-capgemini.appspot.com/o/images%2Fprofil-icon.png?alt=media&token=c7b30569-abc2-429c-a102-121229e26aed" alt="" />
            </div>
            <div className="media-body align-self-center ">
              {conversation?.first_user?.id === user?.id ? (
                        <h6 className="text-truncate mb-0">{conversation?.second_user?.user_name}</h6>
                    ) : (
                        <h6 className="text-truncate mb-0">{conversation?.first_user?.user_name}</h6>
                    )}
              <small className="text-muted">Online</small>
            </div>
          </div>
          {/* Chat Options */}
          <ul className="nav flex-nowrap">
            <li className="nav-item list-inline-item d-none d-sm-block mr-1">
              <a className="nav-link text-muted px-1" data-toggle="collapse" data-target="#searchCollapse" href="#" aria-expanded="false">
                {/* Default :: Inline SVG */}
                <svg className="hw-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                {/* Alternate :: External File link */}
                {/* <img src="./../../assets/media/heroicons/outline/search.svg" alt="" class="injectable hw-20"> */}
              </a>
            </li>
           
            {conversation?.first_user?.id === user?.id ? (
               <li className="nav-item list-inline-item d-none d-sm-block mr-1" onClick={e=>makeCall(e,conversation?.second_user)}>
                       
                        <a className="nav-link text-muted px-1"  title="Add People">
                        <svg className="hw-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        
                      </a>
                      </li>
                    ) : (
                      <li className="nav-item list-inline-item d-none d-sm-block mr-1" onClick={e=>makeCall(e,conversation?.first_user)}>
                  
                      <a className="nav-link text-muted px-1"  title="Add People">
                      <svg className="hw-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      
                    </a>
                    </li>
                    )}
             
            
            <li className="nav-item list-inline-item d-none d-sm-block mr-0">
              <div className="dropdown">
                <a className="nav-link text-muted px-1" href="#" role="button" title="Details" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  {/* Default :: Inline SVG */}
                  <svg className="hw-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                  {/* Alternate :: External File link */}
                  {/* <img src="./../../assets/media/heroicons/outline/dots-vertical.svg" alt="" class="injectable hw-20"> */}
                </a>
                <div className="dropdown-menu dropdown-menu-right">
                  <a className="dropdown-item align-items-center d-flex" href="#" data-chat-info-toggle>
                    {/* Default :: Inline SVG */}
                    <svg className="hw-20 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {/* Alternate :: External File link */}
                    {/* <img src="./../../assets/media/heroicons/outline/information-circle.svg" alt="" class="injectable hw-20 mr-2"> */}
                    <span>View Info</span>
                  </a>
                  <a className="dropdown-item align-items-center d-flex" href="#">
                    {/* Default :: Inline SVG */}
                    <svg className="hw-20 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clipRule="evenodd" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                    </svg>
                    {/* Alternate :: External File link */}
                    {/* <img src="./../../assets/media/heroicons/outline/volume-off.svg" alt="" class="injectable hw-20 mr-2"> */}
                    <span>Mute Notifications</span>
                  </a>
                  <a className="dropdown-item align-items-center d-flex" href="#">
                    {/* Default :: Inline SVG */}
                    <svg className="hw-20 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {/* Alternate :: External File link */}
                    {/* <img src="./../../assets/media/heroicons/outline/photograph.svg" alt="" class="injectable hw-20 mr-2"> */}
                    <span>Wallpaper</span>
                  </a>
                  <a className="dropdown-item align-items-center d-flex" href="#">
                    {/* Default :: Inline SVG */}
                    <svg className="hw-20 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                    </svg>
                    {/* Alternate :: External File link */}
                    {/* <img src="./../../assets/media/heroicons/outline/archive.svg" alt="" class="injectable hw-20 mr-2"> */}
                    <span>Archive</span>
                  </a>
                  <a className="dropdown-item align-items-center d-flex" href="#">
                    {/* Default :: Inline SVG */}
                    <svg className="hw-20 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    {/* Alternate :: External File link */}
                    {/* <img src="./../../assets/media/heroicons/outline/trash.svg" alt="" class="injectable hw-20 mr-2"> */}
                    <span>Delete</span>
                  </a>
                  <a className="dropdown-item align-items-center d-flex text-danger" href="#">
                    {/* Default :: Inline SVG */}
                    <svg className="hw-20 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                    </svg>
                    {/* Alternate :: External File link */}
                    {/* <img src="./../../assets/media/heroicons/outline/ban.svg" alt="" class="injectable hw-20 mr-2"> */}
                    <span>Block</span>
                  </a>
                </div>
              </div>
            </li>
            <li className="nav-item list-inline-item d-sm-none mr-0">
              <div className="dropdown">
                <a className="nav-link text-muted px-1" href="#" role="button" title="Details" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  {/* Default :: Inline SVG */}
                  <svg className="hw-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                  {/* Alternate :: External File link */}
                  {/* <img src="./../../assets/media/heroicons/outline/dots-vertical.svg" alt="" class="injectable hw-20"> */}
                </a>
                <div className="dropdown-menu dropdown-menu-right">
                  <a className="dropdown-item align-items-center d-flex" href="#">
                    {/* Default :: Inline SVG */}
                    <svg className="hw-20 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {/* Alternate :: External File link */}
                    {/* <img src="./../../assets/media/heroicons/outline/phone.svg" alt="" class="injectable hw-20 mr-2"> */}
                    <span>Call</span>
                  </a>
                  <a className="dropdown-item align-items-center d-flex" href="#" data-toggle="collapse" data-target="#searchCollapse" aria-expanded="false">
                    {/* Default :: Inline SVG */}
                    <svg className="hw-20 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    {/* Alternate :: External File link */}
                    {/* <img src="./../../assets/media/heroicons/outline/search.svg" alt="" class="injectable hw-20 mr-2"> */}
                    <span>Search</span>
                  </a>
                  <a className="dropdown-item align-items-center d-flex" href="#" data-chat-info-toggle>
                    {/* Default :: Inline SVG */}
                    <svg className="hw-20 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {/* Alternate :: External File link */}
                    {/* <img src="./../../assets/media/heroicons/outline/information-circle.svg" alt="" class="injectable hw-20 mr-2"> */}
                    <span>View Info</span>
                  </a>
                  <a className="dropdown-item align-items-center d-flex" href="#">
                    {/* Default :: Inline SVG */}
                    <svg className="hw-20 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clipRule="evenodd" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                    </svg>
                    {/* Alternate :: External File link */}
                    {/* <img src="./../../assets/media/heroicons/outline/volume-off.svg" alt="" class="injectable hw-20 mr-2"> */}
                    <span>Mute Notifications</span>
                  </a>
                  <a className="dropdown-item align-items-center d-flex" href="#">
                    {/* Default :: Inline SVG */}
                    <svg className="hw-20 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {/* Alternate :: External File link */}
                    {/* <img src="./../../assets/media/heroicons/outline/photograph.svg" alt="" class="injectable hw-20 mr-2"> */}
                    <span>Wallpaper</span>
                  </a>
                  <a className="dropdown-item align-items-center d-flex" href="#">
                    {/* Default :: Inline SVG */}
                    <svg className="hw-20 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                    </svg>
                    {/* Alternate :: External File link */}
                    {/* <img src="./../../assets/media/heroicons/outline/archive.svg" alt="" class="injectable hw-20 mr-2"> */}
                    <span>Archive</span>
                  </a>
                  <a className="dropdown-item align-items-center d-flex" href="#">
                    {/* Default :: Inline SVG */}
                    <svg className="hw-20 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    {/* Alternate :: External File link */}
                    {/* <img src="./../../assets/media/heroicons/outline/trash.svg" alt="" class="injectable hw-20 mr-2"> */}
                    <span>Delete</span>
                  </a>
                  <a className="dropdown-item align-items-center d-flex text-danger" href="#">
                    {/* Default :: Inline SVG */}
                    <svg className="hw-20 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                    </svg>
                    {/* Alternate :: External File link */}
                    {/* <img src="./../../assets/media/heroicons/outline/ban.svg" alt="" class="injectable hw-20 mr-2"> */}
                    <span>Block</span>
                  </a>
                </div>
              </div>
            </li>
          </ul>
        </div>
        {/* Chat Header End*/}
        {/* Search Start */}
        <div className="collapse border-bottom px-3" id="searchCollapse">
          <div className="container-xl py-2 px-0 px-md-3">
            <div className="input-group bg-light ">
              <input type="text" className="form-control form-control-md border-right-0 transparent-bg pr-0" placeholder="Search" />
              <div className="input-group-append">
                <span className="input-group-text transparent-bg border-left-0">
                  {/* Default :: Inline SVG */}
                  <svg className="hw-20 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  {/* Alternate :: External File link */}
                  {/* <img class="injectable hw-20" src="./../../assets/media/heroicons/outline/search.svg" alt="Search icon"> */}
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* Search End */}
        {/* Chat Content Start*/}
        <div className="chat-content p-2" id="messageBody">
          <div className="container">
            {/* Message Day Start */}
            <div className="message-day">
              {/* <div className="message-divider sticky-top pb-2" data-label="Yesterday">&nbsp;</div> */}
              {messages?.map((message, index) => (
                  <div key={index} className={message.sender.user_id === user?.id ? "message self" : "message"}>
                  <div className="message-wrapper">
                    <div className="message-content">
                      <span>{message.message}</span>
                    </div>
                  </div>
                  <div className="message-options">
                    <div className="avatar avatar-sm">
                      <img alt="" src={message?.sender?.user_image} />
                    </div>
                    <span className="message-date">{moment(message?.created_at).fromNow()}</span>
                    {(message.sender.user_id === user?.id)&&(message.is_read) && (
                      <span className="message-status">seen</span>
                    )}
                    <div className="dropdown">
                      {/* Dropdown content */}
                    </div>
                  </div>
                </div>
              ))}
              {/* {renderMessages()} */}

            </div>
           
          </div>
          {/* Scroll to finish */}
          <div className="chat-finished" id="chat-finished" />
        </div>
        {/* Chat Content End*/}
        {/* Chat Footer Start*/}
        <div className="chat-footer">
          <div className="attachment">
            <div className="dropdown">
              <button className="btn btn-secondary btn-icon btn-minimal btn-sm" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <svg className="hw-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {/* <img class="injectable hw-20" src="./../../assets/media/heroicons/outline/plus-circle.svg" alt=""> */}
              </button>
              <div className="dropdown-menu">
                <a className="dropdown-item" href="#">
                  <svg className="hw-20 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {/* <img class="injectable hw-20 mr-2" src="./../../assets/media/heroicons/outline/photograph.svg" alt=""> */}
                  <span>Gallery</span>
                </a>
                <a className="dropdown-item" href="#">
                  <svg className="hw-20 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  </svg>
                  {/* <img class="injectable hw-20 mr-2" src="./../../assets/media/heroicons/outline/volume-up.svg" alt=""> */}
                  <span>Audio</span>
                </a>
                <a className="dropdown-item" href="#">
                  <svg className="hw-20 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  {/* <img class="injectable hw-20 mr-2" src="./../../assets/media/heroicons/outline/document.svg" alt=""> */}
                  <span>Document</span>
                </a>
                <a className="dropdown-item" href="#">
                  <svg className="hw-20 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  {/* <img class="injectable hw-20 mr-2" src="./../../assets/media/heroicons/outline/user.svg" alt=""> */}
                  <span>Contact</span>
                </a>
                <a className="dropdown-item" href="#">
                  <svg className="hw-20 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {/* <img class="injectable hw-20 mr-2" src="./../../assets/media/heroicons/outline/location-marker.svg" alt=""> */}
                  <span>Location</span>
                </a>
                <a className="dropdown-item" href="#">
                  <svg className="hw-20 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                 
                  <span>Poll</span>
                </a>
              </div>
            </div>
          </div>

   

          <textarea className="form-control emojionearea-form-control" id="messageInput" value={message} rows={1} placeholder="Type your message here..." onChange={e=>setMessage(e.target.value)} />
        <div className="btn btn-primary btn-icon send-icon rounded-circle text-light mb-1" role="button"   onClick={e=>handleMessageSubmit(e)}>
            <svg className="hw-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
        </div>

        </div>
        {/* Chat Footer End*/}
      </div>
    </div>
    {/* Chats Page End */}
   
 
  </main>
  )
}
