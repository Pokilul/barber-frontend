<template>
  <v-row>
    <v-col cols="auto">
      <v-dialog transition="dialog-bottom-transition" max-width="600">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" v-bind="attrs" v-on="on"
            >Nueva reseña</v-btn
        >
        </template>
        <template v-slot:default="dialog">
          <v-card>
            <v-toolbar color="primary" dark>Agregar nuevo producto</v-toolbar>
            <v-card-text>
              <!-- ------------- INSERT DATA ------------- -->      
        <h2>Insertar Producto</h2>
        <form v-on:submit.prevent="addProduct">
          <div>
            <label>Nombre</label>
            <input type="text" id="name" v-model="name" required />
          </div>
          <div>
            <label>Precio</label>
            <input type="number" id="price" v-model="price" required />
          </div>
          <div>
            <label>Descripcion</label>
            <input
              type="text"
              id="description"
              v-model="description"
              required
            />
          </div>
          <div>
            <label>Stock</label>
            <input type="number" id="stock" v-model="stock" required />
          </div>
          <div>
            <label>Imagen</label>
            <input type="text" id="image" v-model="image" required />
          </div>
          <button>Agregar</button>
        </form>      
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn text @click="dialog.value = false">Cerrar</v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "NewResena",

  data() {
    return {};
  },
};
</script>
