import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppConfig from './config'
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';

import io from 'socket.io-client';

import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles , MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    padding:30
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  button: {
    margin: theme.spacing.unit,
    width:'100%'
  }
});

const themeg = createMuiTheme({
  palette: {
    primary: green,
  },
  typography: {
    useNextVariants: true,
  },
});

class App extends React.Component {
  state = {
    mobileOpen: false,
    peerCount:0
  };

  setupSocket()
  {
    const socket = io('https://957cfa28.ngrok.io', { transport : ['websocket'] });
   
    socket.on('connect', function(){
      console.log('Socket Connected')
    });
    socket.on('event', function(data){
      console.log('Socket event')
    });
    socket.on('disconnect', function(){
      console.log('Socket disconnect')
    });

    socket.on('news', function(){
      console.log('Socket emit new ')
    });

    socket.on('NodeStatus', function(){
      console.log('Socket emit new ')
    });

  }


componentWillMount()
{
  console.log('Mounting component')
  this.getNodeStatus()
}

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };


  getNodeStatus () {
    fetch(AppConfig.config.serverUrl + `/eth/getNodeStatus`)
      .then(response => response.json())
      .then(data => {
              this.setState({peerCount:data.peerCount})
              this.setupSocket()
        })
      .catch(e => e)
  }

  getCode () {
    fetch(AppConfig.config.serverUrl + `/eth/getCode`)
      .then(response => response.json())
      .then(data => {
              //this.setState({peerCount:data.peerCount} )
             
            })
      .catch(e => e)
  }

  getBlock () {
    fetch(AppConfig.config.serverUrl + `/eth/getBlock`)
      .then(response => response.json())
      .then(data => {
              this.setState({peerCount:data.peerCount}
          )})
      .catch(e => e)
  }

  

  render() {
    const { classes, theme } = this.props;

    const drawer = (
      <div>
       <Button variant="outlined" className={classes.button}>
        Default
      </Button>
      </div>
    );

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap>
              API Test Tool   
            </Typography>
            <div>     </div>
            <MuiThemeProvider theme={themeg}>
            <Button variant="contained" color="primary" className={classes.margin}>
               Connected : Peers Count {this.state.peerCount}
             </Button>
             </MuiThemeProvider>
          </Toolbar>
        
        </AppBar>
        <nav className={classes.drawer}>
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer
              container={this.props.container}
              variant="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={this.state.mobileOpen}
              onClose={this.handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Typography paragraph>
           
          </Typography>
          <Typography paragraph>
          
          </Typography>
        </main>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
  // Injected by the documentation to work in an iframe.
  // You won't need it on your project.
  container: PropTypes.object,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(App);
