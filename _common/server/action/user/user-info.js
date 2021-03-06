/**
 * @author pulang
 * @createTime 2015-12-18
 * @description 这个处理更新用户信息的请求
 */

var _ = require('lodash');
var md5 = require('md5');
var model = yog.require('cus/model/user.js');

//修改用户个人信息
module.exports.put = function (req, res, next) {
	var params = _.extend({
		token: req.session.user.token
	}, req.body);
	model.updateData(params).then(function (rs) {
		res.json(rs);
	}).catch(function (error) {
		yog.log.fatal(error);
	});
};
