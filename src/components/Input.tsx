import React from 'react'
import { TextField, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  inputClasses: {
    paddingTop: 16,
    paddingBottom: 16,
    background: 'white'
  },
  labelClasses: {
    top: -6
  },
  shrinkClasses: {
    top: -9
  }
})

interface Props {
  label: string
}

const Input: React.FC<Props> = (props) => {
  const {label, ...transferProps} = props
  const classes = useStyles()

  return (
    <TextField
      variant='filled'
      label={label}
      value=''
      InputProps={{
        classes: {
          input: classes.inputClasses,
        }
      }}
      InputLabelProps={{
        classes: {
          root: classes.labelClasses,
          shrink: classes.shrinkClasses
        },
      }}
      {...transferProps}
    />
  )
}

export default Input
