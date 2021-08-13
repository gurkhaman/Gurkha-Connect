import * as React from 'react';
import {TextField, DateField, List, Datagrid } from 'react-admin';

const LogData = () => {
    
}


export const HeatLogs = props => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <DateField source="created_on" />
            <TextField source="component" />
            <TextField source="level" />
            <TextField source="message" />
        </Datagrid>
    </List>
);