import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../../src/services/store';
import {
  errorSelector,
  loginUser
} from '../../../src/services/slices/user/userSlice';
import { useLocation, useNavigate } from 'react-router-dom';

export const Login: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const error = useSelector(errorSelector);
  const { from } = location.state || { from: { pathname: '/' } };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      await dispatch(loginUser({ email, password })).unwrap();

      navigate(from.pathname, { replace: true });
    } catch (_) {}
  };

  return (
    <LoginUI
      errorText={error?.message}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
