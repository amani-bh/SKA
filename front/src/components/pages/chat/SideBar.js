import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { getAllUsers, getCurrentUser } from '../../../utils/user.auth.service';
import { addConversation, allConversations } from '../../../utils/Chat';
import SingleChat from './SingleChat';
import "./chat.css"
import moment from 'moment';
import { Link, useNavigate } from 'react-router-dom';



export default function SideBar() {
  const [conversations, setConversations] = useState([]);
  const [user, setUser] = useState('');
  const [connectedUser, setConnectedUser] = useState('');
  const [allUsers, setAllUsers] = useState([]);
  const [hide,setHide]=useState(false);
  const [conversationId,setConversationId]=useState(false);
  const navigate = useNavigate();
 

  useEffect(() => {
    const fetchConversations = async () => {
      const result = await getCurrentUser();
      try {
        const response = await allConversations(result?.id);
        setConversations(response);
        console.log("all conv****",response)
      } catch (error) {
        console.error('Error fetching conversations:', error);
      }
    };

    fetchConversations();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getCurrentUser();
        setUser(result);
        const users = await getAllUsers();
        setAllUsers(users?.filter(u=>u.id!=result?.id));
        setConnectedUser(users?.find(u=>u.id==result?.id))
        }catch (error) {
        console.log(error)
      }
    };
    fetchData();
  }, []);

  const handleConversationSubmit = async (e, secondUser) => {
    
    try {
      const result = await addConversation(connectedUser ,allUsers.find((user) => user.id == secondUser)).then(conv=>{
        setConversations((prevConv) => [...prevConv, conv])
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getConversation=async(e,id)=>{
    console.log(id)
    setConversationId(id)
    setHide(true)
  }

  useEffect(() => {
    initializeWebSockets();

  },[user?.id]);
  const initializeWebSockets = () => {
    const messageConnection = new WebSocket(
      `ws://127.0.0.1:8000/ws/message/${user?.id}/`
    );

    messageConnection.onmessage = (event) => {
      const eventJSON = JSON.parse(event.data);
      if (eventJSON.status === 'new_call') {
        console.log('new call');
        openCallViewWindow(eventJSON.message);
      } 
    };
  }


const openCallViewWindow = (data) => {
  console.log('data***', data);

  const routeData = {
    pathname: `/receiver/${data?.data?.sender}/${data?.data?.peer_id}`,
    state: {
      username: data?.data?.receiver,
      sender: data?.data?.sender,
      display: JSON.stringify(data?.data?.display),
      peer_id: data?.data?.peer_id,
    },
  };
  // navigate(routeData);

  window.open(
    `http://localhost:3000/receiver/${data?.data?.sender}/${data?.data?.peer_id}`,
    '_blank',
    'popup,height=650,width=550,resizable=0,location=no,toolbar=no,menubar=no,resizable=no'
  );

};







  return (
    <div className="main-layout">
    <aside className="sidebar">
    {/* Tab Content Start */}
    <div className="tab-content">
      {/* Chat Tab Content Start */}
      <div className="tab-pane active" id="chats-content">
        <div className="d-flex flex-column h-100">
          <div className="hide-scrollbar h-100" id="chatContactsList">
            {/* Chat Header Start */}
            <div className="sidebar-header sticky-top p-2">
              <div className="d-flex justify-content-between align-items-center">
                {/* Chat Tab Pane Title Start */}
                {/* <h5 className="font-weight-semibold mb-0">Chats</h5> */}
              <Link to="/home">
                <svg className="hw-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              </Link>

       
                {/* Chat Tab Pane Title End */}
                <ul className="nav flex-nowrap">
                  <li className="nav-item list-inline-item mr-1">
                    <a className="nav-link text-muted px-1" href="#" title="Notifications" role="button" data-toggle="modal" data-target="#notificationModal">
                      
                      <svg className="hw-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                      </svg>
                     
                    </a>
                  </li>
                  <li className="nav-item list-inline-item d-block d-xl-none mr-1">
                    <a className="nav-link text-muted px-1" href="#" title="Appbar" data-toggle-appbar>
                      
                      <svg className="hw-20" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z">
                        </path>
                      </svg>
                     
                    </a>
                  </li>
                  <li className="nav-item list-inline-item mr-0">
                    <div className="dropdown">
                      <a className="nav-link text-muted px-1" href="#" role="button" title="Details" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                       
                        <svg className="hw-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                        </svg>
                        
                      </a>
                      <div className="dropdown-menu dropdown-menu-right">
                        <a className="dropdown-item" href="#" role="button" data-toggle="modal" data-target="#startConversation">New
                          Chat</a>
                        <a className="dropdown-item" href="#" role="button" data-toggle="modal" data-target="#createGroup">Create
                          Group</a>
                        <a className="dropdown-item" href="#" role="button" data-toggle="modal" data-target="#inviteOthers">Invite
                          Others</a>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              {/* Sidebar Header Start */}
              <div className="sidebar-sub-header">
                {/* Sidebar Header Dropdown Start */}
                <div>
                <div className="dropdown mr-2">
                
                  {/* Dropdown Button Start */}
                  <select className="btn btn-outline-default dropdown-toggle" onChange={(e) => handleConversationSubmit(e, e.target.value)}>
                    <option className="dropdown-item" >All Users</option>
                    {allUsers?.map((user) => (
                        <option className="dropdown-item" key={user.id} value={user.id}>{user.first_name} {user.last_name}</option>
                    ))}
                    </select>

                </div>
                </div>
                {/* Sidebar Header Dropdown End */}
                {/* Sidebar Search Start */}
                <form className="form-inline">
                  <div className="input-group">
                    <input type="text" className="form-control search border-right-0 transparent-bg pr-0" placeholder="Search users" />
                    <div className="input-group-append">
                      <div className="input-group-text transparent-bg border-left-0" role="button">
                        {/* Default :: Inline SVG */}
                        <svg className="text-muted hw-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        {/* Alternate :: External File link */}
                        {/* <img class="injectable hw-20" src="./../../assets/media/heroicons/outline/search.svg" alt=""> */}
                      </div>
                    </div>
                  </div>
                </form>
                {/* Sidebar Search End */}
              </div>
              {/* Sidebar Header End */}
            </div>
            {/* Chat Header End */}
            {/* Chat Contact List Start */}
            <ul className="contacts-list" id="chatContactTab" data-chat-list>
            {conversations?.map(conversation => (
            <li className={`contacts-item friends ${conversationId === conversation?.id ? 'active' : ''}`} key={conversation?.id}>
                <a className="contacts-link" onClick={e=>getConversation(e,conversation?.id)}>
                <div className="avatar avatar-online">
                    <img src={conversation?.first_user?.id === user?.id ? conversation?.second_user?.user_image : conversation?.first_user?.user_image} alt="" />
                </div>
                <div className="contacts-content">
                    <div className="contacts-info">
                    {conversation?.first_user?.user_id === user?.id ? (
                        <h6>{conversation?.second_user?.user_name}</h6>
                    ) : (
                        <h6>{conversation?.first_user?.user_name}</h6>
                    )}
                    <div className="chat-time">{moment(conversation?.last_message_timestamp).fromNow()}</div>
                    </div>
                    <div className="contacts-texts">
                    {conversation?.last_message_sender === user?.id ? (
                         <p className="text-truncate"><span>you: </span>{conversation?.last_message.slice(0, 35)}
                         {conversation?.last_message.length > 35 && "..."}</p>
                    ) : (
                      <p className="text-truncate">{conversation?.last_message.slice(0, 35)}
                      {conversation?.last_message.length > 35 && "..."}</p>
                    )}
                    {conversation?.unread_message_count!=0 && (
                      <div class="badge badge-rounded badge-primary ml-1">{conversation?.unread_message_count}</div>
                    )}
                    
                    </div>
                </div>
                </a>
            </li>
            ))}

             
             
             
              
             
            </ul>
            {/* Chat Contact List End */}
          </div>
        </div>
      </div>
      {/* Chats Tab Content End */}
    
     
    </div>
    {/* Tab Content End */}
  </aside>
 
  {hide ?(
     <main className="main main-visible">
    <SingleChat conversationId ={conversationId} />
    </main>
):(
  <main className="main main-visible">
  {/* Chats Page Start */}
  <div className="chats">
    <div className="chat-body">
      {/* Chat Header Start*/}
 
      <div className="chat-content p-2" id="messageBody">
       <div className='container'>
        <h3 style={{margin:"25%"}}>Choose a conversation</h3>
       </div>
        {/* Scroll to finish */}
      </div>
  
    </div>
  </div>
 

</main>
)}
   
  </div>
  )
}
