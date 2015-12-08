{% extends '_common:page/_layout.tpl' %}

{% block header %}
	{% widget '_common:widget/header/header-top.tpl' %}
	{% widget '_common:widget/banner/banner.tpl' %}
	{% require '_common:widget/user/user.less' %}
	<div class="personal-head">
		<div class="showActionsheet" actionsheet="actionsheet-01">{% widget '_common:widget/user/user-photo.tpl' %}</div>
		<div class="rank-wrap">{% widget '_common:widget/common/rank.tpl' %}</div>
	</div>
{% endblock %}

{% block body %}
	<div class="personal-info">
		<div class="li">
			<span class="fl">昵称</span>
			<span class="fr">大魔王</span>
		</div>
		<div class="li">
			<span class="fl">帐号</span>
			<span class="fr">18655545554</span>
		</div>
		<div class="li">
			<span class="fl">生日</span>
			<span class="fr">1995/09/09</span>
		</div>
		<div class="li">
			<span class="fl">性别</span>
			<span class="fr">男</span>
		</div>
		<div class="li">
			<span class="fl">QQ帐号</span>
			<span class="fr">544889699</span>
		</div>
	</div>
	<div class="address-list clearfix">
		<div class="address-item">
			<div class="tlt">
				<span class="sl">家</span>
				<span class="sr">收货地址1</span>
			</div>
			<div class="content">
				收件人：大魔王<br>
				电话：13423141235<br>
				邮编：51800
			</div>
			<div class="desc">
				广东省 深圳市 龙岗区 布吉科技园路慢城7-4号16F.
			</div>
		</div>
		<div class="address-item">
			<div class="tlt">
				<span class="sl">公司</span>
				<span class="sr">收货地址1</span>
			</div>
			<div class="content">
				收件人：大魔王<br>
				电话：13423141235<br>
				邮编：51800
			</div>
			<div class="desc">
				广东省 深圳市 龙岗区 布吉科技园路慢城7-4号16F.
			</div>
		</div>
		<a href="/receipt-address" class="address-item address-add">
			<div class="add">+</div>
			<div class="tip">添加收货地址</div>
		</a>
	</div>

	{% widget '_common:widget/actionsheet/actionsheet.tpl' %}
	<div class="actionsheet-wrap" id="actionsheet-01">
		<div class="mask mask-transition" style="display: none;"></div>
		<div class="actionsheet">
			<button class="btn btn-white">通过相机拍照</button>
			<button class="btn btn-white mt20">通过相册选取</button>
			<button class="btn btn-red actionsheet-cancel mt40">取消</button>
		</div>
	</div>
{% endblock %}