import * as React from 'react';
import { ListA, ListB } from '../lists/lists'
import { useStyles } from '../utilities/ui_utilities'

const titleName = (<h1>Templates</h1>)

export const TemplateList = props => {
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
                        resource={"posts"} />
                </div>
            </div>

        </React.Fragment>

    );
}


