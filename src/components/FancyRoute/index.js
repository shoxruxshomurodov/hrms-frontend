import React from "react";
import nprogress from "nprogress";
import "nprogress/nprogress.css";
import { get } from "lodash";
nprogress.configure({
  showSpinner: true,
  trickleRate: 0.02,
  trickleSpeed: 800,
  easing: "ease",
  speed: 400
});
const FancyRoute = (props) => {
  React.useState(nprogress.start());

  React.useEffect(() => {
    nprogress.done();
    return () => nprogress.start();
  });

  return <>{get(props, "children")}</>;
};

export default FancyRoute;
