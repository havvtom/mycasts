<template>
  <div class="text-center">
    <v-pagination
      v-model="currentPage"
      :length="lastPage"
    ></v-pagination>
  </div>
</template>

<script type="text/javascript">
  export default{
    props:{
      meta: {
        required: true,
        type: Object
      }
    },
    computed: {
      currentPage: {
        get (){
          return this.meta.current_page
        },
        set (value){
          this.$emit('switched', value)
          this.$router.replace({
            query: {
              page: value
            }
          })
        }
      },
      lastPage: {
        get (){
          return this.meta.last_page
        }
      }
    },
  }
</script>