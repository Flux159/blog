import React from "react";

const notificationTypes = {
  warning: {
    dark: "goldenrod",
    light: "papayawhip",
  },
  error: {
    dark: "firebrick",
    light: "rosybrown",
  },
  info: {
    dark: "#663399",
    light: "#FFFFFF",
  },
};

const getColor = (type = "info", shade = "dark") =>
  notificationTypes[type][shade];

const Notification = (props) => {
  return (
    <section
      style={{
        color: getColor(props.type, "light"),
        background: getColor(props.type),
        width: "100%",
        padding: "1rem",
        textAlign: "center",
      }}
    >
      {props.children}
    </section>
  );
};

export default Notification;
