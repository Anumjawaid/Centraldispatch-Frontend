
import { configureStore } from "@reduxjs/toolkit";
// import { themeSlice } from "./themeReducer";
import { authSlice } from "./authenticationReducer";
// import { catSlice } from "./CategoriesReducer";


export const Store=configureStore({   //setup and configure Store
    reducer:{
        // define whatever you want to define here 
        // theme:themeSlice.reducer,
        authentication:authSlice.reducer,
        // categories:catSlice.reducer,
        

    }
})
