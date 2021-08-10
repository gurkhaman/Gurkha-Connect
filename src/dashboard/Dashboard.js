import * as React from 'react';
import { Card, CardContent, CardHeader, makeStyles, List, ListItem, ListItemText } from '@material-ui/core';
import { XYPlot, XAxis, YAxis, HorizontalGridLines, LineSeries, RadialChart } from 'react-vis';

const useStyles = makeStyles({
    column: {
        flex: '50%',
        paddingLeft: 10,
        paddingRight: 10,
    },

    row: {
        display: 'flex',
    },

    centerText: {
        textAlign: 'center'
    },

    centerImage: {
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
        width: 400,
        height: 'auto',
    },

});

const componentsResponse = {
    nova: false,
    heat: false,
    cinder: false,
    neutron: false,
    keystone: false,
    swift: false,
    agent: false,
    management: false,
}

var openstackComponents = {};
var cloudstackComponents = {};

for (var component in componentsResponse) {
    if (component == 'agent' || component == 'management') {
        cloudstackComponents[component] = componentsResponse[component];
    } else
        openstackComponents[component] = componentsResponse[component];
}

const ComponentList = (components) => {
    return (
        <List>
            {Object.keys(components).map((record) => (
                <ListItem
                    key={record}
                    button
                    // component={Link}
                    // to={`/reviews/${record.id}`}
                    alignItems="flex-start"
                >
                    <ListItemText
                        // primary={<StarRatingField record={record} />}
                        primary={record + ": " + componentsResponse[record]}
                        // className={classes.listItemText}_
                        style={{ paddingRight: 0 }}
                    />
                </ListItem>
            ))}
        </List>
    )
}

const GraphMaker = () => {
    return (
        <div>
            <RadialChart
                data={[{ angle: 100 }, { angle: 120 }, { angle: 160 }]}
                width={200}
                height={200} />
            <RadialChart
                data={[{ angle: 200 }, { angle: 120 }, { angle: 160 }]}
                width={200}
                height={200} />
        </div>
    )
}

export default () => {
    const classes = useStyles();
    return (
        <div className={classes.row}>
            <div className={classes.column}>
                <Card>
                    <CardContent>
                        <img
                            src="https://object-storage-ca-ymq-1.vexxhost.net/swift/v1/6e4619c416ff4bd19e1c087f27a43eea/www-images-prod/openstack-logo/2016R/OpenStack-Logo-Horizontal.SVG"
                            alt="openstack"
                            className={classes.centerImage}
                        />

                        <div className={classes.row} >
                            <div className={classes.column} >
                                {GraphMaker()}
                            </div>
                            <div className={classes.column}>
                                {ComponentList(openstackComponents)}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div className={classes.column}>
                <Card>
                    <CardContent>
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/7/70/Apache_CloudStack_Logo.svg"
                            alt="openstack"
                            className={classes.centerImage}
                        />

                        <div className={classes.row} >
                            <div className={classes.column} >
                                {GraphMaker()}
                            </div>
                            <div className={classes.column}>
                                {ComponentList(cloudstackComponents)}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}