import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GET_CARRIER, POSTS } from '../Constants/URL'

let initialState = {

    posts: [],            // list of all posts
    currentPost: {
        "trailerType": "",
        "pickupDate": "",
        "deliveryDate": "",
        "price": 0,
        "notes": "",
        "pickupLocation": {

        },
        "deliveryLocation": {

        },
        "vehicles": [

        ],
    },    // single post (for view/edit)
    loading: false,
    message: "",
    status: "",
    error: null,
}
export const add_post = createAsyncThunk(
    "add_post",
    async (data, thunkApi) => {
        try {
            // attempt to read token from redux state, fallback to localStorage
            const state = thunkApi.getState();
            const token = state?.authentication?.token || localStorage.getItem('token');

            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token ? { Authorization: `Bearer ${token}` } : {}),
                },
                body: JSON.stringify(data),
            };

            const res = await fetch(POSTS, requestOptions);
            if (!res.ok) {
                const err = await res.json().catch(() => ({ message: res.statusText }));
                return thunkApi.rejectWithValue(err.message || `Failed to create post: ${res.status}`);
            }
            return await res.json();
        } catch (error) {
            return thunkApi.rejectWithValue(error.message || 'Network error');
        }
    }
)
export const get_posts = createAsyncThunk(
    "posts/get_posts",
    async (params = {}, thunkApi) => {
        try {
            // attempt to read token from redux state, fallback to localStorage


            const state = thunkApi.getState();
            const token = state?.authentication?.token || localStorage.getItem('token');
            console.log("Token:", token);
            console.log(params,"params");

            // Build query string dynamically
            const queryString = new URLSearchParams(
                Object.entries(params).filter(([_, v]) => v !== undefined && v !== "")
            ).toString();

            const url = `${POSTS}?${queryString}`;
            console.log("Fetching:", url);

            const requestOptions = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    ...(token ? { Authorization: `Bearer ${token}` } : {}),
                },
            };

            const res = await fetch(url, requestOptions);
            console.log("Fetch completed, status:", res.status);

            if (!res.ok) throw new Error(`Failed to fetch posts: ${res.status}`);
            return await res.json();
        } catch (error) {
            return thunkApi.rejectWithValue(error.message);
        }
    }
);



export const get_post_by_id = createAsyncThunk(
    "posts/get_post_by_id",
    async (id, thunkApi) => {
        try {
            const state = thunkApi.getState();
            const token = state?.authentication?.token || localStorage.getItem('token');
            console.log("Token:", token);
            const res = await fetch(`${POSTS}/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    ...(token ? { Authorization: `Bearer ${token}` } : {}),
                },
            });

            if (!res.ok) throw new Error(`Failed to fetch post: ${res.status}`);
            return await res.json();
        } catch (error) {
            return thunkApi.rejectWithValue(error.message);
        }
    }
);

export const update_post = createAsyncThunk(
    "posts/update_post",
    async ({ id, data }, thunkApi) => {
        try {
            const res = await fetch(`${POSTS}/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!res.ok) throw new Error(`Failed to update post: ${res.status}`);
            return await res.json();
        } catch (error) {
            return thunkApi.rejectWithValue(error.message);
        }
    }
);
export const delete_post = createAsyncThunk(
    "posts/delete_post",
    async (id, thunkApi) => {
        try {
            const res = await fetch(`${POSTS}/${id}`, {
                method: "DELETE",
            });

            if (!res.ok) throw new Error(`Failed to delete post: ${res.status}`);
            return { id }; // return deleted ID to remove it from state
        } catch (error) {
            return thunkApi.rejectWithValue(error.message);
        }
    }
);


