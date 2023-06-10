import React from 'react'
import { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import globalContext from '../../../utils/globalContext';
import { updateCard } from '../../../utils/board';
import { addCommentItem, assignToCard, deleteCommentItem, updateCommentItem, updateDescriptionItem, updateTitleItem } from '../../../utils/Task';
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faFileAlt, faPencil, faTimes, faUser } from '@fortawesome/free-solid-svg-icons';
import useAxiosGet from '../../../utils/useAxiosGet';
import { getCurrentUser, getUserProfile } from '../../../utils/user.auth.service';
import moment from 'moment/moment';


export default function EditCardModal  ({ card, list, setShowModal,members })  {
    const [editingTitle, setEditingTitle] = useState(false);
    const [assignedTo, setAssignedTo] = useState();
    const [selectValue, setSelectValue] = useState();
    const [editingDescription, setEditingDescription] = useState(false);
    const [assigneMember, setAssigneMember] = useState(false);


    useEffect(()=>{
        const fetchAssignedTo=async()=>{
            if(card.assigned_to!=undefined){
                const user=await getUserProfile(card.assigned_to)
                console.log(user)
            setAssignedTo(user)

            }

        }
        fetchAssignedTo()
    },[])
    
    const handleAssignTo=async(e)=>{
        if(selectValue!=undefined){
            const user=await getUserProfile(selectValue)
            setAssignedTo(user)
            const result=await assignToCard(card.id,user?.id)
            setAssigneMember(false)
        }
        

    }

    const {
        data: comments,
        addItem: addComment,
        replaceItem: replaceComment,
        removeItem: removeComment,
    } = useAxiosGet(`comments_by_item/${card.id}`);

    return (
        <div className="edit-modal">
            <button
                className="edit-modal__exit"
                onClick={() => setShowModal(false)}
            >
                <FontAwesomeIcon icon={faTimes} />
            </button>
            <div className="edit-modal__cols">
                <div className="edit-modal__left">
                    {!editingTitle ? (
                        <p
                            onClick={() => setEditingTitle(true)}
                            className="edit-modal__title"
                        >
                            {card.title}
                        </p>
                    ) : (
                        <EditCardTitle
                            list={list}
                            card={card}
                            setEditingTitle={setEditingTitle}
                        />
                    )}
                    <div className="edit-modal__subtitle">
                        in list <span>{list.title}</span>
                    </div>

                    <div className="edit-modal__section-header">
                        <div>
                            <FontAwesomeIcon icon={faFileAlt} /> Description
                        </div>
                        {card.description !== "" && (
                            <div>
                                <button
                                    className="btn btn--secondary btn--small"
                                    onClick={() => setEditingDescription(true)}
                                >
                                     <FontAwesomeIcon icon={faPencil} /> Edit
                                </button>
                            </div>
                        )}
                    </div>

                    {card.description !== "" && !editingDescription && (
                        <p className="edit-modal__description">
                            {card.description}
                        </p>
                    )}

                    {editingDescription ? (
                        <EditCardDescription
                            list={list}
                            card={card}
                            setEditingDescription={setEditingDescription}
                        />
                    ) : (
                        card.description === "" && (
                            <button
                                className="btn btn--secondary btn--small btn--description"
                                onClick={() => setEditingDescription(true)}
                            >
                                Add description
                            </button>
                        )
                    )}


                    
                    <CommentForm
                        card={card}
                        style={
                            (comments || []).length === 0
                                ? { marginBottom: 0 }
                                : null
                        }
                        addComment={addComment}
                    />
                    <Comments
                        card={card}
                        comments={comments || []}
                        replaceComment={replaceComment}
                        removeComment={removeComment}
                    />
                </div>

                <div className="edit-modal__right">
                    <div className="edit-modal__section-header">
                        <div>Actions</div>
                    </div>

                    <ul className="edit-modal__actions">
                        
                        <li>
                            <span className="btn btn--secondary btn--small" onClick={() => setAssigneMember(true)}>
                                <FontAwesomeIcon icon={faUser} /> Change Assignd to
                            </span>
                        </li>
                        <li>
                            <span className="btn btn--secondary btn--small">
                                <FontAwesomeIcon icon={faClock} /> Change End Date
                            </span>
                        </li>
                    </ul>
                    <div className="edit-modal__section-header">
                        <div>Assigned to</div>
                    </div>
                    {assignedTo && (
                        <ul className="edit-modal__members">
              
                        <li >
                            <img src={assignedTo?.image_url} width="30px" height="30px" alt='user' />
                            <p className='mt-2'>{assignedTo?.first_name+" "+assignedTo?.last_name}</p>
                        </li>
                
                    </ul>
                    )}
                    
                    {assigneMember && (
                      <div className="label-modal label-modal--shadow" >
                      <div className="label-modal__header">
                          <p>Assign to </p>
                          <button style={{border:'none',backgroundColor:'white'}} onClick={() => setAssigneMember(false)}>
                          <FontAwesomeIcon icon={faTimes} />
                          </button>
                      </div>
                  
                      <div className="label-modal__content">
                          <p className="label-modal__invite-header">
                              <i className="fal fa-user"></i>
                              Select member  
                          </p>
                          <select  className="label-modal__input"  onClick={(e)=>setSelectValue(e.target.value)}>
                            <option>select</option>
                          {members?.map(member=>(
                            <option key={member?.id} value={member?.id}>{member?.first_name+" "+member?.last_name}</option>
                          ))}
                          </select>
                          
                          {selectValue ? (
                              <button className="btn" onClick={handleAssignTo}>
                                  Assign
                              </button>
                          ) : (
                              <button className="btn btn--disabled" disabled>
                                  Assign
                              </button>
                          )}
                      </div>
                  </div>  
                    )}

                </div>
            </div>
        </div>
    );
};

