import * as React from 'react';
import { Admin, Resource, ListGuesser, EditGuesser, Edit, List, ShowGuesser } from 'react-admin';
import auth_provider from './auth_provider/auth_provider';
import jsonServerProvider from 'ra-data-json-server';
import { CustomLayout } from './utilities/layout';
import Menu from './utilities/menu'
import Dashboard from './dashboard/Dashboard'
import { Snapshotlist, SnapshotEdit, SnapshotCreate } from './tabs/snapshots';
import authProvider from './auth_provider/auth_provider'
import GroupIcon from '@material-ui/icons/Group';
import fakeDataProvider from 'ra-data-fakerest';
import dataProvider from './data_provider/data_provider';
import log_monitor_dataprovider from './data_provider/log_monitor_dataprovider';
import { PostEdit, PostList, PostCreate } from './tabs/posts';
import customRoutes from './utilities/customRoutes';
import { InstanceList } from './tabs/instances';
import template_dataprovider from './data_provider/template_dataprovider';
import { TemplateList, TemplateListWithDrawer } from './tabs/templates/template_list'
import { TemplateUpload } from './tabs/templates/template_upload';
import LoginForm from './tabs/login_layout';
import { ComponentLogs } from './tabs/logs/component_logs';
//  const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');

const fakedataProvider = fakeDataProvider({
  check: [
    {
      id: 0,
      nova: false,
      heat: false,
      cinder: false,
      neutron: false,
      keystone: false,
      swift: false,
      agent: false,
      management: false,
    }
  ]
})

const App = () => (
  // layout={(props) => <CustomLayout {...props} menu={Menu} />}
  <Admin
    dataProvider={template_dataprovider}
    dashboard={Dashboard}
    // authProvider={authProvider}
    customRoutes={customRoutes}
    loginPage={LoginForm}
  >
    <Resource name="users" />
    <Resource name="check" />
    <Resource name="showsnapshots" list={Snapshotlist} />
    <Resource name="showinstances" list={InstanceList} />
    <Resource name="snaps" />
    <Resource name="posts" list={PostList} create={PostCreate} />
    <Resource name="nova/log" list={ComponentLogs} />
    <Resource name="heat/log" list={ComponentLogs} />
    <Resource name="cinder/log" list={ComponentLogs} />
    <Resource name="neutron/log" list={ComponentLogs} />
    <Resource name="keystone/log" list={ComponentLogs} />
    <Resource name="swift/log" list={ComponentLogs} />
    <Resource name="agent/log" list={ComponentLogs} />
    <Resource name="management/log" list={ComponentLogs} />
    <Resource name="template" list={TemplateList} create={TemplateUpload} />
  </Admin>);

export default App;
