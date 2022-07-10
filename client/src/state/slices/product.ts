import {createSlice, PayloadAction} from "@reduxjs/toolkit"

interface productChildType{
    completed:boolean,
    id:number,
    title:string,
    userId:number
}



interface initialStateType{
    listCount:number,
    list:productChildType[]
}

const initialState : initialStateType = {listCount:0,list:[]}


export const counterSlice = createSlice({
    name:"product",
    initialState:initialState,
    reducers:{
        populateList:(state:initialStateType,action)=>{
           return {...state,list:action.payload}
        },
        incrementListCount:(state:initialStateType,action)=>{    
            return {...state,listCount:state.listCount+1}
        },
        removeFromList:(state:initialStateType)=>{
           return {...state,listCount:state.listCount-1}
        }
    }
})


export const actions = counterSlice.actions;
export default counterSlice.reducer;