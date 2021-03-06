var LoginComponent = {
    template: `
    
     <div class="login" >
        username:<input type="text" v-model="user.username" />
        password:<input type="password" v-model="user.password" />
        <input type="button" @click="login()" value="login" />
     </div>
    `,
    data: function () {
        return {
            user: {
                username: '',
                password: ''
            }
        }
    },
    methods: {

        login: function () {
            axios.post('/login', this.user)
                .then(function (res) {
                    if (res.success) {
                        localStorage.setItem('token', res.token);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });

        }
    }
}

var CustomerListComponent = {
    template: `
<div>
    <div>
        <input type="text" v-model="keyword" /> <input type="button" @click="getCustomers()" value="search" />
    </div>
    <ul>
        <router-link v-for="c in customers"  tag="li" :to="{name:'detail',params:{id:c.id}}" :key="c.id">{{c.name}}</router-link>
    </ul>
</div>
    `,
    data: function () {
        return {
            customers: [],
            keyword: ''
        }
    },
    created: function () {
        this.getCustomers();
    },
    methods: {
        getCustomers: function () {
            axios.get('/api/getCustomers', { params: { keyword: this.keyword } })
                .then(res => { this.customers = res.data; console.log(res) })
                .catch(err => console.log(err));
        },

    }
}


var CustomerComponent = {
    template: `
        <div>
            {{customer}}
        </div>
    `,
    data: function () {
        return {
            customer: {}
        }
    },
    created: function () {
        var id = this.$route.params.id;
        this.getCustomerById(id);
    },
    watch: {
        '$route': function () {
            console.log(this.$route.params.id);
        }
    },
    methods: {
        getCustomerById: function (id) {
            axios.get('/api/customer/'+id)
                .then(res => this.customer = res.data)
                .catch(err => console.log(err));
        }
    }
}



var HomeComponent = {
    template: `<div>
        <h1>Home 页面，portal页</h1>
        <h2>以下数据来自服务端</h2>
        {{stat}}
    </div>`,
    data: function () {
        return {
            stat: ''//代表相关统计信息等
        }
    },
    methods: {
        getStat: function () {
            return axios.get('/portal');
        }
    },
    created: function () {
        this.getStat().then(res => {
            this.stat = JSON.stringify(res.data);
        }).catch(err => {
            console.log(err);
        })
    }
}

var router = new VueRouter({
    //TODO:各种路由定义；
    routes: [{
        name: 'home', path: '/home', component: HomeComponent
    },
    {
        name: 'customers', path: '/customers', component: CustomerListComponent,

    },
    {
        name: 'detail', path: '/detail/:id', component: CustomerComponent,

    },
    {
        name: 'login', path: '/login', component: LoginComponent
    }
    ]
});

//注册全局事件钩子
//TODO:会在下一篇中详细分析
// router.beforeEach(function (to, from, next) {
//     if (to.matched.some(r => r.meta.auth)) {
//         if (!localStorage.getItem('token')) {
//             console.log("需要登录");
//             next({
//                 path: '/login',
//                 query: { to: to.fullPath }
//             })
//         } else {
//             next();
//         }
//     } else {
//         next()
//     }
// });


var app = new Vue({
    router: router,
    template: `
    <div>
          <router-link :to="{name:'home'}" >Home</router-link>
          <router-link :to="{name:'customers'}" >Customers</router-link>
          <router-view></router-view>
    </div>
    `,
    el: '#app'
});