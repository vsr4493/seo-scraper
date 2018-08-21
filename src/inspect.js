const puppeteer = require('puppeteer');
const fs = require('fs');
const chalk = require('chalk');
const config = require('../config');

async function scrapeSEOData() {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  const results = [];
  for ({ url } of config.pages) {
  	await page.goto(url, {waitUntil: 'domcontentloaded'});
  	const linkTags = await page.evaluate(() => 	
			Array.from(document.querySelectorAll('link'))
				.map(node => ({
					rel: node.getAttribute('rel'),
					href : node.getAttribute('href')
				}))
		);
		const metaTags = await page.evaluate(() => 
			Array.from(document.querySelectorAll('meta'))
				.map(node => ({
					['http-equiv']: node.getAttribute('http-equiv'),
					property: node.getAttribute('property'),
					name: node.getAttribute('name'),
					content: node.getAttribute('content'),
				}))
		);
		const parsedLinkTags = linkTags.filter(tag => config.options.linkTags.indexOf(tag.rel) !== -1);
		const parsedMetaTags = metaTags.filter(tag => config.options.metaTags.indexOf(tag.name) !== -1);
  	results.push({
  		url,
  		linkTags: parsedLinkTags,
  		metaTags: parsedMetaTags,
  	});
  }
  browser.close();
 	return results; 
};

async function main() {
	console.log(chalk.bold.green('Hang tight, snooping around!'));
	const results = await scrapeSEOData();
	fs.writeFileSync(config.outputPath, JSON.stringify(results), 'utf-8');
	console.log(chalk.bold.green(`Done, Output: ${config.outputPath}`));
	process.exit(0);
}

main();

