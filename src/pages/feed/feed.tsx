import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import {
  getFeed,
  ordersSelector
} from '../../../src/services/slices/feed/feedSlice';
import { useDispatch, useSelector } from '../../../src/services/store';

export const Feed: FC = () => {
  const orders: TOrder[] = useSelector(ordersSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFeed());
  }, [dispatch]);

  if (!orders.length) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        dispatch(getFeed());
      }}
    />
  );
};
