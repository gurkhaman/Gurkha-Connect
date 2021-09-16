import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Field, Form } from 'react-final-form';
import {
    Avatar,
    Button,
    Card,
    CardActions,
    CircularProgress,
    TextField,
} from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';
import auth_provider from '../auth_provider/auth_provider';
const useStyles = makeStyles(theme => ({
    main: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    card: {
        minWidth: 400,
        marginTop: '6em',
    },
    avatar: {
        margin: '1em',
        display: 'flex',
        justifyContent: 'center',
    },
    icon: {
        backgroundColor: theme.palette.secondary.main,
    },
    hint: {
        marginTop: '1em',
        display: 'flex',
        justifyContent: 'center',
        color: theme.palette.grey[500],
    },
    form: {
        padding: '0 1em 1em 1em',
    },
    input: {
        marginTop: '1em',
    },
    actions: {
        padding: '0 1em 1em 1em',
    },
}));


const UserRegistration = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState("");
    const classes = useStyles();

    const validateForm = () => {
        return email.length > 0 && password.length > 0;
    }

    const handleSubmit = (auth) => {
        setLoading(true);
        auth_provider.createAccount(auth);
    }

    const renderInput = ({
        meta: { touched, error } = { touched: false, error: undefined },
        input: { ...inputProps },
        ...props
    }) => (
        <TextField
            error={!!(touched && error)}
            helperText={touched && error}
            {...inputProps}
            {...props}
            fullWidth
        />
    );

    return (
        <Form
            onSubmit={handleSubmit}
            validate={validateForm}
            render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit} noValidate>
                    <div className={classes.main}>
                        <Card className={classes.card}>
                            <div className={classes.avatar}>
                                <Avatar className={classes.icon}>
                                    <LockIcon />
                                </Avatar>
                            </div>
                            <div className={classes.hint}>
                                Your information will be used to sign you up for <br></br>
                                Openstack and Cloudstack.
                            </div>
                            <div className={classes.form}>
                                <div className={classes.input}>
                                    <Field
                                        autoFocus
                                        name="name"
                                        component={renderInput}
                                        label="Username"
                                        type="text"
                                    // disabled={loading}
                                    />
                                </div>
                                <div className={classes.input}>
                                    <Field
                                        name="password"
                                        // @ts-ignore
                                        component={renderInput}
                                        label="Password"
                                        type="password"
                                    // disabled={loading}
                                    />
                                </div>
                            </div>
                            <CardActions className={classes.actions}>
                                <Button
                                    variant="contained"
                                    type="submit"
                                    color="primary"
                                    disabled={loading}
                                    fullWidth
                                >
                                    {loading && (
                                        <CircularProgress
                                            size={25}
                                            thickness={2}
                                        />
                                    )}
                                    Sign up!
                                </Button>
                            </CardActions>
                        </Card>
                    </div>
                </form>
            )}
        />
    )
}



export default UserRegistration;