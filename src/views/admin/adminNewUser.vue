<template>
  <v-container>
    <v-app-bar dense height="60%" color="indicador" dark>
      <v-toolbar-title>
        <h2>
          <v-icon large left>mdi-account</v-icon>
          Registrar nuevo usuario
        </h2>
      </v-toolbar-title>
    </v-app-bar>
    <v-spacer></v-spacer>    
    <v-container>
        <v-card>                        
            <!-- ------------- INSERT DATA ------------- -->
            <v-card-text>
              <v-container class="mt-3">
                <h2 class="display-6 mb-3">Ingrese los datos necesarios</h2>
                <form v-on:submit.prevent="createAdmin">
                  <v-text-field
                    label="Nombre del usuario"
                    id="name"
                    v-model="name"
                    prepend-icon="mdi-badge-account-horizontal-outline"
                    required
                    outlined
                  ></v-text-field>
                  <v-text-field
                    label="Apellidos del usuario"
                    id="lastName"
                    v-model="lastName"
                    prepend-icon="mdi-text-account"
                    required
                    outlined
                  ></v-text-field>
                  <v-text-field
                    label="Correo electrónico"
                    id="email"
                    v-model="email"
                    prepend-icon="mdi-at"
                    required
                    outlined
                  ></v-text-field>                  
                  <v-file-input
                    label="Imagen de perfil"
                    id="image"
                    v-model="image"
                    required
                    outlined
                  ></v-file-input>                  
                  <v-text-field
                    label="Nueva contraseña"
                    id="password"
                    v-model="password"
                    prepend-icon="mdi-lock-outline"
                    type="password"
                    required
                    outlined
                  ></v-text-field>
                  <v-layout justify-end>                    
                    <v-btn
                      class="ml-2 teal lighten-1 white--text"
                      type="submit"                      
                      >Agregar usuario</v-btn
                    >
                  </v-layout>
                </form>
              </v-container>
            </v-card-text>
          </v-card>
    </v-container>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "adminNewUser",
  data() {
    return {
        name: '',
        lastName: '',
        email: '',
        password: '',
        image: null,
        base64: null
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
    createAdmin() {
      const reader = new FileReader();
      reader.onload = (event) => {
        this.base64 = event.target.result;
      };

      axios
        .post("http://localhost:3000/api/admins/", {
          name: this.name,
          lastName: this.lastName,
          email: this.email,
          password: this.password,
          image: this.base64,
        })
        .then(() => {
          alert("Usuario creado");          
        })
        .catch((error) => {
          alert("Error...");
          console.log(error);
        });
    },
  }
};
</script>
