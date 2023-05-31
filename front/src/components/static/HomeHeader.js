import React, { useEffect, useState } from 'react'
import { getCurrentUser } from '../../utils/user.auth.service';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';

export default function HomeHeader() {
    const [user, setUser] = useState('');
    const [navigate, setNavigate] = useState();
    const [searchQuery, setSearchQuery] = useState("");
    const navigateSearch = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
          try {
            const user = await getCurrentUser();
            setUser(user);
            }catch (error) {
            console.log(error)
          }
        };
        fetchData();
      }, []);

      const logout = async () => {
        await axios.post('http://localhost:8002/api/logout', {}, {withCredentials: true});
        localStorage.removeItem("user")
        setNavigate(true);
    }

    if (navigate) {
        return <Navigate to="/login"/>;
    }

    
    /*****************Search ****************************** */

    const handleSearch = (e) => {
      e.preventDefault();
      navigateSearch(`/search?query=${searchQuery}`);
      setSearchQuery("");
    };

  return (
    <>
      <nav className="navbar navbar-expand-lg menu_one menu_purple sticky-nav navbar_fixed gap fadeInDown">
            <div className="container">
              <a className="navbar-brand header_logo" href="index.html">
                <img
                  className="first_logo sticky_logo"
                  src="/front/img/Capgemini-Logo.png"
                  width="200px"
                  alt="logo"
                />
                <img
                  className="white_logo main_logo"
                  src="/front/img/logo-w.png"
                  srcSet="/front/img/logo-w2x.png 2x"
                  alt="logo"
                />
              </a>
              <button
                className="navbar-toggler collapsed"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
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
                        <Link to="/add_question" className="nav-link">
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
    
          <section className="doc_banner_area banner_creative1">
            <ul className="list-unstyled banner_shap_img">
              <li>
                <img src="/front/img/new/banner_shap1.png" alt="" />
              </li>
              {/* <li><img src="/front/img/new/banner_shap4.png" alt=""/></li> */}
              {/* <li><img src="/front/img/new/banner_shap3.png" alt=""/></li> */}
              {/* <li><img src="/front/img/new/banner_shap2.png" alt=""/></li> */}
              <li>
                <img
                  data-parallax='{"x": -180, "y": 80, "rotateY":2000}'
                  src="/front/img/new/plus1.png"
                  alt=""
                />
              </li>
              <li>
                <img
                  data-parallax='{"x": -50, "y": -160, "rotateZ":200}'
                  src="/front/img/new/plus2.png"
                  alt=""
                />
              </li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
            <div className="container">
              <div className="doc_banner_content">
                <h2 className="wow fadeInUp">How can we help you?</h2>
                <p className="wow fadeInUp" data-wow-delay="0.2s">
                  Search here to get answers to your questions
                </p>
                <form  className="header_search_form" onSubmit={handleSearch}>
                  <div className="header_search_form_info">
                    <div className="form-group">
                      <div className="input-wrapper">
                        <i className="icon_search"></i>
                        <input type='search' id="searchbox" autoComplete="off" name="search"
                                           placeholder="Search for Topics...."  onChange={(e) => setSearchQuery(e.target.value)}/>
                      
                      </div>
                      <button type="submit" className="header_form_submit">
                        Search
                      </button>
                    </div>
                  </div>
                  <div className="header_search_keyword">
                    <span className="header-search-form__keywords-label">
                      Suggested Search:
                    </span>
                    <ul className="list-unstyled">
                      <li className="wow fadeInUp" data-wow-delay="0.2s">
                        <a href="#">guest users</a>
                      </li>
                      <li className="wow fadeInUp" data-wow-delay="0.3s">
                        <a href="#">invoice</a>
                      </li>
                      <li className="wow fadeInUp" data-wow-delay="0.4s">
                        <a href="#">security</a>
                      </li>
                    </ul>
                  </div>
                </form>
              </div>
            </div>
          </section>
    
          <section className="doc_features_area">
            <img
              className="doc_features_shap"
              src="/front/img/new/shap_white.png"
              alt=""
            />
            <div className="container">
              <div className="doc_features_inner">
                <div
                  className="media doc_features_item wow fadeInUp"
                  data-wow-delay="0.1s"
                  data-wow-duration="0.5s"
                >
                  <img src="/front/img/new/icon1.png" alt="" />
                  <div className="media-body">
                    <a href="#">
                      <h4>Knowledge Base</h4>
                    </a>
                    <p>245 Posts</p>
                  </div>
                </div>
                <div
                  className="media doc_features_item wow fadeInUp"
                  data-wow-delay="0.2s"
                  data-wow-duration="0.6s"
                >
                  <img src="/front/img/new/icon2.png" alt="" />
                  <div className="media-body">
                    <a href="#">
                      <h4>Community Forums</h4>
                    </a>
                    <p>245 Posts</p>
                  </div>
                </div>
                <div
                  className="media doc_features_item wow fadeInUp"
                  data-wow-delay="0.3s"
                  data-wow-duration="0.7s"
                >
                  <img src="/front/img/new/icon3.png" alt="" />
                  <div className="media-body">
                    <a href="#">
                      <h4>Documentation</h4>
                    </a>
                    <p>245 Posts</p>
                  </div>
                </div>
                <div
                  className="media doc_features_item wow fadeInUp"
                  data-wow-delay="0.4s"
                  data-wow-duration="0.8s"
                >
                  <img src="/front/img/new/icon4.png" alt="" />
                  <div className="media-body">
                    <a href="#">
                      <h4>Working with Docs</h4>
                    </a>
                    <p>245 Posts</p>
                  </div>
                </div>
                <div
                  className="media doc_features_item wow fadeInUp"
                  data-wow-delay="0.5s"
                  data-wow-duration="0.9s"
                >
                  <img src="/front/img/new/icon5.png" alt="" />
                  <div className="media-body">
                    <a href="#">
                      <h4>Getting Started</h4>
                    </a>
                    <p>245 Posts</p>
                  </div>
                </div>
                <div
                  className="media doc_features_item wow fadeInUp"
                  data-wow-delay="0.5s"
                  data-wow-duration="1s"
                >
                  <img src="/front/img/new/icon6.png" alt="" />
                  <div className="media-body">
                    <a href="#">
                      <h4>Account Management</h4>
                    </a>
                    <p>245 Posts</p>
                  </div>
                </div>
                <div
                  className="media doc_features_item wow fadeInUp"
                  data-wow-delay="0.5s"
                  data-wow-duration="0.7s"
                >
                  <img src="/front/img/new/icon7.png" alt="" />
                  <div className="media-body">
                    <a href="#">
                      <h4>Productivity</h4>
                    </a>
                    <p>245 Posts</p>
                  </div>
                </div>
                <div
                  className="media doc_features_item wow fadeInUp"
                  data-wow-delay="0.5s"
                  data-wow-duration="0.8s"
                >
                  <img src="/front/img/new/icon8.png" alt="" />
                  <div className="media-body">
                    <a href="#">
                      <h4>Docs in Help Scout</h4>
                    </a>
                    <p>245 Posts</p>
                  </div>
                </div>
                <div
                  className="media doc_features_item wow fadeInUp"
                  data-wow-delay="0.5s"
                  data-wow-duration="0.9s"
                >
                  <img src="/front/img/new/icon9.png" alt="" />
                  <div className="media-body">
                    <a href="#">
                      <h4>Formatting Content</h4>
                    </a>
                    <p>245 Posts</p>
                  </div>
                </div>
                <div className="see_more_item collapse-wrap">
                  <div className="media doc_features_item">
                    <img src="/front/img/new/icon7.png" alt="" />
                    <div className="media-body">
                      <a href="#">
                        <h4>Productivity</h4>
                      </a>
                      <p>245 Posts</p>
                    </div>
                  </div>
                  <div className="media doc_features_item">
                    <img src="/front/img/new/icon8.png" alt="" />
                    <div className="media-body">
                      <a href="#">
                        <h4>Docs in Help Scout</h4>
                      </a>
                      <p>245 Posts</p>
                    </div>
                  </div>
                  <div className="media doc_features_item">
                    <img src="/front/img/new/icon9.png" alt="" />
                    <div className="media-body">
                      <a href="#">
                        <h4>Formatting Content</h4>
                      </a>
                      <p>245 Posts</p>
                    </div>
                  </div>
                </div>
                <a href="#more-features" className="collapse-btn see_btn">
                  <i className="arrow_carrot-down_alt2"></i>
                  <span className="text">Show More</span>
                </a>
              </div>
            </div>
          </section>
    </>
  )
}
