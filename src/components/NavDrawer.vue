<template>
  <v-navigation-drawer
    app
    expand-on-hover
    color="indicador"
    dark
    permanent
    clipped
  >
    <v-list>
      <v-list-item class="my-1">
        <form v-on:submit="verifyUser">
          <v-text-field
            v-model="user"            
            outlined
            clearable
            required            
          ></v-text-field>          
        </form>
      </v-list-item>

      <v-list-item link>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            <!--DIALOG LOG IN --------------------------->
            <v-dialog transition="dialog-top-transition" max-width="500">
              <template v-slot:activator="{ on, attrs }">
                <v-container v-bind="attrs" v-on="on">
                  Iniciar sesión
                </v-container>
              </template>
              <template v-slot:default="dialog">
                <v-card>
                  <v-toolbar class="display-1" color="indicador" dark>
                    <v-icon left>mdi-login</v-icon>Iniciar sesión
                  </v-toolbar>
                  <!-- ------------- INSERT DATA ------------- -->
                  <v-card-text>
                    <v-container class="mt-3">
                      <form v-on:submit="login">
                        <v-text-field
                          label="Correo de usuario"
                          id="email"
                          v-model="email"
                          prepend-icon="mdi-account"
                          required
                          outlined
                        ></v-text-field>
                        <v-text-field
                          label="Contraseña"
                          id="password"
                          v-model="password"
                          type="password"
                          prepend-icon="mdi-lock"
                          required
                          outlined
                        ></v-text-field>
                        <v-layout justify-center>
                          <v-btn
                            class="orange darken-1 white--text"
                            @click="dialog.value = false"
                            >Cerrar</v-btn
                          >
                          <v-btn
                            class="ml-2 teal lighten-1 white--text"
                            type="submit"
                            @click="dialog.value = false"
                            >Iniciar sesión</v-btn
                          >
                        </v-layout>
                      </form>
                    </v-container>
                  </v-card-text>
                </v-card>
              </template>
            </v-dialog>
            <!--END DIALOG LOG IN------------------------>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list nav shaped>
      <v-list-item link :to="{ name: 'Citas' }">
        <v-list-item-icon>
          <font-awesome-icon icon="fa-solid fa-calendar-plus" />
        </v-list-item-icon>
        <v-list-item-title class="text-h6">Citas</v-list-item-title>
      </v-list-item>

      <v-list-item link :to="{ name: 'Productos' }">
        <v-list-item-icon>
          <font-awesome-icon icon="fa-solid fa-basket-shopping" />
        </v-list-item-icon>
        <v-list-item-title class="text-h6">Productos</v-list-item-title>
      </v-list-item>

      <v-list-item link :to="{ name: 'Galerias' }">
        <v-list-item-icon>
          <font-awesome-icon icon="fa-solid fa-images" />
        </v-list-item-icon>
        <v-list-item-title class="text-h6">Galería</v-list-item-title>
      </v-list-item>

      <v-list-item link :to="{ name: 'Resenas' }">
        <v-list-item-icon>
          <font-awesome-icon icon="fa-solid fa-comment-dots" />
        </v-list-item-icon>
        <v-list-item-title class="text-h6">Reseñas</v-list-item-title>
      </v-list-item>

      <v-list-item link :to="{ name: 'Sobre_nosotros' }">
        <v-list-item-icon>
          <font-awesome-icon icon="fa-solid fa-users" />
        </v-list-item-icon>
        <v-list-item-title class="text-h6">Sobre nosotros</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import axios from "axios";

export default {
  name: "NavDrawer",

  data() {
    return {
      user: '',
      email: "",
      password: "",
      token: "",
      usuario: {
        imagen:
          "https://png.pngtree.com/png-vector/20190623/ourlarge/pngtree-accountavataruser--flat-color-icon--vector-icon-banner-templ-png-image_1491720.jpg",
        nombre: "Francisco Javier Ledesma Ponce",
      },
    };
  },
  props: {},
  methods: {    
    login() {
      axios
        .post("http://localhost:3000/api/admins/login", {
          email: this.email,
          password: this.password,
        })
        .then((res) => {
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + res.data.body.token;
          localStorage.setItem("token", res.data.body.token);
          this.$emit("refrescarNav");          
        })
        .catch((error) => {
          alert("Error...");
          console.log(error);
        });
    },
    verifyUser() {    
    localStorage.setItem("user", this.user);
    axios
      .get(`http://localhost:3000/api/admins/verify/${this.user}`)
      .then((result) => {        
        if (result.data.body === null){
          alert("El usuario no existe.");
          localStorage.setItem("userNotFound", true);
        }
        else{
          alert("El usuario sí existe.");
          localStorage.setItem("userNotFound", false);
        }
        })
        .catch((error) => {
          alert("Error...");
          console.log(error);
        });
  }
  },
};
</script>
