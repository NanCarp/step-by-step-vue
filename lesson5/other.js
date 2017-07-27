var HomeComponent = {
	template: '<div>Home</div>'
};
var NewsComponent = {
	template: '<div>News</div>'
};
var AboutComponent = {
	template: '<div>About</div>'
};

var router = new VueRouter({
	linkActiveClass:'layui-this', // 
	routes: [
		{ name: 'home', path: '/home', component: HomeComponent },
		{ name: 'news', path: '/news', component: NewsComponent },
		{ name: 'about', path: '/about', component: AboutComponent }
	]
});

var app = new Vue({
	el: '#app',
	template: `
	<div>
        <ul class="layui-nav">
            <router-link :to="{name:'home'}" tag='li' class="layui-nav-item">
                <a href="">首页</a>
            </router-link>
            <router-link :to="{name:'news'}" tag='li' class="layui-nav-item">
                <a href="">新闻列表</a>
            </router-link>
            <router-link :to="{name:'about'}" tag='li' class="layui-nav-item">
                <a href="">联系我们</a>
            </router-link>
        </ul>
        <div class="layer-form">
            <router-view></router-view>
        </div>
    </div>
	`,
	router: router
});

var LatestNewsComponent = {
	template: '<div>Latest News</div>'
};
var HistoryNewsComponent = {
	template: '<div>History News</div>'
}


















