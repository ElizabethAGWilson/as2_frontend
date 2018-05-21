<template>
  <div class="col-lg-9">

    <div id="carouselExampleIndicators" class="carousel slide my-4" data-ride="carousel">
      <ol class="carousel-indicators">
        <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
      </ol>
      <div class="carousel-inner" role="listbox">
        <div class="carousel-item active">
          <img class="d-block img-fluid" src="./assets/panda1.jpg" alt="First slide">
        </div>
        <div class="carousel-item">
          <img class="d-block img-fluid" src="./assets/panda2.png" alt="Second slide">
        </div>
        <div class="carousel-item">
          <img class="d-block img-fluid" src="./assets/panda3.jpg" alt="Third slide">
        </div>
      </div>
      <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-xs-8 col-xs-offset-2">
          <div class="input-group space">
            <div class="form-group drop-side">
              <label for="statusSelect">Status</label>
              <select class="form-control" id="statusSelect" v-model="statusSelect">
                <option value="all" selected>All</option>
                <option value="active">Active</option>
                <option value="expired">Expired</option>
                <option value="won">Won</option>
                <option value="upcoming">Upcoming</option>
              </select>
            </div>

            <div class="form-group drop-side">
              <label for="categorySelect">Category</label>
              <select class="form-control" id="categorySelect" v-model="categorySelect">
                <option value="all" selected>All</option>
                <option v-for="category in categories">{{ category.categoryTitle }}</option>
              </select>
            </div>

            <div class="form-group drop-side">
              <label for="titleSearch">Title</label>
              <input type="text" class="form-control" name="x" placeholder="Search ..." id=titleSearch v-model="searchText">
            </div>


            <div class="form-group button-down">
              <label for="titleSearch"></label>
              <button type="button" class="btn btn-secondary btn-block btn-space" v-on:click="filterAuctions()">Search</button>
            </div>
          </div>
        </div>
      </div>
    </div>


    <div class="row" >
      <div class="col-lg-4 col-md-6 mb-4" v-for="auction in auctions">
        <div class="card h-100">
          <a href="#"><img class="card-img-top" :src="getPhoto(auction.id)" alt=""></a>
          <div class="card-body">
            <h4 class="card-title">
              <a :href="'/auction/' + auction.id" v-on:click="">{{ auction.title }}</a>
            </h4>
            <h5>Current bid: ${{ auction.currentBid }}</h5>
            <p class="card-text text-muted">Reserve price: ${{ auction.reservePrice }}</p>
          </div>
        </div>
      </div>

    </div>
    <!-- /.row -->
  </div>
  <!-- /.col-lg-9 -->


</template>

<script>
  export default {
    data() {
      return {
        auctions: null,
        categories: null,
        categorySelect: "",
        statusSelect: "",
        searchText: ""
      }
    },

    mounted: function() {
      this.getAuctions();
      this.getCategories();
      this.reset();
    },

    methods: {

      reset: function() {

        // this.$http.post('http://localhost:4941/api/v1/reset')
        //   .then(function(response) {
        //     if (response.status === 200) {
        //       alert('reset!');
        //     }
        //   });
        // //
        // this.$http.post('http://localhost:4941/api/v1/resample')
        //   .then(function(response) {
        //     if (response.status === 201) {
        //       alert('resampled!');
        //     }
        //   });
      },

      getAuctions: function() {
        this.$http.get('http://localhost:4941/api/v1/auctions')
          .then(function(response) {
            if (response.status === 200) {
              this.auctions = response.data;
            }
          })
      },

      getPhoto: function(id) {
        return 'http://localhost:4941/api/v1/auctions/' + id + '/photos';
      },

      getCategories: function() {
        this.$http.get('http://localhost:4941/api/v1/categories')
          .then(function(response) {
            if (response.status === 200) {
                this.categories = response.data;
              }
          })
      },

      filterAuctions: function() {

        let request = 'http://localhost:4941/api/v1/auctions?';
        let query = "";

        if (this.statusSelect !== "" && this.statusSelect !== "All" && this.statusSelect !== null) {
          query += "status=" + this.statusSelect + '&';
        }

        if (this.categorySelect !== "" && this.categorySelect !== "All" && this.categorySelect !== null) {

          let id = null;
          for (let category of this.categories) {
            if (category.categoryTitle === this.categorySelect) {
              id = category.categoryId;
            }
          }

          if (id !== null) {
            query += "category-id=" + id + '&';
          }
        }

        if (this.searchText !== null && this.searchText !== "") {
          query += "q=" + this.searchText;
        }


        this.$http.get(request + query)
          .then(function (response) {
            if (response.status === 200) {
              this.auctions = response.data;
            }
          })
      },

      auctionsWon: function() {
        alert('called');
        this.$http.get('http://localhost:4941/api/v1/my_won_auctions')
          .then(function(response) {
            if (reponse.status === 200) {
              this.auctions = response.data();
            }
          })
      },

      auctionsBid: function() {

      },

      currentAuctions: function() {

      },

      auctionsSold: function() {

      },

      auctionsUnsold: function() {

      },

    }
  }

</script>


<style scoped>
  .space {
    margin-bottom: 20px;
  }
  .drop-side {
    margin-right: 10px;
    /*background-color: white;*/
    /*color: gray;*/
    /*border: black;*/
  }
  .button-down {
    margin-top: 8px;
  }
</style>
