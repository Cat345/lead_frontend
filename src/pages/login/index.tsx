// import { AuthPage } from '@refinedev/mantine';

import { Logo } from '../../shared/ui/Logo';
import { LoginPage } from './LoginPage';

export const Login = () => {
  return (
    // <AuthPage
    //   type="login"
    //   formProps={{
    //     initialValues: { email: 'test@test.test', password: 'test' },
    //   }}
    // />
    <LoginPage title={<Logo />} />
  );
};
