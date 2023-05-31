import axios from "axios";

export const addConversation= async (firstUser,secondUser) => {
    const { data } = await axios.post("http://localhost:8000/api/"+ "add_conversation", {
        firstUser,secondUser
    });
    return data;
  };

  export const allConversations= async (user_id) => {
    const { data } = await axios.get("http://localhost:8000/api/"+ "all_conversations/"+user_id);
    return data;
  };

  export const allMessages= async (id,idUser) => {
    const { data } = await axios.get("http://localhost:8000/api/"+ "all_messages/"+id+"/"+idUser);
    return data;
  };
  
  export const getConversation= async (id) => {
    const { data } = await axios.get("http://localhost:8000/api/"+ "get_conversation/"+id);
    return data;
  };