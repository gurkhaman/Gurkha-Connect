import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import {
    useShowController,
    ReferenceField,
    TextField,
    FieldProps,
    useNotify,
    useRefresh,
} from 'react-admin';
import { Dialog, DialogTitle, DialogContent } from '@material-ui/core';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

const TemplateShow = () => {
    const [show, setShow] = useState(true);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
            <Modal show={show} onHide={handleClose}>
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
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="secondary" onClick={handleClose}>
                            Delete Template
                        </Button>
                        <Button variant="secondary" onClick={handleClose}>
                            Convert Template
                        </Button>
                        <Button variant="secondary" onClick={handleClose}>
                            Apply Terraform
                        </Button>
                    </Grid>
                </Modal.Footer>
            </Modal>
    )
}

export default TemplateShow;