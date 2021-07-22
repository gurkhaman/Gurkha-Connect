import * as React from "react";
import {
    Button,
    useUpdateMany,
    useRefresh,
    useNotify,
    useUnselectAll,
    useCreate,
    useListContext,
} from 'react-admin';
import { VisibilityOff } from '@material-ui/icons';

export const CreateInstanceButton = ({ selectedIds }) => {
    const refresh = useRefresh();
    const notify = useNotify();
    const unselectAll = useUnselectAll();

    var requestJson = {
        openstack: [

        ],
        cloudstack: [
        ]
    }

    const { data } = useListContext();
    console.log(data);


    var selectedRecord = Object.values(data).filter(post => selectedIds.includes(post.id));
    console.log(selectedRecord);

    for (var record of selectedRecord) {
        if (record.id[0] === "d") {
            requestJson.openstack.push({ snap_id: "" + record.id.substr(1), snap_name: record.title });
        }
        else
            requestJson.cloudstack.push({ snap_id: "" + record.id.substr(1), snap_name: record.title })
    }


    const [create, { loading }] = useCreate(
        'posts',
        { requestJson },
        {
            onSuccess: () => {
                refresh();
                notify('Posts created');
                unselectAll('posts');
            },
            onFailure: error => notify('Error: posts not created', 'warning'),
        }
    );

    return (
        <Button
            label="Create Instances"
            disabled={loading}
            onClick={create}
        >
            <VisibilityOff />
        </Button>
    );
}


export const CreateSnapshotButton = ({ selectedIds }) => {
    const refresh = useRefresh();
    const notify = useNotify();
    const unselectAll = useUnselectAll();

    var requestJson = {
        openstack: [

        ],
        cloudstack: [
        ]
    }

    for (var id of selectedIds) {
        if (id[0] === "d") {
            requestJson.openstack.push({ ins_id: "" + id.substr(1)});
        }
        else
            requestJson.cloudstack.push({ ins_id: "" + id.substr(1)})
    }


    const [create, { loading }] = useCreate(
        'posts',
        { requestJson },
        {
            onSuccess: () => {
                refresh();
                notify('Posts created');
                unselectAll('posts');
            },
            onFailure: error => notify('Error: posts not created', 'warning'),
        }
    );

    return (
        <Button
            label="Create Snapshots"
            disabled={loading}
            onClick={create}
        >
            <VisibilityOff />
        </Button>
    );
}

export const CustomResetViewsButton = ({ selectedIds }) => {
    const refresh = useRefresh();
    const notify = useNotify();
    const unselectAll = useUnselectAll();
    const [updateMany, { loading }] = useUpdateMany(
        'posts',
        selectedIds,
        { views: 0 },
        {
            onSuccess: () => {
                refresh();
                notify('Posts updated');
                unselectAll('posts');
            },
            onFailure: error => notify('Error: posts not updated', 'warning'),
        }
    );

    return (
        <Button
            label="simple.action.resetViews"
            disabled={loading}
            onClick={updateMany}
        >
            <VisibilityOff />
        </Button>
    );
};

