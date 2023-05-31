import axios from "axios";

export const getAllCategories = async () => {

    try {
        const {data}= await axios.get("http://localhost:8001/forum-api/all_categories");
        return data;
      } catch (error) {
        console.log(error);
      }
    
  };


  export const getAllTags = async () => {

    try {
        const {data}= await axios.get("http://localhost:8001/forum-api/all_tags");
        return data;
      } catch (error) {
        console.log(error);
      }
    
  };

  export const addQuestion = async (question) => {
    const { data } = await axios.post("http://localhost:8001/forum-api/"+ "add_question", {
      question
    });
    return data;
  };

  export const getAllQuestions = async () => {

    try {
        const {data}= await axios.get("http://localhost:8001/forum-api/all_questions");
        return data;
      } catch (error) {
        console.log(error);
      }
    
  };

  export const getQuestion = async (id) => {

    try {
        const {data}= await axios.get("http://localhost:8001/forum-api/get_question/"+id);
        return data;
      } catch (error) {
        console.log(error);
      }
    
  };

  export const getAllAnswersByQuestion = async (id) => {

    try {
        const {data}= await axios.get("http://localhost:8001/forum-api/answers_question/"+id);
        return data;
      } catch (error) {
        console.log(error);
      }
    
  };

  export const addAnswer = async (answer) => {
    const { data } = await axios.post("http://localhost:8001/forum-api/"+ "add_answer", {
      answer
    });
    return data;
  };

  export const solutionQuestion = async (id) => {

    try {
        const {data}= await axios.get("http://localhost:8001/forum-api/solution_answer_question/"+id);
        return data;
      } catch (error) {
        console.log(error);
      }
    
  };

  export const addComment = async (comment) => {
    const { data } = await axios.post("http://localhost:8001/forum-api/"+ "add_comment", {
      comment
    });
    return data;
  };

  export const getQuestionWithAnswersAndComments = async (id) => {

    try {
        const {data}= await axios.get("http://localhost:8001/forum-api/question/"+id);
        return data;
      } catch (error) {
        console.log(error);
      }
    
  };

  export const updateVotes = async (vote,id,idUser) => {
    const { data } = await axios.post("http://localhost:8001/forum-api/"+ "update_answer_vote/"+id+"/"+idUser, {
      vote
    });
    return data;
  };

  export const updateQuestion = async (question) => {
    const { data } = await axios.put("http://localhost:8001/forum-api/"+ "update_question", {
      question
    });
    return data;
  };

  export const getQuestionsByUser = async (id) => {

    try {
        const {data}= await axios.get("http://localhost:8001/forum-api/question_by_user/"+id);
        return data;
      } catch (error) {
        console.log(error);
      }
    
  };

  export const getAnswersByUser = async (id) => {

    try {
        const {data}= await axios.get("http://localhost:8001/forum-api/answers_by_user/"+id);
        return data;
      } catch (error) {
        console.log(error);
      }
    
  };

  export const getAnswerById = async (id) => {

    try {
        const {data}= await axios.get("http://localhost:8001/forum-api/answer_by_id/"+id);
        return data;
      } catch (error) {
        console.log(error);
      }
    
  };

  export const updateAnswer = async (content,id) => {
    const { data } = await axios.post("http://localhost:8001/forum-api/"+ "update_answer/"+id, {
      content
    });
    return data;
  };

  export const getQuestionsBySearch = async (query) => {

    try {
        const {data}= await axios.get("http://localhost:8001/forum-api/search_question", {
          params: {
            query: query,
          },
        });
        return data;
      } catch (error) {
        console.log(error);
      }
    
  };


  export const addView = async (id,idUser) => {
    const { data } = await axios.get("http://localhost:8001/forum-api/"+ "add_view_question/"+id+"/"+idUser);
    return data;
  };

  export const deleteAnswerById = async (id) => {
    const { data } = await axios.get("http://localhost:8001/forum-api/"+ "delete_answer/"+id);
    return data;
  };


  export const updateComment= async (content,id) => {
    const { data } = await axios.post("http://localhost:8001/forum-api/"+ "update_comment/"+id, {
      content
    });
    return data;
  };
  export const getCommentById = async (id) => {

    try {
        const {data}= await axios.get("http://localhost:8001/forum-api/comment_by_id/"+id);
        return data;
      } catch (error) {
        console.log(error);
      }
    
  };

  export const deleteCommentById = async (id) => {
    const { data } = await axios.get("http://localhost:8001/forum-api/"+ "delete_comment/"+id);
    return data;
  };

  
  export const deleteQuestionById = async (id) => {
    const { data } = await axios.get("http://localhost:8001/forum-api/"+ "delete_question/"+id);
    return data;
  };


 /*******Article ****** */ 

 export const addArticle = async (article) => {
  const { data } = await axios.post("http://localhost:8001/forum-api/"+ "add_article", {
    article
  });
  return data;
};


export const getAllArticles = async () => {

  try {
      const {data}= await axios.get("http://localhost:8001/forum-api/all_articles");
      return data;
    } catch (error) {
      console.log(error);
    }
  
};

export const getArticleById = async (id) => {

  try {
      const {data}= await axios.get("http://localhost:8001/forum-api/article_by_id/"+id);
      return data;
    } catch (error) {
      console.log(error);
    }
  
};


export const addCommentArticle = async (comment) => {
  const { data } = await axios.post("http://localhost:8001/forum-api/"+ "add_comment_article", {
    comment
  });
  return data;
};

export const updateArticle = async (article) => {
  const { data } = await axios.put("http://localhost:8001/forum-api/"+ "update_article", {
    article
  });
  return data;
};

export const getArticle = async (id) => {

  try {
      const {data}= await axios.get("http://localhost:8001/forum-api/get_article/"+id);
      return data;
    } catch (error) {
      console.log(error);
    }
  
};


export const deleteArticleById = async (id) => {
  const { data } = await axios.get("http://localhost:8001/forum-api/"+ "delete_article/"+id);
  return data;
};