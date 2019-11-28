---
title: "Github Pages for Static Sites"
path: /experiments/github-pages-for-static-sites
date: "11-28-2019"
metaTitle: "Github Pages for Static Sites"
metaDescription: "Using Github Pages with Gatsby.js"
---

# Intro

Writing a static site has gotten significantly more difficult than "upload a .html file to a shared host" in the 90s.

This post is talking about how I setup this blog to be hosted on Github Pages and used a Github Action to update on every push to master. It uses [Gatsby](https://www.gatsbyjs.org/) as the static site generator and I started with a [template](https://www.gatsbyjs.org/starters/hasura/gatsby-gitbook-starter/) that lets me use [mdx](https://github.com/mdx-js/mdx) in my posts for interactive React content.

Some of the nice parts of this setup is that I can update the markdown content via the Github online editor (works on mobile and in any browser). Since the Github Action is setup to continuously deploy a new build on every commit to master, I don't need to clone, build, and redeploy on a local machine.

# Setup

Work in Progress.

# Additions

I cleaned up some of the CSS and headers that I didn't need from the starter template (and changed the color scheme to use a blue hue).

I also removed the need for Jquery and Bootstrap js by making the mobile navigation use React instead.

# Todos

- I still need to add commenting and social sharing to the site to allow it to be more interactive and easily shareable. [Gatsby](https://www.gatsbyjs.org/docs/adding-comments/) has a number of solutions for adding commenting to the site. 
- [React Share](https://swas.io/blog/social-share-button-for-gatsby-blog-pages/) is an option for adding social sharing.
- Adding an index page with [pagination](https://www.gatsbyjs.org/docs/adding-pagination/) along with an [RSS feed](https://www.gatsbyjs.org/docs/adding-an-rss-feed/) would make the site more accessible to read from other sources. 
