import * as React from 'react';
import { useState } from 'react';
import BookIcon from '@material-ui/icons/Book';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import PeopleIcon from '@material-ui/icons/People';
import { useSelector } from 'react-redux';
import LabelIcon from '@material-ui/icons/Label';
import { makeStyles } from '@material-ui/core/styles';
import {
    DashboardMenuItem,
    MenuItemLink,
    MenuProps,
} from 'react-admin';
import SubMenu from './submenu';

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: theme.spacing(1),
    },
}));

const MenuNames = {
    menuCloudServices: 'menuCloudServices',
}

const Menu = ({ dense = false }) => {
    const [state, setState] = useState({
        menuCloudServices: true,
    })
    const classes = useStyles();
    useSelector(state => state.theme);

    const handleToggle = (menu) => {
        setState(state => ({ ...state, [menu]: !state[menu] }));
    }

    return (
        <div className={classes.root}>
            {' '}
            <DashboardMenuItem />
            <MenuItemLink to="/posts" primaryText="Posts" leftIcon={<BookIcon />} />
            <MenuItemLink to="/comments" primaryText="Comments" leftIcon={<ChatBubbleIcon />} />
            <SubMenu
                handleToggle={() => handleToggle('menuCloudServices')}
                isOpen={state.menuCloudServices}
                name="Cloud Services"
                icon={<LabelIcon/>}
                dense={dense}
            >
                <MenuItemLink to="/custom-route" primaryText="CloudStack" leftIcon={<LabelIcon />} />
                <MenuItemLink to="/comments" primaryText="OpenStack" leftIcon={<ChatBubbleIcon />} />
            </SubMenu>
        </div>
    )
}

export default Menu;