const path = require('path');
// currently unused, to be used to load a configuration in JSON
const fs = require('fs');
const chalk = require('chalk');
const error = chalk.bold.red;
const configPath = path.resolve(__dirname, '../config.json');
module.exports = () => {
	try {
		return JSON.parse(fs.readFileSync(configPath, 'utf-8'));
	} catch(err) {
		console.log(error(`Could not locate a configuration file.\nPlease provide a configuration file at the root of the project`));
		process.exit(2);
	}	
}