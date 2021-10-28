import React from "react";
import { Redirect } from "react-router";

function Guard(props) {
  if (localStorage.Role === undefined) {
    return <Redirect to="/" />;
  }
  const Role = JSON.parse(localStorage.Role);
  if (Role === "admin") {
    return props.children;
  } else {
    alert("Không có quyền mà đòi vào??? Nghĩ sayaro vậy :]] | Biến")
    return <Redirect to="/" />;
  }
}

export default Guard;
