module.exports = {
	// Specify pages to be targeted
	pages: [
		{
			url: 'https://www.google.com',
		},
	],
	options: {
		// Filter out unnecessary link tags based on the 'rel' attribute
		linkTags: [
			'canonical', 'amphtml'
		],
		// Filter out meta tags by attribute name | property
		metaTags: ['viewport', 'keywords']
	},
	outputPath: 'output.json'
}