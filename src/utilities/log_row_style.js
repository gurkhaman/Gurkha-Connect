import blueGrey from '@material-ui/core/colors/blueGrey'
import orange from '@material-ui/core/colors/orange';
import red from '@material-ui/core/colors/red';
import { useTheme } from '@material-ui/core/styles';

const rowStyle = (selectedRow) => (record) => {
    const theme = useTheme();
    let style = {};
    if (!record) {
        return style;
    }
    if (selectedRow && selectedRow === record.id) {
        style = {
            ...style,
            backgroundColor: theme.palette.action.selected,
        };
    }
    if (record.level === 'INFO')
        return {
            ...style,
            borderLeftColor: blueGrey[500],
            borderLeftWidth: 5,
            borderLeftStyle: 'solid',
        };
    if (record.level === 'DEBUG')
        return {
            ...style,
            borderLeftColor: orange[500],
            borderLeftWidth: 5,
            borderLeftStyle: 'solid',
        };
    if (record.level === 'WARNING')
        return {
            ...style,
            borderLeftColor: red[500],
            borderLeftWidth: 5,
            borderLeftStyle: 'solid',
        };
    return style;
};

export default rowStyle;