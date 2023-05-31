import React, { useRef } from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { addAnswer, addComment, addView, deleteAnswerById, deleteCommentById, deleteQuestionById, getAnswerById, getCommentById, getQuestionWithAnswersAndComments, solutionQuestion, updateAnswer, updateComment, updateVotes } from '../../../utils/Forum';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import moment from 'moment';
import { useForm } from 'react-hook-form';
import { getCurrentUser } from '../../../utils/user.auth.service';
import {IonIcon} from "react-ion-icon";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-modal';


export default function Question() {
  const [question,setQuestion]=useState();
  const [solution,setSolution]=useState();
  const [commentContent,setCommentContent]=useState();
  const [answers,setAnswers]=useState(false);
  const  [errorsComment,setErrorsComment]  = useState(false);
  const { register: registerAnswer, handleSubmit: handleSubmitAnswer,  formState: { errors: errorsAnswer },setValue, watch  } = useForm();
  const user = getCurrentUser();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedAnswer,setselectedAnswer]=useState(false);
  const [editorState, setEditorState] = useState(null);
  const { register, handleSubmit, formState: { errors },setValue: setValueUpdate, watch:watchUpdate } = useForm();
  /*** comment modal */
  const [commentModalIsOpen, setCommentIsOpen] = useState(false);
  const [commentUpdateContent,setCommentUpdateContent]=useState();

  const [selectedComment,setselectedComment]=useState(false);
  const [selectedIndex, setSelectedIndex] = useState();
  const { register: registerComment, handleSubmit:handleSubmitComment,setValue: setValueUpdateComment, watch:watchUpdateComment } = useForm();


  const navigate = useNavigate();




  let { id } = useParams();

  
 

  useEffect(() => {
    const fetchData = async () => {
      const result = await getQuestionWithAnswersAndComments(id);
      setQuestion(result);
      setAnswers(result?.answers)
      setSolution(result?.answers?.filter(answer => answer.solution === true))
      if(result.author_id!=user?.id){
        const view = await addView(id,user?.id);

      }

    };
    fetchData();
  }, []);





/***************Answer**************/
/***********************************/

