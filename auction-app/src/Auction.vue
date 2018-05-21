<template>

      <div class="col-lg-9">

        <div class="card mt-4">
          <img class="card-img-top img-fluid" :src="photo" alt="">
          <div class="card-body">
            <h3 class="card-title">{{ auction.title }}</h3>
            <hr>
            <h4>Current bid: ${{ auction.currentBid }}</h4>
            <hr>
            <p class="card-text">{{ auction.description }}</p>
            <p class="card-text text-muted">Start date: {{ new Date(auction.startDateTime).toDateString() }}</p>
            <p class="card-text text-muted">End date:  {{ new Date(auction.endDateTime).toDateString() }}</p>

          </div>
        </div>
        <!-- /.card -->

        <div v-if="loggedIn()" class="card card-outline-secondary my-4">
          <div class="card-header">
            Make a bid
          </div>

          <div  class="card-body">
            <!--<form @submit="placeBid()">-->
              <div class="form-group row input-group">
                <input class="form-control" type="number" id="bid-input" v-model="bid" required>
                  <span class="input-group-btn">
                  <button class="btn btn-default" type="button" v-on:click="placeBid()">Place bid</button>
                  </span>
              </div>
              <p class="text-danger" v-if="bidTooLow">Bid must be greater than the current bid</p>
              <p class="text-danger" v-if="fieldBlank">Amount field cannot be blank</p>
            <!--</form>-->
          </div>
        </div>

        <div class="card card-outline-secondary my-4">
          <div class="card-header">
            Bid History
          </div>

          <div class="card-body">
            <p v-if="bids.length === 0">No bids to display...</p>
          </div>

          <div class="card-body" v-for="bid in bids.reverse()">
            <a :href="'/user/' + bid.buyerId">Bidder: {{ bid.buyerUsername }}</a>
            <p>Bid amount : ${{ bid.amount }}</p>
            <small class="text-muted">{{ new Date(bid.datetime).toUTCString() }}</small>
            <hr>
          </div>
        </div>
        <!-- /.card -->

      </div>
      <!-- /.col-lg-9 -->

</template>

<script>
  export default {
    data() {
      return {
        auction: null,
        message: "hello",
        photo: "",
        bids: null,
        bid: 0,
        bidTooLow: false,
        fieldBlank: false
      }
    },

    mounted: function () {
      this.getAuction();
      this.getBids();
    },

    methods: {
      getAuction: function() {
        this.$http.get('http://localhost:4941/api/v1/auctions/' + this.$route.params.auctionId)
          .then(function(response) {
            if (response.status === 200) {
              this.auction = response.data;
              this.photo = 'http://localhost:4941/api/v1/auctions/' + this.$route.params.auctionId + '/photos';
            }
          })
      },

      getBids() {
        this.$http.get('http://localhost:4941/api/v1/auctions/' + this.$route.params.auctionId + '/bids')
          .then(function(response) {
            if (response.status === 200) {
              this.bids = response.data;
            }
          })
      },

      getUsername(userId) {
        this.$http.get('http://localhost:4941/api/v1/users/' + userId)
          .then(function(response) {
            return response.data.username;
          })
      },

      placeBid: function() {

        this.bidTooLow = false;

        if (this.bid <= this.auction.currentBid) {
          this.bidTooLow = true;
          return;
        }

        let route = 'http://localhost:4941/api/v1/auctions/' + this.$route.params.auctionId + '/bids?amount=' + this.bid;

        this.$http.post(route, {}, {
          headers: {
            'X-Authorization': sessionStorage.getItem('token')
          }
        })
          .then(function(response) {
            if (response.status === 201) {
              getBids();
              window.location.reload();
            }
          })
      },

      loggedIn: function() {
        return(!(sessionStorage.getItem('token') === null || sessionStorage.getItem('token') === ""));
      }
    }
  }

</script>

<style scoped>

</style>
