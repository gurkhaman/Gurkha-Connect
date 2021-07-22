import * as React from 'react';
import { ListA, ListB } from '../lists/lists'
import {
    List,
    Datagrid,
    TextField,
    EmailField,
    ReferenceField,
    FunctionField,
    DeleteButton,
    Edit,
    SimpleForm,
    ReferenceInput,
    SelectInput,
    TextInput,
    Create
} from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';

const titleName = (<h1>Snapshots</h1>)
const cloudStackTitle = (<h3>CloudStack</h3>)
const openStackTitle = (<h3>OpenStack</h3>)

const useStyles = makeStyles({
    column: {
        flex: '50%',
        paddingLeft: 10,
        paddingRight: 10,
    },

    row: {
        display: 'flex'
    },

    centerText: {
        textAlign: 'center'
    },

})


export const Snapshotlist = props => {
    const classes = useStyles();
    return (
        <React.Fragment>
            {titleName}
            <div className={classes.row}>
                <div className={classes.column}>
                    <div className={classes.centerText}>
                        {openStackTitle}
                    </div>
                    <List {...props} filter={{ cloud: "openstack" }} >
                        <Datagrid rowClick="edit">
                            <TextField source="snap_id" label="Snap ID" />
                            <TextField source="snap_name" />
                            <TextField source="cloud" />
                        </Datagrid>
                    </List>

                </div>
                <div className={classes.column}>
                    <div className={classes.centerText}>
                        {cloudStackTitle}
                    </div>
                    <List {...props} filter={{ cloud: "cloudstack" }} >
                        <Datagrid rowClick="edit">
                            <TextField source="snap_id" label="Snap ID" />
                            <TextField source="snap_name" />
                            <TextField source="cloud" />
                        </Datagrid>
                    </List>
                </div>
            </div>
        </React.Fragment>
    );
}


export const SnapshotEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="snap_id" label="Snap ID" />
            <TextInput source="snap_name" />
            <TextInput source="cloud" />
        </SimpleForm>
    </Edit>
);

export const SnapshotCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="snap_id" label="Snap ID" />
            <TextInput source="snap_name" />
            <TextInput source="cloud" />
        </SimpleForm>
    </Create>
);