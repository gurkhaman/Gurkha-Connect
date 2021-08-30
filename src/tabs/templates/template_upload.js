import * as React from 'react';
import { Create, SimpleForm, TextInput, FileInput, FileField } from 'react-admin';

export const TemplateUpload = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name" label="Template Name" />
            <TextInput source="description" label="Template Description" options={{ multiline: true }} />
            <FileInput source="upload_files" label="Template File" accept="application/json">
                <FileField source="src" title="title" />
            </FileInput>
        </SimpleForm>
    </Create>
)