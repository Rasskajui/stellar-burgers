import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../../src/services/store';
import { useNavigate } from 'react-router-dom';
import {
  errorSelector,
  registerUser
} from '../../../src/services/slices/user/userSlice';

export const Register: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const error = useSelector(errorSelector);

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      await dispatch(
        registerUser({ name: userName, email, password })
      ).unwrap();

      navigate('/profile', { replace: true });
    } catch (_) {}
  };

  return (
    <RegisterUI
      errorText={error?.message}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
