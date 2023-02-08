<template>
    <div class="container">
        <div class="row justify-content-center mt-5">
            <div class="col-md-6">
                <div class="card">
                    <div class="card-header">Todo Component</div>

                    <div class="card-body">
                        <div class="input-group">
                            <input type="text" placeholder="Todo..." class="form-control" aria-label="todo" aria-describedby="todo" v-model="name">
                            <div class="input-group-append">
                                <button v-if="edit_todo_id" v-on:click="updateData()" type="button" class="btn btn-info text-white">Update</button>
                                <button v-else v-on:click="saveData()" type="button" class="btn btn-info text-white">Add</button>
                            </div>
                        </div>
                        <button v-on:click="resetData()" type="button" class="btn btn-sm text-danger" style="float:right;">Reset</button>

                        <table class="table table-bordered mt-4">
                            <thead>
                                <td>No</td>
                                <td>Name</td>
                                <td width="200">Action</td>
                            </thead>
                            <tbody>
                                <tr v-for="(todo,index) in todos" :key="index">
                                    <td>{{ ++index }}</td>
                                    <td>{{ todo.name }}</td>
                                    <td><button v-on:click="deleteData(--index)" type="button" class="btn btn-sm btn-danger">Delete</button>
                                    <button v-on:click="editData(--index)" type="button" class="btn btn-sm btn-info">Edit</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name:'Todo',
        data(){
            return {
                todos:[],
                api:'http://127.0.0.1:8000/api/todos',
                name:'',
                edit_todo_id:'',
                edit_index:''
            }
        },
        mounted(){
            this.axios.get(this.api).then((response) => {
                this.todos = response.data;
            })
        },
        methods:{
            saveData(){
                if(this.name.length>0){
                    let data = {'name':this.name};
                    this.axios.post(this.api,data).then((response) => {
                        this.todos.push(response.data); 
                        this.name = ''
                    })
                }
            },
            deleteData(index){
                if(this.todos[index].id){
                    this.axios.delete(this.api+'/'+this.todos[index].id).then((response) => {
                        this.todos.splice(index,1); 
                    })
                }
                
            },
            editData(index){
                if(this.todos[index].id){
                    this.name = this.todos[index].name;
                    this.edit_todo_id = this.todos[index].id;
                    this.edit_index = index
                }
                
            },
            updateData(){
                if(this.name.length>0){
                    let data = {'name':this.name};
                    this.axios.put(this.api+'/'+this.edit_todo_id,data).then((response) => {
                        this.todos[this.edit_index].name = response.data.name;
                        this.resetData();
                    });
                }
            },
            resetData(){
                this.name='',
                this.edit_todo_id='',
                this.edit_index=''
            }
        }
    }
</script>
