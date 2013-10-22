var db = require('../scripts/db');
/*var s3 = require('../scripts/s3');*/
var ObjectID = require("mongodb").ObjectID;
var moment = require('moment');

exports.addUser = function(req, res){
	var userObj = {
		_id		: twitterUsers.twitterId,
		name 	: twitterUsers.name,
		img		: twitterUsers.img,
	}
	db.addUser(userObj, function(save){
		if(save){
			req.session.user = userObj;
			res.send({msg: 'ok', redirect: '/profile'});
		} else {
			res.send({msg: 'nok'});
		}
	})
}