import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Grid item xs={12}>
          <Grid container spacing={16}>
            {[0, 1, 2].map(value => (
              <Grid key={value} item>
                <p>not paper</p>
                {/* <Paper className={classes.paper} /> */}
              </Grid>
            ))}
          </Grid>
        </Grid>
        <div>
          <Button variant="contained" color="primary">
            Hello World
          </Button>
        </div>
      </div>
    );
  }
}

export default App;
