import axios from "axios";



const baseURL = import.meta.env.VITE_BACKEND_BASE_API
const axiosInstance = axios.create({
  // baseURL: 'http://127.0.0.1:8000/api/v1/'
  baseURL: baseURL,
  headers:{
    'Content-Type': 'application/json'
  }
})


// request interceptors

axiosInstance.interceptors.request.use(
  function(config){
    // console.log('request without header',config)
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken){
      config.headers['Authorization'] = `Bearer ${accessToken}`
    }
    return config;
  },
  function(error){
    return Promise.reject(error);
  }
)


// response interceptor

axiosInstance.interceptors.response.use(
  function(response){
    return response;
  },
  // handle failed responces
  async function(error){
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest.retry){
      originalRequest.retry = true;
      // this time go refresh api request
      const refreshToken = localStorage.getItem('refreshToken')
      try{
        const response = await axiosInstance.post('/token/refresh/', {refresh: refreshToken})
        // console.log('response',response.data.access);

        localStorage.setItem('accessToken', response.data.access)
        originalRequest.headers['Authorization'] = `Bearer ${(response.data.access)}`
        return axiosInstance(originalRequest)

      }catch(error){
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        // window.location.href = '/login'
      }

    }
    return Promise.reject(error);
  }
)


export default axiosInstance;