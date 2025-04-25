import { Authenticated } from '@refinedev/core';
import { ErrorComponent, ThemedLayoutV2 } from '@refinedev/mantine';
import { CatchAllNavigate, NavigateToResource } from '@refinedev/react-router-v6';
import { lazy } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';

import { Footer } from '../components/Footer/Footer';
import { Header } from '../components/header';
import { LoginPage } from '../pages/login/LoginPage';
import { Logo } from '../shared/ui/Logo';
import { ForRegisteredInBot } from '../widgets';
import { ForSubscribedUser } from '../widgets/ForSubscribedUser';
import { Sider } from '../widgets/Sider';

const UpdatePasswordPage = lazy(() => import('../pages/updatePassword'));
const KeywordCreate = lazy(() => import('../pages/keywords/create'));
const KeywordEdit = lazy(() => import('../pages/keywords/edit'));
const KeywordList = lazy(() => import('../pages/keywords/list'));
const KeywordShow = lazy(() => import('../pages/keywords/show'));
const GroupCreate = lazy(() => import('../pages/groups/create'));
const GroupEdit = lazy(() => import('../pages/groups/edit'));
const GroupList = lazy(() => import('../pages/groups/list'));
const GroupShow = lazy(() => import('../pages/groups/show'));
const ArchivedGroupList = lazy(() => import('../pages/archivedGroups/list'));
const ArchivedGroupShow = lazy(() => import('../pages/archivedGroups/show'));
const BotsListPage = lazy(() => import('../pages/bots/list'));
const ShowBotPage = lazy(() => import('../pages/bots/show'));
const AnalyticsList = lazy(() => import('../pages/analytics/AnalyticsPage'));
const UserCreate = lazy(() => import('../pages/users/create'));
const UserEdit = lazy(() => import('../pages/users/edit'));
const UserList = lazy(() => import('../pages/users/list'));
const UserShow = lazy(() => import('../pages/users/show'));
const AccountCreate = lazy(() => import('../pages/accounts/create'));
const AccountEdit = lazy(() => import('../pages/accounts/edit'));
const AccountList = lazy(() => import('../pages/accounts/list'));
const AccountShow = lazy(() => import('../pages/accounts/show'));
const LeadEdit = lazy(() => import('../pages/leads/edit'));
const LeadList = lazy(() => import('../pages/leads/list'));
const LeadShow = lazy(() => import('../pages/leads/show'));
const LeadsCreate = lazy(() => import('../pages/leads/create'));
const StopwordCreate = lazy(() => import('../pages/stopwords/create'));
const StopwordEdit = lazy(() => import('../pages/stopwords/edit'));
const StopwordList = lazy(() => import('../pages/stopwords/list'));
const StopwordShow = lazy(() => import('../pages/stopwords/show'));
const PricingPage = lazy(() => import('../pages/pricing/PricingPage'));
const ProfilePage = lazy(() => import('../pages/profile/ProfilePage'));
const RegisterPage = lazy(() => import('../pages/register/RegisterPage'));
const ForgotPasswordPage = lazy(() => import('../pages/forgotPassword'));

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
          <Route
            index
            element={
              <ForSubscribedUser>
                <ForRegisteredInBot>
                  <UserList />
                </ForRegisteredInBot>
              </ForSubscribedUser>
            }
          />
          <Route path="create" element={<UserCreate />} />
          <Route path="edit/:id" element={<UserEdit />} />
          <Route path="show/:id" element={<UserShow />} />
        </Route>

        <Route path="/bots">
          <Route
            index
            element={
              <ForSubscribedUser>
                <BotsListPage />
              </ForSubscribedUser>
            }
          />
          <Route path="show/:id" element={<ShowBotPage />} />
        </Route>

        <Route path="/accounts">
          <Route
            index
            element={
              <ForSubscribedUser>
                <ForRegisteredInBot>
                  <AccountList />
                </ForRegisteredInBot>
              </ForSubscribedUser>
            }
          />
          <Route path="create" element={<AccountCreate />} />
          <Route path="edit/:id" element={<AccountEdit />} />
          <Route path="show/:id" element={<AccountShow />} />
        </Route>
        <Route path="/groups">
          <Route
            index
            element={
              <ForSubscribedUser>
                <ForRegisteredInBot>
                  <GroupList />
                </ForRegisteredInBot>
              </ForSubscribedUser>
            }
          />
          <Route path="create" element={<GroupCreate />} />
          <Route path="edit/:id" element={<GroupEdit />} />
          <Route path="show/:id" element={<GroupShow />} />
        </Route>
        <Route path="/groups/archived">
          <Route
            index
            element={
              <ForSubscribedUser>
                <ForRegisteredInBot>
                  <ArchivedGroupList />
                </ForRegisteredInBot>
              </ForSubscribedUser>
            }
          />
          <Route path="show/:id" element={<ArchivedGroupShow />} />
        </Route>
        <Route path="/keywords">
          <Route
            index
            element={
              <ForSubscribedUser>
                <ForRegisteredInBot>
                  <KeywordList />
                </ForRegisteredInBot>
              </ForSubscribedUser>
            }
          />
          <Route path="create" element={<KeywordCreate />} />
          <Route path="edit/:id" element={<KeywordEdit />} />
          <Route path="show/:id" element={<KeywordShow />} />
        </Route>
        <Route path="/stopwords">
          <Route
            index
            element={
              <ForSubscribedUser>
                <ForRegisteredInBot>
                  <StopwordList />
                </ForRegisteredInBot>
              </ForSubscribedUser>
            }
          />
          <Route path="create" element={<StopwordCreate />} />
          <Route path="edit/:id" element={<StopwordEdit />} />
          <Route path="show/:id" element={<StopwordShow />} />
        </Route>
        <Route path="/leads">
          <Route
            index
            element={
              <ForSubscribedUser>
                <ForRegisteredInBot>
                  <LeadList />
                </ForRegisteredInBot>
              </ForSubscribedUser>
            }
          />
          <Route path="create" element={<LeadsCreate />} />
          <Route path="edit/:id" element={<LeadEdit />} />
          <Route path="show/:id" element={<LeadShow />} />
        </Route>
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route
          path="/analytics"
          element={
            <ForSubscribedUser>
              <ForRegisteredInBot>
                <AnalyticsList />
              </ForRegisteredInBot>
            </ForSubscribedUser>
          }
        />
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
