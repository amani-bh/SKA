import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getCurrentUser } from '../../../utils/user.auth.service';
import { addCommentArticle, deleteArticleById, getArticleById } from '../../../utils/Forum';
import ReactQuill from 'react-quill';
import moment from 'moment';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IonIcon } from 'react-ion-icon';

export default function BlogDetails() {
  let { id } = useParams();
  const user = getCurrentUser();
  const [article,setArticle]=useState();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } ,reset } = useForm();


  useEffect(() => {
    const fetchData = async () => {
      const result = await getArticleById(id);
      setArticle(result);
      console.log(result)

    };
    fetchData();
  }, []);

  const onSubmitComment = async (e) => {
   
      const comment = {
        content: e.content,
        author_id:user?.id,
        author_name:user?.first_name+" "+user?.last_name,
        author_image:user?.image_url,
        article: article?.id,
      };
      const result = await addCommentArticle(comment).then((comm) => {
        if (comm !== undefined) {
            const updatedComments = [...article.comments, comm];
            setArticle({
                ...article,
                comments: updatedComments,
              });
          toast.success("Comment added successfully!");
          reset();
        } else {
            toast.error("Error !!!");

         }
      });
   
  };

  
const deleteArticle= async () => {
    const result = await deleteArticleById(id)
    if(result!=undefined){
             
      toast.success("Article deleted successfully!");
      await new Promise(resolve => setTimeout(resolve, 4000)); 
      navigate("/blog")
  }
  else {
      toast.error("Error !!!");
  
  }
  }

  return (
    <div>
       
        <section className="blog_area mb-5">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8">
                   
                    <section className="breadcrumb_area_three">
            <div className="container">
                <div className="breadcrumb_content">
                    <div className='row ml-5 mb-3'>
                   <div className='col-7'>

                   </div>
                                       

                        {(user?.id==article?.author_id && article?.comments?.length==0) && (
                                                <div className="author-badge ml-5 mr-3" style={{ cursor: 'pointer' }}  onClick={e=>deleteArticle(e)}>
                                               <IonIcon name="trash-outline"  /> 
                                                    
                                                </div>
                                            )}

<div className="action-button-container">
                            {user?.id==article?.author_id ?(
                                 <Link to={"/update_blog/"+ article?.id} className="action_btn btn-ans ask-btn">Update Article</Link>
                            ):(
                                 <Link to="/add_blog" className="action_btn btn-ans ask-btn">Add Article</Link>
                            )}
                          
                        </div>
                    </div>
               
                    <h1>{article?.title}</h1>
                    <div className="single_post_author">
                        <img className="author_img" src={article?.author_image} alt=""/>
                        <div className="text">
                            <a href="#"><h4>{article?.author_name}</h4></a>
                            <div className="post_tag">
                                <a href="#">{moment(article?.created_at).fromNow()}</a>
                                {article?.tags?.map(tag=>(
                        <a className="c_blue" href="#" key={tag?.id}>{tag?.name}</a>

                        ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
                        <div className="blog_single_info mt-2">
                            <div className="blog_single_item">
                              
                               <ReactQuill value={article?.content}  modules={{
                                toolbar: false
                                }}
                                readOnly={true}
                                style={{ border: 'none !imprtant' }} />
                              
                            </div>
                           
                         

                            <div className="comment_inner">
                                <h2 className="c_head">{article?.comments?.length} Comment</h2>
                                <ul className="comment_box list-unstyled">
                                    {article?.comments?.map(comment=>(
                                    <li className="post_comment" key={comment?.id}>
                                    <div className="media comment_author">
                                        <img className="img_rounded" src={comment?.author_image} alt="user image" width="30px" height="30px" />
                                        <div className="media-body">
                                            <div className="comment_info">
                                                <h3>{comment?.author_name}</h3>
                                                <div className="comment_date">{moment(comment?.created_at).fromNow()}</div>
                                            </div>
                                            <p>{comment?.content}</p>
                                        </div>
                                    </div>
                                    </li>
                                    ))}
                                   
                                   
                                </ul>
                            </div>
                            <div className="blog_comment_box topic_comment">
                                <h2 className="c_head">Leave a Reply</h2>
                                <form className="get_quote_form row" onSubmit={handleSubmit(onSubmitComment)}>
                                   
                                    
                                    <div className="col-md-12 form-group">
                                        <textarea className={`form-control message ${errors.content && "invalid"}`}
                                         {...register("content", {
                                            required: "Comment is Required",
                                           
                                          })}></textarea>
                                        <label className="floating-label">Comment type...</label>
                                        {errors.content && (
                                        <small className="text-danger">{errors.content.message}</small>
                                        )}
                                    </div>
                                   
                                    
                                    <div className="col-md-12 form-group"><button className="btn action_btn thm_btn"
                                                                              type="submit">Post
                                        Comment</button></div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="blog_sidebar pl-40">
                            <div className="widget about_widget">
                                <div className="img"><img src="img/blog-single/about_img.jpg" alt=""/></div>
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
    </div>
  )
}
