import {
  forgotPasswordApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  resetPasswordApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import {
  createAsyncThunk,
  createSlice,
  isAnyOf,
  SerializedError
} from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import {
  deleteCookie,
  getCookie,
  setCookie
} from '../../../../src/utils/cookie';

type TUserState = {
  data: TUser | null;
  isLoading: boolean;
  isAuthChecked: boolean;
  error: SerializedError | null;
};

const initialState: TUserState = {
  data: null,
  isLoading: false,
  isAuthChecked: false,
  error: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authChecked: (state) => {
      state.isAuthChecked = true;
    },
    userLogout: (state) => {
      state.data = null;
    }
  },
  selectors: {
    userDataSelector: (state) => state.data,
    isAuthCheckedSelector: (state) => state.isAuthChecked,
    errorSelector: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.data = { ...action.payload };
        state.isAuthChecked = true;
        state.error = null;
        state.isLoading = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.data = { ...action.payload };
        state.isAuthChecked = true;
        state.error = null;
        state.isLoading = false;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.data = { ...action.payload.user };
        state.isAuthChecked = true;
        state.error = null;
        state.isLoading = false;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.data = { ...action.payload.user };
        state.error = null;
        state.isLoading = false;
      })
      .addMatcher(
        isAnyOf(forgotPassword.fulfilled, resetPassword.fulfilled),
        (state) => {
          state.error = null;
          state.isLoading = false;
        }
      )
      .addMatcher(
        isAnyOf(
          loginUser.pending,
          registerUser.pending,
          getUser.pending,
          updateUser.pending,
          forgotPassword.pending,
          resetPassword.pending
        ),
        (state) => {
          state.error = null;
          state.isLoading = true;
        }
      )
      .addMatcher(
        isAnyOf(
          loginUser.rejected,
          registerUser.rejected,
          getUser.rejected,
          updateUser.rejected,
          forgotPassword.rejected,
          resetPassword.rejected
        ),
        (state, action) => {
          state.error = action.error;
          state.isLoading = false;
        }
      );
  }
});

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (registerData: TRegisterData) => {
    const res = await registerUserApi(registerData);
    setCookie('accessToken', res.accessToken);
    localStorage.setItem('refreshToken', res.refreshToken);
    return res.user;
  }
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (loginData: TLoginData) => {
    const res = await loginUserApi(loginData);
    setCookie('accessToken', res.accessToken);
    localStorage.setItem('refreshToken', res.refreshToken);
    return res.user;
  }
);

export const getUser = createAsyncThunk('user/getUser', async () =>
  getUserApi()
);

export const forgotPassword = createAsyncThunk(
  'user/forgotPassword',
  async (data: { email: string }) => forgotPasswordApi(data)
);

export const resetPassword = createAsyncThunk(
  'user/resetPassword',
  async (data: { password: string; token: string }) => resetPasswordApi(data)
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (updateUserData: Partial<TRegisterData>) =>
    updateUserApi(updateUserData)
);

export const checkUserAuth = createAsyncThunk(
  'user/checkUser',
  (_, { dispatch }) => {
    if (getCookie('accessToken')) {
      dispatch(getUser()).finally(() => {
        dispatch(userActions.authChecked());
      });
    } else {
      dispatch(userActions.authChecked());
    }
  }
);

export const logoutUser = createAsyncThunk(
  'user/logoutUser',
  (_, { dispatch }) => {
    logoutApi().then(() => {
      localStorage.clear();
      deleteCookie('accessToken');
      dispatch(userActions.userLogout());
    });
  }
);

export const { reducer: userReducer, actions: userActions } = userSlice;

export const { userDataSelector, isAuthCheckedSelector, errorSelector } =
  userSlice.selectors;
