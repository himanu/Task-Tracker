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
            return Promise.reject('Authentication Failed');
        }
        
        return axiosInstance.post(routes.tasks, task, {
            headers: {
                'Authorization': `Bearer ${tokenId}`
            }
        })
    },
    getProjects() {
        const tokenId = JSON.parse(localStorage.getItem('tokenId'));
        if(!tokenId) {
            throw new Error('Authentication Failed');
        }
        return axiosInstance.get(routes.projects, {
            headers: {
                'Authorization': `Bearer ${tokenId}`
            }
        });
    },
    addProject(project_name) {
        const tokenId = JSON.parse(localStorage.getItem('tokenId'));
        if(!tokenId) {
            throw new Error('Authentication Failed');
        }
        return axiosInstance.post(routes.projects, {
                project_name
            }, {
                headers: {
                    'Authorization': `Bearer ${tokenId}`
                }
            }
        );
    }, 
    getTasks(projectId) {
        const tokenId = JSON.parse(localStorage.getItem('tokenId'));
        if(!tokenId) {
            throw new Error('Authentication Failed');
        }
        return axiosInstance.get(routes.tasks + `/${projectId}`, {
            headers: {
                'Authorization': `Bearer ${tokenId}`
            }
        })
    }
};
export default api;