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
  name: "Galerias",
  async mounted() {
    this.getImages();
  },
  data() {
    return {
      user: '',
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
      this.user = localStorage.getItem('user');
      axios
        .get(`http://localhost:3000/api/images/users/${this.user}`)
        .then((result) => {          
          this.images = result.data.body;          
        })
        .catch((error) => {
          alert("Usuario no encontrado.");          
        });
    },    
  },
};
</script>
