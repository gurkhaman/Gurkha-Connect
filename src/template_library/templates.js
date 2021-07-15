import * as React from 'react';
import { List, Datagrid, TextField, EmailField, UrlField } from 'react-admin';
import { InstanceList, PostList } from '../snapshot_library/snapshots'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    column: {
        flex: '50%',
        padding: 10,

    },

    row: {
        display: 'flex'
    },

})

const titleName = (<h1>Templates</h1>)

export const TemplateList = props => {
    const classes = useStyles();
    return (
        <React.Fragment>
            {titleName}
            <div className={classes.row}>
                <div className={classes.column}>
                    <PostList {...props}
                        resource={"posts"} />
                </div>
                <div className={classes.column}>
                    <InstanceList {...props} />
                </div>
            </div>

        </React.Fragment>

    );
}

