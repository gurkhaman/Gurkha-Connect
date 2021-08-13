import * as React from 'react';
import { Admin, Resource, ListGuesser, EditGuesser, Edit, List } from 'react-admin';
import auth_provider from './auth_provider/auth_provider';
import jsonServerProvider from 'ra-data-json-server';
import { CustomLayout } from './utilities/layout';
import Menu from './utilities/menu'
import Dashboard from './dashboard/Dashboard'
import { TemplateList } from './tabs/templates'
import { Snapshotlist, SnapshotEdit, SnapshotCreate } from './tabs/snapshots';
import { CloudStack } from './tabs/cloudstack';
import { OpenStack } from "./tabs/openstack";
import { nestList } from "./lists/lists";
import authProvider from './auth_provider/auth_provider'
import GroupIcon from '@material-ui/icons/Group';
import fakeDataProvider from 'ra-data-fakerest';
import dataProvider from './data_provider/data_provider';
import log_monitor_dataprovider from './data_provider/log_monitor_dataprovider';
import { PostEdit, PostList, PostCreate } from './tabs/posts';
import customRoutes from './utilities/customRoutes';
import { NovaLogs } from './tabs/logs/nova_logs';
import { ManagementLogs } from './tabs/logs/management_logs';

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
  <Admin dataProvider={log_monitor_dataprovider} dashboard={Dashboard} menu={Menu} >
    <Resource name="users" list={TemplateList} />
    <Resource name="check" />

    {/* <Resource name="posts" list={InstanceList} /> */}
    {/* <Resource name="cloudstack" list={CloudStack} /> */}
    {/* <Resource name="openstack" list={OpenStack} /> */}
    <Resource name="posts" list={PostList} create={PostCreate} />
    <Resource name="nova/log" list={NovaLogs} />
    <Resource name="heat/log" list={ListGuesser} />
    <Resource name="cinder/log" list={ListGuesser} />
    <Resource name="neutron/log" list={ListGuesser} />
    <Resource name="keystone/log" list={ListGuesser} />
    <Resource name="swift/log" list={ListGuesser} />
    <Resource name="agent/log" list={ListGuesser} />
    <Resource name="management/log" list={ManagementLogs} />
    {/* <Resource name="showsnapshots" list={Snapshotlist} create={SnapshotCreate} /> */}
  </Admin>);

export default App;
