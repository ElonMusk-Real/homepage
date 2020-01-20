import React, { useState, useEffect } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core";

const userStyles = makeStyles((theme: Theme) =>
  createStyles({
    pinkBox: {
      background: "linear-gradient(90deg, #E73361 0%, #9A1675 100%)"
    }
  })
);
