import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://ec2-3-123-2-43.eu-central-1.compute.amazonaws.com'
});

export default axiosInstance;
