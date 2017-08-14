; (function () {
    var list = [];
    var Todo = (function () {
        var id = 1;
        return function (title, desc) {
            this.title = title;
            this.desc = desc;
            this.id = id++;
        }
    })();
    /**
     * 搜索组件
     */
    var SearchBar = {
        template: `
        <div class="row toolbar">
            <div class="col-md-8">
                keyword：
                <input type="text" v-model="keyword" />
                <input type="button" @click="search()" value="search" class="btn btn-primary"  />
            </div>
        </div>
    `,
        data: function () {
            return {
                keyword: ''
            }
        },
        methods: {
            search: function () {
                this.$store.commit("search", {
                	title: this.keyword
                });
            }
        }

    }
    /**
     * 表单组件
     */
    var TodoForm = {
        template: `
     <div class="col-md-6">
        <div class="form-inline">
            <label for="title" class="control-label col-md-4">title:</label>
            <input type="hidden" v-bind:value="todo.id" />
            <input type="text" v-model="todo.title" class="form-control col-md-8">
        </div>
        <div class="form-inline">
            <label for="desc" class="control-label col-md-4">desc</label>
            <input type="text" v-model="todo.desc" class="form-control col-md-8">
        </div>
        <div class="form-inline">
            <input type="button" value="OK" v-on:click="ok()" class="btn btn-primary offset-md-10"  />
        </div>
    </div>
    `,
        props: ['initItem'],

        computed: {
            todo: function () {
                return { id: this.initItem.id, title: this.initItem.title, desc: this.initItem.desc };
            }
        },

        methods: {
            ok: function () {
                this.$store.commit("save", this.todo);
            }
        }

    }
    /**
     * 列表项组件
     */
    var TodoItem = {
        template: `
     <tr>
        <th>{{todo.id}}</th>
        <td>{{todo.title}}</td>
        <td>{{todo.desc}}</td>
        <td>
            <input type="button" value="remove" @click="remove()" class="btn btn-danger" />
            <input type="button" value="edit" @click="edit()" class="btn btn-info" />
        </td>
    </tr>
    `,
        props: ['todo'],
        methods: {
            edit: function () {
                console.log(this.todo);
                this.$store.commit('edit', this.todo)
            },
            remove: function () {
                this.$store.commit('remove', {
                	id: this.todo.id
                });
            }
        }
    }
    /**
     * 列表组件
     */
    var TodoList = {
        template: `
    <div class="col-md-6">
        <table class="table table-bordered">
            <tr>
                <th></th>
                <th>title</th>
                <th>desc</th>
                <th></th>
            </tr>
            <todo-item  v-for="item in items" :todo="item" :key="item.id"  @onedit="edit($event)" @onremove="remove($event)"></todo-item>
        </table>
    </div>
    `,
        props: ['items'],
        components: {
            'todo-item': TodoItem
        }
    }
    /**
     * 容器组件
     * 说明：容器组件包括三个字组件
     */
    var TodoContainer = {
        template: `
        <div class="container">
            <search-bar @onsearch="search($event)"></search-bar>
            <div class="row">
                <todo-list :items="items" @onremove="remove($event)" @onedit="edit($event)"></todo-list>            
                <todo-form :init-item="initItem" @onsave="save($event)" ></todo-form>
            </div>
        </div>
    `,
        data: function () {
            return {
                /**
                 * Todolist数据列表
                 * 说明：通过props传入到Todolist组件中，让组件进行渲染
                 */
                items: [],
                /**
                 * TodoForm初始化数据
                 * 说明：由于TodoForm包括两种操作：新增和编辑；新增操作无需处理，编辑操作需要进行数据绑定，这里通过传入initItem属性进行编辑时数据的初始化
                 * 如果传入的值为空，说明为新增操作，由initItem参数的Id是否为空，来确认是更新保存还是新增保存
                 */
                initItem: {
                    title: '',
                    desc: '',
                    id: ''
                }
            }
        },
        components: {
            'search-bar': SearchBar,/**SearchBar组件注册 */
            'todo-form': TodoForm,/**TodoForm组件注册 */
            'todo-list': TodoList/**TodoList组件注册 */
        },
        computed: {
            initItem: function () {
                return this.$store.state.initItem;
            },
            items: function () {
                return this.$store.state.items;
            }
        }
    }

    var store = new Vuex.Store({
    	state: {
    		items:[],
    		initItem: {
    			title: '',
    			desc: '',
    			id: ''
    		}
    	},
    	mutations: {
    		search: function (state, payload) {
    			state.items = list.filter(v => v.title.indexOf(payload.title) !== -1);
    		},
    		save: function (state, payload) {
    			if (state.initItem.id) {
    				var o = list.filter(v => v.id === payload.id);
    				o.title = payload.title;
    				o.desc = payload.desc;
    				state.items = state.items.map(v => {
    					if (v.id == payload.id) {
    						return v;
    					}
    				});
    			} else {
    				state.items.push(new Todo(payload.title, payload.desc));
    			}
    			list = state.items;
    		},
    		remove: function (state, payload) {
    			state.items = state.items.filter(v => v.id !== payload.id);
    		},
    		edit: function (state, payload) {
    			state.initItem = state.items.filter(v => v.id === payload.id)[0];
    		}
    	}
    });
    
    var app = new Vue({
    	store: store,
        el: '#app',
        components: {
            'todo-container': TodoContainer
        }
    });

})();

/**
 * 
 * 
 * <div id="app">
 *     <todo-container></todo-container>
 * </app>
 */