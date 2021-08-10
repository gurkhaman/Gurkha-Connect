import * as React from "react";
import { RouteWithoutLayout } from "react-admin";
import { Route } from 'react-router-dom';
import UserRegistration from '../tabs/user_registration';

export default [
    <RouteWithoutLayout exact path="/registration" component={UserRegistration} />,
];