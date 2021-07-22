import * as React from 'react';
import { ListA, ListB } from '../lists/lists'
import { useStyles } from '../utilities/ui_utilities'

const titleName = (<h1>OpenStack</h1>)

export const OpenStack = props => {
    const classes = useStyles();
    return (
        <React.Fragment>
            {titleName}
            <div className={classes.row}>
                <div className={classes.column}>
                    <ListA {...props}
                        resource={"users"}
                        
                    />
                </div>
                <div className={classes.column}>
                    <ListB {...props}
                        resource={"cloud_stack"} />
                </div>
            </div>

        </React.Fragment>
    );
}


