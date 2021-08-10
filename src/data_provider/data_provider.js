// https://marmelab.com/react-admin/DataProviders.html#example-implementation

// TODO
// THis is a tet for todo


import { fetchUtils, DataProvider } from 'ra-core';
import { stringify } from 'query-string';

const apiUrl = 'https://jsonplaceholder.typicode.com';
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
            for (var item of json) {
                if (item.id % 2 == 0)
                    item.id = "c" + item.id;
                else
                    item.id = "d" + item.id;
            }

            if (!headers.has('x-total-count')) {
                throw new Error(
                    'The X-Total-Count header is missing in the HTTP Response. The jsonServer Data Provider expects responses for lists of resources to contain this header with the total number of results to build the pagination. If you are using CORS, did you declare X-Total-Count in the Access-Control-Expose-Headers header?'
                );
            }
            return {
                data: json,
                total: parseInt(
                    headers.get('x-total-count').split('/').pop(),
                    10
                ),

            };

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
        var requestJson = {
            openstack: [

            ],
            cloudstack: [
            ]
        }

        for (var ids of params.ids) {
            if (ids[0] === "d")
                requestJson.openstack.push({ snap_id: "" + ids.substr(1) });
            else
                requestJson.cloudstack.push({ snap_id: "" + ids.substr(1) })
        }

        return httpClient(`${apiUrl}/${resource}`, {
            method: 'DELETE',
            body: JSON.stringify(requestJson)
        }).then(({ json }) => ({ data: json }));
    },
};
