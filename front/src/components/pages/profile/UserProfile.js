import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { Img } from 'react-image'
import { useState } from 'react';
import moment from 'moment';
import axios from 'axios';
import { useEffect } from 'react';
import { getCurrentUser, getUserProfile } from '../../../utils/user.auth.service';
import { getAnswersByUser, getQuestionsByUser } from '../../../utils/Forum';
import ReactQuill from 'react-quill';


export default function UserProfile() {
    const [user, setUser] = useState();
    const [connectedUser, setConnectedUser] = useState();
    const [navigate, setNavigate] = useState(false);
    const [questions,setQuestions]=useState();
    const [answers,setAnswers]=useState();
    const [tab,setTab]=useState(0);
    let { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
          try {
            const user = await getCurrentUser();
            setConnectedUser(user);
            }catch (error) {
            console.log(error)
          }
        };
        fetchData();
      }, []);

      useEffect(() => {
        const fetchData = async () => {
          try {
            const user = await getUserProfile(id);
            setUser(user);
            console.log(user)
            }catch (error) {
            console.log(error)
          }
        };
        fetchData();
      }, []);

   

      useEffect(() => {
        const fetchData = async () => {
          const result = await getQuestionsByUser(id);
          console.log("res",result)
          setQuestions(result);
        };
        fetchData();
      }, []);


      useEffect(() => {
        const fetchData = async () => {
          const result = await getAnswersByUser(id);
          console.log("ans",result)
          setAnswers(result);
        };
        fetchData();
      }, []);

    const logout = async () => {
        await axios.post('http://localhost:8002/api/logout', {}, {withCredentials: true});
        localStorage.removeItem("user")
        setNavigate(true);
    }

    const onTab = async (e,nbr) => {
    
        setTab(nbr)
        };
  return (
    <>

    <nav className="navbar navbar-expand-lg menu_one menu_purple sticky-nav navbar_fixed gap fadeInDown">
                <div className="container">
                    <a className="navbar-brand header_logo" href="index.html">
                        <img className="first_logo sticky_logo" src="/front/img/Capgemini-Logo.png"    width="200px" srcSet="img/logo-2x.png 2x" alt="logo"/>
                        <img className="white_logo main_logo" src="img/logo-w.png" srcSet="img/logo-w2x.png 2x" alt="logo"/>
                    </a>
                    <button className="navbar-toggler collapsed" type="button" data-toggle="collapse"
                            data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="menu_toggle">
                            <span className="hamburger">
                                <span></span>
                                <span></span>
                                <span></span>
                            </span>
                            <span className="hamburger-cross">
                                <span></span>
                                <span></span>
                            </span>
                        </span>
                    </button>
    
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav menu ml-auto">
                      <li className="nav-item dropdown submenu active">
                        <Link to="/home" className="nav-link dropdown-toggle">
                          Home 
                        </Link>
                       
                      </li>
                  
                      <li className="nav-item dropdown submenu">
                        <Link
                          className="nav-link dropdown-toggle"
                          to="/all_questions"
                          role="button"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          Forum
                        </Link>
                        <i
                          className="arrow_carrot-down_alt2 mobile_dropdown_icon"
                          aria-hidden="false"
                          data-toggle="dropdown"
                        ></i>
                        <ul className="dropdown-menu">
                          {/* <li className="nav-item">
                            <Link to="/all_questions" className="nav-link">
                              All Questions
                            </Link>
                          </li> */}
                          <li className="nav-item">
                            <Link to="add_question" className="nav-link">
                              Add Question
                            </Link>
                          </li>
                         
                        </ul>
                      </li>
                      <li className="nav-item dropdown submenu">
                      <Link
                      className="nav-link dropdown-toggle"
                      to="/blog"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Blog
                    </Link>
                    <i
                      className="arrow_carrot-down_alt2 mobile_dropdown_icon"
                      aria-hidden="false"
                      data-toggle="dropdown"
                    ></i>
                    <ul className="dropdown-menu">
                      <li className="nav-item">
                        <Link to="/add_blog" className="nav-link">
                          Add Article
                        </Link>
                          </li>
                         
                        </ul>
                      </li>
                      <li className="nav-item dropdown submenu">
                    <Link
                      className="nav-link dropdown-toggle"
                      to="/chat"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Chat
                    </Link>
                    
                    
                  </li>
                  <li className="nav-item dropdown submenu">
                    <Link
                      className="nav-link dropdown-toggle"
                      to="/home_projects"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Task
                    </Link>
                    
                    
                  </li>
                  
                      <li className="nav-item dropdown submenu">
                        <a
                          className="nav-link dropdown-toggle"
                          href="forums.html"
                          role="button"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <img src="/front/img/notif-icon.png" width="30px"/> 
                          
                        </a>
                        <i
                          className="arrow_carrot-down_alt2 mobile_dropdown_icon"
                          aria-hidden="false"
                          data-toggle="dropdown"
                        ></i>
                        <ul className="dropdown-menu">
                          <li className="nav-item">
                            <a href="forums.html" className="nav-link">
                              Forums Root
                            </a>
                          </li>
                          <li className="nav-item">
                            <a href="forum-topics.html" className="nav-link">
                              Forum Topics
                            </a>
                          </li>
                          <li className="nav-item">
                            <a href="forum-single.html" className="nav-link">
                              Topic Details
                            </a>
                          </li>
                          <li className="nav-item">
                            <Link to="/profile" className="nav-link">
                              User Profile
                            </Link>
                          </li>
                        </ul>
                      </li>
                      <li className="nav-item dropdown submenu">
                        <a
                          className="nav-link dropdown-toggle"
                          href="#"
                          role="button"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <img src="/front/img/profil-icon.png" width="30px"/> {connectedUser?.first_name +" "+connectedUser?.last_name}
                        </a>
                        <i
                          className="arrow_carrot-down_alt2 mobile_dropdown_icon"
                          aria-hidden="false"
                          data-toggle="dropdown"
                        ></i>
                        <ul className="dropdown-menu">
                          <li className="nav-item">
                          <Link to="/profile" className="nav-link">
                              User Profile
                            </Link>
                          </li>
                          <li className="nav-item">
                            <a className="nav-link" onClick={logout}>
                              Logout
                            </a>
                          </li>
                          
                        </ul>
                      </li>
                    </ul>
                    {/* <div className="right-nav">
                      <a className="nav_btn" href="#">
                        Free Trail
                      </a>
                    </div> */}
                  </div>
                </div>
            </nav>
            <section className="doc_banner_area single_breadcrumb">
                <ul className="list-unstyled banner_shap_img">
                    <li><img src="img/new/banner_shap1.png" alt=""/></li>
                    <li><img src="img/new/banner_shap4.png" alt=""/></li>
                    <li><img src="img/new/banner_shap3.png" alt=""/></li>
                    <li><img src="img/new/banner_shap2.png" alt=""/></li>
                    <li><img data-parallax='{"x": -180, "y": 80, "rotateY":2000}' src="img/new/plus1.png" alt=""/></li>
                    <li><img data-parallax='{"x": -50, "y": -160, "rotateZ":200}' src="img/new/plus2.png" alt=""/></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
                <div className="container">
                    <div className="doc_banner_content">
                        <h2 className="text-white">{user?.first_name+" "+user?.last_name}</h2>
                        <ul className="nav justify-content-center">
                            <li><a href="#">Home</a></li>
                            <li><a className="active" href="#">Profile Member</a></li>
                        </ul>
                    </div>
                </div>
            </section>
    
            <section className="forum-user-wrapper">
                <div className="container">
                    <div className="row forum_main_inner">
                        <div className="col-lg-3">
                            <div className="author_option">
                            <div className="author_img">
                            <Img
                                className="img-fluid user-img"
                                src={[user?.image_url || '/front/img/forum/user.png']}
                                alt=""
                                loader={<img src="/front/img/forum/loading.gif" alt="loading" />}
                                unloader={<img src="/front/img/forum/error.png" alt="error" />}
                            />
                                
                                
                            </div>
                                <ul className="nav nav-tabs flex-column" id="myTab" role="tablist">
                                    <li className="nav-item" role="presentation" onClick={(e) =>onTab(e,0)}>
                                        <a className={"nav-link " + (tab === 0 ? "active" : "")} id="home-tab" >
                                            <i className="icon_profile"></i> Profile
                                        </a>
                                    </li>
                                    <li className="nav-item" role="presentation" onClick={(e) =>onTab(e,1)}>
                                        <a className={"nav-link " + (tab === 1 ? "active" : "")} id="profile-tab" >
                                            <i className="icon_documents"></i> Questions
                                        </a>
                                    </li>
                                    <li className="nav-item" role="presentation" onClick={(e) =>onTab(e,2)}>
                                        <a className={"nav-link " + (tab === 2 ? "active" : "")} id="contact-tab" >
                                            <i className="icon_chat"></i> Replies Created
                                        </a>
                                    </li>
                                    
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-9">
                            <div className="forum_body_area">
                                <div className="forum_topic_list">
                                    <div className="tab-content" id="myTabContent">
                                        {tab==0 && (
                                        <div className="tab-pane fade show active" id="home">
                                            <div className="profile_info">
                                                <div className="row p_info_item_inner">
                                                    <div className="col-sm-4">
                                                        <div className="p_info_item">
                                                            <img src="img/icon/p-icon-1.png" alt=""/>
                                                            <a href="#">
                                                            <h4>Badge</h4>
                                                        </a>
                                                        <span className="info_btn">{user?.badge}</span>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-4">
                                                        <div className="p_info_item">
                                                            <img src="img/icon/p-icon-2.png" alt=""/>
                                                            <a href="#">
                                                                <h4>Questions</h4>
                                                            </a>
                                                            <span className="info_number" >{questions?.length}</span>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-4">
                                                        <div className="p_info_item">
                                                            <img src="img/icon/p-icon-3.png" alt=""/>
                                                            <a href="#">
                                                                <h4>Replies Created</h4>
                                                            </a>
                                                            <span className="info_number" >{answers?.length}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                               
                                                <ul className="navbar-nav info_list">
                                                    <li><span>First Name:</span><a href="#">{user?.first_name}</a></li>
                                                    <li><span>Last Name:</span><a href="#">{user?.last_name}</a></li>
                                                    <li><span>Email:</span><a href="#">{user?.email}</a></li>
                                                    <li><span>Phone Number:</span><a href="#">{user?.phone}</a></li>
                                                    <li><span>Registered:</span><a href="#">{moment(user?.date_joined).format('MMMM Do YYYY, h:mm  a')}</a></li>
                                                   
                                                
                                                </ul>
                                                <ul className="nav p_social">
                                                    <li><a href="#"><i className="social_facebook"></i></a></li>
                                                    <li><a href="#"><i className="social_twitter"></i></a></li>
                                                    <li><a href="#"><i className="social_pinterest"></i></a></li>
                                                </ul>
                                            </div>
                                        </div>
                                        )}
                                        {tab==1 && (
                                        <div className="tab-pane fade show active" id="profile" >
                                         
                                            <h2>Questions</h2>
                                            <div className="forum_l_inner">
                                                <div className="forum_head d-flex justify-content-between">
                                                    <ul className="nav left">
                                                        <li><i className="icon_error-circle_alt"></i> 576 Open</li>
                                                        <li><a href="#"><i className=" icon_check"></i> 2,974 Closed</a></li>
                                                    </ul>
                                                   
                                                </div>
                                                <div className="forum_body">
                                                    <ul className="navbar-nav topic_list">
                                                        {questions?.map(question=>(
                                                            <li key={question?.id}>
                                                            <div className="media">
                                                                <div className="d-flex">
                                                                    <img className="rounded-circle" src="img/forum/user-1.png"
                                                                        alt=""/>
                                                                </div>
                                                                <div className="media-body">
                                                                    <div className="t_title">
                                                                    <Link to={"/question_details/" + question.id}>
                                                                    <h4>{question.title}</h4>
                                                                    </Link>
                                                                    </div>
                                                                    <a href="#">
                                                                        <h6>{question?.category?.name}</h6>
                                                                    </a>
                                                                    <h6><i className="icon_calendar"></i>  {moment(question?.created_at).fromNow()}
                                                                    </h6>
                                                                </div>
                                                                <div className="media-right">
                                                                    <a className="count " href="#"><i
                                                                            className="icon_chat_alt"></i>{question?.answers_count}</a>
                                                                   
                                                                </div>
                                                            </div>
                                                            </li>
                                                        ))}
                                                      
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="list_pagination d-flex justify-content-between">
                                                <div className="left">
                                                    <p>Viewing 30 topics - 1 through 3 (of {questions?.length} total)</p>
                                                </div>
                                                <div className="right">
                                                    <nav aria-label="Page navigation example">
                                                        <ul className="pagination">
                                                            <li className="page-item active"><a className="page-link" href="#">1</a>
                                                            </li>
                                                            <li className="page-item"><a className="page-link" href="#">2</a>
                                                            </li>
                                                            <li className="page-item"><a className="page-link" href="#">3</a>
                                                            </li>
                                                            <li className="page-item"><a className="page-link" href="#"><i
                                                                        className="arrow_carrot-right"></i></a></li>
                                                        </ul>
                                                    </nav>
                                                </div>
                                            </div>
                                        </div>
                                        )}

                                        {tab==2 && (
                                        <div className="tab-pane fade show active" id="contact" >
                                           
                                            <h2>Replies</h2>
                                            <div className="forum_l_inner comment_l">
                                                <div className="forum_head d-flex justify-content-between">
                                                    <ul className="nav right">
                                                        <li>
                                                            <div className="dropdown list_sirt">
                                                                <button className="btn dropdown-toggle" type="button"
                                                                    id="dropdownMenuButton5" data-toggle="dropdown"
                                                                    aria-haspopup="true" aria-expanded="false">
                                                                    Sort by <i className="arrow_carrot-down"></i>
                                                                </button>
                                                                <div className="dropdown-menu short-by"
                                                                    aria-labelledby="dropdownMenuButton5">
                                                                    <a className="dropdown-item active-short"
                                                                        href="#0">Oldest</a>
                                                                    <a className="dropdown-item" href="#0">Newest</a>
                                                                    <a className="dropdown-item" href="#0">First Comments</a>
                                                                    <a className="dropdown-item" href="#0">New Comments</a>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                    <div className="page">Page 1 of 4</div>
                                                </div>
                                                <div className="forum_body">
                                                    <ul className="navbar-nav topic_comment_list">
                                                        {answers?.map(answer=>(
                                                             <li>
                                                             <div className="media">
                                                                 <div className="d-flex">
                                        <img className="rounded-circle" src={answer?.author_image} alt="author avatar" width="50px" height="50px"/>

                                                                 </div>
                                                                 <div className="media-body">
                                                                     <div className="t_title">
                                                                         
                                                                             <h4>{answer?.author_name}</h4>
                                                                         
                                                                     </div>
                                                                     <div className="dropdown">
                                                                        <p className="accepted-ans-mark" style={{color:'#0abe76'}}>
                                                                            <i className="icon_check"></i> <span>Accepted Solution</span>
                                                                        </p>
                                                                    
                                                                        
                                                                     </div>
                                                                     <a href="#">
                                                                         <h6><i className="icon_check_alt"></i> {user?.badge}</h6>
                                                                     </a>
                                                                     <h6><i className="icon_calendar"></i> {moment(answer?.created_at).format('MMMM Do YYYY, h:mm  a')}
                                                                     </h6>
                                                                     <ReactQuill value={answer?.content}  modules={{
                                                                        toolbar: false
                                                                        }}
                                                                        readOnly={true}
                                                                        style={{ border: 'none' }} /> 
                                                                     <div className="button_list">
                                                                         <Link className="reply_btn" to={"/question_details/" + answer?.question}>See Question</Link>
                                                                     </div>
                                                                 </div>
                                                             </div>
                                                         </li>

                                                        ))}
                                                       
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="list_pagination d-flex justify-content-between">
                                                <div className="left">
                                                    <p>Viewing 30 topics - 1 through 3 (of 45 total)</p>
                                                </div>
                                                <div className="right">
                                                    <nav aria-label="Page navigation example">
                                                        <ul className="pagination">
                                                            <li className="page-item active"><a className="page-link" href="#">1</a>
                                                            </li>
                                                            <li className="page-item"><a className="page-link" href="#">2</a>
                                                            </li>
                                                            <li className="page-item"><a className="page-link" href="#">3</a>
                                                            </li>
                                                            <li className="page-item"><a className="page-link" href="#"><i
                                                                        className="arrow_carrot-right"></i></a></li>
                                                        </ul>
                                                    </nav>
                                                </div>
                                            </div>
                                        </div>
                                        )}


                                       
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
              
            </section>
        </>
  )
}
