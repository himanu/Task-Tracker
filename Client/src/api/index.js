import axiosInstance from './axiosInstance';
import routes from './routes';

const api = {
    validateTokenId(tokenId) {
        return axiosInstance.get(routes.validateTokenId,{
            headers: {
                'Authorization': `Bearer ${tokenId}`
            }
        })
    },
    addTask(task) {
        // this will return a promise
        const tokenId = localStorage.getItem('tokenId');
        if(!tokenId) {
            return Promise.reject('Please Authenticate first');
        }
        
        return axiosInstance.post(routes.addTask, {
            task
        }, {
            headers: {
                'Authorization': `Bearer ${tokenId}`
            }
        })
    }
};
export default api;