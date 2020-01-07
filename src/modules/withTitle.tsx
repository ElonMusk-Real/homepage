import React from "react";
import Title from "../components/Title";

const withTitle = ({ component: Component, title }) => {
  return () => (
    <React.Fragment>
      <Title title={title} />
      <Component />
    </React.Fragment>
  );
};

export default withTitle;
