import * as React from 'react';
import {TextField, DateField, List, Datagrid } from 'react-admin';


export const ManagementLogs = props => (
    <List {...props} perPage={10}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <DateField source="created_on" />
            <TextField source="component" />
            <TextField source="level" />
            <TextField source="message" />
        </Datagrid>
    </List>
);