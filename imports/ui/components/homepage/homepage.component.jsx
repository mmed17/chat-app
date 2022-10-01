import React, { useEffect, useMemo, useState } from "react";
import {Accounts} from "meteor/accounts-base";
import { Button, Paper, Typography, Box, Avatar, Badge } from "@mui/material";
import {useNavigate} from "react-router-dom";
import {DataGrid} from "@mui/x-data-grid";
import SendIcon from '@mui/icons-material/Send';
import { styled } from '@mui/material/styles';

const CurrentUser = () => {
    return (
        <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            variant="dot"
            style={{margin: '0px 15px'}}
            >
            <Avatar src="." />
        </StyledBadge>
    )
}

export const HomePage = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        Meteor.call('getAllUsers', (error, data) => error || setUsers( () => {
            const newData = data.map(user =>{ 
                const email = user.emails[0].address;
                const username = email.split("@")[0];
                return user._id !== Meteor.user()._id ? {...user, emails: email, username:username} : null
            });
            return newData.filter((item) => item != null);
        }));
    }, []);

    const columns = useMemo(()=> {
        return [
            {field: "image", headerName: "Profile Image", width: 150, 
                renderCell: () => <Avatar src="." />, sortable:false, filterable:false},
            {field: "username", headerName: "Username", width: 100},
            {field: "_id", headerName: "Identifier", width: 100},
            {field: "emails", headerName: "Email", width: 200},
            {field: "createdAt", headerName: "Created At", width: 400},
            {field: "/", headerName: "Contact",
                renderCell: (params) => <Button onClick={() => 
                    setTimeout(() => navigate("messages", {state: {...params.row}}), 300)} 
                    variant="contained" color="secondary" endIcon={<SendIcon />}>Message</Button>, width: 200}
           ]
    });

    const outerContainer = {height: '80vh', width: '90vw'};
    const paperStyles = {elevation:13, style:{height: '70vh'}};
    const headerStyles = {display:'flex', justifyContent:'space-between', alignItems:"center"};

    return (
        <Box style={outerContainer}>
            <Box style={headerStyles}>
                <Box style={{...headerStyles, justifyContent:'flex-start'}}>
                    <CurrentUser />
                    <Typography style={{color: "#fff"}}>{Meteor.user()&&Meteor.user()["emails"][0]["address"]}</Typography>
                </Box>
                <Box>
                    <Button style={{margin: '20px 0px'}} variant="contained" color="secondary" onClick={() => {
                        Accounts.logout();
                        setTimeout(() => navigate("/"), 400);
                    }}>SIGN OUT</Button>
                </Box>
            </Box>
            
            <Paper {...paperStyles}>
                <DataGrid
                    columns={columns}
                    rows={users}
                    getRowId = {user => user._id}
                />
            </Paper>
        </Box>
    )
}

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: -1,
        left: -1,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: 'ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
}));