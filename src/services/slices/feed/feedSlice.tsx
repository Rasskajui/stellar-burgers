import { getFeedsApi } from '@api';
import {
  createAsyncThunk,
  createSlice,
  SerializedError
} from '@reduxjs/toolkit';
import { TOrdersData } from '@utils-types';

type TFeedState = {
  feed: TOrdersData;
  error: SerializedError | null;
};

const initialState: TFeedState = {
  feed: {
    orders: [],
    total: 0,
    totalToday: 0
  },
  error: null
};

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  selectors: {
    feedSelector: (state) => state.feed,
    ordersSelector: (state) => state.feed.orders
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeed.pending, (state) => {
        state.error = null;
      })
      .addCase(getFeed.fulfilled, (state, action) => {
        state.error = null;
        state.feed = action.payload;
      })
      .addCase(getFeed.rejected, (state, action) => {
        state.error = action.error;
      });
  }
});

export const getFeed = createAsyncThunk(
  'feed/getFeed',
  async () => await getFeedsApi()
);

export const { reducer: feedReducer, actions: feedActions } = feedSlice;

export const { feedSelector, ordersSelector } = feedSlice.selectors;
