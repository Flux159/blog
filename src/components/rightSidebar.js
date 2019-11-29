import React from "react";
import { StaticQuery, graphql } from "gatsby";
import { SharingButtons } from "./SharingButtons";
import "./styles.css";
import config from "../../config";

const Sidebar = ({children}) => <aside className="right-sidebar">{children}</aside>;

// eslint-disable-next-line no-unused-vars
const ListItem = ({className, active, level, ...props}) => {
  const anchorClassName = active ? 'active' : '';

  return (
    <li className={`${className || ''}`}>
      <a className={anchorClassName} style={{display: 'block', fontWeight: level === 0 ? 700 : 500, paddingLeft: `${0 + (level || 0) * 1}rem`}} href={props.to} {...props} />
    </li>
  );
};

const SidebarLayout = ({ location }) => (
  <StaticQuery
    query={graphql`
      query {
        allMdx {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
              }
              tableOfContents
            }
          }
        }
      }
    `}
    render={({ allMdx }) => {
      let navItems = [];
      let pageTitle = '';
      let finalNavItems;
      if (allMdx.edges !== undefined && allMdx.edges.length > 0) {
        navItems = allMdx.edges.map((item) => {
          let innerItems;
          if (item !== undefined) {
            if (
              item.node.fields.slug === location.pathname ||
              item.node.fields.slug + '/' === location.pathname ||
              config.gatsby.pathPrefix + item.node.fields.slug ===
                location.pathname
            ) {
              pageTitle = item.node.frontmatter.title;
              if (item.node.tableOfContents.items) {
                innerItems = item.node.tableOfContents.items.map(
                  (innerItem, index) => {
                    const itemId = innerItem.title
                      ? innerItem.title.replace(/\s+/g, "").toLowerCase()
                      : "#";
                    return (
                      <ListItem key={index} to={`#${itemId}`} level={1}>
                        {innerItem.title}
                      </ListItem>
                    );
                  }
                );
              }
            }
          }
          if (innerItems) {
            finalNavItems = innerItems;
          }
        });
      }

      if (finalNavItems && finalNavItems.length) {
        return (
          <Sidebar>
            <ul className="rightSideBarUL">
              <div className="rightSideTitle">CONTENTS</div>
              {finalNavItems}
              <div className="rightShareTitle">Share</div>
              <SharingButtons message={pageTitle} />
            </ul>
          </Sidebar>
        );
      } else {
        return (
          <Sidebar>
            <ul className="rightSideBarUL">
              <div className="rightShareTitle">Share</div>
              <SharingButtons message={pageTitle} />
            </ul>
          </Sidebar>
        );
      }
    }}
  />
);

export default SidebarLayout;
