import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import {
  getOrders,
  ordersSelector
} from '../../../src/services/slices/order/orderSlice';
import { useDispatch, useSelector } from '../../../src/services/store';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector(ordersSelector);

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
