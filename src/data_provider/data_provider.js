// https://marmelab.com/react-admin/DataProviders.html#example-implementation

import { fetchUtils, DataProvider } from 'ra-core';
import { stringify } from 'query-string';
import { useListContext } from 'react-admin';

const apiUrl = 'http://3.36.63.193:8000';
const httpClient = fetchUtils.fetchJson;

export default {
    getList: (resource, params) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
            ...fetchUtils.flattenObject(params.filter),
            _sort: field,
            _order: order,
            _start: (page - 1) * perPage,
            _end: page * perPage,
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;

        return httpClient(url).then(({ headers, json }) => {

            if (!headers.has('x-total-count')) {
                throw new Error(
                    'The X-Total-Count header is missing in the HTTP Response. The jsonServer Data Provider expects responses for lists of resources to contain this header with the total number of results to build the pagination. If you are using CORS, did you declare X-Total-Count in the Access-Control-Expose-Headers header?'
                );
            }
            let perResourceData = {};
            // TODO: Do something when the response is empty i.e. nothing in the DB

            if (resource == 'showsnapshots') {
                perResourceData = json.showsnapshots;
                for (var snap of perResourceData) {
                    if (snap.snapcloud == 'cloudstack') {
                        snap.snap_id = 'cloud-' + snap.snap_id;
                    } else if (snap.snapcloud == 'openstack') {
                        snap.snap_id = 'open-' + snap.snap_id;
                    }
                }
                return {
                    data: perResourceData.map(resource => ({ ...resource, id: resource.snap_id })),
                    total: parseInt(
                        headers.get('x-total-count').split('/').pop(),
                        10
                    ),
                };
            }
            else if (resource == 'showinstances') {
                perResourceData = json.showinstances;
                console.log(perResourceData);
                for (var ins of perResourceData) {
                    console.log(ins);
                    if (ins.snapcloud == 'cloudstack') {
                        ins.ins_id = 'cloud-' + ins.ins_id;
                    } else if (ins.snapcloud == 'openstack') {
                        ins.ins_id = 'open-' + ins.ins_id;
                    }
                }
                return {
                    data: perResourceData.map(resource => ({ ...resource, id: resource.ins_id })),
                    total: parseInt(
                        headers.get('x-total-count').split('/').pop(),
                        10
                    ),
                };
            }


        });
    },
    getOne: (resource, params) =>
        httpClient(`${apiUrl}/${resource}/${params.id}`).then(({ json }) => ({
            data: json,
        })),

    getMany: (resource, params) => {
        const query = {
            filter: JSON.stringify({ id: params.ids }),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;
        return httpClient(url).then(({ json }) => ({ data: json }));
    },

    getManyReference: (resource, params) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
            filter: JSON.stringify({
                ...params.filter,
                [params.target]: params.id,
            }),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;

        return httpClient(url).then(({ headers, json }) => ({
            data: json,
            total: parseInt(headers.get('content-range').split('/').pop(), 10),
        }));
    },

    update: (resource, params) =>
        httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: json })),

    updateMany: (resource, params) => {
        const query = {
            filter: JSON.stringify({ id: params.ids }),
        };
        return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: json }));
    },

    create: (resource, params) => {
        console.log(params.data);
        return httpClient(`${apiUrl}/${resource}`, {
            method: 'POST',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({
            data: { ...params.data, id: json.id },
        }));
    },
    createSnapshots: (resource, params) => {
        return httpClient(`${apiUrl}/${resource}`, {
            method: 'POST',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({
            data: { ...params.data, id: json.id },
        }));
    },
    delete: (resource, params) => {
        const query = {
            filter: JSON.stringify({
                openstack: [
                    {
                        id: params.id,
                    }
                ]
            })
        };
        console.log(query);
        return httpClient(`${apiUrl}/${resource}/${query}`, {
            method: 'DELETE',
        }).then(({ json }) => ({ data: json }));
    },

    deleteMany: (resource, params) => {
        let deleteResource = '';

        var requestJson = {
            openstack: [

            ],
            cloudstack: [

            ]
        }

        if (resource == 'showsnapshots') {
            deleteResource = 'deletesnapshots';

            for (var id of params.ids) {
                if (id.includes('open-')) {
                    requestJson.openstack.push({ snap_id: id.replace('open-', '') });
                } else if (id.includes('cloud-')) {
                    requestJson.cloudstack.push({ snap_id: id.replace('cloud-', '') });
                }
            }
        }

        return httpClient(`${apiUrl}/${deleteResource}`, {
            method: 'DELETE',
            body: JSON.stringify(requestJson)
        }).then(({ json }) => ({ data: json }));
    },

};
