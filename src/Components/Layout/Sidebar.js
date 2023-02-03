import React, {useRef} from 'react';
import {
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import DraftsIcon from '@mui/icons-material/Drafts';
import { useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate()
    const {pathname} = useLocation()

    return(
        <div className='app-sidebar'>
            <List
                sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                component="nav"
            >
                <ListItemButton 
                    name='users'
                    selected={pathname?.includes('user')}
                    onClick={()=>navigate('/users')}
                >
                    <ListItemIcon>
                    <SendIcon />
                    </ListItemIcon>
                    <ListItemText primary="Users" />
                </ListItemButton>
                <ListItemButton
                    name='roles'
                    selected={pathname?.includes('role')}
                    onClick={()=>navigate('/roles')}
                >
                    <ListItemIcon>
                    <DraftsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Roles" />
                </ListItemButton>
            </List>
        </div>
    )
}
export default Header;