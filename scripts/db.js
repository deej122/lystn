var db = require('mongojs').connect('lystn', ["users"]);
var env = process.env.NODE_ENV || 'development';

var addUser = function(userObject, callback){
	db.users.findOne({_id: userObject._id}, function(e, user){
		if(e) console.log(e);
		if(user){
			callback(0);
		} else{
					db.users.save(userObject);
				};
			});
		}

var getProfile = function(userObject, callback){
	db.profiles.findOne({_id: userObject._id}, function(e, profile){
		if(e) console.log(e);
		if(profile){
			callback(1, profile);
		} else {
			callback(0);
		}
	});
}

var addProfile = function(postData, callback){
	db.profiles.save(postData, function(e, good){
		if(e) {
			console.log(e); console.log(e.stack); callback(0);
		}
		else callback(1);
	});
}

exports.addUser = addUser;
exports.getProfile = getProfile;
exports.addProfile = addProfile;