import React from "react";
import { Redirect } from "react-router";

function Guard(props) {
  const Role = JSON.parse(localStorage.Role);
  if (Role === "admin") {
    return props.children;
  } else{
      return <Redirect to="/"/>
  }
}

export default Guard;
