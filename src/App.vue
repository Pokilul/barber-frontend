<template>
  <v-app>
    <app-bar />
    <div v-if="isAdmin == true">
      <nav-drawer-admin @refrescarNav="verifyToken"/>            
    </div>
    <div v-if="isAdmin == false">
      <nav-drawer @refrescarNav="verifyToken"/>      
    </div>
    <v-main style="padding: 64px 0px 0px 64px">    
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import NavDrawerAdmin from "./components/NavDrawerAdmin.vue";
import NavDrawer from "./components/NavDrawer.vue";
import AppBar from "./components/AppBar.vue";

export default {
  name: "App",
  components: {
  NavDrawerAdmin,
  NavDrawer,
    AppBar,
  },
  data() {
    return {
      isAdmin: false
    };
  },
  created(){
    this.verifyToken();
  },
  methods: {
    verifyToken() {      
      if (localStorage.getItem('token') != 'null'){        
        this.$router.push('/admin_agendar_cita').catch(()=>{});;
        this.isAdmin = true;        
      }
      else{
        this.$router.push('/agendar_cita').catch(()=>{});;
        this.isAdmin = false;
      }      
    }
  }
};
</script>
