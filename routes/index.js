
/*
 * GET home page.
 */
 
var db = require('../scripts/db.js');
//var s3 = require('../scripts/s3.js');

exports.index = function(req, res){
  	res.render('home', { title: 'lystn' });
};

exports.profile = function(req, res){
/*	if(req.session.user != null){
		res.redirect('/');
	}else{
		db.getProfile(req.session.user, function(good, profile){
			if(good){
				db.getProject(req.session.user._id, function(cool, project){
					if(cool){
					/*	var proPic = s3.getPic(req.session.user._id); 
						var data = {
							title: 'Profile',
							name : req.session.user.name,
							img : proPic,
						}*/
						res.render('profile', { title: 'profile'}/*,data*/);
	}
	/*
})
			}
		})
	}
}
*/
exports.logout = function(req, res){
	req.session.destroy();
	res.redirect('/');
}