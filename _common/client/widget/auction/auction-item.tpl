{% require '_common:widget/auction/auction.less' %}

<div class="auction-item">
    <a href="/auction/detail">
        <img src="http://img5.imgtn.bdimg.com/it/u=346760668,2243348761&fm=21" alt="">
    </a>
    <a href="/store" class="store mt10">
        <span>{{ item.name }}</span>
        <i class="fr icon-22 icon-pei"></i>
        <i class="fr icon-22 icon-7day"></i>
        <i class="fr icon-22 icon-gold"></i>
    </a>
    <a href="" class="tlt">{{ item.shop }}</a>
    <p class="desc">{{ item.details }}</p>
    <p class="time mt10">{{ item.date }}</p>
    <a class="collect-cnt icon-collect-cnt">{{ item.num }}</a>
</div>