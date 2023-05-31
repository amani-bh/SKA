import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom'
import { getAllArticles } from '../../../utils/Forum';
import moment from 'moment';

export default function BlogList() {
  const [articles,setArticles]=useState();

  useEffect(() => {
    const fetchData = async () => {
      const result = await getAllArticles();
      console.log(result)
      setArticles(result);
    };
    fetchData();
  }, []);

  const stripHtmlTags = (html) => {
    const tempElement = document.createElement("div");
    tempElement.innerHTML = html;
    return tempElement.textContent || tempElement.innerText || "";
  };
  

  return (
    <section className="doc_blog_classic_area sec_pad">
    <div className="container">
        <div className="row">
            <div className="col-lg-8">
            {articles?.map(article=>(
                <div className="blog_top_post shadow-sm blog_classic_item" key={article?.id}>
                    <img src="img/blog-classic/classic_01.jpg" alt=""/>
                    <div className="b_top_post_content">
                        <div className="post_tag">
                            <a href="#">{moment(article?.created_at).fromNow()}</a>
                            <a href="#"><ion-icon name="chatbubbles-outline"></ion-icon> {article?.comments_count}</a>
                            {article?.tags?.map(tag=>(
                        <a className="orange" href="#" key={tag?.id}>{tag?.name}</a>

                        ))}
                           
                        </div>
                        <Link to={"/blog_details/"+article?.id}>
                            <h3>{article?.title}</h3>
                        </Link>
                        <p>{stripHtmlTags(article?.content).substring(0, 100)}{stripHtmlTags(article?.content).length > 100 ? "..." : ""}</p>
                        <div className="d-flex justify-content-between p_bottom">
                            <Link to={"/blog_details/"+article?.id} className="learn_btn">Continue Reading<i className="arrow_right"></i></Link>
                            <div className="media post_author">
                                <div className="round_img">
                                    <img src={article?.author_image} alt="" />
                                </div>
                                <div className="media-body author_text">
                                    <a href="#">
                                        <h4>{article?.author_name}</h4>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
                <nav className="navigation pagination">
                    <div className="nav-links">
                        <span aria-current="page" className="page-numbers current">1</span>
                        <a className="page-numbers" href="#">2</a>
                        <a className="next page-numbers" href="#"><i className="arrow_carrot-right"></i></a>
                    </div>
                </nav>
            </div>
            <div className="col-lg-4">
                <div className="blog_sidebar pl-40">
                    <div className="widget about_widget">
                        <div className="action-button-container ">
                            <Link className="action_btn btn-ans" to="/add_blog">Add Article</Link>
                            </div>
                        <div className="text">
                            <a href="#">
                                <h3>Rodney Artichoke</h3>
                            </a>
                            <p>James Bond jolly good happy days smashing barney bonnet bits and bobs loo.!</p>
                        </div>
                    </div>
                    <div className="widget categorie_widget">
                        <h4 className="c_head">Post Categories</h4>
                        <ul className="list-unstyled categorie_list">
                            <li><a href="#">Creative <span>(12)</span></a></li>
                            <li><a href="#">Inspiration <span>(8)</span></a></li>
                            <li><a href="#">Lifestyle <span>(3)</span></a></li>
                            <li><a href="#">News <span>(4)</span></a></li>
                            <li><a href="#">Photography <span>(12)</span></a></li>
                            <li><a href="#">Skill <span>(15)</span></a></li>
                            <li><a href="#">Tourist Tours <span>(10)</span></a></li>
                            <li><a href="#">Inspire <span>(5)</span></a></li>
                        </ul>
                    </div>
                    <div className="widget recent_news_widget">
                        <h4 className="c_head">Reacent News</h4>
                        <div className="media recent_post_item">
                            <img src="img/blog-single/news_01.jpg" alt=""/>
                            <div className="media-body">
                                <a href="#">
                                    <h5>Is It Worth Buying A Premium Form Builder.</h5>
                                </a>
                                <div className="entry_post_date">January 14, 2020</div>
                            </div>
                        </div>
                        <div className="media recent_post_item">
                            <img src="img/blog-single/news_02.jpg" alt=""/>
                            <div className="media-body">
                                <a href="#">
                                    <h5>10 Classic Summer Vacations</h5>
                                </a>
                                <div className="entry_post_date">April 16, 2020</div>
                            </div>
                        </div>
                        <div className="media recent_post_item">
                            <img src="img/blog-single/news_03.jpg" alt=""/>
                            <div className="media-body">
                                <a href="#">
                                    <h5>How To Easily Add weForms Widget Using Elementor</h5>
                                </a>
                                <div className="entry_post_date">March 10, 2020</div>
                            </div>
                        </div>
                        <div className="media recent_post_item">
                            <img src="img/blog-single/news_04.jpg" alt=""/>
                            <div className="media-body">
                                <a href="#">
                                    <h5>How to Create GDPR Consent Form In WordPress</h5>
                                </a>
                                <div className="entry_post_date">January 19, 2020</div>
                            </div>
                        </div>
                    </div>
                    <div className="widget comments_widget">
                        <h4 className="c_head">Recent Comments</h4>
                        <ul className="list-unstyled recent_comments">
                            <li>
                                <h6><i className="icon_chat_alt"></i>Douglas Lyphe:</h6>
                                <a href="#" className="text">
                                    French squiffy pukka gosh nancy boy buggered, bog-standard.!
                                </a>
                            </li>
                            <li>
                                <h6><i className="icon_chat_alt"></i>Hilary Ouse:</h6>
                                <a href="#" className="text">
                                    Charles give us a bell butty blatant baking cakes cheesed off.
                                </a>
                            </li>
                            <li>
                                <h6><i className="icon_chat_alt"></i>Penny Tool:</h6>
                                <a href="#" className="text">
                                    Starkers happy days bobby pardon me.
                                </a>
                            </li>
                            <li>
                                <h6><i className="icon_chat_alt"></i>Jackson Pot:</h6>
                                <a href="#" className="text">
                                    Charles give us a bell butty blatant baking cakes cheesed off.
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="widget tag_widget">
                        <h4 className="c_head">Tags</h4>
                        <ul className="list-unstyled w_tag_list">
                            <li><a href="#">Design</a></li>
                            <li><a href="#">Apps</a></li>
                            <li><a href="#">Photography</a></li>
                            <li><a href="#">Business</a></li>
                            <li><a href="#">Docy</a></li>
                            <li><a href="#">WordPress</a></li>
                            <li><a href="#">Design</a></li>
                            <li><a href="#">DocAll</a></li>
                            <li><a href="#">Magento</a></li>
                            <li><a href="#">Doc Design</a></li>
                            <li><a href="#">ui/ux</a></li>
                            <li><a href="#">Docs</a></li>
                        </ul>
                    </div>
                   
                </div>
            </div>
        </div>
    </div>
</section>


  )
}
