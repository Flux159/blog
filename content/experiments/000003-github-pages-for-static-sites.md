---
title: "Github Pages for Static Sites"
path: /experiments/github-pages-for-static-sites
date: "11-28-2019"
metaTitle: "Github Pages for Static Sites"
metaDescription: "Using Github Pages with Gatsby.js"
---

# Intro

Writing a static site has gotten significantly more difficult than "upload a .html file to a shared host" in the 90s.

This post is talking about how I setup [this](https://suyogsonwalkar.com/) [blog](https://github.com/flux159/blog) to be hosted on Github Pages and used a Github Action to update on every push to master. It uses [Gatsby](https://www.gatsbyjs.org/) as the static site generator and I started with a [template](https://www.gatsbyjs.org/starters/hasura/gatsby-gitbook-starter/) that lets me use [mdx](https://github.com/mdx-js/mdx) in my posts for interactive React content.

Some of the nice parts of this setup is that I can update the markdown content via the Github online editor (works on mobile and in any browser). Since the Github Action is setup to continuously deploy a new build on every commit to master, I don't need to clone, build, and redeploy on a local machine.

# Setup

On a Mac, get [Node.js](https://nodejs.org/en/) and [Yarn](https://yarnpkg.com/lang/en/) installed. You probably need [Xcode tools](http://osxdaily.com/2014/02/12/install-command-line-tools-mac-os-x/) for git and other tools as well.

Setup global modules for node.js by creating a .npm-global directory as described [here](https://docs.npmjs.com/resolving-eacces-permissions-errors-when-installing-packages-globally). 

```shell
npm i -g gatsby-cli
mkdir -p ~/Projects/gatsbysites
gatsby new gatsby-gitbook-starter https://github.com/hasura/gatsby-gitbook-starter
cd ./gatsby-gitbook-starter
gatsby develop
```

I made a bunch of changes to the config.js file and did some work to change the theme of the site from a purple hue to a blue hue.

Then I tested out a static build by doing the following:
```shell
yarn build
cd ./public && python -m http.server
```

# Github Pages and Github Actions

Once I knew that a static build would work, I wanted to setup the site so that it could be published to [Github Pages](https://pages.github.com/).

I created a new public repo on Github, and added my changes:
```shell
 git remote add origin <remote repo URL>
 git push -u origin master
```

Then I wanted to setup Github Pages to automatically publish to the [gh-pages branch](https://help.github.com/en/github/working-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site). I saw that there already existed an [action](https://github.com/enriikke/gatsby-gh-pages-action) to do that, so I added it to a workflow .yml file in my repo:

`<repo>/.github/workflows/main.yml`
```yaml
name: Gatsby Publish

on:
  push:
    branches:
      - master

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v1
      - uses: enriikke/gatsby-gh-pages-action@2.1.1
        with:
          access-token: ${{ secrets.ACCESS_TOKEN }}
          deploy-branch: gh-pages
          gatsby-args: --prefix-paths
```

The only thing to note here is that there's a secrets.ACCESS_TOKEN that is specified in the file.

To create this token, you want to create a [personal access token](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line) with the **repo** permissions.

Then in your Repo's Settings, go to [Secrets](https://help.github.com/en/actions/automating-your-workflow-with-github-actions/creating-and-using-encrypted-secrets) and create a secret named "ACCESS_TOKEN" with the personal access token you just created.

Now if you make a new change on master and push to the repo, it should automatically publish to the gh-pages branch.

NOTE: Make sure that your Github repository settings have gh-pages as the branch you want to host pages from.

# Setting up DNS

Once I had the gh-pages branch setup and autodeploying my changes on commit, I wanted to do one last thing to setup my personal blog - configure my DNS Nameservers to point to Github.

I use [Namecheap](https://www.namecheap.com/) as my Domain Name Provider, so I followed Github's [instructions](https://help.github.com/en/github/working-with-github-pages/managing-a-custom-domain-for-your-github-pages-site) on how to properly setup my A records.

I also needed to add a `CNAME` file in my master branch with the name of my site [suyogsonwalkar.com](https://suyogsonwalkar.com).

After the DNS changes propagated, I was able to go to https://suyogsonwalkar.com and it showed my Github Pages site!

# Additions

I cleaned up some of the CSS and headers that I didn't need from the starter template (and changed the color scheme to use a blue hue).

I also removed the need for Jquery and Bootstrap js by making the mobile navigation use React instead. Also made sure that the site **mostly** worked without Javascript (obvious things like mobile dropdown and live mode JS code don't work).

# Todos

- I still need to add commenting and social sharing to the site to allow it to be more interactive and easily shareable. [Gatsby](https://www.gatsbyjs.org/docs/adding-comments/) has a number of solutions for adding commenting to the site. 
- [React Share](https://swas.io/blog/social-share-button-for-gatsby-blog-pages/) is an option for adding social sharing.
- Adding an index page with [pagination](https://www.gatsbyjs.org/docs/adding-pagination/) along with an [RSS feed](https://www.gatsbyjs.org/docs/adding-an-rss-feed/) would make the site more accessible to read from other sources. 

# References
- https://www.gatsbyjs.org/
- https://pages.github.com/
- https://github.com/features/actions
- https://help.github.com/en/actions/automating-your-workflow-with-github-actions/creating-and-using-encrypted-secrets
- https://medium.com/@hossainkhan/using-custom-domain-for-github-pages-86b303d3918a
- https://help.github.com/en/github/working-with-github-pages/managing-a-custom-domain-for-your-github-pages-site
