import React from 'react';

import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import { deepOrange, deepPurple } from '@material-ui/core/colors';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
}));


export default function AvatarLogo(props){
    const classes = useStyles();

    return (
        <div className={classes.root}>
          <Avatar className={classes.orange}>{props.initial}</Avatar>
        </div>
      );
}