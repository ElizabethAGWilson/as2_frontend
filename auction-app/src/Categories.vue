<template>


  <div>
    <!-- Create auction modal -->
    <div class="modal" tabindex="-1" role="dialog" id="createModal">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <form @submit="checkCreate">
            <div class="modal-header">
              <h5 class="modal-title">Create auction</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="form-group row">
                <label for="title-input" class="col-5 col-form-label">Auction title</label>
                <div class="col-12">
                  <input class="form-control" type="text" id="title-input" v-model="titleInput" required>
                </div>
              </div>
              <div class="form-group row">
                <label  class="col-5 col-form-label">Description of item</label>
                <div class="col-12">
                  <textarea rows="2" required id="descriptionInput"  class="form-control" v-model="descriptionInput"></textarea>
                  <!--<input class="form-control" type="text" id="descriptionInput" v-model="titleInput">-->
                </div>
              </div>
              <!--<div class="form-group row">-->
              <!--<label for="email-input" class="col-2 col-form-label">Email</label>-->
              <!--<div class="col-10">-->
              <!--<input class="form-control" type="email" id="email-input">-->
              <!--</div>-->
              <!--</div>-->

              <div class="form-group-row">
                <label for="categorySelect" class="col-5 col-form-label">Category</label>
                <!--<div class="col-10">-->
                <select required class="form-control" id="categorySelect" v-model="categorySelect">
                  <option v-for="category in categories">{{ category.categoryTitle }}</option>
                </select>
                <!--</div>-->
              </div>
              <div class="form-group row">
                <label for="startdate-input" class="col-5 col-form-label">Start date</label>
                <div class="col-12">
                  <input class="form-control" type="datetime-local" id="startdate-input" v-model="startDate" required>
                </div>
              </div>
              <div class="form-group row">
                <label for="enddate-input" class="col-5 col-form-label">End date</label>
                <div class="col-12">
                  <input class="form-control" type="datetime-local" id="enddate-input" v-model="endDate" required>
                </div>
              </div>

              <div class="form-group-row">
                <label for="reservePrice" class="col-5 col-form-label">Reserve price</label>
                <!--<div class="col-10">-->
                <input class="form-control" type="number" id="reservePrice" v-model="reservePrice" required>
                <!--</div>-->
              </div>

              <div class="form-group-row">
                <label for="startingBid" class="col-5 col-form-label">Starting bid</label>
                <!--<div class="col-10">-->
                <input class="form-control" type="number" id="startingBid" v-model="reservePrice" required>
                <!--</div>-->
              </div>

              <div class="form-group row move-left">
                <!--<div class="col-12">-->
                  <!--<label class="move-left">Select image for item ...</label>-->
                  <!--<input class="form-control-file" type="file" id="photo-input"/>-->
                <!--</div>-->
                <div class="col-12">
                  <!--<input class="form-control-file" type="file" @change="onFileChanged">-->
                  <br>

                  <input class="form-control-file" type="file" @change="onFileChanged">
                  <!--<button @click="onUpload">Upload!</button>-->
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <!--<a href="#" data-toggle="modal" data-target="#registerModal" data-dismiss="modal">Register</a>-->
              <button type="submit" class="btn btn-primary">Submit</button>
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>

            </div>
          </form>


        </div>
      </div>
    </div>

    <!--<div v-if="sessionStorage.getItem('token').length">-->
    <div v-if="loggedIn()">
      <button type="button" class="btn btn-outline-secondary btn-block btn-space" data-toggle="modal" data-target="#createModal">Create Auction</button>
      <br>
      <h4>Buying</h4>
      <div class="list-group">
        <!--<p v-on:click="childAuctionsWon()" class="list-group-item">Auctions won</p>-->
        <button type="button" class="btn btn-outline-secondary">Auctions won</button>

        <!--<a href="#" class="list-group-item">Auctions won</a>-->
        <a @click="childAuctionsBid()" class="list-group-item">Auctions bid on</a>
      </div>
      <br>
      <h4>Selling</h4>
      <div class="list-group">
        <a v-on:click="childCurrentAuctions()" class="list-group-item">Current auctions</a>
        <a v-on:click="childSoldAuctions()" class="list-group-item">Past sold auctions</a>
        <a v-on:click="childUnsoldAUctions()" class="list-group-item">Past unsold auctions</a>
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
          descriptionInput: "",
          startDate: null,
          endDate: null,
          categorySelect: null,
          reservePrice: 0,
          startingBid: 0,
          selectedFile: null
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
        },

        loggedIn: function() {
          return(!(sessionStorage.getItem('token') === null || sessionStorage.getItem('token') === ""));
        },

        childAuctionsWon: function() {
          this.$root.auctionsWon();
        },

        childAuctionsBid: function() {
          this.$root.auctionsBid();
        },

        childCurrentAuctions: function() {
          this.$root.currentAuctions();
        },

        childSoldAuctions: function() {
          this.$root.auctionsSold();
        },

        childUnsoldAuctions: function() {
          this.$root.auctionsUnsold();
        },

        checkCreate: function(e) {
          e.preventDefault();

          let id = 0;
          for (let category of this.categories) {
            if (category.categoryTitle === this.categorySelect) {
              id = category.categoryId;
            }
          }

          let data = {
            categoryId: id,
            title: this.titleInput,
            description: this.descriptionInput,
            startDateTime: new Date(this.startDate).getTime(),
            endDateTime: new Date(this.endDate).getTime(),
            reservePrice: this.reservePrice,
            startingBid: this.startingBid
          };

          this.$http.post('http://localhost:4941/api/v1/auctions', JSON.stringify(data), {
            headers: {
              'X-Authorization': sessionStorage.getItem('token')
            }
          })
            .then(function(response) {
              if (response.status === 201) {
                alert('worked!');
              }
            });

          this.$http.post(
            'http://localhost:4941/api/v1/auctions/6/photos',
            this.selectedFile,
            {
              headers: {
                "X-Authorization": "token",
                "Content-Type": "image/jpeg"
              }
            }).then(response => {
            // get body data
            console.log("success")
          }, response => {
            // error callback
            console.log("error")
          });

        },

        onFileChanged (event) {
          this.selectedFile = event.target.files[0]
        },

        onUpload() {
          // upload file, get it from this.selectedFile
          this.$http.post(
            'http://localhost:4941/api/v1/auctions/6/photos',
            this.selectedFile,
            {
              headers: {
                "X-Authorization": "token",
                "Content-Type": "image/jpeg"
              }
            }).then(response => {
            // get body data
            console.log("success")
          }, response => {
            // error callback
            console.log("error")
          });
        }

      }
    }
</script>

<style scoped>
  .btn-space {
    margin-bottom: 20px;
  }
  .move-left {
    margin-right: 50px;
  }
</style>
