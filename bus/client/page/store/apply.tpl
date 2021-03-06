{% extends '_common:page/layout.tpl' %}

{% block header %}
	{% require 'bus:widget/store/store.less' %}
	{% require '_common:less/public/form.less' %}
	{% widget '_common:widget/common/header/header.tpl' %}
{% endblock %}

{% block content %}
	<form action="" id="form" onsubmit="checkForm();">
		<div class="form store-apply">
			<p class="tip">
				店铺名称（必填）<span class="error ml5" for="storeName"></span>
			</p>
			<input type="text" class="text" id="store-name" maxlength="8"
						 placeholder="请输入您的店铺名称">

			<p class="tip tr">店铺名称不能修改</p>

			<p class="tip mt20">
				上传身份证（必填）<span class="error ml5" for="storeName"></span>
			</p>
			<a class="icon-add">
				<input type="file" id="card-file" class="input-file" accept="image/*">
			</a>
			<p class="tip mt20">上传营业执照（选填）</p>
			<div class="icon-add">
				<input type="file" id="license-file" class="input-file" accept="image/*">
			</div>
			<p class="tip mt20">主营分类（必填，最多可选3种）</p>
			{% require '_common:widget/auction/auction.less' %}
			<div class="category-list pl0 clearfix">
				<div class="category-item">
					<input type="checkbox" name="category" value="1" checked><a>黄金铂金</a>
				</div>
				<div class="category-item">
					<input type="checkbox" name="category" value="2"><a>钻石</a>
				</div>
				<div class="category-item">
					<input type="checkbox" name="category" value="3"><a>翡翠</a>
				</div>
				<div class="category-item">
					<input type="checkbox" name="category" value="4"><a>玉</a>
				</div>
				<div class="category-item">
					<input type="checkbox" name="category" value="5"><a>彩宝</a>
				</div>
				<div class="category-item">
					<input type="checkbox" name="category" value="6"><a>琥珀蜜蜡</a>
				</div>
				<div class="category-item">
					<input type="checkbox" name="category" value="7"><a>珍珠</a>
				</div>
				<div class="category-item">
					<input type="checkbox" name="category" value="8"><a>天然宝石</a>
				</div>
				<div class="category-item">
					<input type="checkbox" name="category" value="9"><a>银饰</a>
				</div>
				<div class="category-item">
					<input type="checkbox" name="category" value="10"><a>文玩</a>
				</div>
			</div>
			<div class="store-agree mt20">
				<input type="checkbox" id="agree">
				<label for="agree">&nbsp;我已阅读并同意：</label>
				<a>用户协议</a>，<a>免责条款</a>
			</div>
		</div>
	</form>
{% endblock %}
{% block footer %}
	<div class="footer-content">
		<a class="btn btn-red" id="btn-submit">提交申请</a>
	</div>
	{% script %}
		require('bus:widget/store/apply.js').init();
	{% endscript %}
{% endblock %}