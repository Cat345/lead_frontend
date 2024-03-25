import { Authenticated } from '@refinedev/core';
import { ErrorComponent, ThemedLayoutV2 } from '@refinedev/mantine';
import { CatchAllNavigate, NavigateToResource } from '@refinedev/react-router-v6';
import { Outlet, Route, Routes } from 'react-router-dom';

// import { ForgotPassword } from '../pages/forgotPassword';
import { Footer } from '../components/Footer/Footer';
import { Header } from '../components/header';
import { AccountCreate, AccountEdit, AccountList, AccountShow } from '../pages/accounts';
import { ForgotPasswordPage } from '../pages/forgotPassword';
import { GroupCreate, GroupEdit, GroupList, GroupShow } from '../pages/groups';
import { KeywordCreate, KeywordEdit, KeywordList, KeywordShow } from '../pages/keywords';
import { LeadsCreate } from '../pages/leads/create';
import { LeadEdit } from '../pages/leads/edit';
import { LeadList } from '../pages/leads/list';
import { LeadShow } from '../pages/leads/show';
import { LoginPage } from '../pages/login/LoginPage';
import { PricingPage } from '../pages/pricing/PricingPage';
import { ProfilePage } from '../pages/profile/ProfilePage';
import { RegisterPage } from '../pages/register/RegisterPage';
import { StopwordCreate, StopwordEdit, StopwordList, StopwordShow } from '../pages/stopwords';
import { SubscribePage } from '../pages/subscribe/SubscribePage';
import { UpdatePasswordPage } from '../pages/updatePassword';
import { UserCreate, UserEdit, UserList, UserShow } from '../pages/users';
import { Logo } from '../shared/ui/Logo';
import { Sider } from '../widgets/Sider';

export const Router = () => {
  return (
    <Routes>
      <Route
        element={
          <Authenticated key="authenticated-inner" fallback={<CatchAllNavigate to="/login" />}>
            <ThemedLayoutV2
              Header={() => <Header sticky />}
              Sider={() => <Sider />}
              OffLayoutArea={() => <Footer />}
            >
              <Outlet />
            </ThemedLayoutV2>
          </Authenticated>
        }
      >
        <Route index element={<NavigateToResource resource="groups" />} />
        <Route path="/users">
          <Route index element={<UserList />} />
          <Route path="create" element={<UserCreate />} />
          <Route path="edit/:id" element={<UserEdit />} />
          <Route path="show/:id" element={<UserShow />} />
        </Route>

        <Route path="/accounts">
          <Route index element={<AccountList />} />
          <Route path="create" element={<AccountCreate />} />
          <Route path="edit/:id" element={<AccountEdit />} />
          <Route path="show/:id" element={<AccountShow />} />
        </Route>
        <Route path="/groups">
          <Route index element={<GroupList />} />
          <Route path="create" element={<GroupCreate />} />
          <Route path="edit/:id" element={<GroupEdit />} />
          <Route path="show/:id" element={<GroupShow />} />
        </Route>
        <Route path="/keywords">
          <Route index element={<KeywordList />} />
          <Route path="create" element={<KeywordCreate />} />
          <Route path="edit/:id" element={<KeywordEdit />} />
          <Route path="show/:id" element={<KeywordShow />} />
        </Route>
        <Route path="/stopwords">
          <Route index element={<StopwordList />} />
          <Route path="create" element={<StopwordCreate />} />
          <Route path="edit/:id" element={<StopwordEdit />} />
          <Route path="show/:id" element={<StopwordShow />} />
        </Route>
        <Route path="/leads">
          <Route index element={<LeadList />} />
          <Route path="create" element={<LeadsCreate />} />
          <Route path="edit/:id" element={<LeadEdit />} />
          <Route path="show/:id" element={<LeadShow />} />
        </Route>
        <Route path="/subscribe" element={<SubscribePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="*" element={<ErrorComponent />} />
      </Route>
      <Route
        element={
          <Authenticated key="authenticated-outer" fallback={<Outlet />}>
            <NavigateToResource />
          </Authenticated>
        }
      >
        <Route path="/update-password/:uuid" element={<UpdatePasswordPage title={<Logo />} />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage title={<Logo />} />} />
        <Route path="/login" element={<LoginPage title={<Logo />} />} />
        <Route path="/register" element={<RegisterPage title={<Logo />} />} />
      </Route>
    </Routes>
  );
};
