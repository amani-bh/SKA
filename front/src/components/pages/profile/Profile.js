import axios from 'axios';
import moment from 'moment/moment';
import React, { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import {storage} from "../../../utils/firebase"
import { getCurrentUser, updatePassword, updateProfile, uploadImage } from '../../../utils/user.auth.service';
import Popup from 'reactjs-popup';
import { Img } from 'react-image'
import Modal from 'react-modal';
import { IonIcon } from 'react-ion-icon';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAnswersByUser, getQuestionsByUser } from '../../../utils/Forum';
import ReactQuill from 'react-quill';



export default function Profile() {
    const [user, setUser] = useState('');
    const [navigate, setNavigate] = useState(false);
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [modalIsOpen, setIsOpen] = useState(false);
    const [password, setPassword] = useState('');
    const [updated, setUpdated] = useState(false);
    const [questions,setQuestions]=useState();
    const [answers,setAnswers]=useState();
    const [tab,setTab]=useState(0);



    useEffect(() => {
        const fetchData = async () => {
          try {
            const user = await getCurrentUser();
            setUser(user);
            const resultQuestion = await getQuestionsByUser(user?.id);
            setQuestions(resultQuestion);
            const result = await getAnswersByUser(user?.id);
            setAnswers(result);
            }catch (error) {
            console.log(error)
          }
        };
        fetchData();
      }, []);

    //   useEffect(() => {
    //     const fetchData = async () => {
    //       const result = await getQuestionsByUser(user?.id);
    //       console.log("res",result)
    //       setQuestions(result);
    //     };
    //     fetchData();
    //   }, []);


    //   useEffect(() => {
    //     const fetchData = async () => {
    //       const result = await getAnswersByUser(user?.id);
    //       console.log("ans",result)
    //       setAnswers(result);
    //     };
    //     fetchData();
    //   }, []);

      const logout = async () => {
        await axios.post('http://localhost:8002/api/logout', {}, {withCredentials: true});
        localStorage.removeItem("user")
        setNavigate(true);
    }


    const handleImageChange = (e) => {
        if (e.target.files[0]) {
          setImage(e.target.files[0]);
        }
      };
    
      const handleImageUpload = () => {
        const storageRef = storage.ref(`images/${image.name}`);
        storageRef.put(image).then(() => {
          storageRef.getDownloadURL().then((url) => {
            setImageUrl(url);
            uploadImage(url,user?.id).then(u=>{
             localStorage.setItem("user",JSON.stringify(u))
             setUser(u)
            toast.success("Image updated successfully!");


            })
          });
        });
      };

      
    if (navigate) {
        return <Navigate to="/login"/>;
    }
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

      function openModal() {
        setIsOpen(true);
      }
    
      function closeModal() {
        setIsOpen(false);
      }

      const submit = async e => {
        e.preventDefault();
        const res=await updateProfile(user.first_name,user.last_name,user.email,user.phone,user?.id).then(u=>{
        localStorage.setItem("user",JSON.stringify(u))
        setUser(u)
        closeModal()
        toast.success("Profile updated successfully!");


        })

    }

    const submitPassword = async e => {
        e.preventDefault();
        updatePassword(password,user?.id).then(u=>{
            console.log("updated")
            setUpdated(true)
            toast.success("Password updated successfully!");


        })

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
                      <img src="/front/img/profil-icon.png" width="30px"/> {user?.first_name +" "+user?.last_name}
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
                             <Popup trigger={ <img className="img-fluid upload-img" src="/front/img/forum/upload2.jpg" alt="upload image"/>} position="right center">
                            <div className='col-12'>
                                <input className='mt-3 form-control' type="file" onChange={handleImageChange} />
                                <button className=" mt-4 btn action_btn thm_btn" onClick={handleImageUpload}>Upload</button>
                                {imageUrl && <img src={imageUrl} alt="Uploaded" />}
                            </div>
                            </Popup>
                            
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
                                    <div className="tab-pane fade show active" id="home" role="tabpanel"
                                        aria-labelledby="home-tab">
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
                                                            <a className="info_number" href="#">{questions?.length}</a>
                                                        </div>
                                                </div>
                                                <div className="col-sm-4">
                                                <div className="p_info_item">
                                                            <img src="img/icon/p-icon-3.png" alt=""/>
                                                            <a href="#">
                                                                <h4>Replies Created</h4>
                                                            </a>
                                                            <a className="info_number" href="#">{answers?.length}</a>
                                                        </div>
                                                </div>
                                            </div>
                                            <div className="right-nav mt-3">
                                               
                                    <span className='update-profile' onClick={openModal}><IonIcon name="create-outline" /> </span>
                                                   
                                               
                                                     <Modal
                                                        isOpen={modalIsOpen}
                                                        onRequestClose={closeModal}
                                                        style={customStyles}
                                                        contentLabel="update profile"
                                                    >
                                                        <h4 >Update your profile</h4>
                                                      
                                                        
                       <form  className="p-3" onSubmit={submit}>
                        <div className="col-lg-12 form-group">
                            <div className="small_text">First Name</div>
                                <input type="text" className="form-control" id="name" value={user?.first_name} onChange={e => setUser({ ...user, first_name: e.target.value })} />
                        </div>

                            <div className="col-lg-12 form-group">
                                <div className="small_text">Last Name</div>
                                <input type="text" className="form-control"  value={user?.last_name} onChange={e => setUser({ ...user, last_name: e.target.value })} />
                            </div>

                            <div className="col-lg-12 form-group">
                                <div className="small_text">Your email</div>
                                <input type="email" className="form-control" id="email" value={user?.email} onChange={e => setUser({ ...user, email: e.target.value })}/>
                            </div>
        
                            <div className="col-lg-12 form-group">
                                <div className="small_text">Your Phone</div>
                                <input type="text" className="form-control" id="phone" value={user?.phone} 
                                onChange={e => setUser({ ...user, phone: e.target.value })}/>
                            </div>

                                                        <div className="col-lg-12 text-center">
                                                            <button type="submit" className="btn action_btn thm_btn">
                                                                Save
                                                            </button>
                                                            <button className="ml-5 btn thm_btn" onClick={closeModal}>close</button>
                                                            </div>
                                                        </form>
                                                    </Modal>
                                            </div> 
                                            <ul className="navbar-nav info_list">
                                                <li><span>First Name:</span><a href="#">{user?.first_name}</a></li>
                                                <li><span>Last Name:</span><a href="#">{user?.last_name}</a></li>
                                                <li><span>Email:</span><a href="#">{user?.email}</a></li>
                                                <li><span>Phone Number:</span><a href="#">{user?.phone}</a></li>
                                                <li><span>Registered:</span><a href="#">{moment(user?.date_joined).format('MMMM Do YYYY, h:mm  a')}</a></li>
                                                <li><span>Update Password:</span>
                                                
                                <div className="small_text mt-5">New Password</div>
                                <input type="password" className="form-control col-3" id="pass" 
                                onChange={e => setPassword(e.target.value)}/>
                          
                            <button type="submit" className="btn action_btn thm_btn mt-3" onClick={submitPassword}>
                               Update </button>
                               {updated && (<diV className="mt-2">  Password updated</diV>)}
                              
                                                </li>
                                            
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
    </>
  )
}
