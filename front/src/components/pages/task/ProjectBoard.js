import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import List from './List';
import { v4 as uuidv4 } from "uuid";
import { Link, useParams } from 'react-router-dom';
import {  addListBoard, getProjectById } from '../../../utils/Task';
import { useContext } from 'react';
import globalContext from '../../../utils/globalContext';
import { addList, onDragEnd } from '../../../utils/board';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { getCurrentUser, getUserProfile } from '../../../utils/user.auth.service';
import InviteMembersModal from './InviteMembersModal';




export default function ProjectBoard() {
  const { id } = useParams();
  const [addingList, setAddingList] = useState(false);
  const [  board,setBoard ] = useState();
  const [isInviting, setIsInviting] = useState(false);
  const [connectedUser,setConnectedUser]=useState()
  const [members, setMembers] = useState([]);



  const { setBoardContext } = useContext(globalContext);

  useEffect(()=>{
    const fetchUser=async()=>{
        const result=await getCurrentUser()
        setConnectedUser(result)
    }
    fetchUser()
  },[])

  useEffect(() => {
      if (board) {
          setBoardContext(board, setBoard);
      }
  }, [board]);
  
  useEffect(() => {
    const fetchProject=async()=>{
        const result= await getProjectById(id);
        setBoard(result)
        try{
            result?.members.map(async member=>{
                const user= await getUserProfile(member)
                if (!members.find((m) => m.id === user.id)) {
                    setMembers((prevMembers) => [...prevMembers, user]);
                  }
    
            })

        }catch(error){
            console.log(error)
        }

       

    }
    fetchProject()
      
  }, []);


  return (
    <>
     <nav className="d-flex justify-between bg-blue-500 text-white px-3 py-2 absolute z-10 top-0 left-0 right-0">
        <Link to="/home_projects">
        <div className="w-8 h-8 flex bg-blue-400 justify-center items-center rounded text-white">
  <span role="img" aria-label="home" className="anticon anticon-home">
  <svg viewBox="64 64 896 896" focusable="false" data-icon="home" width="1em" height="1em" fill="currentColor" aria-hidden="true">
  <path d="M946.5 505L560.1 118.8l-25.9-25.9a31.5 31.5 0 00-44.4 0L77.5 505a63.9 63.9 0 00-18.8 46c.4 35.2 29.7 63.3 64.9 63.3h42.5V940h691.8V614.3h43.4c17.1 0 33.2-6.7 45.3-18.8a63.6 63.6 0 0018.7-45.3c0-17-6.7-33.1-18.8-45.2zM568 868H456V664h112v204zm217.9-325.7V868H632V640c0-22.1-17.9-40-40-40H432c-22.1 0-40 17.9-40 40v228H238.1V542.3h-96l370-369.7 23.1 23.1L882 542.3h-96.1z"></path>
  </svg></span></div></Link>
  <div className="ant-dropdown-trigger w-8 h-8 flex bg-blue-400 justify-center items-center rounded text-white"><span role="img" aria-label="setting" className="anticon anticon-setting">
  <svg viewBox="64 64 896 896" focusable="false" data-icon="setting" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M924.8 625.7l-65.5-56c3.1-19 4.7-38.4 4.7-57.8s-1.6-38.8-4.7-57.8l65.5-56a32.03 32.03 0 009.3-35.2l-.9-2.6a443.74 443.74 0 00-79.7-137.9l-1.8-2.1a32.12 32.12 0 00-35.1-9.5l-81.3 28.9c-30-24.6-63.5-44-99.7-57.6l-15.7-85a32.05 32.05 0 00-25.8-25.7l-2.7-.5c-52.1-9.4-106.9-9.4-159 0l-2.7.5a32.05 32.05 0 00-25.8 25.7l-15.8 85.4a351.86 351.86 0 00-99 57.4l-81.9-29.1a32 32 0 00-35.1 9.5l-1.8 2.1a446.02 446.02 0 00-79.7 137.9l-.9 2.6c-4.5 12.5-.8 26.5 9.3 35.2l66.3 56.6c-3.1 18.8-4.6 38-4.6 57.1 0 19.2 1.5 38.4 4.6 57.1L99 625.5a32.03 32.03 0 00-9.3 35.2l.9 2.6c18.1 50.4 44.9 96.9 79.7 137.9l1.8 2.1a32.12 32.12 0 0035.1 9.5l81.9-29.1c29.8 24.5 63.1 43.9 99 57.4l15.8 85.4a32.05 32.05 0 0025.8 25.7l2.7.5a449.4 449.4 0 00159 0l2.7-.5a32.05 32.05 0 0025.8-25.7l15.7-85a350 350 0 0099.7-57.6l81.3 28.9a32 32 0 0035.1-9.5l1.8-2.1c34.8-41.1 61.6-87.5 79.7-137.9l.9-2.6c4.5-12.3.8-26.3-9.3-35zM788.3 465.9c2.5 15.1 3.8 30.6 3.8 46.1s-1.3 31-3.8 46.1l-6.6 40.1 74.7 63.9a370.03 370.03 0 01-42.6 73.6L721 702.8l-31.4 25.8c-23.9 19.6-50.5 35-79.3 45.8l-38.1 14.3-17.9 97a377.5 377.5 0 01-85 0l-17.9-97.2-37.8-14.5c-28.5-10.8-55-26.2-78.7-45.7l-31.4-25.9-93.4 33.2c-17-22.9-31.2-47.6-42.6-73.6l75.5-64.5-6.5-40c-2.4-14.9-3.7-30.3-3.7-45.5 0-15.3 1.2-30.6 3.7-45.5l6.5-40-75.5-64.5c11.3-26.1 25.6-50.7 42.6-73.6l93.4 33.2 31.4-25.9c23.7-19.5 50.2-34.9 78.7-45.7l37.9-14.3 17.9-97.2c28.1-3.2 56.8-3.2 85 0l17.9 97 38.1 14.3c28.7 10.8 55.4 26.2 79.3 45.8l31.4 25.8 92.8-32.9c17 22.9 31.2 47.6 42.6 73.6L781.8 426l6.5 39.9zM512 326c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm79.2 255.2A111.6 111.6 0 01512 614c-29.9 0-58-11.7-79.2-32.8A111.6 111.6 0 01400 502c0-29.9 11.7-58 32.8-79.2C454 401.6 482.1 390 512 390c29.9 0 58 11.6 79.2 32.8A111.6 111.6 0 01624 502c0 29.9-11.7 58-32.8 79.2z">
  </path>
  </svg>
  </span>
  </div>
  </nav>
      <div className="board" >
          <div className='row'>

          <h2 className='col-4 mr-5' >{board?.title}</h2>
          <div className='col-4   mt-1' >
            <div className='d-flex' >
           
                {members?.map(member=>(
                    
                <img className='mt-1'  key={member?.id} src={member?.image_url} alt='member' width="22px" height="22px" title={member?.first_name+" "+member?.last_name}/>       
                    
                ))}
             
            <FontAwesomeIcon  onClick={() => setIsInviting(true)} className='col-1' icon={faPlusCircle} style={{ color: '#0472ac', fontSize: '20px',marginTop:'7px ',cursor: 'pointer'}} />
            
            </div>
            </div>
            {connectedUser?.id === board?.owner && isInviting && (
                <InviteMembersModal
                    project={board}
                    setShowModal={setIsInviting}
                />
            )}
         
          </div>
         
          <DragDropContext onDragEnd={onDragEnd(board, setBoard)} >
              <Droppable
                  droppableId={"board" + board?.id.toString()}
                  direction="horizontal"
                  type="list"
              >
                  {(provided) => (
                      <div
                          className="board__lists"
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                      >
                          {board?.lists?.map((list, index) => (
                              <List
                                  list={list}
                                  members={members}
                                  index={index}
                                  key={uuidv4()}
                              />
                          ))}
                          {provided.placeholder}
                          {addingList ? (
                              <CreateList
                                  board={board}
                                  setBoard={setBoard}
                                  setAddingList={setAddingList}
                              />
                          ) : (
                              <button
                                  className="btn board__create-list"
                                  onClick={() => setAddingList(true)}
                                  style={
                                      board?.lists?.length === 0
                                          ? { marginLeft: 0 }
                                          : null
                                  }
                              >
                                  <i className="fal fa-plus"></i>
                                  Add{" "}
                                  {board?.lists?.length === 0
                                      ? "a"
                                      : "another"}{" "}
                                  list
                              </button>
                          )}
                      </div>
                  )}
              </Droppable>
          </DragDropContext>
      </div>
      </>
  );
};

const CreateList = ({ board, setBoard, setAddingList }) => {
  const [title, setTitle] = useState("");

  const onAddList = async (e) => {
      e.preventDefault();
      const list={
        project: board?.id,
        title,
      }
      console.log(list)
      const result = await addListBoard(list)
      if(result!=undefined){
        // setBoard(result)
        addList(board, setBoard)(result);
      }
      setAddingList(false);
  };

  return (
      <form className="board__create-list-form" onSubmit={onAddList}>
          <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              name="title"
              placeholder="Enter list title"
          />
          {title.trim() !== "" ? (
              <button type="submit" className="btn btn--small">
                  Add List
              </button>
          ) : (
              <button
                  type="submit"
                  className="btn btn--small btn--disabled"
                  disabled
              >
                  Add List
              </button>
          )}
      </form>
  );
};
