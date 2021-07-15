import { Layout } from 'react-admin';
import { Menu } from './menu';

export const CustomLayout = (props) => <Layout {...props} menu={Menu} />;