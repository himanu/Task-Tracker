import axiosInstance from './axiosInstance';
import routes from './routes';

const api = {
    validateTokenId: (tokenId) => {
        return axiosInstance.post(routes.validateTokenId,{
            tokenId
        })
    }
};
export default api;