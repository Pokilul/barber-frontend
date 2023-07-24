<template>
  <v-layout class="justify-end">
    <v-col cols="auto">
      <v-dialog transition="dialog-top-transition" max-width="600">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" v-bind="attrs" v-on="on">Nuevo producto</v-btn>
        </template>
        <template v-slot:default="dialog">
          <v-card>
            <v-toolbar color="primary display-1" dark>Agregar nuevo producto</v-toolbar>
            <!-- ------------- INSERT DATA ------------- -->
            <v-card-text>
              <v-container class="mt-3">
                <h2 class="display-6 mb-3">Ingrese los datos necesarios</h2>
                <form v-on:submit.prevent="addProduct">
                <v-text-field label="Nombre del producto" id="name" v-model="name" required outlined></v-text-field>
                <v-text-field label="Precio del producto" id="price" v-model="price" required outlined></v-text-field>
                <v-text-field label="Stock del producto" id="stock" v-model="stock" required outlined></v-text-field>
                <v-text-field label="Imagen del producto" id="image" v-model="image" required outlined></v-text-field>
                <v-textarea label="Descripción del producto" id="description" v-model="description" required outlined rows="3"></v-textarea>                
                <v-layout justify-end>                  
                    <v-btn class="orange darken-1 white--text" @click="dialog.value = false">Cancelar</v-btn>
                    <v-btn class=" ml-2 teal lighten-1 white--text" type="submit" @click="dialog.value = false">Agregar producto</v-btn>                         
                </v-layout>                
                </form>
              </v-container>                                                          
            </v-card-text>
          </v-card>
        </template>
      </v-dialog>
    </v-col>
  </v-layout>
</template>

<script>
import axios from "axios";
import getProducts from "../views/Producto.vue"


export default {
  name: "NewProduct",

  data() {
    return {};
  },
  methods: {    
    addProduct() {
      axios
        .post("http://localhost:3000/api/products/", {
          name: this.name,
          price: this.price,
          description: this.description,
          stock: this.stock,
          image: this.image,
        })
        .then(() => {
          alert("Producto Agregado");
          this.getProducts();
        })
        .catch((error) => {
          alert("Error...");
          console.log(error);
        });
    },
    getProducts() {
      axios
        .get("http://localhost:3000/api/products/")
        .then((result) => {
          this.products = result.data.body;
          console.log(this.products);
        })
        .catch((error) => {
          console.log(error);
        });
    },      
  },
};
</script>
