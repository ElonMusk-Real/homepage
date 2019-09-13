import React from 'react'
import { makeStyles, CardContent, Typography, CardHeader, CardMedia } from '@material-ui/core';
import ProductCard from '../components/ProductCard';

const useStyles = makeStyles({
  container: {
    paddingTop: 64
  }
})

interface Props {
  
}

const Home: React.FC<Props> = () => {
  const classes = useStyles()
  return (
    <div className={classes.container}>
      Home Page
      <ProductCard />
    </div>
  )
}

export default Home