import axios from "axios";

export const getProjectsByUser = async (id) => {

    try {
        const {data}= await axios.get("http://localhost:8004/task-api/user_projects/"+id);
        return data;
      } catch (error) {
        console.log(error);
      }
    
  };

  export const getProjectById = async (id) => {

    try {
        const {data}= await axios.get("http://localhost:8004/task-api/project_by_id/"+id);
        return data;
      } catch (error) {
        console.log(error);
      }
    
  };

  export const addProject = async (project) => {
    const { data } = await axios.post("http://localhost:8004/task-api/"+ "add_project", {
      project
    });
    return data;
  };
  export const addListBoard = async (list) => {
    const { data } = await axios.post("http://localhost:8004/task-api/"+ "add_list", list );
    return data;
  };

  export const addItemList = async (item) => {
    const { data } = await axios.post("http://localhost:8004/task-api/"+ "add_item", item );
    return data;
  };
  
  export const updateTitleList = async (id,title) => {
    const { data } = await axios.post("http://localhost:8004/task-api/"+ "update_list_title/"+id, {title} );
    return data;
  };

  export const updateTitleItem = async (id,title) => {
    const { data } = await axios.post("http://localhost:8004/task-api/"+ "update_item_title/"+id, {title} );
    return data;
  };

  export const updateDescriptionItem = async (id,title,description) => {
    const { data } = await axios.post("http://localhost:8004/task-api/"+ "update_item_description/"+id, {title,description} );
    return data;
  };

  export const addCommentItem = async (comment) => {
    const { data } = await axios.post("http://localhost:8004/task-api/"+ "add_comment", comment );
    return data;
  };

  export const updateCommentItem = async (id,body) => {
    const { data } = await axios.post("http://localhost:8004/task-api/"+ "update_comment/"+id, {body} );
    return data;
  };

  export const deleteCommentItem = async (id,body) => {
    const { data } = await axios.delete("http://localhost:8004/task-api/"+ "delete_comment/"+id );
    return data;
  };

  export const inviteMemberToProject = async (id,email,name,receiver_id) => {
    const { data } = await axios.post("http://localhost:8004/task-api/"+ "invite_member/"+id, {email,name,receiver_id} );
    return data;
  };

  export const assignToCard = async (id,idUser) => {

    try {
        const {data}= await axios.get("http://localhost:8004/task-api/assign_to_item/"+id+"/"+idUser);
        return data;
      } catch (error) {
        console.log(error);
      }
    
  };