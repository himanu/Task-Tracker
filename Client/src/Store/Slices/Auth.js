import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from '../../api/index';

export const signIn = createAsyncThunk("signIn", async(tokenId, {rejectWithValue})=>{
        try {
            const {data} = await api.signIn(tokenId);
            console.log('data from api ', data);
            window.localStorage.setItem('tokenId', JSON.stringify(tokenId));
            return {
                data,
                tokenId
            }
        } catch(err) {
            if(err.response) {
                // this will execute when request is successfully made and the server has sent the response with a status code that falls out of the 2xx range
                console.log("Invalid token id ",err.response.data);
                if(window.localStorage.getItem('tokenId')) {
                    window.localStorage.removeItem('tokenId');
                }
                return rejectWithValue(err.response.data);
            } else if(err.request) {
                // this will execute when request is made but no response has received
                console.log('sign in error ', err.request);
                return rejectWithValue(err.message);
            } else {
                // this will execute when request was not made successfully
                return rejectWithValue(err.message);
            }
        }
    
});

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthed: false,
        status: 'idle',
        user: {},
        tokenId: JSON.parse(window.localStorage.getItem('tokenId'))
    },
    reducers: {
       logout: () =>{
           return {
               isAuthed: false,
               user: {},
               tokenId: null,
               status: 'idle'
           }
       } 
    },
    extraReducers: (builders)=>{
        builders
            .addCase(signIn.pending, (state)=>{
                console.log('Hii i am in pending state');
                return {
                    ...state,
                    status: 'loading'
                }
            })
            .addCase(signIn.fulfilled, (state,action) => {
                return {
                    isAuthed: true,
                    status: 'success',
                    user: action.payload.data.user,
                    tokenId: action.payload.tokenId
                }
            })
            .addCase(signIn.rejected,() => {
                return {
                    isAuthed: false,
                    status: 'failed',
                    user: {},
                    tokenId: null
                }
            })
    }
});
export const { logout } = authSlice.actions;
export default authSlice.reducer;
