import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://ec2-18-157-126-147.eu-central-1.compute.amazonaws.com'
});

export default axiosInstance;