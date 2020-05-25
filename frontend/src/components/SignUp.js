import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/AccessAlarm';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import useStyles from '../styles/SignIn'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      Jeff Enterprise ©
    </Typography>
  );
}

export default function SignUp(props) {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Create User
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            value={props.username}
            autoFocus
            onChange={props.handleInputChange}
            />
          <TextField
            variant="outlined"
            margin="normal"
            value={props.password}
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange={props.handleInputChange}
            />
          <TextField
            variant="outlined"
            margin="normal"
            required
            value={props.age}
            fullWidth
            name="age"
            label="Age"
            type="number"
            id="age"
            onChange={props.handleInputChange}
            />
          <TextField
            value={props.country}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="country"
            label="Country"
            type="text"
            id="country"
            onChange={props.handleInputChange}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            className={classes.submit}
            onClick={props.handleCreateUser}
            onSubmit={props.handleCreateUser}
          >
            Create
          </Button>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}