<template>
  <v-container>
    <v-app-bar dense height="60%" color="indicador" dark>
      <v-toolbar-title>
        <h2>
          <font-awesome-icon icon="fa-solid fa-comment-dots" />
          Reseñas
        </h2>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-spacer></v-spacer>
    <v-container class="my-2">
      <v-card>
        <v-card-title>
          <h1 class="display-1">
            <v-icon large left>mdi-comment-plus-outline</v-icon>Nueva reseña
          </h1>
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-layout wrap>
              <!--NAME-->
              <v-flex xs12>
                <v-text-field
                  v-model="name"
                  label="Nombre"
                  outlined
                  clearable
                  required
                  prepend-icon="mdi-account"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-textarea
                  label="Descripción del producto"
                  v-model="comment"
                  prepend-icon="mdi-comment"
                  required
                  outlined
                ></v-textarea>
              </v-flex>
              <v-flex xs12 class="text-center">
                <v-rating
                  v-model="evaluation"
                  background-color="yellow darken-2"
                  color="orange"
                  size="40"
                  value="5"
                ></v-rating>
              </v-flex>
              <v-flex text-right v-if="userNotFound == 'true'">
                <v-btn disabled color="teal lighten-1 white--text"
                  >Agendar cita</v-btn
                >
              </v-flex>
              <v-flex text-right v-if="userNotFound == 'false'">
                <v-btn color="teal lighten-1 white--text" large @click="addReview()"
                  >Añadir reseña</v-btn
                >
              </v-flex>              
            </v-layout>
          </v-form>
        </v-card-text>
      </v-card>
    </v-container>

    <v-container>
      <v-card>
        <v-card-title>
          <h1 class="display-1">
            <v-icon large left>mdi-comment-multiple-outline</v-icon>Todas las reseñas
          </h1>
        </v-card-title>
        <v-card-text>
          <v-row class="mx-auto my-1">
            <v-col
              sm="12"
              md="6"
              lg="4"
              v-for="review in reviews"
              :key="review.id"
            >
              <v-card min-height="250px">
                <v-card-text>
                  <v-layout wrap>
                    <v-flex xs12 text-center>
                      <v-rating
                        :value="review.evaluation"
                        readonly
                        background-color="yellow darken-2"
                        color="orange"
                      ></v-rating>                      
                    </v-flex>                    
                    <v-flex xs12 class="my-1">
                      <h2>
                        <v-icon left>mdi-account</v-icon>{{ review.name }}
                      </h2>
                    </v-flex>
                    <v-flex class="my-1">
                      <h2>
                        <v-icon left>mdi-comment</v-icon>
                        {{ review.comment }}
                      </h2>
                    </v-flex>
                  </v-layout>
                </v-card-text>                
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-container>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "Resenas",
  data() {
    return {
      userNotFound: null,
      user: '',
      name: "",
      evaluation: 0,
      comment: "",
      reviews: [],
    };
  },
  props: {
    
  },
  created() {
    this.getReviews();
    this.userNotFound = localStorage.getItem("userNotFound");        
  },
  methods: {
    getReviews() {
      this.user = localStorage.getItem('user');
      axios
        .get(`http://localhost:3000/api/reviews/users/${this.user}`)
        .then((result) => {
          this.reviews = result.data.body;          
        })
        .catch((error) => {
          alert("Usuario no encontrado.");     
        });
    },
    addReview() {
      axios
        .post("http://localhost:3000/api/reviews/", {
          name: this.name,
          comment: this.comment,
          evaluation: this.evaluation,
        })
        .then(() => {
          alert("Resenia enviada");
          this.getReviews();
        })
        .catch((error) => {
          alert("Error...");          
        });
    },    
  },
};
</script>
