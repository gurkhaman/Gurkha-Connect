import * as React from 'react';
import {TextField, DateField, List, Datagrid, RadioButtonGroupInput, SelectField } from 'react-admin';
import { CreateSnapshotButton,MigrateInstanceButton  } from '../utilities/customresetviewsbutton';


const SnapshotBulkActionButtons = props => (
    <React.Fragment>
        <CreateSnapshotButton {...props} />
        <MigrateInstanceButton {...props}/>
    </React.Fragment>
)





export const InstanceList = props => (
    <List {...props} bulkActionButtons={<SnapshotBulkActionButtons/>} pagination={false}>
        <Datagrid rowClick="edit">
            <TextField source="ins_id" />
            <TextField source="ins_name" />
            <TextField source="vol_id" />
            <TextField source="snapcloud" />
        </Datagrid>
    </List>
);  