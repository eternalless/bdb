/**
 * @author radish.
 */
var B = require('_common:js/bdb/core.js');

module.exports = {
	init: function () {
		this.event();
	},
	//添加收货地址信息
	addData: function () {
		var name = $('#name').val(),
				tel = $('#tel').val(),
				code = $('#code').val(),
		    address = $('#address').val();
		if (!name) {
			B.topWarn('收货人不能为空!');
			return false;
		}
		if (!tel) {
			B.topWarn('联系方式不能为空!');
			return false;
		}
		if (!code) {
			B.topWarn('邮编不能为空!');
			return false;
		}
		if (!address) {
			B.topWarn('详细地址不能为空!');
			return false;
		}
		if($("#btn-default").prop('checked')){
			this.setdefault();
		}
		//向后台提交数据
		$.ajax({
			type: 'post',
			dataType: 'json',
			url: '/_common/user/address',
			data: {
				username: name,
				mobile: tel,
				post: code,
				address: address,
				province:'GD',
				city:'SZ'
			},
			success: function (data) {
				if (0 == data.status) {
					window.location.href = '/user/personal';
				} else {
					var msg = data.msg || '服务器异常，请稍后再试';
					B.topWarn(msg);
				}
			},
			error: function (jqXHR, textStatus, errorThrown) {
				B.topWarn('服务器异常，请稍后再试');
			}
		});
	},
	//删除收货地址信息
	deleteData: function () {
		var addressid = $("#addressid").val();
		//删除当前数据
		$.ajax({
			type: 'delete',
			dataType: 'json',
			url: '/_common/user/address',
			data: {
				addressid: addressid
			},
			success: function (data) {
				if (0 == data.status) {
					window.location.href = '/user/personal';
				} else {
					var msg = data.msg || '服务器异常，请稍后再试';
					B.topWarn(msg);
				}
			},
			error: function (jqXHR, textStatus, errorThrown) {
				B.topWarn('服务器异常，请稍后再试');
			}
		});
	},
	//设置默认地址
	setdefault: function () {
		var addressid = $("#addressid").val();
		//删除当前数据
		$.ajax({
			type: 'put',
			dataType: 'json',
			url: '/_common/user/address',
			data: {
				addressid: addressid
			},
			success: function (data) {
				if (0 == data.status) {
					console.log(data);
				} else {
					var msg = data.msg || '服务器异常，请稍后再试';
					B.topWarn(msg);
				}
			},
			error: function (jqXHR, textStatus, errorThrown) {
				B.topWarn('服务器异常，请稍后再试');
			}
		});
	},
	event: function () {
		$('#btn-save').on('click', this.addData.bind(this));
		$(".header-wrap .header .rightText").on('click',this.deleteData.bind(this));

	}
};
