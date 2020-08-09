import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
/** material-ui dependencies */
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
/** material-ui dependencies */
import Navbar from "./Navbar";
import { registerUser } from "../actions/actions";

const styles = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {},
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    const { auth, history } = this.props;
    if (auth.isAuthenticated) {
      history.push("/");
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    console.log(nextProps.errors);
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }

  onChange = (event) => {
    this.setState({ [event.target.id]: event.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, password2 } = this.state;
    const { history, registerUser } = this.props;
    const newUser = {
      name,
      email,
      password,
      password2,
    };
    registerUser(newUser, history);
  };

  render() {
    const { classes } = this.props;
    const { errors } = this.state;
    return (
      <>
        <Navbar />
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <form className={classes.form} noValidate onSubmit={this.onSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    type="text"
                    className={classnames("", { invalid: errors.name })}
                    onChange={this.onChange}
                    value={this.state.name}
                    error={errors.name}
                    variant="outlined"
                    fullWidth
                    name="name"
                    id="name"
                    label="Full Name"
                    autoFocus
                    required
                  />
                  <span className="red-text">{errors.name}</span>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="email"
                    className={classnames("", { invalid: errors.email })}
                    onChange={this.onChange}
                    value={this.state.email}
                    error={errors.email}
                    variant="outlined"
                    fullWidth
                    name="email"
                    id="email"
                    label="Email Address"
                    autoComplete="email"
                    required
                  />
                  <span className="red-text">{errors.email}</span>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="password"
                    className={classnames("", { invalid: errors.password })}
                    onChange={this.onChange}
                    value={this.state.password}
                    error={errors.password}
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    id="password"
                    autoComplete="current-password"
                  />
                  <span className="red-text">{errors.password}</span>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="password"
                    className={classnames("", { invalid: errors.password2 })}
                    onChange={this.onChange}
                    value={this.state.password2}
                    error={errors.password2}
                    variant="outlined"
                    required
                    fullWidth
                    name="password2"
                    label="Confirm Password"
                    id="password2"
                    autoComplete="confirm-password"
                  />
                  <span className="red-text">{errors.password2}</span>
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign Up
              </Button>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link to="/login">Already have an account? Sign in</Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </Container>
      </>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.shape({
    isAuthenticated: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
  }).isRequired,
  errors: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    emailNotFound: PropTypes.string,
    password: PropTypes.any,
    password2: PropTypes.any,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

const mapDispatchToProps = (dispatch) => ({
  registerUser: (userData, history) => {
    dispatch(registerUser(userData, history));
  },
});

export const connectedRegisterComponent = connect(mapStateToProps,mapDispatchToProps)(Register);

export default withStyles(styles)(connectedRegisterComponent);
