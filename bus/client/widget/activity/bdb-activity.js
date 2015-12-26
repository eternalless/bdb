/**
 * @author pulang.
 */
var B = require('_common:js/bdb/core.js');

module.exports = {
	init: function () {
		this.event();
	},

	event: function () {
		$("#registration").click(function(){
			$("#start").removeClass('on');
			$(this).addClass('on');
		});
		$("#start").click(function(){
			$("#registration").removeClass('on');
			$(this).addClass('on');
		});
	}
};