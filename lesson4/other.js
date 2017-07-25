/*// 组件 A  
var CompA = {
    template: '<div>A 渲染 list</div>',
    data: function() {
    	return {
    		list: []
    	}
    },
    methods: {
    	getListA: function () {
    		$.ajax({
    			url: 'xxx',
    			dataType: 'json',
    			success: r => this.list = r.data
    		});
    	}
    }
};
//组件B定义
var CompB={
     template:'<div>B 渲染list</div>',
    data:function(){
        return {
            list:[]
        }
    },
    methods:{
        getListB:function(){
            $.ajax({
                url:'xxx',
                dataType:'json',
                success:r=>this.list=r.data
            })
        }
    }
}*/

// A
var CompA = {
	template: '<div>A</div>',
	props: ['list']
}
// B
var CompB = {
	template: '<div>B</div>',
	props: ['list']
}
// 容器
var Container = {
	template: `
		<comp-a :list="listA" ></com-a>
		<comp-b :list="listB" ></com-b>
	`,
	components: {
		'comp-a' :CompA,
		'comp-b' :CompB
	},
	methods: {
		getListA: function () {
			
		},
		getListB: function () {
			
		}
	}
	
}

var TodoForm = {
	template: `
		<div class="col-md-6">
		    <div class="form-inline">
		        <label for="title" class="control-label col-md-4">title:</label>
		        <input type="hidden" v-bind:value="todo.id">
		        <input type="text" v-model="todo.title" class="form-control col-md-8">
		    </div>
		    <div class="form-inline">
		        <label for="desc" class="control-label col-md-4">desc</label>
		        <input type="text" v-model="todo.desc" class="form-control col-md-8">
		    </div>
		    <div class="form-inline">
		        <input type="button" value="OK" v-on:click="ok()" class="btn btn-primary offset-md-10">
		    </div>
		</div>
	`,
	props: ['initItem'],
	data: function () {
		return {todo: this.initItem}
	},
	methods: {
		ok: function () {
			this.$emit('onsave', this.todo);
		}
	}
}




























