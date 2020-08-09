import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
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
import { loginUser } from "../actions/actions";

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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errors: {},
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    const { auth, history } = this.props;
    if (auth.isAuthenticated) {
      history.push("/");
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard"); // push user to dashboard when they login
    }
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
    const userData = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.loginUser(userData);
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
              Sign in
            </Typography>
            <form className={classes.form} noValidate onSubmit={this.onSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    type="email"
                    className={classnames("", {
                      invalid: errors.email || errors.emailNotFound,
                    })}
                    onChange={this.onChange}
                    value={this.state.email}
                    error={errors.email}
                    variant="outlined"
                    fullWidth
                    name="email"
                    id="email"
                    label="Email Address"
                    autoComplete="email"
                    autoFocus
                    required
                  />
                  <span className="red-text">
                    {errors.email}
                    {errors.emailNotFound}
                  </span>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="password"
                    className={classnames("", {
                      invalid: errors.password || errors.passwordIncorrect,
                    })}
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
                  <span className="red-text">
                    {errors.password}
                    {errors.passwordIncorrect}
                  </span>
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link to="#">Forgot password?</Link>
                </Grid>
                <Grid item>
                  <Link to="/register">{"Don't have an account? Sign Up"}</Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </Container>
      </>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.shape({
    isAuthenticated: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
  }).isRequired,
  errors: PropTypes.shape({
    email: PropTypes.string,
    emailNotFound: PropTypes.string,
    password: PropTypes.any,
    passwordIncorrect: PropTypes.any,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

const mapDispatchToProps = (dispatch) => ({
  loginUser: (userData) => {
    dispatch(loginUser(userData));
  },
});

export const connectedLoginComponent = connect(mapStateToProps, mapDispatchToProps)(Login);

export default withStyles(styles)(connectedLoginComponent);
