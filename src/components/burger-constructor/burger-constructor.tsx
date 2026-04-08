import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../../src/services/store';
import { getBurgerConstructorSelector } from '../../../src/services/slices/burger-constructor/burgerConstructorSlice';
import { useNavigate } from 'react-router-dom';
import { userDataSelector } from '../../../src/services/slices/user/userSlice';
import {
  createOrder,
  orderModalDataSelector,
  orderRequestSelector,
  ordersActions
} from '../../../src/services/slices/order/orderSlice';

export const BurgerConstructor: FC = () => {
  const navigate = useNavigate();
  const user = useSelector(userDataSelector);
  const dispatch = useDispatch();

  const constructorItems = useSelector(getBurgerConstructorSelector);

  const orderRequest = useSelector(orderRequestSelector);

  const orderModalData = useSelector(orderModalDataSelector);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;

    if (!user) return navigate('/login');

    const data = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((ingredient) => ingredient._id),
      constructorItems.bun._id
    ];

    dispatch(createOrder(data));
  };
  const closeOrderModal = () => {
    dispatch(ordersActions.resetOrderModalData());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
