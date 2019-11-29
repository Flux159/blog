import React from 'react';

const Heading = ({ is, fontSize, ...props }) => {
  let Component = "h2";
  if (is != null) {
    Component = is;
  }

  return (
    <Component
      style={{ fontSize }}
      className="mdx-heading"
      {...props}
    ></Component>
  );
};

export default Heading;
