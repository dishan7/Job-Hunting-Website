import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import validator from 'validator'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import MuiPhoneNumber from "material-ui-phone-number";
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Register = ()=>{
  const history = useHistory();
    const [user , setUser] = useState({
        fname:"" , lname:"" , username:"", email:"", password:"",confirmPassword:"", phoneNumber:"", age:"" , gender:"" , userImage:""
    });

    let name , value;

    const handleInputs = (e) => {
        console.log(e);
        name = e.target.name;
        value = e.target.value;

        setUser({... user, [name]:value});
    }

    const PostData = async (e)=>{
      e.preventDefault();
      const { fname , lname , username , email , password , confirmPassword , age, phoneNumber, gender, userImage } = user;

      const res = await fetch("/register" , {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          fname,
          lname,
          username,
          email, 
          password, 
          confirmPassword,
          phoneNumber,
          age,
          gender,
          userImage
        })
      })

      const data = await res.json();
      console.log(data)

      if(res.status===400 || !data){
        window.alert("Invalid Details")
        console.log("Invalid details")
      }
      else{
        window.alert("please verify your email");
        console.log("Please verify your email")

        history.push("/login")
      }
    }

    const [errorMessage, setErrorMessage] = useState('')
  
  const validate = async (value) => {
  
    if (validator.isStrongPassword(value, {
      minLength: 8, minLowercase: 1,
      minUppercase: 1, minNumbers: 1, minSymbols: 1
    })) {
      setErrorMessage('Strong Password')
    } else {
      setErrorMessage('Not Strong Password')
    }
  }

  const classes = useStyles();

    return(
        <>
{/* <div className="body-background">
    <div className="container-fluid d-flex justify-content-center align-items-center h-100">
        <div className="card p-3 text-center py-4">
            <h4>Create account</h4>
            <div> <span>Already have an account?</span> <a href="/login" className="text-decoration-none">Log In</a> </div>
            <form action="/register" method="POST" encType="multipart/form-data">
            <div className="mt-3 px-3"> 
            <input type="username" className="form-control" placeholder="Username"
             name="username"
             value={user.username}
             onChange={handleInputs}/> 
            </div>
            <div className="mt-3 px-3"> 
            <input type="email" className="form-control" placeholder="E-mail"
            aria-describedby="emailHelp"
            name="email"
            value={user.email}
            onChange={handleInputs}/> 
            </div>
            <div className="px-3 mt-3"> 
            <input type="password" className="form-control" placeholder="Password"
            name="password"
            value={user.password}
            onChange={handleInputs}
            onKeyUp={(e) => validate(e.target.value)}/>
            </div><span style={{
              fontWeight: 'bold',
              color: 'red',
            }}>{errorMessage}</span>
            <div className="px-3 mt-3">
             <input type="password" className="form-control" placeholder="Confirm Password"
             name="confirmPassword"
             value={user.confirmPassword}
             onChange={handleInputs}/> 
             </div>
             <div className="mt-3 px-3"> 
            <input type="tel" className="form-control" placeholder="Number"
            name="phoneNumber"
            value={user.phoneNumber}
            onChange={handleInputs}/> 
            </div>
             <div className="mt-3 px-3"> 
            <input type="tel" className="form-control" placeholder="Age"
            name="age"
            value={user.age}
            onChange={handleInputs}/> 
            </div>
             <div className="px-3 mt-3">
             <div className="form-group">
                                            <div className="maxl">
                                            <div className="form-check form-check-inline mb-0 me-4">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="gender"
                      id="maleGender"
                      value="Male"
                      onChange={handleInputs}
                    />
                    <label className="form-check-label" for="femaleGender">Male</label>
                  </div>

                  <div className="form-check form-check-inline mb-0 me-4">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="gender"
                      id="femaleGender"
                      value="Female"
                      onChange={handleInputs}
                    />
                    <label className="form-check-label" for="maleGender">Female</label>
                  </div>

                  <div className="form-check form-check-inline mb-0">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="gender"
                      id="otherGender"
                      value="Other"
                      onChange={handleInputs}
                    />
                    <label className="form-check-label" for="otherGender">Other</label>
                  </div>
                                            </div>
                                        </div>
                                        </div>
            <div className="mt-3 d-grid px-3"> 
            <input name="register" id="registerButton" className="btn btn-primary"
              value="Sign Up" 
              onClick={PostData}
            /> 
            </div>
            <div className="px-3">
                <div className="mt-2 form-check d-flex flex-row"> 
                <input className="form-check-input" type="checkbox" value="" id="services"/> 
                <label className="form-check-label ms-2" for="services"> I have read and agree to the terms. </label> 
                </div>
            </div>
            </form>
        </div>
    </div>
</div> */}
<Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate action="/register" method="POST" encType="multipart/form-data">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                name="fname"
                value={user.fname}
                onChange={handleInputs}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                autoComplete="lname"
                name="lname"
                value={user.lname}
                onChange={handleInputs}
              />
            </Grid>
            <Grid item xs={12}>
            <TextField
            type="username"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            autoComplete="username"
            autoFocus
            name="username"
            value={user.username}
            onChange={handleInputs}
          />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                autoComplete="email"
                name="email"
                value={user.email}
                onChange={handleInputs}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                name="password"
                value={user.password}
                onKeyUp={(e) => validate(e.target.value)}
                onChange={handleInputs}
              />
              <span style={{
                fontWeight: 'bold',
                color: 'red',
              }}>{errorMessage}</span>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Confirm Password"
                type="password"
                id="password"
                autoComplete="current-password"
                name="confirmPassword"
                value={user.confirmPassword}
                onChange={handleInputs}
              />
            </Grid>
            <Grid item xs={12}>
            <TextField
                variant="outlined"
                required
                fullWidth
                label="Phone Number"
                type="tel"
                id="phoneNumber"
                autoComplete="current-password"
                name="phoneNumber"
                value={user.phoneNumber}
                onChange={handleInputs}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Age"
                type="number"
                id="age"
                name="age"
                value={user.age}
                onChange={handleInputs}
              />
            </Grid>
            <Grid item xs={12}>
            <FormControl component="fieldset">
  <FormLabel component="legend">Gender</FormLabel>
  <RadioGroup aria-label="gender" name="gender" row>
  <FormControlLabel value="Male" onChange={handleInputs} control={<Radio color="primary" />} label="Male" />
  <FormControlLabel value="Female" onChange={handleInputs} control={<Radio color="primary" />} label="Female" />
  <FormControlLabel value="Other" onChange={handleInputs} control={<Radio color="primary" />} label="Other" />
  </RadioGroup>
</FormControl>
              </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            value="Sign Up" 
            onClick={PostData}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
      </Box>
    </Container>
        </>
    )
}

export default Register