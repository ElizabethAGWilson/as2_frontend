<template>
  <div class="col-lg-9">

    <h3 class="card-title"> User YAyy</h3>


    <div class="card mt-4">
      <!--<img class="card-img-top img-fluid" :src="photo" alt="">-->
      <!--<h3 class="card-title"> User: {{ user.username }} </h3>-->
      <h3 class="card-title"> User YAyy</h3>

      <div class="card-body">
        <!--<h3 class="card-title">{{ auction.title }}</h3>-->
        <!--<hr>-->
        <!--<h4>Current bid: ${{ auction.currentBid }}</h4>-->
        <!--<hr>-->
        <!--<p class="card-text">{{ auction.description }}</p>-->
        <!--<p class="card-text text-muted">Start date: {{ new Date(auction.startDateTime).toDateString() }}</p>-->
        <!--<p class="card-text text-muted">End date:  {{ new Date(auction.endDateTime).toDateString() }}</p>-->

      </div>
    </div>
    <!-- /.card -->

    <!--<div class="card card-outline-secondary my-4">-->
      <!--<div class="card-header">-->
        <!--Bid History-->
      <!--</div>-->

      <!--<div class="card-body">-->
        <!--&lt;!&ndash;<p v-if="bids.length === 0">No bids to display...</p>&ndash;&gt;-->
      <!--</div>-->

      <!--<div class="card-body">-->
        <!--&lt;!&ndash;<a :href="'/user/' + bid.buyerId">Bidder: {{ bid.buyerUsername }}</a>&ndash;&gt;-->
        <!--&lt;!&ndash;<p>Bidder: {{ bid.buyerUsername }}</p>&ndash;&gt;-->
        <!--&lt;!&ndash;<p>Bid amount : ${{ bid.amount }}</p>&ndash;&gt;-->
        <!--&lt;!&ndash;<small class="text-muted">{{ new Date(bid.datetime).toUTCString() }}</small>&ndash;&gt;-->
        <!--&lt;!&ndash;<hr>&ndash;&gt;-->
      <!--</div>-->
    <!--</div>-->
    <!-- /.card -->

  </div>
  <!-- /.col-lg-9 -->
</template>

<script>
    export default {
      data() {
        return {
          user: null
        }
      },

      mounted: function() {
        this.getUser()
      },

      methods: {

        getUser: function() {
          let route = 'http://localhost:4941/api/v1/users/' + this.$route.params.UserId;

          this.$http.get(route, {}, {
            headers: {
              'X-Authorization': sessionStorage.getItem('token')
              //'X-Authorization': 'afdb624b749983ddd94f6fdb0ffd675f'
            }
          })
            .then(function(response) {
              if (response.status === 200) {
                this.user = response.data;
              }
            }, function(error) {
              alert(error.message);
            })
        },

        loggedIn: function() {
          return(!(sessionStorage.getItem('token') === null || sessionStorage.getItem('token') === ""));
        },

        thisUserLoggedIn: function() {
          return (this.loggedIn() && sessionStorage.getItem('id') === this.$route.params.UserId);
        }
      }
    }
</script>

<style scoped>

</style>
