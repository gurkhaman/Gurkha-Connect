import * as React from 'react';
import {
    List, useShowController, useListController,
    ListProps, TextField, DateField, Datagrid, useGetOne, Loading, TopToolbar, ExportButton, BulkDeleteButton, Button,
    useDelete, useGetMany, ReferenceField, SimpleShowLayout, RichTextField, useUpdate, useNotify, CreateButton, useRefresh
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
    const refresh = useRefresh();
    const [deleteTemplates, { loading, error }] = useDelete('template', '*', { onSuccess: () => { refresh(); } });
    if (error) { console.log(error) };

    return (
        <TopToolbar>
            {/* <Button label="Upload Template File">
                <PublishIcon/>
            </Button> */}
            <CreateButton label="Upload Template" icon={<PublishIcon />}>
            </CreateButton>
            {/* <ExportButton /> */}
            <Button label="Upload Template File (TEMP)"
                onClick={uploadTemplateFile}
            >
            </Button>
            <Button label="Delete All Templates"
                onClick={deleteTemplates}
            >
                <ActionDelete />
            </Button>
            <Button label="Destroy Terraform"
                onClick={destroyTerraform}
            >
                <ActionDelete />
            </Button>
        </TopToolbar>
    );
}

const uploadTemplateFile = () => {

    return 0;
}

const destroyTerraform = () => {
    return 0;
}



export const TemplateList = props => (
    <List {...props} actions={<ListActions />} resource="template">
        <Datagrid rowClick="expand" expand={<TemplateShow />} >
            <TextField source="name" />
            <TextField source="upload_files" />
            <TextField source="description" />
            <DateField source="uploaded_at" />
        </Datagrid>
    </List>
);

const TemplateDeleteSingle = (id, resource) => {
    const [deleteSingleTemplate, { loading, error }] = useDelete(
        `${resource}`,
        `${id}`,
    );
    if (error) { console.log("Error: Template deletion unsuccessful -> " + error); }
    return deleteSingleTemplate;
}

const TemplateConvert = (id, resource) => {
    const [convertTemplate, { loading, error }] = useUpdate(
        `${resource}`,
        `${id}`,
        "",
    );
    if (error) { console.log("Error: Template conversion unsuccessful -> " + error); }
    return convertTemplate;
}

const TemplateShow = ({ id, resource }) => {
    const classes = useStyles();
    const notify = useNotify();


    // var requestOptions = {
    //     method: 'GET',
    //     redirect: 'follow'
    // };

    // fetch(`http://3.36.115.215:8000/template/${id}/`, requestOptions)
    //     .then(response => response.text())
    //     .then(result => console.log(result))
    //     .catch(error => console.log('error', error));


    return (
        <Card className={classes.root}>
            <CardContent>
                <SimpleShowLayout>
                    <ReferenceField label="Resource" source="id" reference="template">
                        <TextField source="info.resource" />
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
                        onClick={TemplateDeleteSingle(id, resource)}>
                        <ActionDelete />
                    </Button>
                    <Button
                        label="Convert Template"
                        onClick={TemplateConvert(id, resource)}>
                        <AutorenewIcon />
                    </Button>
                    {/* <Button
                        label="Apply Terraform"
                        // onClick={TemplateConvert(id, resource)}
                        >
                        <AutorenewIcon />
                    </Button> */}

                </Grid>
            </CardContent>

        </Card>
    )
}



