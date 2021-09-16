import * as React from 'react';
import { useCallback } from 'react';
import { Create, SimpleForm, TextInput, FileInput, FileField, Toolbar, Button, useCreateContext, SaveButton, useNotify } from 'react-admin';
import RichTextInput from 'ra-input-rich-text';
import { useHistory } from 'react-router-dom'
import { useFormState } from 'react-final-form';

export const TemplateUpload = (props) => (
    <Create {...props} >
        <SimpleForm toolbar={<FileUploadToolbar />}>
            <TextInput source="name" label="Template Name" />
            <TextInput source="description" label="Template Description" options={{ multiline: true }} />
            <RichTextInput
                source="upload_files"
                label="Template Details"
                fullWidth={true}
                options={{
                    modules: {
                        toolbar: [
                            [{ header: [1, 2, false] }],
                            ['bold', 'italic', 'underline'],
                            ['image', 'code-block']
                        ]
                    },
                    formats: ['link', 'size'],
                    placeholder: 'Paste you template here...',
                    theme: 'snow',
                }}
            />
        </SimpleForm>
    </Create>
)



const FileUploadToolbar = props => {
    const { values } = useFormState();
    const notify = useNotify();
    const history = useHistory();
    console.log(values)

    const strip = (html) => {
        let doc = new DOMParser().parseFromString(html, 'text/html');
        return doc.body.textContent || "";
    }

    const redirectToList = () => {
        history.push('/template');
    }

    const fetchRequest = useCallback(() => {

        var formdata = new FormData();
        formdata.append("upload_files", `${strip(values.upload_files)}`);
        formdata.append("description", values.description);
        formdata.append("name", values.name);

        var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };

        fetch("http://3.36.115.215:8000/template/*/", requestOptions)
            .then(response => response.text())
            .then(result => {notify("Template successfully uploaded."); redirectToList();})
            .catch(error => console.log('error', error));

    })

    return (<Toolbar {...props} >
        <Button
            label="Upload Template"
            onClick={fetchRequest}
        />
    </Toolbar>)
}