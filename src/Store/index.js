
import { configureStore } from "@reduxjs/toolkit";
// import { themeSlice } from "./themeReducer";
import { authSlice } from "./authenticationReducer";
import postsSlice from "./postReducer";
// import { catSlice } from "./CategoriesReducer";


export const Store=configureStore({   //setup and configure Store
    reducer:{
        // define whatever you want to define here 
        authentication:authSlice.reducer,
        posts: postsSlice,
        

    }
})
