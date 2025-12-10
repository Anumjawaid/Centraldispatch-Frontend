
import { configureStore } from "@reduxjs/toolkit";
// import { themeSlice } from "./themeReducer";
import { authSlice } from "./authenticationReducer";
import chatReducer from "./chatReducer";
// import { catSlice } from "./CategoriesReducer";

export const Store = configureStore({
  reducer: {
    // theme:themeSlice.reducer,
    authentication: authSlice.reducer,
    chat: chatReducer,
    // categories:catSlice.reducer,
  },
});
