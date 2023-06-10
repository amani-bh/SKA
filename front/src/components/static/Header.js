import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../../utils/user.auth.service';

export default function Header() {
    const [user, setUser] = useState();
    const [navigate, setNavigate] = useState(false);
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
    <div>
    <nav className="navbar navbar-expand-lg menu_one dark_menu sticky-nav">
    <div className="container                                                                                                                                      ">
        <a className="navbar-brand header_logo" href="index.html">
            <img className="first_logo sticky_logo main_logo" src="/front/img/Capgemini-Logo.png" width="200px" alt="logo"/>
            <img className="white_logo" src="/front/img/logo-w.png" srcSet="/front/img/logo-w2x.png 2x" alt="logo"/>
        </a>
        <div className="search-input">
            <ion-icon className="search-icon" name="search-outline"></ion-icon>
            <input type="text" placeholder="Search..." value="" className=""/>
        </div>
        <div className="mobile-dark-mode d-lg-none">
            <label htmlFor="something" className="tab-btn tab-btns">
                <ion-icon className="light-mode" name="contrast"></ion-icon>
            </label>
            <label htmlFor="something" className="tab-btn">
                <ion-icon className="dark-mode" name="contrast-outline"></ion-icon>
            </label>
        </div>
        <button className="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
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
                      <img src="/front/img/notif-icon.png" width="30px" alt=""/> 
                      
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
<section className="doc_banner_area search-banner-light">
            <div className="container">
                <div className="doc_banner_content">
                    <form className="header_search_form" onSubmit={handleSearch}>
                        <div className="header_search_form_info">
                            <div className="form-group">
                                <div className="input-wrapper">
                                    <i className="icon_search"></i>
                                    <input type='search' id="searchbox" autoComplete="off" name="search"
                                           placeholder="Search for Topics...."  onChange={(e) => setSearchQuery(e.target.value)}/>
                                   
                                </div>
                            </div>
                        </div>
                        <div className="header_search_keyword">
                            <span className="header-search-form__keywords-label">Popular Searches:</span>
                            <ul className="list-unstyled">
                                <li className="wow fadeInUp" data-wow-delay="0.2s"><a href="#">Docy Documentation</a>,</li>
                                <li className="wow fadeInUp" data-wow-delay="0.3s"><a href="#">Tabs Widget</a>,</li>
                                <li className="wow fadeInUp" data-wow-delay="0.4s"><a href="#">Process Tab</a></li>
                            </ul>
                        </div>
                    </form>
                </div>
            </div>
        </section>
</div>
  )
}
