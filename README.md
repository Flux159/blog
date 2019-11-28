# Suyogs blog

Built off of [gatsby-gitbook-starter](https://github.com/hasura/gatsby-gitbook-starter).

Added github action to publish to github pages on every change.

## 🔗 Site

Here's [the site](https://suyogsonwalkar.com) this is hosted at.

## 🚀 Edits

Get started by running the following commands (assumes node, npm, and yarn are installed):

```
$ git clone https://github.com/Flux159/blog.git
$ npm install -g gatsby-cli
$ npm install
$ gatsby develop
```

Visit `http://localhost:8000/` to view the app.

## 🔧 Configure

Write markdown files in `content` folder.

Open `config.js` for templating variables. Broadly configuration is available for `gatsby`, `header`, `sidebar` and `siteMetadata`.

- For sub nesting in left sidebar, create a folder with the same name as the top level `.md` filename and the sub navigation is auto-generated. The sub navigation is alphabetically ordered.

## Live Code Editor

To render react components for live editing, add the `react-live=true` to the code section. For example:

```javascript react-live=true
<button>Edit my text</button>
```

In the above code, just add `javascript react-live=true` after the triple quote ``` to start rendering react components that can be edited by users.

## 🤖 SEO friendly

This is a static site and comes with all the SEO benefits. Configure meta tags like title and description for each markdown file using MDX Frontmatter

```markdown
---
title: "Title of the page"
metaTitle: "Meta Title Tag for this page"
metaDescription: "Meta Description Tag for this page"
---
```

Canonical URLs are generated automatically.

## ☁️ Deploy

Just push to Github :)

The github action is setup to automatically republish to gh-pages branch.

Github does cache for around 10 minutes though, so changes won't appear immediately.
