import { combineReducers, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

import { ingredientsReducer } from './slices/ingredients/ingredientsSlice';
import { burgerConstructorReducer } from './slices/burger-constructor/burgerConstructorSlice';
import { userReducer } from './slices/user/userSlice';
import { ordersReducer } from './slices/order/orderSlice';
import { feedReducer } from './slices/feed/feedSlice';

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  user: userReducer,
  orders: ordersReducer,
  feed: feedReducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
