import React, { Component }        from "react";
// @material-ui/core components
import withStyles     from "@material-ui/core/styles/withStyles";
import Grid           from "@material-ui/core/Grid";
import InputLabel     from "@material-ui/core/InputLabel";
import  { Redirect }  from 'react-router-dom';
// core components
import GridItem     from "./Grid/GridItem.jsx";
import CustomInput  from "./CustomInput/CustomInput.jsx";
import Button       from "./CustomButtons/Button.jsx";
import Card         from "./Card/Card.jsx";
import CardHeader   from "./Card/CardHeader.jsx";
import CardAvatar   from "./Card/CardAvatar.jsx";
import CardBody     from "./Card/CardBody.jsx";
import CardFooter   from "./Card/CardFooter.jsx";

//List Components
import List             from '@material-ui/core/List';
import ListItem         from '@material-ui/core/ListItem';
import ListItemText     from '@material-ui/core/ListItemText';
import Avatar           from '@material-ui/core/Avatar';
import ProfileIcon      from '@material-ui/icons/AccountBox';
import EmailIcon        from '@material-ui/icons/Email';
import CallIcon         from '@material-ui/icons/Call';
import CodeIcon         from '@material-ui/icons/Code';
import DomainIcon       from '@material-ui/icons/Domain';
import GroupWorkIcon    from '@material-ui/icons/GroupWork';
import SendIcon         from '@material-ui/icons/Send';
import swal             from 'sweetalert';

import {loadMessage, handleSignoutClick}      from './LoginHandlers'

//import avatar from "assets/img/faces/marc.jpg";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },

  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

class UserProfile extends Component {
  
  constructor(props) {
    super(props);
  
    this.state = {
      user: JSON.parse(localStorage.getItem("item")),
      message: ''
    };
  }

  logOut(){
    localStorage.clear()
    this.setState({user:null})
    handleSignoutClick()

  }

 onChangeTextHandler = (e) => {
    this.setState({message: e.target.value});
  }

  cancelCourse = () => { 
    document.getElementById("send-message").value = '';
  }  

  sendMessage(to, message){
   loadMessage(to, 'Invisible Client Message' ,message);
   this.cancelCourse();
   swal("Good job!", "Your message has been send", "success");
  }

  render(){ 
    const { classes } = this.props;
    const { user }    = this.state;

    if(!user){
      return <Redirect to='/' />
    }
  return (
    <div>
      <Grid container>
        <GridItem xs={12} sm={12} md={8}>
          <Card className="desc-card">
            <CardHeader color="primary" className="black-color">
              <h4 className={classes.cardTitleWhite}>{`Welcome ${user.name}`}</h4>
              <p className={classes.cardCategoryWhite}>Invisible Technologies</p>
            </CardHeader>
            <CardBody>
             <Grid container>
                  <GridItem xs={12} sm={12} md={6}>
                    <List>
                      <ListItem>
                        <Avatar>
                          <ProfileIcon />
                        </Avatar>
                        <ListItemText primary="Name" secondary={user.name}/>
                      </ListItem>
                      <ListItem>
                        <Avatar>
                          <EmailIcon />
                        </Avatar>
                        <ListItemText primary="Email" secondary={user.email}/>
                      </ListItem>
                      <ListItem>
                        <Avatar>
                          <CallIcon />
                        </Avatar>
                        <ListItemText primary="Phone" secondary={user.phone} />
                      </ListItem>
                    </List>
                  </GridItem>

                  <GridItem xs={12} sm={12} md={6}>
                    <List>
                      <ListItem>
                        <Avatar>
                          <CodeIcon/>
                        </Avatar>
                        <ListItemText primary="Code" secondary={user.code} />
                      </ListItem>
                      <ListItem>
                        <Avatar>
                          <DomainIcon />
                        </Avatar>
                        <ListItemText primary="Company Name" secondary={user.company} />
                      </ListItem>
                      <ListItem>
                        <Avatar>
                          <GroupWorkIcon />
                        </Avatar>
                        <ListItemText primary="Gender" secondary={user.gender} />
                      </ListItem>
                    </List>
                  </GridItem>
              </Grid>
              <Grid container className="desc-textfield">
                <GridItem xs={12} sm={12} md={12}>
                  <InputLabel style={{ color: "#AAAAAA" }}>Send Email</InputLabel>
                  <CustomInput
                    labelText={`From: Me; To: ${user.botName}`}
                    id="send-message"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      multiline: true,
                      rows: 5
                    }}
                    onChangeTextHandler = {this.onChangeTextHandler}
                  />
                </GridItem>
              </Grid>
            </CardBody>
            <CardFooter className="desc-footer-card">
              <Button 
                color="primary" 
                className="black-color" 
                onClick={() => this.sendMessage(user.rlmMail, this.state.message)}>
                  <SendIcon />
                  Send
              </Button>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card profile className="profile-card">
            <CardAvatar profile>
              <a href="#!" onClick={e => e.preventDefault()}>
                <img 
                  src={"https://venturebeat.com/wp-content/uploads/2015/07/slackbot.png?fit=578%2C520&strip=all"}/>
              </a>
            </CardAvatar>
            <CardBody profile>
              <h6 className={classes.cardCategory}>This is your Bot</h6>
              <h4 className={classes.cardTitle}>{user.botName}</h4>

              <Grid>
                  <GridItem xs={12} sm={12} md={12}>
                    <List>
                      <ListItem>
                        <Avatar>
                           <CallIcon />
                        </Avatar>
                        <ListItemText primary="Bot Phone" secondary={user.botPhone} />
                      </ListItem>

                      <ListItem>
                        <Avatar>
                          <ProfileIcon />
                        </Avatar>
                        <ListItemText primary="RML" secondary={user.RLM} />
                      </ListItem>

                      <ListItem>
                        <Avatar>
                          <EmailIcon />
                        </Avatar>
                        <ListItemText primary="RML Mail" secondary={user.rlmMail} />
                      </ListItem>                      


                    </List>
                  </GridItem>
              </Grid>
              <Button color="primary" round className="black-color" onClick={this.logOut.bind(this)}>
                Log Out
              </Button>
            </CardBody>
          </Card>
        </GridItem>
      </Grid>
    </div>
  );
  }
}

export default withStyles(styles)(UserProfile);

//SELLO DE OSWALDO APRROBES