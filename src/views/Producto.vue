<template>
  <v-container>
    <v-app-bar dense height="60%" color="indicador" dark>
      <v-toolbar-title>
        <h2>
          <font-awesome-icon icon="fa-solid fa-basket-shopping" />
          Productos
        </h2>
      </v-toolbar-title>
    </v-app-bar>
    <v-spacer></v-spacer>
    <!-- ------------- INSERT DATA END ------------- -->
    <v-container>
      <v-card>
        <v-card-title>
          <h1 class="display-1">
            <v-icon large left>mdi-basket-outline</v-icon>Todos los productos
          </h1>
        </v-card-title>
        <v-card-text>
          <v-row class="mx-auto">
            <v-col
              sm="12"
              md="6"
              lg="4"
              v-for="product in products"
              :key="product._id"
            >
              <v-card>
                <v-img height="350" :src="product.image"></v-img>
                <v-card-text>
                  <h1 class="title">
                    <v-icon left>mdi-label-multiple-outline</v-icon
                    >{{ product.name }}
                  </h1>
                  <h2 class="body-1">
                    <v-icon left>mdi-currency-usd</v-icon
                    >{{ product.price }} MXN
                  </h2>
                  <h2 class="body-1">
                    <v-icon left>mdi-package-variant-closed</v-icon>Stock:
                    {{ product.stock }}
                  </h2>
                  <h2 class="body-1">
                    <v-icon left>mdi-comment-text-outline</v-icon>Descripción:
                    <br />{{ product.description }}
                  </h2>
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
  name: "Productos",
  components: {},
  props: {},
  async mounted() {
    this.getProducts();
  },
  data() {
    return {
      user: '',
      products: [],
      show: false,
      name: "",
      price: null,
      stock: null,
      image: null,
      description: "",
      base64: null,
    };
  },
  watch: {
    image: function (newVal, oldVal) {
      if (newVal) {
        this.createBase64Image(newVal);
      } else {
        this.base64 = null;
      }
    },
  },
  methods: {
    createBase64Image: function (FileObject) {
      const reader = new FileReader();
      reader.onload = (event) => {
        this.base64 = event.target.result;
      };
      reader.readAsDataURL(FileObject);
    },
    getProducts() {
      this.user = localStorage.getItem('user');
      axios
        .get(`http://localhost:3000/api/products/users/${this.user}`)
        .then((result) => {
          this.products = result.data.body;          
        })
        .catch((error) => {
          alert("Usuario no encontrado.");     
        });
    },    
  },
};
</script>
