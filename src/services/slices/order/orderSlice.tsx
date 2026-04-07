import { getOrderByNumberApi, getOrdersApi, orderBurgerApi } from '@api';
import {
  createAsyncThunk,
  createSlice,
  SerializedError
} from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TOrdersState = {
  orderModalData: TOrder | null;
  orderRequest: boolean;
  orders: TOrder[] | [];
  error: SerializedError | null;
};

const initialState: TOrdersState = {
  orders: [],
  orderModalData: null,
  orderRequest: false,
  error: null
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    resetOrderModalData: (state) => {
      state.orderModalData = null;
    }
  },
  selectors: {
    ordersSelector: (state) => state.orders,
    orderRequestSelector: (state) => state.orderRequest,
    orderModalDataSelector: (state) => state.orderModalData
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrderByNumber.pending, (state) => {
        state.error = null;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.error = null;
        state.orderModalData = action.payload.orders[0];
      })
      .addCase(getOrderByNumber.rejected, (state, action) => {
        state.error = action.error;
      })
      .addCase(createOrder.pending, (state) => {
        state.error = null;
        state.orderRequest = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.error = null;
        state.orderRequest = false;
        state.orderModalData = action.payload.order;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.error = action.error;
        state.orderRequest = false;
      })
      .addCase(getOrders.pending, (state) => {
        state.error = null;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.error = null;
        state.orders = action.payload;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.error = action.error;
      });
  }
});

export const getOrders = createAsyncThunk('orders/getOrders', async () =>
  getOrdersApi()
);

export const getOrderByNumber = createAsyncThunk(
  'orders/getOrderByNumber',
  async (num: number) => getOrderByNumberApi(num)
);

export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async (data: string[]) => orderBurgerApi(data)
);

export const { reducer: ordersReducer, actions: ordersActions } = orderSlice;

export const { ordersSelector, orderModalDataSelector, orderRequestSelector } =
  orderSlice.selectors;
