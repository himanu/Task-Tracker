import axiosInstance from './axiosInstance';
import routes from './routes';

const tokenId = localStorage.getItem('jwtToken');
const api = {
    signIn(tokenId) {
        return axiosInstance.get(routes.signIn,{
            headers: {
                'Authorization': `Bearer ${tokenId}`
            }
        })
    },
    loadUser(jwtToken) {
        return axiosInstance.get(routes.loadUser, {
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }
        })
    },
    addTask(task) {
        if(!tokenId) {
            return Promise.reject('Authentication Failed');
        }
        
        return axiosInstance.post(routes.tasks, task, {
            headers: {
                'Authorization': `Bearer ${tokenId}`
            }
        })
    },
    updateTask(task) {
        if(!tokenId) {
            return Promise.reject('Authentication Failed');
        }
        return axiosInstance.post('task/updateTask', task, {
            headers: {
                'Authorization': `Bearer ${tokenId}`
            }
        })
    },
    deleteTask(taskId, projectId) {
        if(!tokenId) {
            return Promise.reject('Authentication Failed');
        }
        return axiosInstance.delete(`task/deleteTask/?taskId=${taskId}&projectId=${projectId}`, {
            headers: {
                'Authorization': `Bearer ${tokenId}`
            }
        })
    },
    getProjects() {
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