import * as React from 'react';
import { Admin, Resource, ListGuesser, EditGuesser, Edit } from 'react-admin';
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
import {PostEdit, PostList, PostCreate} from './tabs/posts';
import customRoutes from './utilities/customRoutes';

//  const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');

const fakedataProvider = fakeDataProvider({
  showsnapshots: [
    {
      snap_id: "123",
      snap_name: "snap1",
      cloud: "openstack"
    },
    {
      snap_id: "456",
      snap_name: "snap2",
      cloud: "openstack"

    },
    {
      snap_id: "789",
      snap_name: "snap3",
      cloud: "cloudstack"
    }
  ]
})


const App = () => (
  // layout={(props) => <CustomLayout {...props} menu={Menu} />}
  <Admin dataProvider={dataProvider} dashboard={Dashboard} >
    <Resource name="users" list={TemplateList} />
    {/* <Resource name="posts" list={InstanceList} /> */}
    {/* <Resource name="cloudstack" list={CloudStack} /> */}
    {/* <Resource name="openstack" list={OpenStack} /> */}
    <Resource name="posts" list={PostList} create={PostCreate} />
    <Resource name="logs" />
    {/* <Resource name="showsnapshots" list={Snapshotlist} create={SnapshotCreate} /> */}
  </Admin>);

export default App;
