const URI = require('urijs');

exports.parseURI = (baseURL) => {
	const uri = new URI(baseURL);
	return {
		protocol: uri.protocol(),
		href: uri.href(),
		hostname: uri.hostname(),
		port: uri.port(),
		origin: uri.origin(),
		pathname: uri.pathname(),
		query: uri.query(),
	}
}