import axios from 'axios';

const configureAxios = () => {
  axios.defaults.baseURL = 'http://localhost:8002/api/';
  
  let refresh = false;
  
  axios.interceptors.response.use(
    (resp) => resp,
    async (error) => {
      if (error.response.status === 401 && !refresh) {
        refresh = true;
  
        try {
          const response = await axios.post(
            'http://localhost:8002/api/refresh',
            {},
            { withCredentials: true }
          );
  
          console.log(response)
          if (response.status === 200) {
            axios.defaults.headers.common[
              'Authorization'
            ] = `Bearer ${response.data['token']}`;
  
            return axios(error.config);
          }
        } catch (error) {
          console.log('Error refreshing token:', error);
        }
      }
  
      refresh = false;
      return Promise.reject(error);
    }
  );
};

export default configureAxios;
