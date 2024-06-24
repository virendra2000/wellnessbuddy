import axios from 'axios';

const http = axios.create({
    baseURL:"https://wellnessbuddy-backend.onrender.com",
    headers:{
        'jwtoken':document.cookie.replace(/(?:(?:^|.*;\s*)jwtoken\s*=\s*([^;]*).*$)|^.*$/, '$1')
        
    }
})

export default http;
