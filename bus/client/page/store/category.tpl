{% extends '_common:page/layout.tpl' %}

{% block header %}
	{% widget '_common:widget/common/header/header.tpl' %}
{% endblock %}

{% block body %}
	{% widget 'bus:widget/store/category.tpl' %}
{% endblock %}