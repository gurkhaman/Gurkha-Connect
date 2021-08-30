import * as React from 'react';
import {
    List, useShowController, useListController,
    ListProps, TextField, DateField, Datagrid, useGetOne, Loading, TopToolbar, ExportButton, BulkDeleteButton, Button,
    useDelete, useGetMany, ReferenceField, SimpleShowLayout, RichTextField, useUpdate, useNotify, CreateButton
} from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ActionDelete from '@material-ui/icons/Delete';
import PublishIcon from '@material-ui/icons/Publish';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import { red } from '@material-ui/core/colors';
import template_dataprovider from '../../data_provider/template_dataprovider';
import { Route, RouteChildrenProps, useHistory } from 'react-router-dom';
import { Drawer, useMediaQuery, Theme, Modal, Dialog } from '@material-ui/core';
import { Fragment, useCallback, FC, useState } from 'react';
import classnames from 'classnames';
// import TemplateShow from './template_show';
import { render } from '@testing-library/react';


const useStyles = makeStyles(({
    root: { width: 600, margin: 'auto' },
    spacer: { height: 20 },
    invoices: { margin: '10px 0' },
}));


const ListActions = (props) => {
    const [deleteTemplates, { loading, error }] = useDelete('template', '*');
    if (error) { console.log(error) };

    return (
        <TopToolbar>
            {/* <Button label="Upload Template File">
                <PublishIcon/>
            </Button> */}
            <CreateButton label="Upload Template" icon={<PublishIcon/>}>
            </CreateButton>
            <ExportButton />
            <Button label="Delete All Templates"
                onClick={deleteTemplates}
            >
                <ActionDelete />
            </Button>
        </TopToolbar>
    );
}



export const TemplateList = props => (
    <List {...props} actions={<ListActions />}>
        <Datagrid rowClick="expand" expand={<TemplateShow />} >
            <TextField source="name" />
            <TextField source="upload_files" />
            <TextField source="description" />
            <DateField source="uploaded_at" />
        </Datagrid>
    </List>
);

const TemplateDeleteSingle = (record, resource) => {
    const [deleteSingleTemplate, { loading, error }] = useDelete(
        `${resource}`,
        `${record.name}`,
    );
    if (error) { console.log("Error: Template deletion unsuccessful -> " + error); }
    return deleteSingleTemplate;
}

const TemplateConvert = (record, resource) => {
    const [convertTemplate, { loading, error }] = useUpdate(
        `${resource}`,
        `${record.name}`,
        "",
    );
    if (error) { console.log("Error: Template conversion unsuccessful -> " + error); }
    return convertTemplate;
}

const TemplateShow = ({ id, record, resource }) => {
    const classes = useStyles();
    const notify = useNotify();

    console.log(record);

    return (
        <Card className={classes.root}>
            <CardContent>
                <SimpleShowLayout>
                    <ReferenceField label="Name" source="name" reference="template">
                        <TextField source="info" />
                    </ReferenceField>
                </SimpleShowLayout>

                <Grid
                    container
                    direction="row"
                    justifyContent="space-evenly"
                    alignItems="center"
                >
                    <Button
                        aria-label="Delete Template"
                        label="Delete Template"
                        onClick={TemplateDeleteSingle(record, resource)}>
                        <ActionDelete />
                    </Button>
                    <Button
                        label="Convert Template"
                        onClick={TemplateConvert(record, resource)}>
                        <AutorenewIcon />
                    </Button>

                </Grid>
            </CardContent>

        </Card>
    )
}



