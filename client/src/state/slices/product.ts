import {createSlice, PayloadAction} from "@reduxjs/toolkit"

type productChildType = {
    url:string,
    id:number,
    name:string,
    price:number,
    starPoint:number,
    userProduct?:{quantity:number}
}


interface initialStateType{
    listCount:number,
    list:productChildType[]
}

const initialState : initialStateType = {listCount:0,list:[]}


export const productSlice = createSlice({
    name:"product",
    initialState:initialState,
    reducers:{
        populateList:(state:initialStateType,action)=>{
           if(action.payload.isPaignation){
             return {...state,list:[...state.list,...action.payload.list]}
           }
           
           return {...state,list:[...action.payload.list]}
        },
        deleteFromList:(state,action)=>{
            const copyProducts = [...state.list];
            copyProducts.splice(action.payload,1)
            return {...state,list:copyProducts}
        },
        incrementListCount:(state:initialStateType,action)=>{  
            console.log(action)
            return {...state,listCount:state.listCount+action.payload}
        },
        decrementListCount:(state:initialStateType)=>{
           return {...state,listCount:state.listCount-1}
        }
    }
})


export const {incrementListCount,populateList,decrementListCount,deleteFromList} = productSlice.actions;
export default productSlice.reducer;