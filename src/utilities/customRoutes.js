import * as React from "react";
import { RouteWithoutLayout } from "react-admin";
import { Route } from 'react-router-dom';
import UserRegistration from '../tabs/user_registration_layout';
import LoginForm from '../tabs/login_layout';

export default [
    <RouteWithoutLayout exact path="/registration" component={UserRegistration} />,
    <RouteWithoutLayout exact path="/login" component={LoginForm}/>,
];