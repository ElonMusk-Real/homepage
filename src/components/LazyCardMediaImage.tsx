import React, { useState } from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import { CardMedia } from "@material-ui/core";

interface LazyImageProps {
  src: string;
  className: string;
}

const LazyCardMediaImage = (props: LazyImageProps) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {loaded && <CardMedia className={props.className} src={props.src} component="img" />}
      {!loaded && <Skeleton variant="rect" className={props.className} />}
      <img style={{ display: "none" }} src={props.src} onLoad={() => setLoaded(true)} className={props.className} />
    </>
  );
};

export default LazyCardMediaImage;
