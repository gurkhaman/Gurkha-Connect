import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Show, SimpleShowLayout, TextField, DateField, RichTextField } from 'react-admin';
const useStyles = makeStyles({
    column: {
        flex: '50%',
        paddingLeft: 10,
        paddingRight: 10,
    },

    row: {
        display: 'flex'
    },

    centerText: {
        textAlign: 'center'
    },

});

export const PostShow = (props) => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="title" />
            <TextField source="teaser" />
            <RichTextField source="body" />
            <DateField label="Publication date" source="created_at" />
        </SimpleShowLayout>
    </Show>
    
);