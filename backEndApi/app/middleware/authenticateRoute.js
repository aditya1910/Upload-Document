// This is the function act as the middle ware if the user's session is active or not if not
// or any other restrictions can be applied to this route
const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
	const token =
		req.headers['x-access-token'] || req.query.token || req.body.token;
	if (token) {
		jwt.verify(token, 'SuperSecret', function(err, decoded) {
			if (err) {
				console.log('Authentication Failed. Error while verifying jwt token.');
				return res.status(401).json({
					IsTokenActive: false,
					msg:
						'Token Invalid or Your login session is expired kindly login again.',
				});
			}

			console.log('Valid User');
			req.decoded = decoded;
			res.IsTokenActive = true;
			next();
		});
	} else {
		res.status(401).json({ msg: 'You are not authorized to use this service' });
	}
};
