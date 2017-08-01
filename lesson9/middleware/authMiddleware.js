var jwt = require('jsonwebtoken');

var validUsers = [{
	username: 'zhangsan',
	password: '123456'
},{
	username: 'lisi',
	password: '123456'
}]

const secretKey = 'dhahr3uiudfu93u43i3uy43&*&$#*&437hjhfjdjhfdfjsy8&*&*JNFSJDJHH??>:LP';

var createToken = function (user) {
	return jwt.sign({data: user, exp: Math.floor(Date.now() / 1000) + (60 * 60)}, secretKey);
}

var parseToken = function (token, callback) {
	jwt.verify(token, secretKey, function (err, result) {
		callback && callback(err, result);
	});
}

module.exports = function (req, res, next) {
	console.log(req.path);
	if (req.path === "/login") {
		var username = req.body.username;
		var password = req.body.password;
		var user = validUsers.filter(u => username === username && u.password === password)[0];
		if (user) {
			res.json({
				success: true,
				token: createToken(user)
			});
		} else {
			res.json({
				success: false,
				errorMessage: 'username or password is not correct, please try again'
			});
		}
		
	} else {
		var token = req.get('Authorization');
		console.log(token);
		if (token) {
			parseToken(token, function (err, result) {
				if (err) {
					res.status(401).json({
						success: false,
						errorMessage: JSON.stringify(err)
					})
				} else {
					next();
				}
			})
		} else {
			res.status(401).json({
				success: false,
				errorMessage: '未授权的访问'
			})
		}
	}
};