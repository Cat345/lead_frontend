import { Authenticated } from '@refinedev/core';
import { ErrorComponent, ThemedLayoutV2 } from '@refinedev/mantine';
import { CatchAllNavigate, NavigateToResource } from '@refinedev/react-router-v6';
import { Outlet, Route, Routes } from 'react-router-dom';

import { Footer } from '../components/Footer/Footer';
import { Header } from '../components/header';
import { AccountCreate, AccountEdit, AccountList, AccountShow } from '../pages/accounts';
import AnalyticsList from '../pages/analytics/AnalyticsPage';
import { ArchivedGroupList, ArchivedGroupShow } from '../pages/archivedGroups';
import { BotsListPage, EditBotPage, ShowBotPage } from '../pages/bots';
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
import { UpdatePasswordPage } from '../pages/updatePassword';
import { UserCreate, UserEdit, UserList, UserShow } from '../pages/users';
import { Logo } from '../shared/ui/Logo';
import { ForRegisteredInBot } from '../widgets';
import { ForSubscribedUser } from '../widgets/ForSubscribedUser';
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
          <Route path="edit/:id" element={<EditBotPage />} />
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
