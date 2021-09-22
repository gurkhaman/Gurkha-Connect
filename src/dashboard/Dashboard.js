import * as React from 'react';
import { Card, CardContent, makeStyles, List, ListItem, ListItemText } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { VictoryPie, VictoryAnimation } from 'victory';
import { useGetList, Loading, Error, useGetMany, useGetOne, useGetCloudComponents, useDataProvider, useQuery } from 'react-admin';


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


const CloudComponentsData = (components) => {
    const { data } = useGetOne('check', 0);
    const componentsResponse = data;

    for (var component in componentsResponse) {
        if (component == 'agent' || component == 'management') {
            cloudstackComponents[component] = componentsResponse[component];
        } else if (component != 'id')
            openstackComponents[component] = componentsResponse[component];
    }

    return (
        <List>
            {Object.keys(components).map((record) => (
                <ListItem
                    key={record}
                    button
                    component={Link}
                    to={`/${record}/log`}
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

var openstackComponents = {};
var cloudstackComponents = {};

const metricFilter = (metric, toFilter) => {

    return metric.reduce((obj, key) => ({ ...obj, [key]: toFilter[key] }), {});
}


const VMMetricsData = (cloudService) => {
    // const { data } = useGetMany('statistics', [0]);
    // console.log(data);
    console.log(localStorage.getItem('token'));
    const dummyMetricData = {
        openstack_metrics: {
            vcpu: 4,
            vcpu_used: 1,
            memory: 9965,
            memory_used: 512,
            storage: 48,
            storage_used: 0,
        },

        cloudstack_metrics: {
            vcpu: 16,
            vcpu_used: 3,
            memory: 32354942976,
            memory_used: 1879048192,
            storage: 53660876800,
            storage_used: 26289897472,
        }
    }

    const [metricData, setMetricData] = React.useState(dummyMetricData);


    let requestJson = {
        requests: {
            apikey: localStorage.getItem('apikey'),
            response: "json",
            command: "listCapacity"
        },
        secretKey: localStorage.getItem('secretkey'),
    }

    React.useEffect(() => {
        const request = new Request('http://52.78.82.160:7014/statistics', {
            method: 'POST',
            body: JSON.stringify(requestJson),
        });

        fetch(request)
            .then(response => response.json())
            .then(result => { console.log(result); setMetricData(result); })
            .catch(error => console.log('error', error));

    }, []);

    console.log(metricData);


        const vcpu = ['vcpu', 'vcpu_used'], memory = ['memory', 'memory_used'], storage = ['storage', 'storage_used'];
        let vcpuObject, memoryObject, storageObject;


        if (cloudService === 'openstack') {
            vcpuObject = metricFilter(vcpu, metricData.openstack_metrics);
            memoryObject = metricFilter(memory, metricData.openstack_metrics);
            storageObject = metricFilter(storage, metricData.openstack_metrics);
        } else {
            vcpuObject = metricFilter(vcpu, metricData.cloudstack_metrics);
            memoryObject = metricFilter(memory, metricData.cloudstack_metrics);
            storageObject = metricFilter(storage, metricData.cloudstack_metrics);
        }

        return (GraphMaker(vcpuObject, memoryObject, storageObject));

    

}


const GraphMaker = (...args) => {
    const datum = args
    return (
        <div>
            {datum.map(metric => {
                const keyArray = Object.keys(metric);
                return (
                    <VictoryPie
                        colorScale={["cyan", "navy"]}
                        width={150} height={150}
                        data={[
                            { x: keyArray[0], y: metric[keyArray[0]], label: metric[keyArray[0]] },
                            { x: keyArray[1], y: metric[keyArray[1]], label: metric[keyArray[1]] },
                        ]}
                        style={{ labels: { fill: "black", fontSize: 4, fontWeight: "bold" } }}
                    />
                )
            })}
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
                                {VMMetricsData('openstack')}
                            </div>
                            <div className={classes.column}>
                                {CloudComponentsData(openstackComponents)}
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
                                {VMMetricsData('cloudstack')}
                            </div>
                            <div className={classes.column}>
                                {CloudComponentsData(cloudstackComponents)}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}