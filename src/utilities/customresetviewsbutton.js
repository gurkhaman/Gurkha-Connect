import * as React from "react";
import {
    Button,
    useUpdateMany,
    useRefresh,
    useNotify,
    useUnselectAll,
    useCreate,
    useListContext,
    useDeleteMany,
    useDeleteSnaps,
} from 'react-admin';
import { VisibilityOff } from '@material-ui/icons';
import data_provider from "../data_provider/data_provider";


export const MigrateInstanceButton = ({ selectedIds }) => {
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
    var selectedRecords = Object.values(data).filter(instance => selectedIds.includes(instance.ins_id));

    for (var record of selectedRecords) {
        if (record.snapcloud == 'cloudstack') {
            requestJson.cloudstack.push({ ins_name: record.ins_name, ins_id: record.ins_id.replace('cloud-', "") });
        } else if (record.snapcloud == 'openstack') {
            requestJson.openstack.push({ ins_name: record.ins_name, ins_id: record.ins_id.replace('open-', "") });
        }
    }

    const [create, { loading }] = useCreate(
        'migration',
        requestJson,
        {
            onSuccess: () => {
                refresh();
                notify('Instance migrated');
                unselectAll('showinstances');
            },
            onFailure: error => notify('Error: Instance not migrated', 'warning'),
        }
    );

    return (
        <Button
            label="Migrate Instance"
            disabled={loading}
            onClick={create}
        >
            <VisibilityOff />
        </Button>
    );
}

export const DeleteSnapshot = ({ selectedIds }) => {
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
    var selectedRecords = Object.values(data).filter(snap => selectedIds.includes(snap.snap_id));

    for (var record of selectedRecords) {
        if (record.snapcloud == 'cloudstack') {
            requestJson.cloudstack.push({ snap_id: record.id });
        } else if (record.snapcloud == 'openstack') {
            requestJson.openstack.push({ snap_id: record.id });
        }
    }

    console.log(requestJson);

    const [deleteMany, { loading }] = useDeleteMany(
        'showsnapshots',
        selectedIds,
        { requestJson },
        {
            onSuccess: () => {
                refresh();
                notify('Snapshot(s) Deleted');
                unselectAll('showsnapshots');
            },
            onFailure: error => notify('Error: snapshot(s) not deleted', 'warning'),
        }
    );

    return (
        <Button
            label="Delete Snapshot(s)"
            disabled={loading}
            onClick={deleteMany}
        >
            <VisibilityOff />
        </Button>
    );
}

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
    var selectedRecords = Object.values(data).filter(snap => selectedIds.includes(snap.snap_id));

    for (var record of selectedRecords) {
        if (record.snapcloud == 'cloudstack') {
            requestJson.cloudstack.push({ snap_name: record.snap_name, snap_id: record.snap_id.replace('cloud-', '') });
        } else if (record.snapcloud == 'openstack') {
            requestJson.openstack.push({ snap_name: record.snap_name, snap_id: record.snap_id.replace('open-', '') });
        }
    }

    // for (var record of selectedRecord) {
    //     if (record.id[0] === "d") {
    //         requestJson.openstack.push({ snap_id: "" + record.id.substr(1), snap_name: record.title });
    //     }
    //     else
    //         requestJson.cloudstack.push({ snap_id: "" + record.id.substr(1), snap_name: record.title })
    // }

    const [create, { loading }] = useCreate(
        'createserver',
        requestJson,
        {
            onSuccess: () => {
                refresh();
                notify('Instances created');
                unselectAll('showsnapshots');
            },
            onFailure: error => notify('Error: Instances not created', 'warning'),
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

    const { data } = useListContext();
    var selectedRecords = Object.values(data).filter(instance => selectedIds.includes(instance.ins_id));

    for (var record of selectedRecords) {
        if (record.snapcloud == 'cloudstack') {
            requestJson.cloudstack.push({ ins_id: record.ins_id.replace('cloud-', '') });
        } else if (record.snapcloud == 'openstack') {
            requestJson.openstack.push({ ins_id: record.ins_id.replace('open-', '') });
        }
    }

    // for (var id of selectedIds) {
    //     if (id[0] === "d") {
    //         requestJson.openstack.push({ ins_id: "" + id.substr(1) });
    //     }
    //     else
    //         requestJson.cloudstack.push({ ins_id: "" + id.substr(1) })
    // }

    const [create, { loading }] = useCreate(
        'createsnapshots',
        requestJson,
        {
            onSuccess: () => {
                refresh();
                notify('Snapshots created');
                unselectAll('showinstances');
            },
            onFailure: error => notify('Error: Snapshot(s) not created', 'warning'),
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

