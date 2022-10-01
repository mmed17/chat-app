import React, {useState} from "react";
import { Avatar, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {Accounts} from "meteor/accounts-base";

const LogIn = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [{errorState, helperText}, setError] = useState({errorState: false, helperText: ""});

    const paperLoginStyles = {elevation: 9, style: {padding: '20px', height: '80vh', width: '60vh'}};
    const avatarStyles = {backgroundColor: "#9c27b0", margin: 25};
    const inputStyles = {color:'secondary', style:{width: '100%', margin: '5px 0'} };
    const buttonStyles = {fullWidth: true, style:{margin: '5px 0px'}};

    const signInFun = (e) => {
        Meteor.loginWithPassword(email, password, ( error ) => {
            if(error) {
                setError(() => { return {errorState: true, helperText: error.reason }})
            } else if (Meteor.user()) {
                setTimeout(() => navigate("/home"), 300);
            }
        });
    }

    const signUpFun = (e) => {
        Accounts.createUser({email, password}, ( error ) => {
            if(error) {
                setError(() => { return {errorState: true, helperText: error.reason }})
            } else if (Meteor.user()) {
                navigate("/home");
            }
        });
    }

    return (
        <Grid>
            <Paper {...paperLoginStyles}>
                <Grid align="center">
                    <Avatar style={avatarStyles}></Avatar>
                </Grid>
                <Grid >
                    <TextField onChange={(e) => setEmail(() => e.target.value)} 
                        {...inputStyles} label="Email" variant="standard" placeholder="Enter you email" required {...{error: errorState}}/>
                    <TextField onChange={(e) => setPassword(() => e.target.value)}  
                        {...inputStyles} label="Password" variant="standard" placeholder="Enter your password" type="password" required
                        {...{error: errorState, helperText: helperText}} />
                </Grid>
                <Grid style={{margin: '50px 0'}}>
                    <Button onClick={signInFun} {...buttonStyles} color="secondary" >SIGN IN</Button>
                    <Button onClick={signUpFun} {...buttonStyles} color="secondary" variant="contained" 
                        >CREATE AN ACCOUNT</Button>
                </Grid>
            </Paper>
        </Grid>
    );
}

export {LogIn};