{% extends '_common/page/_layout.tpl' %}
{% block head%}
    {% require "_common:css/user/_reg_tel.css" %}
{% endblock %}
{% block body %}
    {% widget '_common:widget/header/header-nav.tpl' %}

    <div class="message-list">
        <ul>
            <li class="message_text">亲爱的用户，你关注的xxx拍品现在已始拍卖，不要错过哦!</li>
            <li class="message_text">亲爱的用户，你关注的xxx拍品现在已始拍卖，不要错过哦!</li>
            <li class="message_text"> 亲爱的用户，你关注的xxx拍品现在已始拍卖，不要错过哦!</li>
            <li class="message_text" style="color: #9a9a9a"> 亲爱的用户，欢迎加入百多宝平台。</li>
        </ul>
    </div>
{% endblock %}