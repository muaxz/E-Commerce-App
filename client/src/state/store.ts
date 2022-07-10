import {configureStore} from "@reduxjs/toolkit"
import productSlice from "./slices/product"


const store = configureStore({
    reducer:{
        product:productSlice
    }
})

export default store;

export type RootState = ReturnType<typeof store.getState>



