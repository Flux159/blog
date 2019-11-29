import React from 'react';

const Text = ({ is, ...props }) => {
  let Component = "p";
  if (is != null) {
    Component = is;
  }

  return (
    <Component
      className="mdx-text"
      {...props}
    ></Component>
  );
};

export default Text;
