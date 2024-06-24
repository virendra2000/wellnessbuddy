import axios from 'axios';

const http = axios.create({
    baseURL:"http://localhost:8000",
    headers:{
        'jwtoken':document.cookie.replace(/(?:(?:^|.*;\s*)jwtoken\s*=\s*([^;]*).*$)|^.*$/, '$1')
        
    }
})

export default http;
