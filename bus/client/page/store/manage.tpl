{% extends '_common:page/layout.tpl' %}

{% block header %}
	{% widget '_common:widget/common/header/header-top.tpl' %}
{% endblock %}

{% block body %}
	{% widget 'bus:widget/store/manage.tpl' %}
{% endblock %}