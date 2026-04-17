import { getIngredientsApi } from '@api';
import {
  createAsyncThunk,
  createSlice,
  SerializedError
} from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

type TIngredientsState = {
  isLoading: boolean;
  error: null | SerializedError;
  data: TIngredient[];
};

const initialState: TIngredientsState = {
  isLoading: false,
  error: null,
  data: []
};

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    getIngredientsSelector: (state) => state.data,
    getLoadingIngredientsSelector: (state) => state.isLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      });
  }
});

export const getIngredients = createAsyncThunk(
  'ingredients/getIngredients',
  async () => await getIngredientsApi()
);

export const { reducer: ingredientsReducer, actions: ingredientsAction } =
  ingredientsSlice;

export const { getIngredientsSelector, getLoadingIngredientsSelector } =
  ingredientsSlice.selectors;
