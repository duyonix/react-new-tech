import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState: AuthState = {
  isLogin: Boolean(localStorage.getItem("access_token")),
  token: "",
  message: "",
  user: {},
  roles: [],
  sidebar: []
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state: AuthState) => {
      state.isLogin = true;
    },
    loginError: (state: AuthState, action: PayloadAction<any>) => {
      toast.error(action.payload.message);
      state.isLogin = false;
      state.user = {};
      state.roles = [];
      state.sidebar = [];
      state.message = "";
      state.token = "";
    },
    logout: (state: AuthState) => {
      state.isLogin = false;
      state.user = {};
      state.roles = [];
      state.sidebar = [];
      state.message = "";
      state.token = "";
    },
    getUserSuccess: (state: AuthState, action: PayloadAction<any>) => {
      const { user } = action.payload;
      state.user = user;
    },
    getRolesSuccess: (state: AuthState, action: PayloadAction<any>) => {
      const { roles, sidebar } = action.payload;
      state.roles = roles;
      state.sidebar = sidebar;
    }
  }
});

export const authActions = {
  ...authSlice.actions,
  login: createAction(`${authSlice.name}/login`, (values: any) => ({
    payload: { values }
  })),
  getRoles: createAction(`${authSlice.name}/getRoles`)
};

const authReducer = authSlice.reducer;
export default authReducer;
