import React, { useState } from "react";
import { StaticQuery, graphql } from "gatsby";
import GitHubButton from "react-github-btn";
import Link from "./link";
import "./styles.css";
import config from "../../config.js";

import Search from "./search/index";
const help = require("./images/help.svg");
const isSearchEnabled =
  config.header.search && config.header.search.enabled ? true : false;

let searchIndices = [];
if (isSearchEnabled && config.header.search.indexName) {
  searchIndices.push({
    name: `${config.header.search.indexName}`,
    title: `Results`,
    hitComp: `PageHit`
  });
}

import Sidebar from "./sidebar";

const Links = ({ githubUrl, helpUrl, tweetText, headerLinks, hiddenxs }) => {
  const twitter = require("./images/twitter.svg");

  const className = hiddenxs
    ? "nav navbar-nav navBarUL navBarNav navbar-right navBarULRight hidden-xs"
    : "nav navbar-nav navBarUL navBarNav navbar-right navBarULRight";

  return (
    <ul className={className}>
      {headerLinks.map((link, key) => {
        if (link.link !== "" && link.text !== "") {
          return (
            <li key={key}>
              <a href={link.link} target="_blank">
                {link.text}
              </a>
            </li>
          );
        }
      })}
      {helpUrl !== "" ? (
        <li>
          <a href={helpUrl}>
            <img src={help} alt="Help icon" />
          </a>
        </li>
      ) : null}
      {tweetText !== "" || githubUrl !== "" ? (
        <li className="divider hidden-xs"></li>
      ) : null}
      {tweetText !== "" ? (
        <li>
          <a
            href={"https://twitter.com/intent/tweet?&text=" + tweetText}
            target="_blank"
          >
            <img className="shareIcon" src={twitter} alt="Twitter" />
          </a>
        </li>
      ) : null}
      {githubUrl !== "" ? (
        <li className="githubBtn">
          <GitHubButton
            href={githubUrl}
            data-show-count="true"
            aria-label="Star on GitHub"
          >
            Star
          </GitHubButton>
        </li>
      ) : null}
    </ul>
  );
};

const Header = ({ location }) => {
  const [open, setOpen] = useState(false);

  return (
    <StaticQuery
      query={graphql`
        query headerTitleQuery {
          site {
            siteMetadata {
              headerTitle
              githubUrl
              helpUrl
              tweetText
              logo {
                link
                image
              }
              headerLinks {
                link
                text
              }
            }
          }
        }
      `}
      render={data => {
        const {
          site: {
            siteMetadata: {
              headerTitle,
              githubUrl,
              helpUrl,
              tweetText,
              // logo,
              headerLinks
            }
          }
        } = data;
        // const logoImg = require("./images/logo.svg");

        return (
          <div className="navBarWrapper">
            <nav className="navbar navbar-default navBarDefault">
              <div className="navbar-header navBarHeader">
                <Link to="/" className="navbar-brand navBarBrand">
                  {/* {logo.image !== '' ?
                  (<img className={'img-responsive'} src={logo.image} alt={'logo'} />)
                  :
                  (<img className={'img-responsive'} src={logoImg} alt={'logo'} />)
                } */}
                  <div className="headerTitle">{headerTitle}</div>
                </Link>
                <button
                  type="button"
                  className="navbar-toggle collapsed navBarToggle"
                  onClick={() => setOpen(!open)}
                >
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>
              </div>
              {isSearchEnabled ? (
                <div className="searchWrapper hidden-xs navBarUL">
                  <Search collapse indices={searchIndices} />
                </div>
              ) : null}
              <div
                id="navbar"
                className={
                  open
                    ? "navbar-collapse collapse show navBarCollapse"
                    : "collapse navBarCollapse"
                }
                onClick={() => setOpen(false)}
              >
                <div className="visible-xs">
                  <Sidebar location={location} />
                  {isSearchEnabled ? (
                    <div>
                      <hr />
                      <div className="searchWrapper navBarUL">
                        <Search collapse indices={searchIndices} />
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
              <Links
                githubUrl={githubUrl}
                helpUrl={helpUrl}
                tweetText={tweetText}
                headerLinks={headerLinks}
                hiddenxs={true}
              />
            </nav>
          </div>
        );
      }}
    />
  );
};

export default Header;
