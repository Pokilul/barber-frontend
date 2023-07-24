<template>
  <v-container>
    <v-app-bar dense height="60%" color="indicador" dark>
      <v-toolbar-title>
        <h2>
          <font-awesome-icon icon="fa-solid fa-basket-shopping" />
          Productos
        </h2>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-dialog transition="dialog-top-transition" max-width="600">
        <template v-slot:activator="{ on, attrs }">
          <v-btn class="mr-2" color="teal lighten-1" v-bind="attrs" v-on="on"
            >Nuevo producto</v-btn
          >
        </template>
        <template v-slot:default="dialog">
          <v-card>
            <v-toolbar color="indicador display-1" dark
              ><v-icon large left>mdi-basket-outline</v-icon>Agregar nuevo producto</v-toolbar
            >
            <!-- ------------- INSERT DATA ------------- -->
            <v-card-text>
              <v-container class="mt-3">
                <h2 class="display-6 mb-3">Ingrese los datos necesarios</h2>
                <form v-on:submit.prevent="addProduct">
                  <v-text-field
                    label="Nombre del producto"
                    id="name"
                    v-model="name"
                    prepend-icon="mdi-checkbox-multiple-blank-outline"
                    required
                    outlined
                  ></v-text-field>
                  <v-text-field
                    label="Precio del producto"
                    id="price"
                    v-model="price"
                    prepend-icon="mdi-currency-usd"
                    required
                    outlined
                  ></v-text-field>
                  <v-text-field
                    label="Stock del producto"
                    id="stock"
                    v-model="stock"
                    prepend-icon="mdi-chart-bar-stacked"
                    required
                    outlined
                  ></v-text-field>
                  <v-file-input
                    label="Imagen del producto"
                    id="image"
                    v-model="image"
                    required
                    outlined
                  ></v-file-input>
                  <v-textarea
                    label="Descripción del producto"
                    id="description"
                    v-model="description"
                    prepend-icon="mdi-comment"
                    required
                    outlined
                    rows="3"
                  ></v-textarea>
                  <v-layout justify-end>
                    <v-btn
                      class="orange darken-1 white--text"
                      @click="dialog.value = false"
                      >Cancelar</v-btn
                    >
                    <v-btn
                      class="ml-2 teal lighten-1 white--text"
                      type="submit"
                      @click="dialog.value = false"
                      >Agregar producto</v-btn
                    >
                  </v-layout>
                </form>
              </v-container>
            </v-card-text>
          </v-card>
        </template>
      </v-dialog>
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
                <v-card-actions class="justify-center">
                  <v-dialog transition="dialog-top-transition" max-width="600">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        color="primary mx-1 white--text"
                        v-bind="attrs"
                        v-on="on"
                      >
                        <v-icon small left>mdi-pencil</v-icon>Editar</v-btn
                      >
                    </template>
                    <template v-slot:default="dialog">
                      <v-card>
                        <v-toolbar color="indicador display-1" dark
                          ><v-icon left>mdi-pencil</v-icon>Editar
                          producto</v-toolbar
                        >
                        <!-- ------------- INSERT DATA ------------- -->
                        <v-card-text>
                          <v-container class="mt-3">
                            <h2 class="display-6 mb-3">
                              Modifique los datos necesarios
                            </h2>
                            <v-container>
                              <v-img
                                height="150"
                                width="150"
                                :src="product.image"
                              ></v-img>
                            </v-container>
                            <form v-on:submit.prevent="">
                              <v-text-field
                                label="Nombre del producto"
                                prepend-icon="mdi-checkbox-multiple-blank-outline"
                                v-model="product.name"
                                required
                                outlined
                              ></v-text-field>
                              <v-text-field
                                label="Precio del producto"
                                v-model="product.price"
                                prepend-icon="mdi-currency-usd"
                                required
                                outlined
                              ></v-text-field>
                              <v-text-field
                                label="Stock del producto"
                                v-model="product.stock"
                                prepend-icon="mdi-chart-bar-stacked"
                                required
                                outlined
                              ></v-text-field>
                              <v-file-input
                                label="Imagen del producto"
                                v-model="image"
                                required
                                outlined
                              ></v-file-input>
                              <v-textarea
                                label="Descripción del producto"
                                v-model="product.description"
                                prepend-icon="mdi-comment"
                                required
                                outlined
                                rows="3"
                              ></v-textarea>
                              <v-layout justify-end>
                                <v-btn
                                  class="secondary darken-1 white--text"
                                  @click="dialog.value = false"
                                  >Cancelar</v-btn
                                >
                                <v-btn
                                  class="ml-2 teal lighten-1 white--text"
                                  type="submit"                                  
                                  @click="
                                    editProduct(product), (dialog.value = false)
                                  "
                                  >Editar producto</v-btn
                                >
                              </v-layout>
                            </form>
                          </v-container>
                        </v-card-text>
                      </v-card>
                    </template>
                  </v-dialog>
                  <v-btn color="secondary" @click="deleteProduct(product._id)"
                    ><v-icon small left>mdi-close-circle</v-icon>Eliminar</v-btn
                  >
                </v-card-actions>
                <v-card-actions> </v-card-actions>
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
  name: "adminProductos",
  components: {},
  props: {},
  async mounted() {
    await axios.get("http://localhost:3000/api/products/").then((response) => {      
      this.products = response.data.body;
    });
  },
  data() {
    return {
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
    refreshProducts() {
      axios.get("http://localhost:3000/api/products/").then((response) => {      
      this.products = response.data.body;
    });
    },    
    addProduct() {
      const reader = new FileReader();
      reader.onload = (event) => {
        this.base64 = event.target.result;
      };

      axios
        .post("http://localhost:3000/api/products/", {
          name: this.name,
          price: this.price,
          description: this.description,
          stock: this.stock,
          image: this.base64,
        })
        .then(() => {
          alert("Producto Agregado");    
          this.refreshProducts();                      
        })
        .catch((error) => {
          alert("Error...");
          console.log(error);
        });
    },
    editProduct(item) {
      if (this.image == null) {
        this.base64 = item.image;
      } else {
        const reader = new FileReader();
        reader.onload = (event) => {
          this.base64 = event.target.result;
        };
      }

      axios
        .put(`http://localhost:3000/api/products/${item._id}`, {
          _id: item._id,
          name: item.name,
          price: item.price,
          stock: item.stock,
          image: this.base64,
          description: item.description,
        })
        .then(() => {
          alert("Producto modificado");
          this.refreshProducts();      
        })
        .catch((error) => {
          alert("Error...");
          console.log(error);
        });
    },
    deleteProduct(id) {
      axios
        .delete(`http://localhost:3000/api/products/${id}`)
        .then(() => {
          alert("Producto eliminado");
          this.refreshProducts();
        })
        .catch((error) => {
          alert("Error");
          console.log(error);
        });
    },
  },
};
</script>
