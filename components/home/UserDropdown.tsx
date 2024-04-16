import React, { useState } from 'react';
import { Button, Menu, MenuItem, ListItemIcon, ListItemText, Avatar, Box } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

// Assuming User interface and users state exist
interface User {
  id: number;
  email: string;
  name: string;
  phoneNumber: string;
  profileImageUrl: string | null;
}

const UsersDropdown: React.FC<{ users: User[] }> = ({ users }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Default avatar image URL
  const defaultAvatarUrl = "https://w7.pngwing.com/pngs/613/636/png-transparent-computer-icons-user-profile-male-avatar-avatar-heroes-logo-black-thumbnail.png"; 

  return (
    <div>
      <Button
        id="users-dropdown-button"
        aria-controls={open ? 'users-dropdown-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{
          backgroundColor: '#fff', // Card-like background
          color: 'grey', // Text color
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 1,
          boxShadow: 1, // Card-like shadow
          borderRadius: '8px', // Rounded corners
          textTransform: 'none', // Prevents uppercase transformation
          paddingRight: 1, // Padding adjustment for the arrow icon
        }}
        endIcon={<ArrowDropDownIcon />}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar src={defaultAvatarUrl} alt="Unassigned" sx={{ width: 24, height: 24, marginRight: 1 }} />
          UnAssigned
        </Box>
      </Button>
      <Menu
        id="users-dropdown-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'users-dropdown-button',
          sx: {
            '.MuiMenuItem-root': { 
              margin: '8px',
              paddingLeft: '24px', 
            },
            '.MuiListItemIcon-root': { 
              minWidth: '40px',
            },
            borderRadius: '8px',
            boxShadow: 3,
            overflow: 'hidden',
          },
        }}
      >
        {users?.map((user) => (
          <MenuItem key={user.id} onClick={handleClose}>
            <ListItemIcon>
              <Avatar src={user.profileImageUrl || defaultAvatarUrl} alt={user.name} />
            </ListItemIcon>
            <ListItemText>{user.name}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default UsersDropdown;
