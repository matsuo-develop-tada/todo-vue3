<template>
   <div id="overlay">
        <div id="content">
            <div class="title">
                <span>新規登録</span>
            </div>
            <div class="checkItems">
                <input type="date" v-model="deadline"/>
                <input type="color" />
                <select></select>
            </div>
            <div class="todoTextArea">
                <textarea class="todoText" cols="30" rows="10" placeholder="予定を入力してください"></textarea>
            </div>
            <div class="textLeft">
                <button type="button" @click="$emit('close')" class="btn btn-success">閉じる <i class="fas fa-times"></i></button>
                <button type="button" @click="register" class="btn btn-success">保存する <i class="fas fa-times"></i></button>
           </div>
       </div>
   </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    mounted: function() {
        let today = new Date();
        let year = today.getFullYear();
        let month = today.getMonth();
        let day = today.getDate();

    },       
    data() {
        return {
            deadline: Date
        }
    } 
})
</script>


<style lang="scss" scoped>

</style>