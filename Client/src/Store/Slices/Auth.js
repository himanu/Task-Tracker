import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from '../../api/index';

export const validateTokenId = createAsyncThunk("validateTokenId", async(tokenId, {rejectWithValue})=>{
        try {
            const {data} = await api.validateTokenId(tokenId);
            console.log('Hii ', data);
            window.localStorage.setItem('tokenId', JSON.stringify(tokenId));
            return {
                data,
                tokenId
            }
        } catch(err) {
            console.log("Invalid token id");
            if(window.localStorage.getItem('tokenId')) {
                window.localStorage.removeItem('tokenId');
            }
            return rejectWithValue("Invalid token id");
        }
    
});

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthed: false,
        user: {},
        tokenId: JSON.parse(window.localStorage.getItem('tokenId'))
    },
    reducers: {
       logout: () =>{
           return {
               isAuthed: false,
               user: {},
               tokenId: null
           }
       } 
    },
    extraReducers: (builders)=>{
        builders
            .addCase(validateTokenId.pending, (state)=>{
            })
            .addCase(validateTokenId.fulfilled, (state,action) => {
                return {
                    isAuthed: true,
                    user: action.payload.data.payload,
                    tokenId: action.payload.tokenId
                }
            })
            .addCase(validateTokenId.rejected,() => {
                return {
                    isAuthed: false,
                    user: {},
                    tokenId: null
                }
            })
    }
});
export const { logout } = authSlice.actions;
export default authSlice.reducer;
