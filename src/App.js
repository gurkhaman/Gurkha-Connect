import * as React from 'react';
import { Admin, Resource, ListGuesser, ShowGuesser } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import Dashboard from './dashboard/Dashboard'
import { TemplateList } from './template_library/templates'
import { InstanceList } from './snapshot_library/snapshots';

const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');


const App = () => (
  <Admin dashboard={Dashboard}
    dataProvider={dataProvider} >
    <Resource name="users" options={{label: 'Templates'}} list={TemplateList}/>
    <Resource name="posts" options={{label: 'Snapshots'}} list={ListGuesser} />
  </Admin>);

export default App;
