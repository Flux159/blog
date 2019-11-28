const config = {
	"gatsby": {
		"pathPrefix": "/",
		// "pathPrefix": "/blog",
		"siteUrl": "https://suyogsonwalkar.com",
		"assetPrefix": "https://suyogsonwalkar.com",
		// "siteUrl": "https://flux159.github.io",
		// "assetPrefix": "https://flux159.github.io",
		"gaTrackingId": null
	},
	"header": {
		"logo": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
		// "logoLink": "https://flux159.github.io/blog/",
		"logoLink": "https://suyogsonwalkar.com/",
		"title": "Suyogs Blog",
		"githubUrl": "",
		"helpUrl": "",
		"tweetText": "",
		"links": [
			{"text": "", "link": ""},
			// { "text": "Hi", "link": "https://github.com"}
		],
		"search": {
			"enabled": false,
			"indexName": "",
			"algoliaAppId": process.env.GATSBY_ALGOLIA_APP_ID,
			"algoliaSearchKey": process.env.GATSBY_ALGOLIA_SEARCH_KEY,
			"algoliaAdminKey": process.env.ALGOLIA_ADMIN_KEY
		}
	},
	"sidebar": {
		"forcedNavOrder": [
			"/introduction",
    		"/codeblock"
		],
		"links": [
			// { "text": "Github", "link": "https://github.com/"},
		],
		"frontline": false,
		"ignoreIndex": true,
	},
	"siteMetadata": {
		"title": "Suyogs website",
		"description": "Suyogs website",
		"ogImage": null,
		"docsLocation": "https://github.com/hasura/gatsby-gitbook-boilerplate/tree/master/content",
		"favicon": "https://graphql-engine-cdn.hasura.io/img/hasura_icon_black.svg"
	},
};

module.exports = config;