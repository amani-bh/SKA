import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { addQuestion, getAllCategories, getAllTags, getQuestion, updateQuestion } from "../../../utils/Forum";
import { WithContext as ReactTags } from 'react-tag-input';
import { useForm } from 'react-hook-form';
import { getCurrentUser } from "../../../utils/user.auth.service";
import {  useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function UpdateQuestion() {
    const [categories,setCategories]=useState();
    const [tags,setTags]=useState([]);
    const [alltags,setAllTags]=useState();
    const { register, handleSubmit, formState: { errors },setValue, watch } = useForm();
    const user = getCurrentUser();
    const [editorState, setEditorState] = useState(null);
    const navigate = useNavigate();
    const [question, setQuestion] = useState({
        title: '',
        content: '',
        tags: [],
        category_id: null,
      });
  let { id } = useParams();

  
  useEffect(() => {
    const fetchData = async () => {
      const result = await getQuestion(id);
      console.log(result)
      setQuestion(result);
      setTags(result?.tags?.map(tag => ({
        id: tag.id.toString(),
        text: tag.name
      })));
      setEditorState(result?.content)
    };
    fetchData();
  }, []);
    
  
    useEffect(() => {
      const fetchData = async () => {
        const result = await getAllCategories();
        setCategories(result);
      };
      fetchData();
    }, []);
  
    useEffect(() => {
      const fetchData = async () => {
        const result = await getAllTags();
        setAllTags(result);
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
  // console.log("cat",question)
  let cat_id=""
  if(question?.category?.id!=undefined)
    cat_id=question?.category?.id
  else 
  cat_id=question?.category

   

  const updateQ = {
    id: question?.id,
    title: question?.title,
    content: e.content,
    category_id: cat_id,
    tags: tags,
    author_id:user?.id,
    author_name:user?.first_name+" "+user?.last_name,
    author_image:user?.image_url
  };


     console.log("question ",updateQ)
     const result = await updateQuestion(updateQ).then(question=>{
      if(question!=undefined){
        toast.success("Question updated successfully!");
      navigate(`/question_details/${question?.id}`);
      }
      else{
        toast.error("Error !!!");

      }
     });
  };



  return (
    <section className="doc_subscribe_area mt-5 mb-5">
    <div className="container">
      <h1>Ask Question</h1>
      <div>
      <form action="#" className="row login_form mt-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="col-sm-12 form-group">
          <div className="">Title </div>
          <div><span> Be specific and imagine you’re asking a question to another person. </span></div>
          <input type="text"  value={question?.title} className="form-control" name="lname" id="lname" placeholder="Title" 
           onChange={e => setQuestion({ ...question, title: e.target.value })}  />
          
        </div>

        <div className="col-sm-12 form-group">
          <div className="">Category </div>
          <select value={question?.category?.id}  className="form-control"  
          onChange={e => setQuestion({ ...question, category: e.target.value })} >

            <option>Select category</option>
            {categories?.map((category)=>
              <option key={category.id} value={category.id}>{category.name}</option>

              )}
          </select>
        </div>

       
        <div className="col-sm-12 form-group">
          <div className="small_text">What are the details of your problem? </div>
          <ReactQuill
          theme="snow"
          modules={modules}
          formats={formats}
          value={editorState || ''}
          onChange={onEditorStateChange} 
          placeholder="Write here your problem"
        />
        </div>

        <div className="col-sm-12 form-group">
          <div className="">Tags </div>
          <div><span> Add tags to describe what your question is about. Start typing to see suggestions.</span></div>
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
            Update Your Question
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
