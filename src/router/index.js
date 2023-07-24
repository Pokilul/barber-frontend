import Vue from 'vue'
import VueRouter from 'vue-router'
import CitaView from '../views/Cita.vue'
import ProductoView from '../views/Producto.vue'
import GaleriaView from '../views/Galeria.vue'
import ResenaView from '../views/Resena.vue'
import SobreNosotrosView from '../views/Sobre_nosotros.vue'

import AdminCitaView from '../views/admin/adminCita.vue'
import AdminProductoView from '../views/admin/adminProducto.vue'
import AdminGaleriaView from '../views/admin/adminGaleria.vue'
import AdminResenaView from '../views/admin/adminResena.vue'
import AdminNewUserView from '../views/admin/adminNewUser.vue'

Vue.use(VueRouter)

const routes = [    
  {
    path: '/agendar_cita', 
    name: 'Citas',
    component: CitaView
  },
  {
    path: '/productos', 
    name: 'Productos',
    component: ProductoView
  },
  {
    path: '/galerias',
    name: 'Galerias',
    component: GaleriaView
  },
  {
    path: '/resenas',
    name: 'Resenas',
    component: ResenaView
  },
  {
    path: '/sobre_nosotros',
    name: 'Sobre_nosotros',
    component: SobreNosotrosView
  },
  //RUTAS PARA ADMINISTRADORES
  {
    path: '/admin_agendar_cita',
    name: 'Admin_agendar_cita',
    component: AdminCitaView
  },
  {
    path: '/admin_productos',
    name: 'Admin_productos',
    component: AdminProductoView
  },
  {
    path: '/admin_galerias',
    name: 'Admin_galeria',
    component: AdminGaleriaView
  },
  {
    path: '/admin_resenas',
    name: 'Admin_resenas',
    component: AdminResenaView
  },
  {
    path: '/admin_new_user',
    name: 'Admin_new_user',
    component: AdminNewUserView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
