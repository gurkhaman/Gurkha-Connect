import * as React from 'react';
import { Admin, Resource, ListGuesser, ShowGuesser } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import { CustomLayout } from './utilities/layout';
import Menu from './utilities/menu'
import Dashboard from './dashboard/Dashboard'
import { TemplateList } from './tabs/templates'
import { InstanceList } from './tabs/snapshots';
import authProvider from './auth_provider/auth_provider'
import GroupIcon from '@material-ui/icons/Group';

const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');


const App = () => (

  <Admin layout={(props) => <CustomLayout {...props} menu={Menu} />} dataProvider={dataProvider} dashboard={Dashboard} >
    <Resource name="users" options={{ label: 'Templates' }} list={TemplateList} />
    <Resource name="posts" options={{ label: 'Snapshots' }} list={InstanceList} />
    <Resource name="temp" options={{ label: 'CloudStack' }} list={ListGuesser} />
  </Admin>);

export default App;
