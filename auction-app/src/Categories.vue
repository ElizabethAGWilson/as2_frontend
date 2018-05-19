<template>


  <div>
    <button type="button" class="btn btn-outline-secondary btn-block btn-space">Create Auction</button>
    <h3>Categories</h3>
    <div class="list-group" v-for="category in categories">
      <a href="#" class="list-group-item">{{ category.categoryTitle }}</a>
      <!--<a href="#" class="list-group-item">Equipment</a>-->
      <!--<a href="#" class="list-group-item">Vehicles</a>-->
      <!--<a href="#" class="list-group-item">Property</a>-->
      <!--<a href="#" class="list-group-item">Other</a>-->
    </div>
  </div>
  <!--<button type="button" class="btn btn-outline-secondary btn-block btn-space">Create Auction</button>-->

  <!--<div class="list-group">-->
    <!--<a href="#" class="list-group-item">Apparel</a>-->
    <!--<a href="#" class="list-group-item">Equipment</a>-->
    <!--<a href="#" class="list-group-item">Vehicles</a>-->
    <!--<a href="#" class="list-group-item">Property</a>-->
    <!--<a href="#" class="list-group-item">Other</a>-->
  <!--</div>-->



</template>

<script>
    export default {
      data() {
        return {
          categories: null
        }
      },

      mounted: function() {
        this.getCategories();
      },

      methods: {
        getCategories: function() {
          this.$http.get('http://localhost:4941/api/v1/categories')
            .then(function(response) {
              if (response.status === 200) {
                this.categories = response.data;
              }
            })
        }
      }
    }
</script>

<style scoped>
  .btn-space {
    margin-bottom: 20px;
  }
</style>