// Assign & Carriers
export const get_carriers = createAsyncThunk(
    "get_carriers",
    async (data, thunkApi) => {
        try {
            // attempt to read token from redux state, fallback to localStorage
            const state = thunkApi.getState();
            const token = state?.authentication?.token || localStorage.getItem('token');
            console.log(data, "data in get carriers thunk");
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token ? { Authorization: `Bearer ${token}` } : {}),
                },
                body: JSON.stringify(data),
            };

            const res = await fetch(GET_CARRIER, requestOptions);
            if (!res.ok) {
                const err = await res.json().catch(() => ({ message: res.statusText }));
                return thunkApi.rejectWithValue(err.message || `Failed to get carriers: ${res.status}`);
            }
            return await res.json();
        } catch (error) {
            return thunkApi.rejectWithValue(error.message || 'Network error');
        }
    }
)
export const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        removeMessage: (state) => {
            state.message = "";
            state.status = "";
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        // 🟢 Add Post
        builder
            .addCase(add_post.pending, (state) => {
                state.loading = true;
                state.status = "pending";
                state.message = "";
            })
            .addCase(add_post.fulfilled, (state, action) => {
                state.loading = false;
                state.status = "fulfilled";
                state.message = action.payload?.message || "Post created successfully";
                if (action.payload?.data) {
                    state.posts.push(action.payload.data);
                }
            })
            .addCase(add_post.rejected, (state, action) => {
                state.loading = false;
                state.status = "rejected";
                state.message = action.payload || "Failed to create post";
            });

        // 🟢 Get All Posts
        builder
            .addCase(get_posts.pending, (state) => {
                state.loading = true;
                state.status = "pending";
                console.log(state.posts, "posts in slice pending");

            })
            .addCase(get_posts.fulfilled, (state, action) => {
                state.loading = false;
                state.status = "fulfilled";
                state.posts = action.payload?.data || action.payload;
                state.message = "Posts fetched successfully";
                console.log(state.posts, "posts in slice fullfillled");
            })
            .addCase(get_posts.rejected, (state, action) => {
                state.loading = false;
                state.status = "rejected";
                state.message = action.payload || "Failed to fetch posts";
                console.log(state.posts, "posts in slice rejected");

            });

        // 🟢 Get Post by ID
        builder
            .addCase(get_post_by_id.pending, (state) => {
                state.loading = true;
                state.status = "pending";
            })
            .addCase(get_post_by_id.fulfilled, (state, action) => {
                state.loading = false;
                state.status = "fulfilled";
                state.currentPost = action.payload?.data || action.payload;
                state.message = "Post fetched successfully";
            })
            .addCase(get_post_by_id.rejected, (state, action) => {
                state.loading = false;
                state.status = "rejected";
                state.message = action.payload || "Failed to fetch post details";
            });

        // 🟢 Update Post
        builder
            .addCase(update_post.pending, (state) => {
                state.loading = true;
                state.status = "pending";
            })
            .addCase(update_post.fulfilled, (state, action) => {
                state.loading = false;
                state.status = "fulfilled";
                const updatedPost = action.payload?.data || action.payload;
                state.posts = state.posts.map((p) =>
                    p.id === updatedPost.id ? updatedPost : p
                );
                if (state.currentPost?.id === updatedPost.id) {
                    state.currentPost = updatedPost;
                }
                state.message = "Post updated successfully";
            })
            .addCase(update_post.rejected, (state, action) => {
                state.loading = false;
                state.status = "rejected";
                state.message = action.payload || "Failed to update post";
            });

        // 🟢 Delete Post
        builder
            .addCase(delete_post.pending, (state) => {
                state.loading = true;
                state.status = "pending";
            })
            .addCase(delete_post.fulfilled, (state, action) => {
                state.loading = false;
                state.status = "fulfilled";
                state.posts = state.posts.filter((p) => p.id !== action.payload.id);
                state.message = "Post deleted successfully";
            })
            .addCase(delete_post.rejected, (state, action) => {
                state.loading = false;
                state.status = "rejected";
                state.message = action.payload || "Failed to delete post";
            });
             builder
            .addCase(get_carriers.pending, (state) => {
                state.loading = true;
                state.status = "pending";
                state.message = "";
            })
            .addCase(get_carriers.fulfilled, (state, action) => {
                state.loading = false;
                state.status = "fulfilled";
                state.message = action.payload?.message || "Carriers fetched successfully";
                if (action.payload?.data) {
                    state.carriers = action.payload.data;
                }
            })
            .addCase(get_carriers.rejected, (state, action) => {
                state.loading = false;
                state.status = "rejected";
                state.message = action.payload || "Failed to get carriers";
            });
    },
});

export const { removeMessage } = postsSlice.actions;
export default postsSlice.reducer;