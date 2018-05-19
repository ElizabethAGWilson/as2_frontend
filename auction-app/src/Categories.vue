<template>


  <div>
    <!-- Login modal -->
    <div class="modal" tabindex="-1" role="dialog" id="createModal">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Create auction</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group row">
              <label for="title-input" class="col-5 col-form-label">Auction title</label>
              <div class="col-10">
                <input class="form-control" type="text" id="title-input" v-model="titleInput">
              </div>
            </div>
            <div class="form-group row">
              <label for="descriptionInput" class="col-5 col-form-label">Description of item</label>
              <div class="col-10">
                <textarea rows="3" required id="descriptionInput"  class="form-control"></textarea>
                <!--<input class="form-control" type="text" id="descriptionInput" v-model="titleInput">-->
              </div>
            </div>
            <!--<div class="form-group row">-->
            <!--<label for="email-input" class="col-2 col-form-label">Email</label>-->
            <!--<div class="col-10">-->
            <!--<input class="form-control" type="email" id="email-input">-->
            <!--</div>-->
            <!--</div>-->
            <div class="form-group row">
              <label for="password-input" class="col-5 col-form-label">Password*</label>
              <div class="col-10">
                <input class="form-control" type="password" id="password-input" v-model="loginPassword">
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <!--<a href="#" data-toggle="modal" data-target="#registerModal" data-dismiss="modal">Register</a>-->
            <button type="button" class="btn btn-primary">Submit</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>

          </div>

        </div>
      </div>
    </div>

    <div>
      <button type="button" class="btn btn-outline-secondary btn-block btn-space" data-toggle="modal" data-target="#createModal">Create Auction</button>
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
  </div>




</template>

<script>
    export default {
      data() {
        return {
          categories: null,
          titleInput: "",
          descriptionInput: ""
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
