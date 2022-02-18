import React from "react";
import { Redirect } from "react-router";

function Guard(props) {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  if (userInfo === null) {
    return <Redirect to="/" />;
  }
  if (userInfo.Role === true) {
    return props.children;
  } else {
    alert("Không có quyền mà đòi vào??? Nghĩ sayaro vậy :]] | Biến");
    return <Redirect to="/" />;
  }
}

export default Guard;
