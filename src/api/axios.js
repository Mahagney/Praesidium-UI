import axios from 'axios';

const axiosInstance = axios.create({
<<<<<<< HEAD
  baseURL: 'http://ec2-18-157-126-147.eu-central-1.compute.amazonaws.com'
  //baseURL: 'http://localhost:5000'
=======
  //baseURL: 'http://ec2-18-157-126-147.eu-central-1.compute.amazonaws.com'
  baseURL:'http://localhost:5000'
>>>>>>> Add rapports view
});

export default axiosInstance;