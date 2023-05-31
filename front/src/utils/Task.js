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