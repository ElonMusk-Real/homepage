import React from "react";
import Helmet from "react-helmet";

const Title = ({ title }) => {
  const defaultTitle = "NataDanus";

  return (
    <Helmet>
      <title>{title ? defaultTitle + " | " + title : defaultTitle}</title>
    </Helmet>
  );
};

export default Title;
