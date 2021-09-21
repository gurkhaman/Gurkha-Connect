import * as React from 'react';
import {
    List, useShowController, useListController,
    ListProps, TextField, DateField, Datagrid, useGetOne, Loading, TopToolbar, ExportButton, BulkDeleteButton,
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
import { Drawer, useMediaQuery, Theme, Dialog } from '@material-ui/core';
import { Fragment, useCallback, FC, useState } from 'react';
import classnames from 'classnames';
// import TemplateShow from './template_show';
import { render } from '@testing-library/react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    list: {
        flexGrow: 1,
        transition: theme.transitions.create(['all'], {
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: 0,
    },
    listWithDrawer: {
        marginRight: 400,
    },
    drawerPaper: {
        zIndex: 100,
    },
}));

const ListActions = (props) => {
    const refresh = useRefresh();
    const [deleteTemplates, { loading, error, success }] = useDelete('template', '*');
    if (error) { console.log(error) };
    if (success) refresh();

    return (
        <TopToolbar>
            {/* <Button label="Upload Template File">
                <PublishIcon/>
            </Button> */}
            <CreateButton label="Upload Template" icon={<PublishIcon />}>
            </CreateButton>
            {/* <ExportButton /> */}

            <Button label="Delete All Templates"
                onClick={deleteTemplates}
                disabled={loading}
            >
                <ActionDelete />
            </Button>
            {<DestroyTerraform />}
        </TopToolbar>
    );
}



const DestroyTerraform = () => {
    const [destroyRequest, { data, loading, error }] = useUpdate('template', '*');
    // const notify = useNotify();
    // if(error) notify(data);

    return (
        <Button label="Destroy Terraform"
            onClick={destroyRequest}
        >
            <ActionDelete />
        </Button>
    )

}

export const TemplateList = props => {
    const classes = useStyles();
    const history = useHistory();
    const [modalShow, setModalShow] = useState(false);

    // const [show, setShow] = useState(true);
    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);

    const handleClose = useCallback(() => {
        history.push('/template');
    }, [history]);



    return (
        // <div className={classes.root}>
        //     <Route path="/reviews/:id">
        //         {({ match }) => {
        //             const isMatch = !!(
        //                 match &&
        //                 match.params &&
        //                 match.params.id !== 'create'
        //             );

        //             return (
        //                 <Fragment>
        //                     <List
        //                         {...props}
        //                         className={classnames(classes.list, {
        //                             [classes.listWithDrawer]: isMatch,
        //                         })}
        //                         actions={<ListActions />} resource="template">
        //                         <Datagrid rowClick="expand" expand={<TemplateShow />} >
        //                             <TextField source="id" />
        //                             <TextField source="name" />
        //                             <TextField source="upload_files" />
        //                             <TextField source="description" />
        //                             <DateField source="uploaded_at" />
        //                         </Datagrid>
        //                     </List>
        //                     <Drawer
        //                         variant="persistent"
        //                         open={isMatch}
        //                         anchor="right"
        //                         onClose={handleClose}
        //                         classes={{
        //                             paper: classes.drawerPaper,
        //                         }}
        //                     >

        //                     </Drawer>
        //                 </Fragment>
        //             );
        //         }}
        //     </Route>
        // </div>
        // --------------------------------------------------------------------------------------------
        <List {...props} actions={<ListActions />} resource="template">
            <Datagrid rowClick={setModalShow(true)}>
                <TextField source="id" />
                <TextField source="name" />
                <TextField source="upload_files" />
                <TextField source="description" />
                <DateField source="uploaded_at" />
            </Datagrid>
        </List>
    )
};

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

const TemplateShow = (props) => {
    return (
            <Modal {...props} show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Template Details</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Grid
                        container
                        direction="row"
                        justifyContent="space-evenly"
                        alignItems="center"
                    >
                        {/* <Button
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
                        <Button
                            label="Apply Terraform"
                            onClick={applyTerraform}
                        >
                            <AutorenewIcon />
                        </Button> */}
                        <Button variant="secondary" onClick={props.onHide}>
                            Close
                        </Button>
                    </Grid>
                </Modal.Footer>
            </Modal>
    )
}


// const TemplateShow = ({ id, resource, record }) => {
//     const classes = useStyles();
//     const notify = useNotify();
//     const refresh = useRefresh();
//     console.log(record);

//     const applyTerraform = () => {
//         const request = new Request(`http://3.36.115.215:8000/template/terraform/${id}/`, {
//             method: 'GET',
//         });
//         return fetch(request)
//             .then(response => response.text())
//             .then(result => { console.log(result); refresh(); })
//             .catch(error => console.log('error', error));
//     }

//     return (
//         <Card className={classes.root}>
//             <CardContent>
//                 <SimpleShowLayout>
//                     <ReferenceField label="Resource" source="id" reference="template" basePath="/template/*/" link={false}>
//                         <TextField source="info.resource" />
//                     </ReferenceField>
//                 </SimpleShowLayout>

//                 <Grid
//                     container
//                     direction="row"
//                     justifyContent="space-evenly"
//                     alignItems="center"
//                 >
//                     <Button
//                         aria-label="Delete Template"
//                         label="Delete Template"
//                         onClick={TemplateDeleteSingle(id, resource)}>
//                         <ActionDelete />
//                     </Button>
//                     <Button
//                         label="Convert Template"
//                         onClick={TemplateConvert(id, resource)}>
//                         <AutorenewIcon />
//                     </Button>
//                     <Button
//                         label="Apply Terraform"
//                         onClick={applyTerraform}
//                     >
//                         <AutorenewIcon />
//                     </Button>

//                 </Grid>
//             </CardContent>

//         </Card>
//     )
// }



