import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Redirect } from 'react-router-dom';
import {
  handleClientLoad,
} from './LoginHandlers';
import swal from 'sweetalert';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: 'none'
  }
});

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false
    };
  }

  login() {
    let p = new Promise((resolve, reject) => handleClientLoad(resolve, reject));
    p.then(res => this.setState({redirect:true}));
    p.catch(err => swal("Something Happened :(", "Run for your life ! ", "error"));
  }

  render() {
    const { classes } = this.props;

    if (localStorage.getItem("item")) {
      console.log("Redirecting....")
      return <Redirect to="/dashboard" />;
    }

    return (
      <div className="login">
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={this.login.bind(this)}
        >
          Login
          <img src="http://pngimg.com/uploads/google/google_PNG19635.png" />
        </Button>
      </div>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Login);
