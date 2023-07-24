<template>
  <v-container>
    <v-app-bar dense height="60%" color="indicador" dark>
      <v-toolbar-title>
        <h2>
          <font-awesome-icon icon="fa-solid fa-images" />
          Galería
        </h2>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-dialog transition="dialog-top-transition" max-width="600">
        <template v-slot:activator="{ on, attrs }">
          <v-btn class="mr-2" color="teal lighten-1" v-bind="attrs" v-on="on"
            >Nueva imagen</v-btn
          >
        </template>
        <template v-slot:default="dialog">
          <v-card>
            <v-toolbar color="primary display-1" dark
              ><v-icon large left>mdi-camera-outline</v-icon>Agregar nueva imagen</v-toolbar
            >
            <!-- ------------- INSERT DATA ------------- -->
            <v-card-text>
              <v-container class="mt-3">
                <h2 class="display-6 mb-3">Ingrese los datos necesarios</h2>
                <form v-on:submit.prevent="addImage">
                  <v-file-input
                    label="Imagen"
                    id="image"
                    v-model="image"
                    required
                    outlined
                  ></v-file-input>
                  <v-textarea
                    label="Descripción de la imagen"
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
                      >Agregar imagen</v-btn
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
    <template>
      <v-carousel cycle class="mt-5" hide-delimiters show-arrows-on-hover>
        <v-carousel-item
          v-for="(item, i) in items"
          :key="i"
          :src="item.src"
          reverse-trasition="fade-transition"
          transition="fade-transition"
        ></v-carousel-item>
      </v-carousel>      
    </template>    
    <v-container class="my-1">
      <v-card>
        <v-card-title>
          <h1 class="display-1">
            <v-icon large left>mdi-camera-outline</v-icon>Todas las imágenes
          </h1>
        </v-card-title>
        <v-card-text>
          <v-row class="mx-auto">
            <v-col
              sm="12"
              md="6"
              lg="4"
              v-for="item in images"
              :key="item.image"
            >
              <v-card>
                <v-img height="350" :src="item.image"></v-img>
                <v-card-text>
                  <h1 class="title">
                    <v-icon left>mdi-label-multiple-outline</v-icon
                    >{{ item.description }}
                  </h1>                  
                </v-card-text>
                <v-card-actions class="justify-center">                  
                  <v-btn color="secondary" @click="deleteImage(item._id)"
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
  name: "adminGalerias",
  async mounted() {
    await axios.get("http://localhost:3000/api/images/").then((response) => {      
      this.images = response.data.body;
    });
  },
  data() {
    return {
      images: [],
      image: null,
      description: "",
      base64: null,

      items: [
        {
          src: "https://joseppons.com/formacion/wp-content/uploads/2020/11/servicios-salon-barberia-1536x1020.jpeg",
        },
        {
          src: "https://revistacoiffure.com/wp-content/uploads/2021/01/pexels-nick-demou-1319459.jpg",
        },
        {
          src: "https://img.lalr.co/cms/2017/03/25014033/barberia2703.jpg?size=sm",
        },
        {
          src: "https://joseppons.com/formacion/wp-content/uploads/2020/11/curly-barber-1536x1024.jpeg",
        },
      ],
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
    getImages() {
      axios
        .get("http://localhost:3000/api/images/")
        .then((result) => {          
          this.images = result.data.body;
          console.log(this.images);
        })
        .catch((error) => {
          alert("Error...");
          console.log(error);
        });
    },
    addImage() {      
      const reader = new FileReader();
      reader.onload = (event) => {
        this.base64 = event.target.result;
      };
      console.log(this.base64)
      axios
        .post("http://localhost:3000/api/images/", {
          description: this.description,
          image: this.base64
        })
        .then(() => {
          alert("Imagen agregada");
          this.getImages();
        })
        .catch((error) => {
          alert("Error...");
          console.log(error);
        });
    },
    deleteImage(id) {
      axios
        .delete(`http://localhost:3000/api/images/${id}`)
        .then(() => {
          alert("Imagen eliminada");
          this.getImages();
        })
        .catch((error) => {
          alert("Error");
          console.log(error);
        });
    },
  },
};
</script>
