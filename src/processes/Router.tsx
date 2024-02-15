import { Authenticated } from '@refinedev/core';
import { ErrorComponent, ThemedLayoutV2 } from '@refinedev/mantine';
import { CatchAllNavigate, NavigateToResource } from '@refinedev/react-router-v6';
import { Outlet, Route, Routes } from 'react-router-dom';

import { Header } from '../components/header';
import { AccountCreate, AccountEdit, AccountList, AccountShow } from '../pages/accounts';
import { ForgotPassword } from '../pages/forgotPassword';
import { GroupCreate, GroupEdit, GroupList, GroupShow } from '../pages/groups';
import { KeywordCreate, KeywordEdit, KeywordList, KeywordShow } from '../pages/keywords';
import { Login } from '../pages/login';
import { ProfilePage } from '../pages/profile/ProfilePage';
import { Register } from '../pages/register';
import { SubscribePage } from '../pages/subscribe/SubscribePage';
import { UpdatePassword } from '../pages/updatePassword';
import { UserCreate, UserEdit, UserList, UserShow } from '../pages/users';
import { Sider } from '../widgets/Sider';

export const Router = () => {
  return (
    <Routes>
      <Route
        element={
          <Authenticated key="authenticated-inner" fallback={<CatchAllNavigate to="/login" />}>
            <ThemedLayoutV2 Header={() => <Header sticky />} Sider={() => <Sider />}>
              <Outlet />
            </ThemedLayoutV2>
          </Authenticated>
        }
      >
        <Route index element={<NavigateToResource resource="accounts" />} />
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
        <Route path="/subscribe" element={<SubscribePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="*" element={<ErrorComponent />} />
      </Route>
      <Route
        element={
          <Authenticated key="authenticated-outer" fallback={<Outlet />}>
            <NavigateToResource />
          </Authenticated>
        }
      >
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/update-password" element={<UpdatePassword />} />
      </Route>
    </Routes>
  );
};
