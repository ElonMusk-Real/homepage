import React from 'react'
import { Typography, Grid, makeStyles, Button } from '@material-ui/core';
import Input from '../components/Input';

const useStyles = makeStyles({
  container: {
    backgroundColor: '#F8EAEA',
    minHeight: '100vh',
    paddingTop: 64
  },
  debug: {
    border: '1px solid black'
  },
  text: {
    padding: 48
  }
})

interface Props {
  
}

const Login: React.FC<Props> = () => {
  const classes = useStyles()
  const [state, setState] = React.useState({
    email: '',
    password: '',
  })

  const handleChange = (name: string) => (event: any) => {
    const {value} = event.target
    setState({ ...state, [name]:value })
  }
  return (
    <div className={classes.container}>
      <Grid container justify='center'>

        <Grid item xs={11} md={6}>
          <Grid container justify='center'>
            <Typography variant='body1' className={classes.text} display='block'>Log In to Your Account</Typography>
            <Input fullWidth label='email' value={state.email} onChange={handleChange('email')}/>
            <Input fullWidth label='password' value={state.password} onChange={handleChange('password')}/>
            <Button fullWidth variant='contained' color='inherit'>Login</Button>
          </Grid>
        </Grid>

      </Grid>
    </div>
  )
}

export default Login