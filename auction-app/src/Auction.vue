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

        <div class="card card-outline-secondary my-4">
          <div class="card-header">
            Bid History
          </div>
          <div class="card-body" v-for="bid in bids.reverse()">
            <p>Bidder: {{ bid.buyerUsername }}</p>
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
        bids: null
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
      }
    }
  }

</script>

<style scoped>

</style>
