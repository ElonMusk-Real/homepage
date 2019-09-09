import React from 'react'
import { Typography, TextField, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  container: {
    backgroundColor: '#F8EAEA',
    minHeight: '100vh',
    paddingTop: 64
  }
})

interface Props {
  
}

const Register: React.FC<Props> = () => {
  const classes = useStyles()
  return (
    <div className={classes.container}>
      <Typography>Register your email here to get our best offer</Typography>
    </div>
  )
}

export default Register
