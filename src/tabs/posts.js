import * as React from 'react';
import { cloneElement } from 'react';
import {
    List,
    Datagrid,
    ReferenceField,
    TextField,
    useDeleteMany,
    useRecordContext,
    Edit,
    SimpleForm,
    ReferenceInput,
    SelectInput,
    TextInput,
    Create,
    TopToolbar,
    ListActions,
    CreateButton,
    ExportButton,
    Button,
    useUpdateMany,
    useRefresh,
    useNotify,
    useUnselectAll,
    useCreate,
    useUpdate,
    BulkDeleteButton,
} from 'react-admin';
import dataProvider from '../data_provider/data_provider';
import CloudIcon from '@material-ui/icons/Cloud';
import { VisibilityOff } from '@material-ui/icons';
import {CreateInstanceButton, CreateSnapshotButton} from '../utilities/customresetviewsbutton';

const PostBulkActionButtons = props => (
    <React.Fragment>
        <CreateInstanceButton {...props}/>
        <CreateSnapshotButton {...props}/>
        <BulkDeleteButton {...props}/>
    </React.Fragment>
)

const PostActions = (props) => (
    <TopToolbar>
        <CreateButton />
        <ExportButton />
        {/* <Button
            onClick={() => { alert('Your custom action'); }}
            label="Create Server"
        >
            <CloudIcon />
        </Button> */}
    </TopToolbar>
);

export const PostList = props => {
    return (
        <List {...props} actions={<PostActions />} bulkActionButtons={<PostBulkActionButtons/>}>
            <Datagrid rowClick="edit">
                <ReferenceField source="userId" reference="users"><TextField source="id" /></ReferenceField>
                <TextField source="id" />
                <TextField source="title" />
                <TextField source="body" />
            </Datagrid>
        </List>
    );
}

export const PostEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <ReferenceInput source="userId" reference="users"><SelectInput optionText="id" /></ReferenceInput>
            <TextInput source="id" />
            <TextInput source="title" />
            <TextInput source="body" />
        </SimpleForm>
    </Edit>
);

export const PostCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <ReferenceInput source="userId" reference="users"><SelectInput optionText="id" /></ReferenceInput>
            <TextInput source="id" />
            <TextInput source="title" />
            <TextInput source="body" />
        </SimpleForm>
    </Create>
);
