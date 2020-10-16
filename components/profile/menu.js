import React from 'react';
import {
    Menu,
    MenuItem,
    MenuButton
} from '@szhsin/react-menu'; 
import '@szhsin/react-menu/dist/index.css';

export default function Profile() {
    return (
        <Menu menuButton={<MenuButton>Profile</MenuButton>}>
            <MenuItem>Characters</MenuItem>
            <MenuItem>Settings</MenuItem>
        </Menu>
    );
}