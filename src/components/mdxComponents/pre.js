import React from 'react';

const Pre = ({ is, ...props }) => {
  let Component = "pre";
  if (is != null) {
    Component = is;
  }

  return (
    <Component
      className="mdx-pre"
      {...props}
    ></Component>
  );
};

export default Pre;