const EditCardTitle = ({ list, card, setEditingTitle }) => {
    const { board, setBoard } = useContext(globalContext);
    const [title, setTitle] = useState(card.title);

    useEffect(() => {
        const titleInput = document.querySelector(".edit-modal__title-edit");
        titleInput.focus();
        titleInput.select();
    }, []);

    const onEditTitle = async (e) => {
        e.preventDefault();
        if (title.trim() === "") return;
        const data  = await updateTitleItem(card.id,title) 
        setEditingTitle(false);
        updateCard(board, setBoard)(list.id, data);
    };

    return (
        <form onSubmit={onEditTitle}>
            <input
                className="edit-modal__title-edit"
                type="text"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            ></input>
        </form>
    );
};

const EditCardDescription = ({ list, card, setEditingDescription }) => {
    const { board, setBoard } = useContext(globalContext);
    const [description, setDescription] = useState(card.description);

    const onEditDesc = async (e) => {
        e.preventDefault();
        if (description.trim() === "") return;
        const data  = await updateDescriptionItem(card.id,card.title,description)
        setEditingDescription(false);
        updateCard(board, setBoard)(list.id, data);
    };

    return (
        <form className="edit-modal__form" onSubmit={onEditDesc}>
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add description..."
            ></textarea>
            {description.trim() !== "" && (
                <button type="submit" className="btn btn--small">
                    Save
                </button>
            )}
        </form>
    );
};

const Comments = ({ card, comments, replaceComment, removeComment }) => {
    // const { authUser } = useContext(globalContext);
    const [isEditing, setIsEditing] = useState(false);
    // const [user, setUser] = useState();
        const user =  getCurrentUser();
      


    if (comments.length === 0) return null;

    const onDelete = async (comment) => {
        await deleteCommentItem(comment.id) ;
        removeComment(comment.id);
    };

    return (
        <ul className="edit-modal__comments">
            {comments.map((comment) => (
                <li key={uuidv4()}>
                    <div className="comment">
                        <div className="comment__header">
                            <div className="comment__header-left">
                                <img className='member member--image' src={comment?.author_image} alt='' width="35px" height="35px" />
                                <div className="comment__info mt-1">
                                    <h6>{comment?.author_name}</h6>
                                   
                                </div>
                                <div className="comment__info ml-3">
                                <p>{moment(comment?.created_at).fromNow()}</p>
                                </div>
                            </div>
                            {comment?.author_id === user?.id && (
                                <div className="comment__header-right">
                                    <button className='comment-btns'
                                        onClick={() => setIsEditing(comment.id)}
                                    >
                                        Edit
                                    </button>{" "}
                                    -{" "}
                                    <button className='comment-btns' onClick={() => onDelete(comment)}>
                                        Delete
                                    </button>
                                </div>
                            )}
                        </div>
                        {isEditing !== comment.id ? (
                            <div className="comment__content ml-4">
                                {comment.body}
                            </div>
                        ) : (
                            <CommentForm
                                card={card}
                                comment={comment}
                                replaceComment={replaceComment}
                                setIsEditing={setIsEditing}
                            />
                        )}
                    </div>
                </li>
            ))}
        </ul>
    );
};

const CommentForm = ({
    card,
    comment,
    style,
    addComment,
    replaceComment,
    setIsEditing,
}) => {
    // If comment not null, edit form
    const [commentBody, setCommentBody] = useState(comment ? comment.body : "");


    const onAddComment = async (e) => {
        e.preventDefault();
      const user = await getCurrentUser();
        if (commentBody.trim() === "") return;
        const commentToAdd={
            item: card.id,
            body: commentBody,
            author_id:user?.id,
            author_image:user?.image_url,
            author_name:user?.first_name+" "+user?.last_name,

        }
        console.log(commentToAdd)
        const data=await addCommentItem(commentToAdd);
        addComment(data);
        setCommentBody("");
    };

    const onEditComment = async (e) => {
        e.preventDefault();
        if (commentBody.trim() === "") return;
        const data=await updateCommentItem(comment.id,commentBody)
        replaceComment(data);
        setIsEditing(false);
    };

    // Modifier is only for useBlurSetState, as doc.querySelector is selecting description form otherwise
    // Only add if comment is not null, otherwise doc.querySelector selects create comment form
    return (
        <form
            className={`edit-modal__form${
                comment ? " edit-modal__form--comment" : ""
            }`}
            style={style}
            onSubmit={comment ? onEditComment : onAddComment}
        >
            <textarea
                placeholder="Leave a comment..."
                value={commentBody}
                onChange={(e) => setCommentBody(e.target.value)}
            ></textarea>
            {commentBody.trim() !== "" && (
                <button className="btn btn--small" type="submit">
                    Comment
                </button>
            )}
        </form>
    );
};