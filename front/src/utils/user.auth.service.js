import axios from "axios";
const url = `${process.env.REACT_APP_URI}`;

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export const getUser = async () => {
  const response = await axios.get("http://localhost:8002/api/user");
  return response.data;
};

export const login = async (email, password) => {
try{
    const { data } = await axios.post(
      "http://localhost:8002/api/"+ "login",
      {
        email,
        password,
      },
      { withCredentials: true }
    );
    if(data!=undefined)
    axios.defaults.headers.common["Authorization"] = `Bearer ${data["token"]}`;
    console.log(data)
    const res=await getUser()
    localStorage.setItem("user",JSON.stringify(res))
    return data;

  } catch (error) {
    console.log(error);
  }

};

export const googleLogin = async (id_token) => {
  console.log(id_token)
  const { data } = await axios.post("http://localhost:8002/api/"+ "googleRegister", {
    id_token,
  });
  axios.defaults.headers.common["Authorization"] = `Bearer ${data["token"]}`;
  return data;
};

export const signUp = async (first_name, last_name, email, phone, password) => {
  const { data } = await axios.post("http://localhost:8002/api/"+ "register", {
    first_name,
    last_name,
    email,
    phone,
    password,
  });
  return data;
};

export const logout = async () => {
    await axios.post("http://localhost:8002/api/"+'logout', {}, {withCredentials: true});
    localStorage.removeItem("user")

}

export const uploadImage = async (image_url,id) => {
  const response = await axios.post("http://localhost:8002/api/uploadImage",{image_url,id});
  return response.data;
};

export const updateProfile = async (first_name,last_name,email,phone,id) => {
  const response = await axios.post("http://localhost:8002/api/updateProfile",{first_name, last_name, email, phone,id});
  return response.data;
};

export const updatePassword = async (password,id) => {
  const {response} = await axios.post("http://localhost:8002/api/updatePassword",{password,id});
  return response;
};


export const getUserProfile = async (id) => {

  try {
      const {data}= await axios.get("http://localhost:8002/api/get_user/"+id);
      return data;
    } catch (error) {
      console.log(error);
    }
  
};

export const getAllUsers = async (id) => {

  try {
      const {data}= await axios.get("http://localhost:8002/api/all_users/");
      return data;
    } catch (error) {
      console.log(error);
    }
  
};

export const findUsers = async (value) => {

  try {
      const {data}= await axios.get("http://localhost:8002/api/user_autocomplete/",{
        params: { query: value },
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  
};