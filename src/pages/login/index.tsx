// import { AuthPage } from '@refinedev/mantine';

import { ForgotPasswordPage } from '../forgotPassword';
import { RegisterPage } from '../register/RegisterPage';
import { UpdatePasswordPage } from '../updatePassword';
import { LoginPage } from './LoginPage';

type LoginPageProps = {
  type?: 'register' | 'forgotPassword' | 'updatePassword';
};
export const Login = ({ type }: LoginPageProps) => {
  switch (type) {
    case 'register':
      return <RegisterPage />;
    case 'forgotPassword':
      return <ForgotPasswordPage />;
    case 'updatePassword':
      return <UpdatePasswordPage />;
    default:
      return <LoginPage />;
  }
};
