import {createSlice} from "@reduxjs/toolkit"


export const activeSlice = createSlice({
    name:"windowActive",
    initialState:false,
    reducers:{
        handleActiveness:(state:boolean) : boolean=>{
            console.log("inside reducer")
            return !state 
        },
    }
})


export const {handleActiveness} = activeSlice.actions;
export default activeSlice.reducer;