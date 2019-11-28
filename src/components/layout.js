import React from "react";
import styled from "react-emotion";
import { MDXProvider } from "@mdx-js/react";
import ThemeProvider from "./themeProvider";
import mdxComponents from "./mdxComponents";
import Sidebar from "./sidebar";
import RightSidebar from "./rightSidebar";

const Layout = ({ children, location }) => (
  <ThemeProvider location={location}>
    <MDXProvider components={mdxComponents}>
      <div className="layout-wrapper">
        <div className="layout-left-sidebar-width hidden-xs">
          <Sidebar location={location} />
        </div>
        <main className="layout-content">
          <div className="layout-maxwidth">{children}</div>
        </main>
        <div className="layout-right-sidebar-width hidden-xs">
          <RightSidebar location={location} />
        </div>
      </div>
    </MDXProvider>
  </ThemeProvider>
);

export default Layout;
