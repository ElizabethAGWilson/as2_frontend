<template>
  <div class="col-lg-9">


    <div class="card mt-4">
      <!--<img class="card-img-top img-fluid" :src="photo" alt="">-->
      <h3 class="card-title centre-title"> Username: {{ user.username }} </h3>
      <!--<h3 class="card-title"> User YAyy</h3>-->

      <div class="card-body">

        <table class="table col-10">
          <tbody>
            <tr v-if="edit">
              <td>First name: </td>
              <input class="form-control" type="text" id="firstname-input" v-model="firstName">
            </tr>
            <tr v-else>
              <td>First name: </td>
              <td> {{ user.givenName }}</td>
            </tr>
            <tr v-if="edit">
              <td>Last name:  </td>
              <input class="form-control" type="text" id="lastname-input" v-model="lastName">
            </tr>
            <tr v-else>
              <td>Last name:  </td>
              <td> {{ user.familyName }}</td>
            </tr>
            <tr v-if="thisUserLoggedIn()">
              <td>Email: </td>
              <td>{{ user.email }}</td>
            </tr>
            <tr>
              <td v-if="thisUserLoggedIn()">Account balance: </td>
              <td> {{ user.accountBalance }}</td>
            </tr>
          </tbody>
        </table>

        <p class="text-danger" v-if="fieldBlank" > Fields cannot be blank </p>



        <!--<p class="card-title">First name: {{ user.givenName }}</p>-->
        <!--<p class="card-title">Last name: {{ user.familyName }}</p>-->
        <!--<p class="card-title">Email: {{ user.email }}</p>-->
        <!--<p class="card-title">Account balance: {{ user.accountBalance }}</p>-->


        <!--<hr>-->
        <!--<h4>Current bid: ${{ auction.currentBid }}</h4>-->
        <!--<hr>-->
        <!--<p class="card-text">{{ auction.description }}</p>-->
        <!--<p class="card-text text-muted">Start date: {{ new Date(auction.startDateTime).toDateString() }}</p>-->
        <!--<p class="card-text text-muted">End date:  {{ new Date(auction.endDateTime).toDateString() }}</p>-->

      </div>

      <div class="card-footer" v-if="thisUserLoggedIn()">
        <button v-on:click="saveChanges()" v-if="edit" type="button" class="btn btn-outline-secondary float-right">Save</button>
        <button v-on:click="editUser()" v-else type="button" class="btn btn-outline-secondary float-right">Edit</button>
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
        user: null,
        edit: false,
        firstName: "",
        lastName: "",
        fieldBlank: false
      }
    },

    mounted: function() {
      this.getUser();
      // this.firstName = this.user.givenName;
      // this.lastName = this.user.lastName;
    },

    methods: {

      getUser: function() {
        let route = 'http://localhost:4941/api/v1/users/' + this.$route.params.userId;
        // this.firstName = this.user.givenName;
        // this.lastName = this.user.lastName;

        this.$http.get(route, {
          headers: {
            'X-Authorization': sessionStorage.getItem('token')
          }
        })
          .then(function(response) {
            if (response.status === 200) {
              this.user = response.data;
              this.firstName = response.data.givenName;
              this.lastName = response.data.familyName;

            }
          }, function(error) {
          })
      },

      loggedIn: function() {
        return(!(sessionStorage.getItem('token') === null || sessionStorage.getItem('token') === ""));
      },

      thisUserLoggedIn: function() {
        return (this.loggedIn() && sessionStorage.getItem('id') === this.$route.params.userId);
      },

      editUser: function() {
        this.edit = true;
      },

      saveChanges: function() {

        this.fieldBlank = false;

        if (this.firstName === "" || this.lastName === "" ){
          this.fieldBlank = true;
          return;
        }

        let data = {};

        if (this.firstName !== this.user.givenName) {
          data['givenName'] = this.firstName;
        }

        if (this.lastName !== this.user.lastName) {
          data['familyName'] = this.lastName;
        }

        this.$http.patch('http://localhost:4941/api/v1/users/' + sessionStorage.getItem('id'), data, {
          headers: {
            'X-Authorization': sessionStorage.getItem('token')
            //'X-Authorization': 'afdb624b749983ddd94f6fdb0ffd675f'
          }
        })
          .then(function(response) {
            if (response.status === 201) {
              this.getUser();
              this.edit = false;
            }
          })
      }
    }
  }
</script>

<style scoped>
  .centre-title {
    margin-top: 10px;
    margin-left: 10px;
  }
</style>
