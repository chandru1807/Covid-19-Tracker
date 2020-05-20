
import React from 'react';
import { Link } from 'react-router-dom';
import {AppBar, Toolbar, Button} from '@material-ui/core'
import styles from './Navbar.module.css';
export const NavBar = () => {
    return (
        <AppBar className={styles['appbar-container']} position="static">
            <Toolbar>
                <Button className={styles['button-container']} component={Link} to="/" color="inherit">Global Stats</Button>
                <Button className={styles['button-container']} component={Link} to="/indiastats" color="inherit">India Stats</Button>
            </Toolbar>
        </AppBar>
        
    );
};