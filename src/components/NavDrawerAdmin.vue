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
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img v-bind:src="usuario.imagen"></v-img>
        </v-list-item-avatar>
      </v-list-item>
      <v-list-item link>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            <!--DIALOG LOG IN --------------------------->
            <form>
            <v-container @click="logout()">
                Cerrar sesión                 
            </v-container>           
            </form>            
            <!--END DIALOG LOG IN------------------------>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list nav shaped>      
      <v-list-item link :to="{ name: 'Admin_agendar_cita' }">
        <v-list-item-icon>
          <font-awesome-icon icon="fa-solid fa-calendar-plus" />
        </v-list-item-icon>
        <v-list-item-title class="text-h6">Citas</v-list-item-title>
      </v-list-item>

      <v-list-item link :to="{ name: 'Admin_productos' }">
        <v-list-item-icon>
          <font-awesome-icon icon="fa-solid fa-basket-shopping" />
        </v-list-item-icon>
        <v-list-item-title class="text-h6">Productos</v-list-item-title>
      </v-list-item>

      <v-list-item link :to="{ name: 'Admin_galeria' }">
        <v-list-item-icon>
          <font-awesome-icon icon="fa-solid fa-images" />
        </v-list-item-icon>
        <v-list-item-title class="text-h6">Galería</v-list-item-title>
      </v-list-item>

      <v-list-item link :to="{ name: 'Admin_resenas' }">
        <v-list-item-icon>
          <font-awesome-icon icon="fa-solid fa-comment-dots" />
        </v-list-item-icon>
        <v-list-item-title class="text-h6">Reseñas</v-list-item-title>
      </v-list-item>
      
      <v-list-item link :to="{ name: 'Admin_new_user' }">
        <v-list-item-icon>
          <font-awesome-icon icon="fa-solid fa-users" />
        </v-list-item-icon>
        <v-list-item-title class="text-h6">Nuevo admin</v-list-item-title>
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
      email: "",
      password: "",
      token: '',
      usuario: {
        imagen:
          "https://png.pngtree.com/png-vector/20190623/ourlarge/pngtree-accountavataruser--flat-color-icon--vector-icon-banner-templ-png-image_1491720.jpg"        ,
      },
    };
  },
  props: {},
  methods: {
    logout(){      
      localStorage.setItem("token", null);
      this.$emit('refrescarNav');
      //this.$router.push('/agendar_cita').catch(()=>{});;
    },
    login() {
      axios
        .post("http://localhost:3000/api/admins/login", {
          email: this.email,
          password: this.password,
        })
        .then((res) => {          
          alert("Inicio de sesión correcto");
          axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.body.token;
          localStorage.setItem("token", res.data.body.token);
        })
        .catch((error) => {
          alert("Error...");
          console.log(error);
        });
    },
  },
};
</script>
