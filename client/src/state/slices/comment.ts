import {createSlice, PayloadAction} from "@reduxjs/toolkit"

interface CommentType{
    id:number,
    message:string,
    star:number
}

const initialState : CommentType[] = []

const CommentSlice = createSlice({
    name:"Comment",
    initialState:initialState,
    reducers:{
        addToList:(state,action)=>{
            return [action.payload,...state]
        },
        populateList:(state,action)=>{
            return action.payload
        }
    }
})



export const {addToList,populateList} = CommentSlice.actions;
export default CommentSlice.reducer;

