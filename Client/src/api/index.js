import axiosInstance from './axiosInstance';
import routes from './routes';

const api = {
    signIn(tokenId) {
        return axiosInstance.get(routes.signIn,{
            headers: {
                'Authorization': `Bearer ${tokenId}`
            }
        })
    },
    addTask(task) {
        // this will return a promise
        const tokenId = JSON.parse(localStorage.getItem('tokenId'));
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
    },
    getProjects(projectIds) {
        const tokenId = JSON.parse(localStorage.getItem('tokenId'));
        if(!tokenId) {
            return Promise.reject('Please Authenticate first');
        }
        return axiosInstance.get(routes.projects + `/?projectIds${projectIds}`, {
            headers: {
                'Authorization': `Bearer ${tokenId}`
            }
        });
    }
};
export default api;