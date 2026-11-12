
import React from "react";
import { Link } from "react-router-dom";
import { usePageTransition } from "./PageTransition.jsx";

const WarpLink = ({ to, label, children, ...props }) => {
  const { navigateWithTransition } = usePageTransition();

  const handleClick = (event) => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
      
    ) {
      return;
      
    }

    event.preventDefault();
    console.log("HYPERSPACE ACTIVATED:", to, label);
    navigateWithTransition(to, label);
  };

  return (
    <Link to={to} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
};

export default WarpLink;