const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ size: [] }],
      [{ font: [] }],
      [{ align: ["right", "center", "justify"] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image", "code-block"],
      [{ color: ["red", "#785412"] }],
      [{ background: ["red", "#785412"] }],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "color",
    "image",
    "code-block",
    "background",
    "align",
    "size",
    "font",
  ];

  const onEditorStateChange = (editorState) => {
    setValue("answer_content", editorState);
  };

  useEffect(() => {
    registerAnswer("answer_content", { required: true, minLength: 11 });
  }, [registerAnswer]);
  const editorContent = watch("answer_content");

 

  const onSubmit = async (e) => {
    const answer = {
      content: e.answer_content,
      author_id:user?.id,
      author_name:user?.first_name+" "+user?.last_name,
      author_image:user?.image_url,
      question:id
    };
    console.log(answer)

       const result = await addAnswer(answer).then(ans=>{
        if(ans?.id!=undefined){
            const updatedAnswers = [...question.answers, ans];
            setQuestion({
                ...question,
                answers: updatedAnswers,
              });
              toast.success("Answer added successfully!");
              
        }
        else{
          toast.error("Error!");

        }

       });
    };

/***************Comment**************/
/***********************************/
const onSubmitComment = async (e, idA, i) => {
    e.preventDefault();
    console.log(commentContent);
    if (commentContent !== "" && commentContent !== undefined) {
      const comment = {
        content: commentContent,
        author_id:user?.id,
        author_name:user?.first_name+" "+user?.last_name,
        author_image:user?.image_url,
        answer: idA,
      };
      const result = await addComment(comment).then((comm) => {
        if (comm !== undefined) {
          const updatedAnswers = [...question.answers];
          if (updatedAnswers[i].comments) {
            updatedAnswers[i].comments = [...updatedAnswers[i].comments, comm];
          } else {
            updatedAnswers[i].comments = [comm];
          }
          const updatedQuestion = {
            ...question,
            answers: updatedAnswers,
          };
          setQuestion(updatedQuestion);
          toast.success("Comment added successfully!");
        }
      });
    } else {
      setErrorsComment(true);
    }
  };

/***************Vote**************/
/***********************************/
      const onClickUpVote = async (e,idA,i) => {
        const vote = "up"
        const result = await updateVotes(vote,idA,user?.id).then(res=>{
            if(res!=undefined){

                const updatedAnswers = [...question.answers];
                updatedAnswers[i] = {
                  ...updatedAnswers[i],
                  ...res,
                };
                const updatedQuestion = {
                  ...question,
                  answers: updatedAnswers,
                };
              
                setQuestion(updatedQuestion);
              toast.success("Vote added successfully!");

            }
            else{
              toast.error("You have already voted !!");
            }
        });
        };

        const onClickDownVote = async (e,id,i) => {
                console.log("aaa",id)
                const vote = "down"
                const result = await updateVotes(vote,id).then(res=>{
                    if(res!=undefined){
        
        
                        const updatedAnswers = [...question.answers];
                        updatedAnswers[i] = {
                          ...updatedAnswers[i],
                          ...res,
                        };
                        const updatedQuestion = {
                          ...question,
                          answers: updatedAnswers,
                        };
                        setQuestion(updatedQuestion);
                      toast.success("Vote added successfully!");
        
                    }
                    else{
                      toast.error("You have already voted !!");
                    }
                });
                
               
                };

/************** */

const updateAnswerSolution = async (e,id) => {
console.log(id)
    const result = await solutionQuestion(id).then(res=>{
        if(res!=undefined){
          setSolution(res)
            toast.success("Solution added successfully!");

        }
        else {
            toast.error("Error !!!");

        }
    })

}

/********Modal ***** */
useEffect(() => {
    register("content", { required: true, minLength: 11 });
    setEditorState(watchUpdate("content"));
  }, [register, watchUpdate]);
  
  const onEditorStateChangeUpdate = (editorState) => {
    setEditorState(editorState);
    setValueUpdate("content", editorState);
  };

const getAnswer = async (id) => {
    try {
      const response = await getAnswerById(id);
      setselectedAnswer(response);
      setEditorState(response?.content)

    } catch (error) {
      console.error(error);
    }
  };

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  const openModal=(e,id)=> {
    getAnswer(id)
    setIsOpen(true);
  }


  function closeModal() {
    setIsOpen(false);
  }
  
  const updateAnswerContent = async (e) => {
    try {
      const res = await updateAnswer(e.content,selectedAnswer?.id).then(response=>{
        if (response!= undefined){
            closeModal()
            const updatedAnswers = question.answers.map((answer) => {
                if (answer.id === selectedAnswer.id) {
                  return {
                    ...answer,
                    ...response,
                  };
                }
                return answer;
              });
              const updatedQuestion = {
                ...question,
                answers: updatedAnswers,
              };
              console.log(updatedQuestion);
              setQuestion(updatedQuestion);
              toast.success("Answer updated successfully!");
        }
        else{
          toast.error("Error !!!");
        }
      });

    } catch (error) {
      console.error(error);
    }
  };
/***********update comment content */
const getComment= async (id) => {
  try {
    const response = await getCommentById(id);
    setselectedComment(response);
    setCommentUpdateContent(response?.content)

  } catch (error) {
    console.error(error);
  }
};
const openModalComment=(e,id,index)=> {
  setSelectedIndex(index)
  getComment(id)
  setCommentIsOpen(true);
}


function closeModalComment() {
  setCommentIsOpen(false);
}

  const updateCommentContent = async (e) => {
    try {
      const response= await updateComment(commentUpdateContent,selectedComment?.id).then(res=>{
        if (res!= undefined){
          closeModalComment();
          const updatedAnswers = [...question.answers];
          if (updatedAnswers[selectedIndex].comments) {
            const commentIndex = updatedAnswers[selectedIndex].comments.findIndex(comment => comment.id === selectedComment.id);
            if (commentIndex !== -1) {
              updatedAnswers[selectedIndex].comments[commentIndex] = res;
            }
          }
          const updatedQuestion = {
            ...question,
            answers: updatedAnswers,
          };
          setQuestion(updatedQuestion);
          toast.success("Comment updated successfully!");
        }
        else{
          toast.error("Error !!!");
        }
      });

    } catch (error) {
      console.error(error);
    }
  };
  /***********delete answer *** */

  const deleteAnswer = async (e,id) => {
        const result = await deleteAnswerById(id).then(res=>{
          console.log(res)
            if(res!=undefined){
              const updatedAnswers = question.answers.filter((answer) => answer.id !== id);
              setQuestion({
                ...question,
                answers: updatedAnswers,
              });
                toast.success("Answer deleted successfully!");
    
            }
            else {
                toast.error("Error !!!");
    
            }
        })
    
    }
/***********delete comment **** */

const deleteComment = async (e,id,answerIndex) => {
  const result = await deleteCommentById(id).then(res=>{
    console.log(res)
      if(res!=undefined){
            const updatedAnswers = [...question.answers];
          const updatedComments = updatedAnswers[answerIndex].comments.filter(
            (comment) => comment.id !== id
          );
          updatedAnswers[answerIndex].comments = updatedComments;
          setQuestion({
            ...question,
            answers: updatedAnswers,
          });
          toast.success("Comment deleted successfully!");

      }
      else {
          toast.error("Error !!!");

      }
  })

}

/***** delete question ** */


const deleteQuestion = async () => {
  const result = await deleteQuestionById(id)
  if(result!=undefined){
           
    toast.success("Question deleted successfully!");
    await new Promise(resolve => setTimeout(resolve, 4000)); 
    navigate("/all_questions")
}
else {
    toast.error("Error !!!");

}
}
  return (
    
    <section className="doc_blog_grid_area sec_pad forum-single-content">
    <div className="container">
        <div className="row">
            <div className="col-lg-9">
                <div className="row">
                    <div className="col-lg-9">
                        <div className="forum-post-top">
                            <a className="author-avatar" href="#">
                            <img src={question?.author_image} alt="author avatar" width="50px" height="50px"/>

                            </a>
                            <div className="forum-post-author">
                                <Link className="author-name" to={"/user_profile/" + question?.author_id}> {question?.author_name} </Link>
                                <div className="forum-author-meta">
                                    <div className="author-badge">
                                        
                                        <span className='mr-3'>{question?.author_badge}</span>
                                    </div>
                                    <div className="author-badge">
                                        <i className="icon_calendar"></i>
                                        <span>{moment(question?.created_at).format('MMMM Do YYYY, h:mm a')}</span>
                                    </div>
                                    <div className="author-badge ml-5">
                                    {(user?.id==question?.author_id && question?.answers?.length==0) && (
                                                <div className="author-badge ml-4" style={{ cursor: 'pointer' }} onClick={e=>deleteQuestion(e)}>
                                               <IonIcon name="trash-outline" width="30px" /> 
                                                    
                                                </div>
                                            )}
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <div className="action-button-container">
                            {user?.id==question?.author_id ?(
                                 <Link to={"/update_question/"+ question?.id} className="action_btn btn-ans ask-btn">Update Question</Link>
                            ):(
                                 <Link to="/add_question" className="action_btn btn-ans ask-btn">Ask Question</Link>
                            )}
                          
                        </div>
                    </div>
                </div>

                <div className="q-title">
                    <span className="question-icon" title="Question">Q:</span>
                    <h1>{question?.title}</h1>
                </div>
                <div className="forum-post-content">
                    <div className="content">
                    <ReactQuill value={question?.content}  modules={{
                        toolbar: false
                        }}
                        readOnly={true}
                        style={{ border: 'none !imprtant' }} />
                       </div>
                    <div className="forum-post-btm">
                        <div className="taxonomy forum-post-tags">
                            <i className="icon_tags_alt"></i>
                            {question?.tags?.map(tag=>(
                                 <a href="#" key={tag?.id}>{tag.name} </a> 

                            ))}
                            
                        </div>
                        <div className="taxonomy forum-post-cat">
                            <img src="img/forum/logo-favicon.png" alt=""/><a href="#">{question?.category?.name}</a>
                        </div>
                    </div>
                   
                </div>
                 <div className="blog_answer_box topic_answer mt-5">
                                <h2 className="c_head">Leave a Reply</h2>
                                <form className="get_quote_form row mt-3" onSubmit={handleSubmitAnswer(onSubmit)}>
                                    
                                    <div className="col-md-12 form-group">
                                    <ReactQuill
                                    theme="snow"
                                    modules={modules}
                                    formats={formats}
                                    value={editorContent}
                                    onChange={onEditorStateChange}
                                    placeholder="Write here your answer"
                                    className={` ${errorsAnswer.content && "invalid"}`}
                                    
                                    />
                                    </div>
                                   
                                    <div className="col-md-12 form-group"><button className="btn action_btn thm_btn"
                                      type="submit">Post Answer</button></div>
                                </form>
                            </div>
              

                            {solution?.length==1 && (
                                <div className="best-answer">
                                <div className="row">
                                    <div className="col-lg-9">
                                        <div className="forum-post-top">
                                            <a className="author-avatar" href="#">
                                            <img src={solution[0]?.author_image} alt="author avatar" width="50px" height="50px"/>

                                            </a>
                                            <div className="forum-post-author">
                                            <Link className="author-name" to={"/user_profile/" + solution[0]?.author_id}>{solution[0]?.author_name}</Link>
                                               
                                                <div className="forum-author-meta">
                                                    <div className="author-badge">
                                                       
                                                    <span className='mr-3'>{solution?.author_badge}</span>
                                                    </div>
                                                    <div className="author-badge">
                                                        <i className="icon_calendar"></i>
                                                        <span>{moment(solution[0]?.created_at).format('MMMM Do YYYY, h:mm a')}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3">
                                        <p className="accepted-ans-mark">
                                            <i className="icon_check"></i> <span>Accepted Solution</span>
                                        </p>
                                    </div>
                                </div>
                                <div className="best-ans-content d-flex">
                                    <span className="question-icon" title="The Best Answer">A:</span>
                                    <div className="content">
                                    <ReactQuill value={solution[0]?.content}  modules={{
                                        toolbar: false
                                        }}
                                        readOnly={true}
                                        style={{ border: 'none !imprtant' }} />
                                    </div>
                                   
                                </div>
                            </div>
                            )}
                

                
                <div className="all-answers">
                    <h3 className="title">All Replies</h3>
                    <div className="filter-bar d-flex">
                        <div className="sort">
                            <select className="custom-select" id="sortBy">
                                <option >Sort By</option>
                                <option value="1">ASC</option>
                                <option value="2">Desc</option>
                                <option value="3">Vote</option>
                            </select>
                        </div>
                        <p>Page 1 of 4</p>
                    </div>

                   {question?.answers?.map((answer,index)=>(
                   <div className="forum-comment" key={index}>
                                <div className="forum-post-top">
                                    <a className="author-avatar" href="#">
                                        <img src={answer?.author_image} alt="author avatar" width="50px" height="50px"/>
                                    </a>

                                    <div className="forum-post-author">
                                        <Link className="author-name" to={"/user_profile/" + answer?.author_id}>{answer?.author_name}</Link>
                                        <div className="forum-author-meta">
                                            <div className="author-badge">
                                                
                                            <span className='mr-3'>{answer?.author_badge}</span>

                                            </div>
                                            <div className="author-badge">
                                                <i className="icon_calendar"></i>
                                                <span>{moment(answer?.created_at).format('MMMM Do YYYY, h:mm a')} </span>
                                            </div>
                                            {(solution?.length==0 && user?.id==question?.author_id) && (
                                                <div className="author-badge ml-4" style={{ cursor: 'pointer' }} onClick={(e) =>updateAnswerSolution(e,answer?.id)}>
                                                <img src="/front/img/forum/green-tick.png" width="20px" height="20px"/>
                                                    <span className='ml-2' style={{ color: '#00aa6a' }}>Solution</span>
                                                    
                                                </div>
                                            )}

                                            {(user?.id==answer?.author_id) && (
                                                <div className="author-badge ml-4" style={{ cursor: 'pointer' }} >
                                               <IonIcon name="create-outline" style={{ color: '#0472ac' }} onClick={(e) =>openModal(e,answer?.id)}/> 
                                             
                                                    
                                                </div>
                                            )}

                                                  

                                            {(user?.id==answer?.author_id && answer?.comments?.length==0) && (
                                                <div className="author-badge ml-4" style={{ cursor: 'pointer' }} onClick={(e) =>deleteAnswer(e,answer?.id)}>
                                               <IonIcon name="trash-outline"  /> 
                                                    
                                                </div>
                                            )}
                                           
                                        </div>
                                    </div>
                                </div>
                                <div className="comment-content">
                                    <div className='d-flex '>
                                    <div className=' votes mt-3'>
                                        <div className='ion-icon'>
                                   <span className='vote-icon' onClick={(e) => onClickUpVote(e,answer?.id,index)}> <IonIcon name="caret-up-outline"/> </span>

                                        </div>
                                        <p className='ml-2 mt-1 mb-2'>{answer?.votes}</p>
                                        <div className='ion-icon'>
                                       <span className='vote-icon'  onClick={(e) => onClickDownVote(e,answer?.id,index)}> <IonIcon name="caret-down-outline" /> </span>

                                        </div>
                                    </div>

                                <div className='ml-5 mt-2'>
                                <ReactQuill value={answer?.content}  modules={{
                                    toolbar: false
                                    }}
                                    readOnly={true}
                                    style={{ border: 'none' }} /> 

                                    </div>  
                                    </div>  
                                    <div className='bottom-vote-icon'>
                                    <span className='up-vote-icon mr-3'><IonIcon name="caret-up-outline" />{answer?.up_vote}</span>
                                    <span className='down-vote-icon'><IonIcon name="caret-down-outline" />{answer?.down_vote}</span>


                                    </div>

                                    <div className='answer-comments'>
                                    {answer?.comments?.map(comment=>(
                                        <div className='single-comment mt-2 ' key={comment?.id}>
                                             <div className="forum-post-top mt-3">
                                    <a className="author-avatar" href="#">
                                        <img src={comment?.author_image} alt="author avatar" width="30px" height="30px"/>
                                    </a>

                                    <div className="forum-post-author d-flex">
                                        <Link className="author-name mr-5" to={"/user_profile/" + comment?.author_id}>{comment?.author_name}</Link>
                                        <div className="forum-author-meta">
                                          
                                            <div className="author-badge">
                                                <i className="icon_calendar"></i>
                                                <span href="">{moment(comment?.created_at).format('MMMM Do YYYY, h:mm a')}</span>
                                            </div>

                                            {(user?.id==comment?.author_id) && (
                                                <div className="author-badge ml-4" style={{ cursor: 'pointer' }} onClick={(e) =>openModalComment(e,comment?.id,index)} >
                                               <IonIcon name="create-outline" style={{ color: '#0472ac' }} /> 
                                                    
                                                </div>
                                            )}

{                                         (user?.id==comment?.author_id ) && (
                                                <div className="author-badge ml-4" style={{ cursor: 'pointer' }} onClick={(e) =>deleteComment(e,comment?.id,index)}>
                                               <IonIcon name="trash-outline"  /> 
                                                    
                                                </div>
                                            )}

                                          
                                        </div>
                                    </div>
                                </div>
                                            <div className='ml-5'>
                                            <p className=''  >{comment?.content}</p>

                                            </div>
                                            
                                       
                                     

                                    </div>
                                    
                                    ))}
                                    </div>
                                    <div className="action-button-container action-btns">
                                    <div className="">
                                        <hr></hr>
                                        <form className="get_quote_form row mt-3" onSubmit={(e) =>onSubmitComment(e, answer.id,index) }>
                                        <div className="col-md-12 form-group">
                                            <textarea className={`form-control message ${errorsComment && "invalid"}`} onChange={(e) =>
                                                setCommentContent( e.target.value)
                                              }></textarea>
                                            <label className="floating-label">Comment type...</label>
                                            {errorsComment && (
                                                <small className="text-danger">Required </small>
                                            )}
                                        </div>
                                        <div className="col-md-12 form-group">
                                            <button className="btn action_btn thm_btn" type="submit">Post Comment</button>
                                        </div>
                                    </form>
                            </div>
                           
                                    </div>
                                </div>
                            </div>

                             ))}

                    <div className="pagination-wrapper">
                        <div className="view-post-of">
                            <p>Viewing 4 answers - 1 through 10 (of 96 total)</p>
                        </div>
                        <ul className="post-pagination">
                            <li className="prev-post pegi-disable"><a href="#"><i className="arrow_carrot-left"></i></a>
                            </li>
                            <li><a href="#" className="active">1</a></li>
                            <li><a href="#">2</a></li>
                            <li><a href="#">3</a></li>
                            <li><a href="#">4</a></li>
                            <li><a href="#">15</a></li>
                            <li className="next-post"><a href="#"><i className="arrow_carrot-right"></i></a></li>
                        </ul>
                    </div>

                </div>
            </div>
            

            <div className="col-lg-3">
                <div className="forum_sidebar">
                   

                    <div className="widget usefull_links_widget">
                        <h4 className="c_head">Usefull Links</h4>

                        <ul className="list-unstyled usefull-links">
                            <li><i className="icon_lightbulb_alt"></i><a href="#">FAQs</a></li>
                            <li><i className="icon_clock_alt"></i><a href="#">Popular</a></li>
                            <li><i className="icon_piechart"></i><a href="#">Recent</a></li>
                            <li><i className="icon_info_alt"></i><a href="#">Unanswered</a></li>
                        </ul>
                    </div>
                   

                    <div className="widget tag_widget">
                        <h4 className="c_head">Tags</h4>
                        <ul className="list-unstyled w_tag_list style-light">
                            <li><a href="#">Swagger</a></li>
                            <li><a href="#">Docy</a></li>
                            <li><a href="#">weCare</a></li>
                            <li><a href="#">Business</a></li>
                            <li><a href="#">Download</a></li>
                            <li><a href="#">Doc</a></li>
                            <li><a href="#">WordPress</a></li>
                            <li><a href="#">Design</a></li>
                            <li><a href="#">ui/ux</a></li>
                            <li><a href="#">Doc Design</a></li>
                            <li><a href="#">DocAll</a></li>
                            <li><a href="#">Productboard</a></li>
                            <li><a href="#">Magento</a></li>
                        </ul>
                    </div>

                </div>
            </div>
        </div>
    </div>
                                                     <Modal
                                                        isOpen={modalIsOpen}
                                                        onRequestClose={closeModal}
                                                        style={customStyles}
                                                        contentLabel="Update Answer"
                                                    >
                                                        <h4 >Update your answer</h4>
                                                        <form className="get_quote_form row mt-3" onSubmit={handleSubmit(updateAnswerContent)}>
                                    
                                                        <div className="col-md-12 form-group">
                                                        <ReactQuill
                                                        theme="snow"
                                                        modules={modules}
                                                        formats={formats}
                                                        value={editorState || ''}
                                                        onChange={onEditorStateChangeUpdate} 
                                                        placeholder="Write here your problem"
                                                        />
                                                        
                                                        </div>
                                                    
                                                        <div className="col-lg-12 text-center">
                                                            <button type="submit" className="btn action_btn thm_btn">
                                                                Save
                                                            </button>
                                                            <button className="ml-5 btn thm_btn" onClick={closeModal}>close</button>
                                                            </div>
                                                    </form>    
                                                      
                                                        
                                                  
                                                    </Modal>





                                                    <Modal
                                                        isOpen={commentModalIsOpen}
                                                        onRequestClose={closeModalComment}
                                                        style={customStyles}
                                                        contentLabel="Update Comment"
                                                    >
                                                        <h4 >Update your comment</h4>
                                                        <form className="get_quote_form row mt-3"  onSubmit={handleSubmitComment(updateCommentContent)}>
                                                        <div className="col-md-12 form-group">
                                                            <textarea className="form-control message" value={commentUpdateContent} onChange={(e) =>
                                                setCommentUpdateContent( e.target.value)}></textarea>
                                                            <label className="floating-label">Comment type...</label>
                                                            {/* {errorsComment && (
                                                                <small className="text-danger">Required </small>
                                                            )} */}
                                                        </div>
                                                        <div className="col-lg-12 text-center">
                                                            <button type="submit" className="btn action_btn thm_btn">
                                                                Update
                                                            </button>
                                                            <button className="ml-5 btn thm_btn" onClick={closeModalComment}>close</button>
                                                            </div>
                                                    </form>    
                                                      
                                                        
                                                  
                                                    </Modal>

    <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        />
</section>

  )
}
