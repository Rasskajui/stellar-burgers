import { Navigate, useLocation } from 'react-router-dom';
import { Preloader } from '@ui';
import { useSelector } from '@../../../src/services/store';
import { ReactElement, FC } from 'react';
import {
  isAuthCheckedSelector,
  userDataSelector
} from '../../../src/services/slices/user/userSlice';

type TProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: ReactElement;
};

export const ProtectedRoute: FC<TProtectedRouteProps> = ({
  onlyUnAuth = false,
  children
}) => {
  const user = useSelector(userDataSelector);
  const isAuthChecked = useSelector(isAuthCheckedSelector);

  const location = useLocation();

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (onlyUnAuth && user) {
    const { from } = location.state || { from: { pathname: '/' } };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  return children;
};
