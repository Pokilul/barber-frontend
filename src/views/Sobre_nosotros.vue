<template>
  <v-container>
    <v-app-bar dense height="60%" color="indicador" dark>
      <v-toolbar-title>
        <h2>
          <font-awesome-icon icon="fa-solid fa-users" />
          Sobre nosotros
        </h2>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-spacer></v-spacer>
    <v-container>
      <v-layout class="my-1" wrap>
      <v-flex xs12>
        <v-img src="../assets/about_us.png"></v-img>
      </v-flex>
      <v-flex xs12 class="text-center">
        <p class="display-2 mb-1">Sobre nosotros</p>
        <p class="display-1">En Barbería Poki rescatamos el arte de las antiguas barberías y la experiencia que en ellas se vivía. Conjuntamos tradiciones, servicios de altos estándares de calidad e higiene, y los mejores productos de grooming y shaving. Aquí encontrarás ese espacio que hemos perdido los hombres, donde cortarse el pelo y afeitarse se convierten en una terapia de amigos y relajación, más que en un hábito. Sillas de barbero, espuma, toalla caliente y navaja libre… regresa el ritual del hombre.</p>
      </v-flex>
    </v-layout>
    </v-container>    
  </v-container>
</template>

<script>
export default {
  name: "Sobre_nosotros",
  data() {
    return {};
  },

  methods: {},
};
</script>
