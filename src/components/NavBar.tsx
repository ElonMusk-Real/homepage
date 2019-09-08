import React from 'react'
import {
  AppBar,
  Toolbar,
  IconButton,
  Icon,
  Typography,
  makeStyles
} from '@material-ui/core'


const useStyles = makeStyles(theme => ({
  appbar: {
    background: 'transparent'
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between'
  }
}))

interface NavBarProps {
  title?: string
}

const Navbar: React.FC<NavBarProps> = props => {
  const classes = useStyles()
  return (
    <div>
      <AppBar color='inherit' className={classes.appbar}>
        <Toolbar className={classes.toolbar}>
          <Typography variant='h5'>
            {props.title}
          </Typography>
          <IconButton>
            <Icon>menu</Icon>
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  )
}

Navbar.defaultProps = {
  title: 'NATA Danus'
}

export default Navbar
