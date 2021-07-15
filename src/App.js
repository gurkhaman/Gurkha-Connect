import * as React from 'react';
import { Admin, Resource, ListGuesser, ShowGuesser } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import Dashboard from './dashboard/Dashboard'
import { TemplateList } from './template/templates'
import { InstanceList } from './snapshot/snapshots';
import authProvider from './auth_provider/auth_provider'

const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');


const App = () => (
  <Admin dashboard={Dashboard}
    dataProvider={dataProvider}
    authProvider={authProvider} >
    <Resource name="users" options={{ label: 'Templates' }} list={TemplateList} />
    <Resource name="posts" options={{ label: 'Snapshots' }} list={InstanceList} />
  </Admin>);

export default App;
