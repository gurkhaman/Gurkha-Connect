import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { List, Datagrid, TextField, DateField, RichTextField, useGetOne, useRefresh, TopToolbar, Button, } from 'react-admin';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import rowStyle from '../../utilities/log_row_style';

const ListActions = (props) => {
    const refresh = useRefresh();
    // const [deleteTemplates, { loading, error }] = useDelete('template', '*', { onSuccess: () => { refresh(); } });
    // if (error) { console.log(error) };

    const syncLogs = () => {
        const syncRequest = new Request('http://52.78.82.160:7014/sync', {
            method: 'GET',
        });
        return fetch(syncRequest)
            .then(response => response.text())
            .then(result => {console.log(result); refresh();})
            .catch(error => console.log('error', error));
    }

    return (
        <TopToolbar>
            <Button label="Sync Logs"
                onClick={syncLogs}
            >
                <AutorenewIcon />
            </Button>
        </TopToolbar>
    );
}

export const ComponentLogs = ({
    selectedRow,
    ...props
}) => {
    return (
        <List {...props} actions={<ListActions />}>
            <Datagrid
                rowClick="edit"
                rowStyle={rowStyle(selectedRow)}
            >
                <TextField source="id" />
                <DateField source="created_on" />
                <TextField source="component" />
                <TextField source="level" />
                <TextField source="message" />
            </Datagrid>
        </List>
    );
}