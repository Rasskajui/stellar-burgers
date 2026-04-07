import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { v4 as uuidv4 } from 'uuid';

type TBurgerConstructorState = {
  isLoading: boolean;
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
};

const initialState: TBurgerConstructorState = {
  isLoading: false,
  bun: null,
  ingredients: []
};

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        action.payload.type === 'bun'
          ? (state.bun = action.payload)
          : state.ingredients.push(action.payload);
      },
      prepare: (payload: TIngredient) => ({
        payload: { ...payload, id: uuidv4() }
      })
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.id !== action.payload
      );
    },
    moveIngredientUp: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      const index = state.ingredients.findIndex(
        (item) => item.id === action.payload.id
      );
      state.ingredients.splice(index, 1);
      state.ingredients.splice(index - 1, 0, action.payload);
    },
    moveIngredientDown: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      const index = state.ingredients.findIndex(
        (item) => item.id === action.payload.id
      );
      state.ingredients.splice(index, 1);
      state.ingredients.splice(index + 1, 0, action.payload);
    },
    resetConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    }
  },
  selectors: {
    getBurgerConstructorSelector: (state) => state,
    getLoadingBurgerConstructorSelector: (state) => state.isLoading
  }
});

export const {
  reducer: burgerConstructorReducer,
  actions: burgerConstructorActions
} = burgerConstructorSlice;

export const {
  getBurgerConstructorSelector,
  getLoadingBurgerConstructorSelector
} = burgerConstructorSlice.selectors;
