<template>
  <div>

    <!-- Login modal -->
    <div class="modal" tabindex="-1" role="dialog" id="loginModal">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <form @submit="checkLogin" >
            <div class="modal-header">
              <h5 class="modal-title">Login</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="form-group row">
                <!--<span v-show="errors.has('email')">{{ errors.first('email') }}</span>-->
                <label for="username-input" class="col-5 col-form-label">Username/email</label>
                <div class="col-10">
                  <input class="form-control" type="text" id="username-input" v-model="loginUsername" required>
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
                  <input class="form-control" type="password" id="password-input" v-model="loginPassword" required>
                </div>
              </div>
              <div class="form-group row">
                <p></p>
              </div>
            </div>
            <div class="modal-footer">
              <a data-toggle="modal" data-target="#registerModal" data-dismiss="modal">Register</a>

              <!--<button type="button" class="btn btn-primary" v-on:click="login()">Login</button>-->
              <button type="submit" class="btn btn-primary">Login</button>

              <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>

            </div>
          </form>


        </div>
      </div>
    </div>

    <!-- Registration modal -->
    <div class="modal" tabindex="-1" role="dialog" id="registerModal">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Register</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group row">
              <label for="firstname-input" class="col-5 col-form-label">First name</label>
              <div class="col-10">
                <input class="form-control" type="text" id="firstname-input" v-model="firstName">
              </div>
            </div>
            <div class="form-group row">
              <label for="lastname-input" class="col-5 col-form-label">Last name</label>
              <div class="col-10">
                <input class="form-control" type="text" id="lastname-input" v-model="lastName">
              </div>
            </div>
            <div class="form-group row">
              <label for="username-input" class="col-5 col-form-label">Username</label>
              <div class="col-10">
                <input class="form-control" type="text" v-model="registerUsername">
              </div>
            </div>
            <div class="form-group row">
              <label for="email-input" class="col-5 col-form-label">Email</label>
              <div class="col-10">
                <input v-validate="'required|email'" class="form-control" type="email" v-model="registerEmail" id="email-input">
              </div>
              <!--<span v-if="errors.has('email-input')">{{ errors.first('email-input') }}</span>-->
              <!--<span>Heyyy</span>-->
            </div>
            <div class="form-group row">
              <label for="password-input" class="col-5 col-form-label">Password*</label>
              <div class="col-10">
                <input v-model="registerPassword" class="form-control" type="password" >
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <a href="#" data-toggle="modal" data-target="#loginModal" data-dismiss="modal">Login</a>
            <button type="button" class="btn btn-primary" v-on:click="register()" >Register</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>

          </div>

        </div>
      </div>
    </div>

    <!-- Navigation -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div class="container">
        <a class="navbar-brand" href="#">pandapandapanda</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item active">
              <a class="nav-link" href="/">Home
                <span class="sr-only">(current)</span>
              </a>
            </li>


            <li v-if="!loggedIn()" class="nav-item">
              <a class="nav-link" href="#" data-toggle="modal" data-target="#loginModal">Login</a>
            </li>
            <li v-else class="nav-item">
              <a class="nav-link" href="#" v-on:click="logout()">Logout</a>
            </li>

            <li v-if="!loggedIn()" class="nav-item">
              <a class="nav-link" href="#" data-toggle="modal" data-target="#registerModal">Register</a>
            </li>
            <li v-else class="nav-item">
              <a class="nav-link" :href="userProfile()" >Profile</a>
            </li>

            <!--<li v-else class="nav-item">-->
              <!--<a class="nav-link" href="#" data-toggle="modal" data-target="#loginModal">Logout</a>-->
            <!--</li>-->
            <!--<li v-else class="nav-item">-->
              <!--<a class="nav-link" href="#" data-toggle="modal" data-target="#registerModal">Profile</a>-->
            <!--</li>-->

            <!--<li class="nav-item">-->
            <!--<a class="nav-link" href="#" data-toggle="modal" data-target="#loginModal">Login</a>-->
            <!--</li>-->
            <!--<li class="nav-item">-->
            <!--<a class="nav-link" href="#" data-toggle="modal" data-target="#registerModal">Register</a>-->
            <!--</li>-->


            <!--<li class="nav-item">-->
              <!--<a class="nav-link" href="#">About</a>-->
            <!--</li>-->
            <!--<li class="nav-item">-->
              <!--<a class="nav-link" href="#">Services</a>-->
            <!--</li>-->
            <!--<li class="nav-item">-->
              <!--<a class="nav-link" href="#">Contact</a>-->
            <!--</li>-->
          </ul>
        </div>
      </div>
    </nav>

    <div class="container">

      <div class="row">

        <div class="col-lg-3">

          <img width="200" src="./assets/panda.png"/>

          <h1 class="my-4">Panda's Auction Emporium</h1>

          <!--<button type="button" class="btn btn-outline-secondary btn-block btn-space">Create Auction</button>-->

          <!--<div class="list-group">-->
            <!--<a href="#" class="list-group-item">Apparel</a>-->
            <!--<a href="#" class="list-group-item">Equipment</a>-->
            <!--<a href="#" class="list-group-item">Vehicles</a>-->
            <!--<a href="#" class="list-group-item">Property</a>-->
            <!--<a href="#" class="list-group-item">Other</a>-->
          <!--</div>-->

          <router-view name="side"></router-view>

        </div>

        <router-view name="main"></router-view>
        <!-- /.col-lg-3 -->

      </div>
      <!-- /.row -->

    </div>
    <!-- /.container -->

    <!--<div class="alert alert-warning alert-dismissible" data-auto-dismiss="2000" role="alert">-->
      <!--<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>-->
      <!--<strong>Warning!</strong> Better check yourself, you're not looking too good.-->
    <!--</div>-->
    <a v-on:auctions-won="temp()"></a>
  </div>
