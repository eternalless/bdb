/**
 * Created by chenzhenhua on 2015/12/22.
 */

var B = require('_common:js/bdb/core.js');
var Cash = require('_common:js/bdb/cash.js');
module.exports = {
	init: function () {
		require('_common:widget/common/header/header-filter.js').init();
		B.bindInput();
		this.$transList = $('.trans-list');
		this.pageSize = 10;
		this.pageNum = 1;
		this.total = +this.$transList.data('total') || this.pageSize;
		this.bindScroll();
		this.event();
	},
	// 显示详情
	showDetail: function (e) {
		var item = $(e.currentTarget);
		var html = [];
		html.push('<div class="dialog-wrap trans-dialog" style="display:block;">');
		html.push('	<div class="dialog-mask closeDialog"></div>');
		html.push('	<div class="dialog">');
		html.push('		<div class="dialog-hd">账单</div>');
		html.push('		<div class="dialog-bd">');
		html.push('			<div class="clearfix">');
		html.push('				<span class="fl">时间</span>');
		html.push('				<span class="fr">' + item.data('time') + '</span>');
		html.push('			</div>');
		html.push('			<div class="clearfix">');
		html.push('				<span class="fl">类型</span>');
		html.push('				<span class="fr">' + item.data('typeName') + '</span>');
		html.push('			</div>');
		html.push('			<div class="clearfix">');
		html.push('				<span class="fl">金额</span>');
		html.push('				<span class="fr">￥' + item.data('money') + '</span>');
		html.push('			</div>');
		html.push('			<div class="clearfix">');
		html.push('				<span class="fl">流水号</span>');
		html.push('				<span class="fr">' + item.data('transNo') + '</span>');
		html.push('			</div>');
		$.ajax({
			type: 'post',
			dataType: 'json',
			url: '/_common/cash/trans-detail',
			data: {
				tradeNo: item.data('transNo')
			},
			success: function (data) {
				if (0 == data.status) {
					if ('提现' == item.data('typeName')) {
						var withdraw = data.data;
						var drawflag = ['处理中', '审核', '处理完成', '银行处理失败', '取消'];
						html.push('			<div class="clearfix">');
						html.push('				<span class="fl">提现银行卡</span>');
						html.push('				<span class="fr">' + withdraw.bankname + '(' + withdraw.bankno.substr(withdraw.bankno.length - 4, 4) + ')' + '</span>');
						html.push('			</div>');
						html.push('			<div class="clearfix">');
						html.push('				<span class="fl">提现状态</span>');
						html.push('				<span class="fr">' + drawflag[withdraw.drawflag] + '</span>');
						html.push('			</div>');
					} else if ('充值' == item.data('typeName')) {
						html.push('			<div class="clearfix">');
						html.push('				<span class="fl">充值方式</span>');
						html.push('				<span class="fr">' + '京东支付' + '</span>');
						html.push('			</div>');
					} else if ('订单' == item.data('typeName')) {
						html.push('			<div class="clearfix">');
						html.push('				<span class="fl">订单详情</span>');
						html.push('				<span class="fr">' + '<a href="/order/list">订单</a>' + '</span>');
						html.push('			</div>');
					} else if ('打赏' == item.data('typeName')) {
						html.push('			<div class="clearfix">');
						html.push('				<span class="fl">打赏拍品</span>');
						html.push('				<span class="fr">' + '拍品' + '</span>');
						html.push('			</div>');
					}
					html.push('		</div>');
					html.push('	</div>');
					html.push('</div>');
					$('.page>.content').append(html.join(''));
				} else {
					var msg = data.msg || '服务器异常，请稍后再试';
					B.topWarn(msg);
				}
			},
			error: function (jqXHR, textStatus, errorThrown) {
				B.topWarn(B.tips.networkError);
			}
		});
	},
	// 带参数跳转
	jump: function (e) {
		var url = '/wallet/trans-list?';
		var bTime = $('.trans-time input[name="bTime"]').val();
		var eTime = $('.trans-time input[name="eTime"]').val();
		var tradeType = $('.header .filter span').data('filter');
		if (bTime != '') {
			url = url + 'bTime=' + bTime + ' 00:00:00&';
		} else {
			url = url + 'bTime=&';
		}
		if (eTime != '') {
			url = url + 'eTime=' + eTime + ' 23:59:59&';
		} else {
			url = url + 'eTime=&';
		}
		if ('undefined' != typeof tradeType) {
			url = url + 'tradeType=' + tradeType + '&';
		}
		if ('&' == url.substr(url.length - 1, 1)) {
			url = url.substr(0, url.length - 1);
		}
		location.href = url;
	},
	// 点击筛选
	filter: function (e) {
		var $this = $(e.currentTarget);
		$('.header .filter span').text($this.text());
		$('.header .filter span').data('filter', $this.data('filter'));
		this.jump();
	},
	// 绑定交易明细列表的滑动
	bindScroll: function () {
		var that = this;
		$('#trans-list').dropload({
			loadUpFn: function (me) {
				that.pageNum = 1;
				that.getTransList.bind(that)('refresh', me);
			},
			loadDownFn: function (me) {
				that.pageNum = that.pageNum + 1;
				that.getTransList.bind(that)('append', me);
			}
		});
	},
	// 获取交易明细列表
	getTransList: function (type, dropLoad) {
		var that = this;
		var bTime = $('.trans-time input[name="bTime"]').val() == '' ? '' : $('.trans-time input[name="bTime"]').val() + ' 00:00:00';
		var eTime = $('.trans-time input[name="eTime"]').val() == '' ? '' : $('.trans-time input[name="eTime"]').val() + ' 23:59:59';
		var tradeType = $('.header .filter span').data('filter');
		$.ajax({
			type: 'get',
			dataType: 'html',
			url: '/wallet/trans-list',
			data: {
				type: 'get',
				page: that.pageNum,
				pageSize: that.pageSize,
				bTime: bTime,
				eTime: eTime,
				tradeType: tradeType
			},
			success: function (html) {
				if (type === 'append') {
					that.$transList.append(html);
					var maxPage = Math.ceil(that.total / that.pageSize);
					if (that.pageNum >= maxPage) {
						dropLoad.lock();
						dropLoad.noData();
					}
				} else {
					that.total = +that.$transList.data('total')
						|| that.pageSize;
					that.$transList.html(html);
				}
			},
			error: function (jqXHR, textStatus, errorThrown) {
				B.topWarn(B.tips.networkError);
			},
			complete: function () {
				if (dropLoad) {
					dropLoad.resetload();
				}
			}
		});
	},
	event: function () {
		$('.page>.content').on('click', '.trans-list .trans-item', this.showDetail.bind(this));
		$('.trans-time').on('change', 'input[name="bTime"]', this.jump.bind(this));
		$('.trans-time').on('change', 'input[name="eTime"]', this.jump.bind(this));
		$('.header').on('click', '.filter-list a', this.filter.bind(this));
	}
}
