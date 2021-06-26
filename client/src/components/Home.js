import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import present from '../present.png'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height:'100vh',
    [theme.breakpoints.down('sm')]: {
        height: '50vh',
    },
  },
  title: {
    paddingTop:`${theme.spacing(10)}px`,
    color: theme.palette.openTitle,
    fontSize: '25px',
    textAlign:'center'
  },
  image: {
      display: 'block',
      width: '65%',
      height: '70%',
      margin: 'auto',
      verticalAlign: 'middle',
      [theme.breakpoints.up('sm')]: {
         paddingTop: '13vh',
         paddingLeft: '12vh',
         height: '60%',
      },
  }
}));

export default function Home() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container 
        direction="row"
        justify="center"
        alignItems="stretch"
        >

        <Grid item xs={12} md={6}>
          <Paper className={classes.paper}>
            <Typography className={classes.title}>
                Easiest Way To ShowCase Your Products To World
            </Typography>
            
           </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper className={classes.paper}><img src={present} alt="present" className={classes.image}></img></Paper>
        </Grid>
        
        
      </Grid>
    </div>
  );
}