import * as React from 'react';
import { useCallback } from 'react';
import { Create, SimpleForm, TextInput, FileInput, FileField, Toolbar, Button, useCreateContext } from 'react-admin';
import { useFormState } from 'react-final-form';

export const TemplateUpload = (props) => (
    <Create {...props} >
        <SimpleForm toolbar={<FileUploadToolbar />}>
            <TextInput source="name" label="Template Name" />
            <TextInput source="description" label="Template Description" options={{ multiline: true }} />
            <FileInput source="upload_files" label="Template File" accept="application/json">
                <FileField source="src" title="title" />
            </FileInput>
        </SimpleForm>
    </Create>
)

const SubmitForm = (values) => {

    console.log(values);


}

const FileUploadToolbar = props => {
    const { values } = useFormState();
    console.log(values)

    const fetchRequest = useCallback(() => {

        var formdata = new FormData();
        formdata.append("upload_files", `${values.upload_files.rawFile.path}`);
        formdata.append("description", values.description);
        formdata.append("name", values.name);

        var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };

        fetch("http://52.78.82.160:7014/template/*/", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    })

    return (<Toolbar {...props} >
        <Button
            label="Upload Template"
            onClick={fetchRequest}
        />
    </Toolbar>)
}