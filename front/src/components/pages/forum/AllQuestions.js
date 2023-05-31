import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { getAllQuestions } from '../../../utils/Forum';
import { Link } from 'react-router-dom';
import moment from 'moment';
import {IonIcon} from "react-ion-icon";

export default function AllQuestions() {
  const [questions,setQuestions]=useState();

  useEffect(() => {
    const fetchData = async () => {
      const result = await getAllQuestions();
      console.log("res",result)
      setQuestions(result);
    };
    fetchData();
  }, []);

  const stripHtmlTags = (html) => {
    const tempElement = document.createElement("div");
    tempElement.innerHTML = html;
    return tempElement.textContent || tempElement.innerText || "";
  };

  return (
    <>
        
       
        <section className="forum_sidebar_area" id="sticky_doc">
            <div className="container-fluid pl-60 pr-60">
                <div className="row">
                    <div className="col-xl-2 d-none d-xl-block">
                        <div className="left_side_forum">
                            <aside className="l_widget forum_list">
                                <h3 className="wd_title">Forums</h3>
                                <ul className="navbar-nav">
                                    <li className="active nav-item">
                                        <a href="#"><i className="social_tumbleupon"></i>View all</a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="#"><i className="icon_lightbulb_alt"></i>General</a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="#"><i className="icon_lightbulb_alt"></i>Ideas</a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="#"><i className="fa fa-user-o"></i>User Feedback</a>
                                    </li>
                                </ul>
                            </aside>
                            <aside className="l_widget l_tags_wd">
                                <h3 className="wd_title">Tags</h3>
                                <ul className="list-unstyled w_tag_list style-light">
                                    <li><a href="#">Swagger</a></li>
                                    <li><a href="#">Docy</a></li>
                                    <li><a href="#">weCare</a></li>
                                    <li><a href="#">Business</a></li>
                                    <li><a href="#">Download</a></li>
                                    <li><a href="#">Doc</a></li>
                                    <li><a href="#">Product board</a></li>
                                    <li><a href="#">WordPress</a></li>
                                    <li><a href="#">Design</a></li>
                                    <li><a href="#">ui/ux</a></li>
                                    <li><a href="#">Doc Design</a></li>
                                    <li><a href="#">DocAll</a></li>
                                </ul>
                            </aside>
                            <aside className="l_widget comment_list">
                                <h3 className="wd_title">Recent Topics</h3>
                                <ul className="navbar-nav">
                                    <li>
                                        <div className="media">
                                            <div className="d-flex">
                                                <i className="icon_chat_alt"></i>
                                            </div>
                                            <div className="media-body">
                                                <a href="#">
                                                    <h4>Intégration 300 by</h4>
                                                </a>
                                                <a href="#">
                                                    <h5><img src="img/forum/r-topic-user.png" alt=""/> Jean Conner</h5>
                                                </a>
                                                <p>4 days, 3 hours ago</p>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="media">
                                            <div className="d-flex">
                                                <i className="icon_chat_alt"></i>
                                            </div>
                                            <div className="media-body">
                                                <a href="#">
                                                    <h4>how by</h4>
                                                </a>
                                                <a href="#">
                                                    <h5><img src="img/forum/r-topic-user.png" alt=""/> Lucile Barber</h5>
                                                </a>
                                                <p>1 week ago</p>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="media">
                                            <div className="d-flex">
                                                <i className="icon_chat_alt"></i>
                                            </div>
                                            <div className="media-body">
                                                <a href="#">
                                                    <h4>testing by</h4>
                                                </a>
                                                <a href="#">
                                                    <h5><img src="img/forum/r-topic-user.png" alt=""/> Dwain Cherry</h5>
                                                </a>
                                                <p>3 days, 20 hours ago</p>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="media">
                                            <div className="d-flex">
                                                <i className="icon_chat_alt"></i>
                                            </div>
                                            <div className="media-body">
                                                <a href="#">
                                                    <h4>Title by</h4>
                                                </a>
                                                <a href="#">
                                                    <h5><img src="img/forum/r-topic-user.png" alt=""/> Kati Burch</h5>
                                                </a>
                                                <p>1 month ago</p>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="media">
                                            <div className="d-flex">
                                                <i className="icon_chat_alt"></i>
                                            </div>
                                            <div className="media-body">
                                                <a href="#">
                                                    <h4>Green Planet by</h4>
                                                </a>
                                                <a href="#">
                                                    <h5><img src="img/forum/r-topic-user.png" alt=""/> Morris Ruiz</h5>
                                                </a>
                                                <p>1 week, 2 days ago</p>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </aside>
                        </div>
                    </div>
                    <div className="col-xl-7 col-lg-8">
                        <div className="forum_topic_list_inner">
                            <div className="topics-filter d-xl-none">
                                <ul className="nav">
                                    <li className="nav-item">
                                        <a className="nav-link active" href="#">
                                            <ion-icon name="earth-outline"></ion-icon> View all
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="#" className="nav-link">
                                            <ion-icon name="swap-horizontal-outline"></ion-icon> General
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="#" className="nav-link">
                                            <ion-icon name="bulb-outline"></ion-icon> Ideas
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="#" className="nav-link">
                                            <ion-icon name="bulb-outline"></ion-icon> User Feedback
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div class="answer-action shadow">
                            <div class="action-content">
                                <div class="image-wrap">
                                    <img src="/front/img/home_support/answer.png" alt="answer action/"/>
                                </div>
                                <div class="content">
                                    <h2 class="ans-title">Can’t find an answer?</h2>
                                    <p> Make use of a qualified tutor to get the answer </p>
                                </div>
                            </div>
                           
                            <div class="action-button-container">
                            <Link className="action_btn btn-ans" to="/add_question">Ask a Question</Link>
                            </div>
                            
                        </div>
                            <div className="forum_l_inner">
                                <div className="forum_head d-flex justify-content-between">
                                    <ul className="nav left">
                                        <li><i className="icon_error-circle_alt"></i> 15 Open</li>
                                        <li><a href="#"><i className=" icon_check"></i> 202 Closed</a></li>
                                        <li><a href="#"><i className="icon_refresh"></i> Reset</a></li>
                                    </ul>
                                    <ul className="nav right">
                                     
                                       
                                        <li>
                                            <div className="dropdown right_dir">
                                                <button className="btn dropdown-toggle" type="button" data-toggle="dropdown"
                                                    aria-haspopup="true" aria-expanded="false">
                                                    Sort <i className="arrow_carrot-down"></i>
                                                </button>
                                                <div className="dropdown-menu">
                                                    <h3 className="title">Filter by author</h3>
                                                    <form action="#" className="cate-search-form">
                                                        <input type="text" placeholder="Search Users"/>
                                                    </form>
                                                    <div className="all_users short-by scroll">
                                                        <a className="dropdown-item active-short" href="#">
                                                            <ion-icon name="checkmark-outline"></ion-icon> Newest
                                                        </a>
                                                        <a className="dropdown-item" href="#"> Oldest </a>
                                                        <a className="dropdown-item" href="#"> Most commented </a>
                                                        <a className="dropdown-item" href="#"> Least commented </a>
                                                        <a className="dropdown-item" href="#"> Recently updated </a>
                                                        <a className="dropdown-item" href="#"> Recently updated </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                               
                                <div className="forum_body">
                                    
                                    <ul className="navbar-nav topic_list">
                                        {questions?.map(question=>(
                                             <li key={question.id}>
                                             <div className="media">
                                                 <div className="d-flex">
                                                     <img className="rounded-circle" src="img/forum/f-user-1.png" alt=""/>
                                                 </div>
                                                 <div className="media-body">
                                                     <div className="t_title">
                                                         <Link to={"/question_details/" + question?.id}>
                                                             <h4>{question?.title}</h4>
                                                         </Link>
                        <p>{stripHtmlTags(question?.content).substring(0, 100)}{stripHtmlTags(question?.content).length > 100 ? "..." : ""}</p>

                                                     </div>
                                                     <a href="#">
                                                         <h6><img src="img/svg/hashtag.svg" alt=""/> {question?.category?.name}
                                                         </h6>
                                                     </a>
                                                     <h6 className='mr-5'><i className="icon_clock_alt"></i> {moment(question?.created_at).fromNow()}
                                                     </h6>
                                                     <Link className="count ml-5" to={"/user_profile/" + question?.author_id} style={{color: '#838793'}}><IonIcon name="person-circle-outline"/> {question?.author_name}</Link>
                                                     <span className="count ml-3"  ><ion-icon name="chatbubbles-outline"></ion-icon> {question?.answers_count}</span>
                                                     <span className="count ml-3" ><ion-icon name="eye-outline"></ion-icon> {question?.views_number}</span>
                                                 </div>
                                                 <div className="media-right">
                                                    
                                                   
                                                 </div>
                                             </div>
                                         </li>

                                        ))}
                                       
                                    </ul>
                                </div>
                            </div>
                            <div className="row pagination_inner">
                                <div className="col-lg-2">
                                    <h6>Total: <span> {questions?.length} </span></h6>
                                </div>
                                <div className="col-lg-8">
                                    <nav aria-label="Page navigation example">
                                        <ul className="pagination justify-content-center">
                                            <li className="page-item"><a className="page-link" href="#"><i
                                                        className="arrow_carrot-left"></i> Previous</a></li>
                                            <li className="page-item active"><a className="page-link" href="#">1</a></li>
                                            <li className="page-item"><a className="page-link" href="#">2</a></li>
                                            <li className="page-item"><a className="page-link" href="#">3</a></li>
                                            <li className="page-item"><a className="page-link" href="#">...</a></li>
                                            <li className="page-item"><a className="page-link" href="#">21</a></li>
                                            <li className="page-item"><a className="page-link" href="#">Next <i
                                                        className="arrow_carrot-right"></i></a></li>
                                        </ul>
                                    </nav>
                                </div>
                                <div className="col-lg-2">
                                    <div className="input-group go_btn">
                                        <input type="number" className="form-control" aria-label="Recipient's username"/>
                                        <div className="input-group-append">
                                            <button className="btn btn-outline-secondary" type="button">Go</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-4">
                        <div className="right_side_forum">
                            {/* <aside className="r_widget qustion_wd">
                            <Link className="btn" to="/add_question"><img src="img/forum/helpful-user/question-1.png"
                                        alt=""/>Ask Question <i className="arrow_carrot-right"></i></Link>
                            </aside> */}
                            <aside className="r_widget user_list_wd">
                                <div className="r_heading d-flex justify-content-between">
                                    <h3>Most Helpful</h3>
                                    <h5>Last 30 days</h5>
                                </div>
                                <ul className="navbar-nav">
                                    <li>
                                        <a href="#">
                                            <div className="media">
                                                <div className="d-flex">
                                                    <img className="rounded-circle"
                                                        src="img/forum/helpful-user/h-user-1.png" alt=""/>
                                                </div>
                                                <div className="media-body">
                                                    <h4>cleo-parra</h4>
                                                </div>
                                                <div className="media-right">
                                                    <div className="count">
                                                        10
                                                    </div>
                                                    <i className="icon_check_alt"></i>
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <div className="media">
                                                <div className="d-flex">
                                                    <img className="rounded-circle"
                                                        src="img/forum/helpful-user/h-user-2.png" alt=""/>
                                                </div>
                                                <div className="media-body">
                                                    <h4>roy_marin</h4>
                                                </div>
                                                <div className="media-right">
                                                    <div className="count">
                                                        08
                                                    </div>
                                                    <i className="icon_check_alt"></i>
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <div className="media">
                                                <div className="d-flex">
                                                    <img className="rounded-circle"
                                                        src="img/forum/helpful-user/h-user-3.png" alt=""/>
                                                </div>
                                                <div className="media-body">
                                                    <h4>hellen.austin</h4>
                                                </div>
                                                <div className="media-right">
                                                    <div className="count">
                                                        05
                                                    </div>
                                                    <i className="icon_check_alt"></i>
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <div className="media">
                                                <div className="d-flex">
                                                    <img className="rounded-circle"
                                                        src="img/forum/helpful-user/h-user-4.png" alt=""/>
                                                </div>
                                                <div className="media-body">
                                                    <h4>erna.may</h4>
                                                </div>
                                                <div className="media-right">
                                                    <div className="count">
                                                        03
                                                    </div>
                                                    <i className="icon_check_alt"></i>
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <div className="media">
                                                <div className="d-flex">
                                                    <img className="rounded-circle"
                                                        src="img/forum/helpful-user/h-user-5.png" alt=""/>
                                                </div>
                                                <div className="media-body">
                                                    <h4>jacobson</h4>
                                                </div>
                                                <div className="media-right">
                                                    <div className="count">
                                                        02
                                                    </div>
                                                    <i className="icon_check_alt"></i>
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <div className="media">
                                                <div className="d-flex">
                                                    <img className="rounded-circle"
                                                        src="img/forum/helpful-user/h-user-6.png" alt=""/>
                                                </div>
                                                <div className="media-body">
                                                    <h4>van.mays</h4>
                                                </div>
                                                <div className="media-right">
                                                    <div className="count">
                                                        01
                                                    </div>
                                                    <i className="icon_check_alt"></i>
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <div className="media">
                                                <div className="d-flex">
                                                    <img className="rounded-circle"
                                                        src="img/forum/helpful-user/h-user-7.png" alt=""/>
                                                </div>
                                                <div className="media-body">
                                                    <h4>steve_barr</h4>
                                                </div>
                                                <div className="media-right">
                                                    <div className="count">
                                                        01
                                                    </div>
                                                    <i className="icon_check_alt"></i>
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                </ul>
                            </aside>
                            <aside className="r_widget question_list_wd">
                                <div className="r_heading d-flex justify-content-between">
                                    <h3>Top</h3>
                                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                                        <li className="nav-item" role="presentation">
                                            <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home"
                                                role="tab" aria-controls="home" aria-selected="true">7 days</a>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile"
                                                role="tab" aria-controls="profile" aria-selected="false">30 days</a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="tab-content" id="myTabContent">
                                    <div className="tab-pane fade show active" id="home" role="tabpanel"
                                        aria-labelledby="home-tab">
                                        <ul className="navbar-nav">
                                            <li><a href="#"><span>01</span>Example of NearBy Place Search - SITE KIT</a>
                                            </li>
                                            <li><a href="#"><span>02</span>Example of Direction Steps - MAP KIT</a></li>
                                            <li><a href="#"><span>03</span>Introduction to AppGallery Connect Crash
                                                    Service</a>
                                            </li>
                                            <li><a href="#"><span>04</span>Bank Card Recognition and Payment Screen - ML
                                                    KIT</a>
                                            </li>
                                            <li><a href="#"><span>05</span>Example of Direction Steps - MAP KIT</a></li>
                                            <li><a href="#"><span>06</span>Example of NearBy Place Search - SITE KIT</a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="tab-pane fade" id="profile" role="tabpanel"
                                        aria-labelledby="profile-tab">
                                        <ul className="navbar-nav">
                                            <li><a href="#"><span>01</span>Example of NearBy Place Search - SITE KIT</a>
                                            </li>
                                            <li><a href="#"><span>02</span>Example of Direction Steps - MAP KIT</a></li>
                                            <li><a href="#"><span>03</span>Introduction to AppGallery Connect Crash
                                                    Service</a>
                                            </li>
                                            <li><a href="#"><span>04</span>Bank Card Recognition and Payment Screen - ML
                                                    KIT</a>
                                            </li>
                                            <li><a href="#"><span>05</span>Example of Direction Steps - MAP KIT</a></li>
                                            <li><a href="#"><span>06</span>Example of NearBy Place Search - SITE KIT</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </aside>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        
    </>
  )
}
