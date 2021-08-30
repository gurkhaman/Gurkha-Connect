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
    Button,
} from 'react-admin';
import { Modal, Dialog, DialogTitle, DialogContent } from '@material-ui/core';

const TemplateShow = () => {
    const [showDialog, setShowDialog] = useState(false);
    const notify = useNotify();
    const refresh = useRefresh();

    const handleClick = () => {
        setShowDialog(true);
    }

    const handleCloseClick = () => {
        setShowDialog(false);
    }

    return (
        <>
            <Dialog
                fullWidth
                open={showDialog}
                onClose={handleCloseClick}
            >
                <DialogTitle>Template Details</DialogTitle>
            </Dialog>
        </>
    )
}

export default TemplateShow;