import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useDispatch } from 'react-redux';
import { burgerConstructorActions } from '../../../src/services/slices/burger-constructor/burgerConstructorSlice';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispacth = useDispatch();

    const handleMoveDown = () => {
      dispacth(burgerConstructorActions.moveIngredientDown(ingredient));
    };

    const handleMoveUp = () => {
      dispacth(burgerConstructorActions.moveIngredientUp(ingredient));
    };

    const handleClose = () => {
      dispacth(burgerConstructorActions.removeIngredient(ingredient.id));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
