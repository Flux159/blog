import React from "react";
import Tree from './tree';
import {StaticQuery, graphql} from "gatsby";
import {ExternalLink} from "react-feather";
import '../styles.css';
import config from '../../../config';

// eslint-disable-next-line no-unused-vars
const ListItem = ({className, active, level, ...props}) => {
  const anchorClassName = active ? 'active' : '';

  return (
    <li className={`sidebar-listitem ${className || ''}`}>
      <a className={anchorClassName} style={{display: 'block', fontWeight: level === 0 ? 700 : 400, paddingLeft: `${1 + (level || 0) * 1}rem`}} href={props.to} {...props} />
    </li>
  );
};

const Divider = (props) => (
  <li className="sidebar-divider" {...props}>
    <hr />
  </li>
);

const SidebarLayout = () => (
  <StaticQuery
    query={graphql`
      query {
        allMdx {
          edges {
            node {
              fields {
                slug
                title
              }
            }
          }
        }
      }
    `}
    render={({allMdx}) => {
      return (
        <aside className="components-sidebar">
          <ul className="sideBarUL">
            <Tree
              edges={allMdx.edges}
            />
            <Divider />
            {config.sidebar.links.map((link, key) => {
              if (link.link !== '' && link.text !== '') {
                return (
                  <ListItem key={key} to={link.link}>
                    {link.text}
                    <ExternalLink size={14} />
                  </ListItem>
                );
              }
            })}
          </ul>
        </aside>
      );
    }}
  />
);

export default SidebarLayout;
