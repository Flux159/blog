const config = {
	"gatsby": {
		"pathPrefix": "/",
		"siteUrl": "https://suyogsonwalkar.com",
		"assetPrefix": "https://suyogsonwalkar.com",
		"gaTrackingId": null
	},
	"header": {
		"logo": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
		"logoLink": "https://suyogsonwalkar.com/",
		"title": "Suyogs Blog",
		"githubUrl": "",
		"helpUrl": "",
		"tweetText": "",
		"links": [
			{"text": "", "link": ""},
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
			{ "text": "Github", "link": "https://github.com/flux159"},
		],
		"frontline": false,
		"ignoreIndex": true,
	},
	"siteMetadata": {
		"title": "Suyogs website",
		"description": "Suyogs website",
		"ogImage": null,
		"docsLocation": "https://github.com/flux159/blog",
		"favicon": ""
	},
};

module.exports = config;