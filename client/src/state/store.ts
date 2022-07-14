import {configureStore} from "@reduxjs/toolkit"
import productSlice from "./slices/product"
import windowActiveSlice from "./slices/windowActive"


const store = configureStore({
    reducer:{
        product:productSlice,
        windowActive:windowActiveSlice
    }
})

export default store;

export type RootState = ReturnType<typeof store.getState>



