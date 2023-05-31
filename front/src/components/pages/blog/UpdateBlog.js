import React from 'react'
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {  useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {  getAllTags, getArticle, updateArticle } from '../../../utils/Forum';
import { useState } from 'react';
import { getCurrentUser } from '../../../utils/user.auth.service';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { WithContext as ReactTags } from 'react-tag-input';

export default function UpdateBlog() {
    const { register, handleSubmit, formState: { errors },setValue, watch } = useForm();
    const [alltags,setAllTags]=useState();
    const [tags,setTags]=useState([]);
    const user = getCurrentUser();
    const navigate = useNavigate();
    const [editorState, setEditorState] = useState(null);
    const [article, setArticle] = useState({
        title: '',
        content: '',
        tags: [],
      });
  let { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const result = await getArticle(id);
      console.log(result)
      setArticle(result);
      setTags(result?.tags?.map(tag => ({
        id: tag.id.toString(),
        text: tag.name
      })));
      setEditorState(result?.content)
    };
    fetchData();
  }, []);

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
      useEffect(() => {
        const fetchData = async () => {
          const result = await getAllTags();
          setAllTags(result);
        };
        fetchData();
      }, []);


      useEffect(() => {
        register("content", { required: true, minLength: 11 });
        setEditorState(watch("content"));
      }, [register, watch]);
      
      const onEditorStateChange = (editorState) => {
        setEditorState(editorState);
        setValue("content", editorState);
      };


       /* Tags */
   
       const suggestions = alltags?.map(tag => {
        return {
          id: tag.id.toString(),
          text: tag.name
        };
      });
      
      const KeyCodes = {
        comma: 188,
        enter: 13
      };
      const delimiters = [KeyCodes.comma, KeyCodes.enter];
      
        const handleDelete = i => {
          setTags(tags.filter((tag, index) => index !== i));
        };
      
        const handleAddition = tag => {
          setTags([...tags, tag]);
        };
      
        const handleDrag = (tag, currPos, newPos) => {
          const newTags = tags.slice();
      
          newTags.splice(currPos, 1);
          newTags.splice(newPos, 0, tag);
      
        
          setTags(newTags);
        };
      
        const handleTagClick = index => {
          console.log('The tag at index ' + index + ' was clicked');
        };
       
    
    
    /*******Update ***** */

    const onSubmit = async (e) => {
        console.log(article)
        const updatedArticle = {
        id: article?.id,
          title: article.title,
          content: e.content,
          tags: tags,
          author_id:user?.id,
          author_name:user?.first_name+" "+user?.last_name,
          author_image:user?.image_url,
          author_badge:user?.badge
        };
    
           const result = await updateArticle(updatedArticle)
           if(result!=undefined){
        toast.success("Article updated successfully!");
    
        await new Promise(resolve => setTimeout(resolve, 4000)); 
        navigate(`/blog_details/${result?.id}`);
    
           }
           else toast.error("Error !!!");
        };    

  return (
    <section className="doc_subscribe_area mt-5 mb-5">
    <div className="container">
      <h1>Ask Question</h1>
      <div>
      <form action="#" className="row login_form mt-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="col-sm-12 form-group">
          <div className="">Title </div>
          <input type="text" className="form-control " value={article?.title} placeholder="Title" 
           onChange={e => setArticle({ ...article, title: e.target.value })}/>
         
        </div>

       

       
        <div className="col-sm-12 form-group">
          <div className="small_text">What are the details of your article? </div>
           <ReactQuill
          theme="snow"
          modules={modules}
          formats={formats}
          value={editorState || ''}
          onChange={onEditorStateChange} 
          placeholder="Write here "
        />
         
          {errors.content && (
               <small className="text-danger">Description is required</small>
           )}
        </div>

        <div className="col-sm-12 form-group">
          <div className="">Tags </div>
          <div><span> Add tags to describe what your article is about. Start typing to see suggestions.</span></div>
          <ReactTags
              tags={tags}
              suggestions={suggestions}
              delimiters={delimiters}
              handleDelete={handleDelete}
              handleAddition={handleAddition}
              handleDrag={handleDrag}
              handleTagClick={handleTagClick}
              inputFieldPosition="bottom"
              autocomplete
      />
           </div>

        <div className="col-lg-12 text-center">
          <button type="submit" className="btn action_btn thm_btn">
            Add Your Article
          </button>
        </div>
        </form>
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
  )
}
