import React from "react";
import Heading from "./heading";
import Text from "./text";
import Code from "./code";
import CodeBlock from "./codeBlock";
import Pre from "./pre";
import AnchorTag from "./anchor";

/* eslint-disable react/display-name */
export default {
  h1: props => <Heading id={props != null && props.children != null ? props.children.replace(/\s+/g, '').toLowerCase() : ''} {...props} is="h1" fontSize={[5, 6]} />,
  h2: props => <Heading id={props != null && props.children != null ? props.children.replace(/\s+/g, '').toLowerCase() : ''} {...props} is="h2" fontSize={[4]} />,
  h3: props => <Heading id={props != null && props.children != null ? props.children.replace(/\s+/g, '').toLowerCase() : ''} {...props} is="h3" />,
  h4: props => <Heading id={props != null && props.children != null ? props.children.replace(/\s+/g, '').toLowerCase() : ''} {...props} is="h4" />,
  h5: props => <Heading id={props != null && props.children != null ? props.children.replace(/\s+/g, '').toLowerCase() : ''} {...props} is="h5" />,
  h6: props => <Heading id={props != null && props.children != null ? props.children.replace(/\s+/g, '').toLowerCase() : ''} {...props} is="h6" />,
  p: props => <Text {...props} is="p" />,
  pre: Pre,
  code: CodeBlock,
  inlineCode: props => <Code {...props} />,
  a: props => <AnchorTag {...props} />
  // TODO add `img`
  // TODO add `blockquote`
  // TODO add `ul`
  // TODO add `li`
  // TODO add `table`
};
