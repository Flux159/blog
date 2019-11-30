import React, { Component } from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import MDXRenderer from "gatsby-plugin-mdx/mdx-renderer";
import { Layout } from "$components";
import NextPrevious from "../components/NextPrevious";
import { SharingButtons } from "../components/SharingButtons";
import "../components/styles.css";
import config from "../../config";

const forcedNavOrder = config.sidebar.forcedNavOrder;

// const Edit = ({children}) => <div className="layout-edit">{children}</div>;

export default class MDXRuntimeTest extends Component {
  render() {
    const { data } = this.props;
    let {
      allMdx,
      mdx,
      site: {
        siteMetadata: { docsLocation, title }
      }
    } = data;
    const gitHub = require("../components/images/github.svg");

    const navItems = allMdx.edges
      .map(({ node }) => node.fields.slug)
      .filter(slug => slug !== "/")
      .sort()
      .reduce(
        (acc, cur) => {
          if (forcedNavOrder.find(url => url === cur)) {
            return { ...acc, [cur]: [cur] };
          }

          const prefix = cur.split("/")[1];

          if (prefix && forcedNavOrder.find(url => url === `/${prefix}`)) {
            return { ...acc, [`/${prefix}`]: [...acc[`/${prefix}`], cur] };
          } else {
            return { ...acc, items: [...acc.items, cur] };
          }
        },
        { items: [] }
      );

    const nav = forcedNavOrder
      .reduce((acc, cur) => {
        return acc.concat(navItems[cur]);
      }, [])
      .concat(navItems.items)
      .map(slug => {
        if (slug) {
          const { node } = allMdx.edges.find(
            ({ node }) => node.fields.slug === slug
          );

          return { title: node.fields.title, url: node.fields.slug };
        }
      });

    if (mdx == null) {
      mdx = {
        frontmatter: {},
        fields: {},
      };
    }

    // meta tags
    const metaTitle = mdx.frontmatter.metaTitle;
    const metaDescription = mdx.frontmatter.metaDescription;
    let canonicalUrl = config.gatsby.siteUrl;
    canonicalUrl =
      config.gatsby.pathPrefix !== "/"
        ? canonicalUrl + config.gatsby.pathPrefix
        : canonicalUrl;
    canonicalUrl = canonicalUrl + (mdx.fields.slug);

    return (
      <Layout {...this.props}>
        <Helmet>
          {metaTitle ? <title>{metaTitle}</title> : null}
          {metaTitle ? <meta name="title" content={metaTitle} /> : null}
          {metaDescription ? (
            <meta name="description" content={metaDescription} />
          ) : null}
          {metaTitle ? <meta property="og:title" content={metaTitle} /> : null}
          {metaDescription ? (
            <meta property="og:description" content={metaDescription} />
          ) : null}
          {metaTitle ? (
            <meta property="twitter:title" content={metaTitle} />
          ) : null}
          {metaDescription ? (
            <meta property="twitter:description" content={metaDescription} />
          ) : null}
          <link rel="canonical" href={canonicalUrl} />
        </Helmet>
        <div className="titleWrapper">
          <h1 className="title">{mdx.fields.title}</h1>
          <h6 className="subtitle">{mdx.frontmatter.date || ""}</h6>
          {/* <Edit className={'mobileView'}>
            <Link className={'gitBtn'} to={`${docsLocation}/tree/master/content/${mdx.parent.relativePath}`}>
              <img src={gitHub} alt={'Github logo'} /> Edit on GitHub
            </Link>
          </Edit> */}
        </div>
        <div style={{ paddingLeft: 20 }} className="visible-xs">
            <SharingButtons small message={mdx.fields.title} />
          </div>
        <div className="mainWrapper">
          <MDXRenderer>{mdx.body}</MDXRenderer>
        </div>
        {/* TODO: Add commenting: https://www.gatsbyjs.org/docs/adding-comments/ */}
        <div className="addPaddTopBottom">
          <NextPrevious mdx={mdx} nav={nav} />
        </div>
      </Layout>
    );
  }
}

export const pageQuery = graphql`
  query($id: String!) {
    site {
      siteMetadata {
        title
        docsLocation
      }
    }
    mdx(fields: { id: { eq: $id } }) {
      fields {
        id
        title
        slug
      }
      body
      tableOfContents
      parent {
        ... on File {
          relativePath
        }
      }
      frontmatter {
        metaTitle
        metaDescription
        path
        date
      }
    }
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
`;
