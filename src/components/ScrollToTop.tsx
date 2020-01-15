import { useEffect } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";

interface ScrollToTopProps extends RouteComponentProps<{}> {}

const ScrollToTop = (props: ScrollToTopProps) => {
  useEffect(() => {
    const unlisten = props.history.listen(() => {
      window.scrollTo(0, 0);
    });

    return () => {
      unlisten();
    };
  }, []);

  return null;
};

export default withRouter(ScrollToTop);
