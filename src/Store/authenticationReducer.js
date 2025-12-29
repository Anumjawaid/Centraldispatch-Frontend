import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { REGISTRATION, LOGIN,GET_PROFILE } from '../Constants/URL'

let initialState = {
    "name": "",
    "email": "",
    "password": "",
    "businessType": "",
    "companyLegalName": "",
    "confirmEmail": "",
    "country": "",
    "city": "",
    "companyAddress": "",
    "state": "",
    "zipCode": "",
    "operationHoursStart": "",
    "operationHoursEnd": "",
    "businessPhone": "",
    loading: false,
    status: "",
    message: "",
    user: null,
    token: null,
}

export const register_user = createAsyncThunk(
    "register_user",
    async (data, thunkApi) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };
        const res = await fetch(REGISTRATION, requestOptions)
        return res.json();
    }
)
// Get My Info 
export const get_mydetails = createAsyncThunk(
    "posts/get_posts",
    async (params = {}, thunkApi) => {
        try {
            // Build query string dynamically
            const queryString = new URLSearchParams(
                Object.entries(params).filter(([_, v]) => v !== undefined && v !== "")
            ).toString();

            const url = `${GET_PROFILE}?${queryString}`;
            console.log("Fetching:", url);

            const res = await fetch(url, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });

            if (!res.ok) throw new Error(`Failed to fetch posts: ${res.status}`);
            return await res.json();
        } catch (error) {
            return thunkApi.rejectWithValue(error.message);
        }
    }
);

// Login User

export const login_user = createAsyncThunk(
    "login_user",
    async (data, thunkApi) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };
        const res = await fetch(LOGIN, requestOptions)
        return res.json();
    }
)

export const authSlice = createSlice({
    name: "authentication",
    initialState,
    reducers: {
        removeMessage: (state, action) => {
            state.message = ""
        }


    },
    extraReducers: (builder) => {
        builder.addCase(register_user.pending, (state) => {
            state.loading = true;
            state.message = "";
            state.status = "pending";
        });

        builder.addCase(register_user.fulfilled, (state, action) => {
            console.log(action.payload, "Action Payload==FullFilled")
            state.loading = false;

            state.message = action.payload.message || "User created successfully";
            state.status = "fulfilled";

        });

        builder.addCase(register_user.rejected, (state, action) => {
            console.log(action.payload, "Action Payload--Rejected")
            state.loading = false;
            state.message = "Unable to process request, try again later.";
            state.status = "rejected";
        });
        builder.addCase(login_user.pending, (state, action) => {

        })
        builder.addCase(login_user.fulfilled, (state, action) => {
            console.log("Fullfilled", action.payload)
            const payload = action.payload || {};
            // try to extract token and user
            const accessToken = payload.accessToken
            if (!accessToken && !payload.message) {
                state.message = "Unable To Process Request Atm,Try Again Later";
                state.status = 'rejected';
            } else {
                state.token = accessToken || null;
                console.log(accessToken,"accessToken in reducer");
                state.message = payload.message || "Successfully logged in";
                state.status = 'fulfilled';
            }

        })
        builder.addCase(login_user.rejected, (state, action) => {
            console.log("Rejected", action.payload)
            if (action.payload == undefined) {
                state.message = "Unable To Process Request Atm,Try Again Later"
                state.status = 'rejected'
            }

        })
    }
})

export const { removeMessage } = authSlice.actions