</template>

<style>
  body {
    padding-top: 60px;
  }

  @media (min-width: 992px) {
    body {
      padding-top: 100px;
    }
  }
</style>

<script>
  export default {
    data() {
      return {
        error: "",
        errorFlag: false,
        loggedInUser: null,
        firstName: "",
        lastName: "",
        registerUsername: "",
        registerPassword: "",
        registerEmail: "",
        loginUsername: "",
        loginPassword: "",
        loginErrors: [],
        showLoginModal: false
        //token: null
      }
    },

    methods: {

      temp: function() {
        alert('worked!');
      },

      register: function() {
        let data = {
          username: this.registerUsername,
          givenName: this.firstName,
          familyName: this.lastName,
          email: this.registerEmail,
          password: this.registerPassword
        };

        //TODO check that all fields are filled in

        this.$http.post('http://localhost:4941/api/v1/users', data)
          .then(function(response) {
            if (response.status === 201) {
              this.loginUsername = this.registerUsername;
              this.password = this.registerPassword;
              this.login();
              window.location.reload();
              //this.loggedInUser = response.id;
            }
          }, function(error) {
            // TODO error handling
            this.error = error;
            this.errorFlag = true;
          })
      },

      checkLogin: function(e) {
        this.loginErrors = [];
        e.preventDefault();

        if (this.loginUsername === "") {
          this.loginErrors.push("Username or email required");
        }
        if (this.loginPassword === "") {
          this.loginPassword.push("Password required");
        }

        if (!this.loginErrors.length) {
          this.login();
        }

      },

      login: function() {

        // alert(sessionStorage.getItem('token'));

        let data = {
          password: this.loginPassword
        };

        if (this.loginUsername.match(/@/)) {
          data['email'] = this.loginUsername;
        } else {
          data['username'] = this.loginUsername;
        }

        this.$http.post('http://localhost:4941/api/v1/users/login', data)
          .then(function(response) {

            if (response.status === 200) {


              this.loggedInUser = response.data;
              //this.sessionStorage.loggedInUser = response.data;
              sessionStorage.setItem('token', response.data.token);
              sessionStorage.setItem('id', response.data.id);
              window.location.reload();
            } else if (response.status === 400) {
              // TODO notify that username or password is incorrect
            }

          }, function(error) {
            this.error = error;
            this.errorFlag = true;
          });
      },

      logout: function() {


        // sessionStorage.setItem('token', null);
        // alert(this.loggedIn());
        // alert(sessionStorage.getItem('token'));
        // if () {
        //
        // }

        //alert(this.loggedIn());
        this.$http.post('http://localhost:4941/api/v1/users/logout', {}, {
          headers: {
            'X-Authorization': sessionStorage.getItem('token')
          }
        })
          .then(function(response) {
            alert("the promise returned");
            if (response.status === 200) {
              this.loggedInUser = null;
              sessionStorage.setItem('token', "");
              sessionStorage.setItem('id', "");
              window.location.reload();
            }
          }, function(error) {
            this.error = error;
            this.errorFlag = true;
            //alert(error.message);
          });

      },

      loggedIn: function() {
        // alert(sessionStorage.getItem('token') === null);
        // alert(sessionStorage.getItem('token'));

        return(!(sessionStorage.getItem('token') === null || sessionStorage.getItem('token') === ""));

        // if (sessionStorage.getItem('token') === null) {
        //   return false;
        // } else {
        //   return true;
        // }
        // return sessionStorage.getItem('token').length;
      },

      userProfile: function() {
        return '/user/' + sessionStorage.getItem('id');
      }
    }
  }
</script>
