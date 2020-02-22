<template>
    <div class="main">
        <h1>To-Do APP</h1>
        <div class="container">
        <a-tabs defaultActiveKey="2">
            <a-tab-pane key="1">
                <span slot="tab" class="spanc">
                <a-icon type="ordered-list" />
                    pending
                </span>
                <div class="todoitem" v-for="(item,index) in todoList" :key="index">
                    <p>{{item.content}}</p>
                    <a-icon type="check" class="checkicon" @click="changeStatus(index)" />
                    <a-icon type="delete" class="deleicon" @click="deleteTodo(index,item._id)" />
                </div>
                </a-tab-pane>
            <a-tab-pane key="2">
                <span slot="tab" class="spanc">
                <a-icon type="check-square" />
                    finished
                </span>
                <div class="completeitem" v-for="(item,index) in completeList" :key="index">
                    <p style="text-decoration:line-through;">{{item.content}}</p>
                    <a-icon type="rollback" class="checkicon" @click="backStatus(index)" />
                    <a-icon type="delete" class="deleicon" @click="deleteComplete(index,item._id)" />
                </div>
            </a-tab-pane>
        </a-tabs>           
        </div>
        <div class="addtodo"> 
            <a-icon type="plus" class="plussty" @click="addTodo()" />
        </div>
        <a-modal v-model="addTodoModal" title="New ToDo" onOk="submit">
            <template slot="footer">
                <a-button key="submit" type="primary" :loading="loading" @click="submit(todoContent)">
                add
                </a-button>
            </template>
            <h3>ToDocontent</h3>
            <a-input placeholder="please enter ToDo content" v-model="todoContent"/>
        </a-modal>        
    </div>
</template>

<script>
import axios from 'axios';
let baseURL = 'http://127.0.0.1:7070/';
// Green #629A9C
export default {
    data() {
        return {
            todoList:[],
            completeList:[],
            addTodoModal:false,
            loading:false,
            todoContent:''
        }
    },
    mounted() {
        let userId = sessionStorage.getItem("userId")
        axios.request({
            baseURL:'http://127.0.0.1:7070/',
            url:'api/todos/all/'+userId,
            method:'get'
        }).then(res=>{
            //console.log(res)
            let list = res.data.data;
            //console.log(list[0].status)
            let len = list.length;
            
            for(let i = 0;i<len;i++){
                if(list[i].status === false){
                    this.todoList.push(list[i])
                }
                else{
                    this.completeList.push(list[i])
                }
            }
            //console.log(this.todoList)
            //console.log(this.completeList)
        })
    },
    methods: {
        changeStatus(index){
            let data = {
                "todoId":this.todoList[index]._id,
            }
            axios.request({
                baseURL,
                url: '/api/todos/status',
                method:'put',
                data,
            }).then(res=>{
                if(res.data.status === 200) {
                    let completeItem = this.todoList.splice(index,1);
                    this.completeList.push(completeItem[0]);
                }
                else {
                    this.$message.error('internet error')
                }
            })
        },
        backStatus(index) {
            let data = {
                "todoId":this.completeList[index]._id,
            }
            //console.log(this.completeList[index])
            axios.request({
                baseURL,
                url: '/api/todos/status',
                method:'put',
                data,

            }).then(res=>{
                //console.log(res)
                if(res.data.status === 200) {
                    let completeItem = this.completeList.splice(index,1);
                    this.todoList.push(completeItem[0]);
                }
                else {
                    this.$message.error('internet error')
                }
            })           
        },
        deleteTodo(index,_id) {
            //console.log(_id);
            axios.request({
                baseURL,
                url:'/api/todos/'+_id,
                method:'delete'
            }).then(res=>{
                //console.log(res)
                if(res.data.status === 200){
                    this.todoList.splice(index,1);
                    this.$message.error('deleted.')
                }
                else{
                    this.$message.error('internet error')
                }

            })
        },
        deleteComplete(index,_id){
            //console.log(_id);
            axios.request({
                baseURL,
                url:'/api/todos/'+_id,
                method:'delete'
            }).then(res=>{
                //console.log(res)
                if(res.data.status === 200){
                    this.completeList.splice(index,1);
                    this.$message.error('deleted.')
                }
                else{
                    this.$message.error('internet error')
                }

            })            
        },
        addTodo(){
            this.addTodoModal = true;
        },
        submit(content) {
            this.loading = true;
            //console.log(content)
            let userId = sessionStorage.getItem('userId');
            //console.log(userId)
            const data = {
                userId,
                content
            }
            //console.log(data)
            axios.request({
                baseURL,
                url:'/api/todos',
                data,
                method:'post'
            }).then(res=>{
                //console.log(res)
                if(res.data.status === 200){
                    this.loading = false;
                    this.addTodoModal = false;
                    this.todoList.push(res.data.data);
                    this.$message.success('success！');
                }
            })
        },
    }
}
</script>
<style scoped>
.main {
    height: auto;
    width: 580px;
    margin: 10px auto;
}
.container {
    width: 560px;
    margin: auto;
}
.spanc {
    display: block;
    width: 230px;
}
.todoitem {
    text-align: start;
    font-size: 16px;
    background: #f6f6f6;
    margin-bottom: 10px;
	padding:8px 60px 8px 30px;
    border-radius:3px;
    border-left: 5px solid #5cadff;
    box-shadow: 0 1px 2px rgba(0,0,0,0.07);
}
.completeitem{
    text-align: start;
    font-size: 16px;
    background: #f8f8f8;
    margin-bottom: 10px;
	padding:8px 60px 8px 30px;
    border-radius:3px;
    border-left: 5px solid #a4a4a4;
    box-shadow: 0 1px 2px rgba(0,0,0,0.07);   
}
 p {
    margin: 0;
    padding: 0;
}
.checkicon {
    position: relative;
    float: right;
    right: -46px;
    top: -20px;
}
.deleicon {
    position: relative;
    float: right;
    right: -37px;
    top: -19px;
}
.addtodo {
    position: absolute;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: #5cadff;
    bottom: 100px;
    right: 55px;
}
.plussty {
    position: relative;
    top: 15px;
    color: white;
    font-size: 20px;
    transition:All 0.4s ease-in-out;
}
.plussty:hover {
     transform:rotate(180deg);
}
</style>