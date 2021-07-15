import * as React from 'react';
import { List, Datagrid, TextField, EmailField, ReferenceField } from 'react-admin';

export const ListA = props => (
    <List {...props} title=" ">
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="name" />
            <EmailField source="email" />
            <TextField source="phone" />
        </Datagrid>
    </List>
);

export const ListB = props => (
    <List {...props} title=" ">
        <Datagrid rowClick="edit">
            <ReferenceField source="userId" reference="users"><TextField source="id" /></ReferenceField>
            <TextField source="id" />
            <TextField source="title" />
        </Datagrid>
    </List>
);
