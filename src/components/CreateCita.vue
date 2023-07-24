<template>
  <v-container>
    <v-card class="">
      <v-card-title>
        <h1 class="display-2">Nueva cita</h1>
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-layout wrap>
              <!--NAME-->
            <v-flex xs12>
              <v-text-field
                v-model="new_appointment.name"
                label="Nombre"
                outlined
                clearable
                required
                prepend-icon="mdi-account"
              ></v-text-field>
            </v-flex>
            <!--TELEPHONE NUMBER-->
            <v-flex xs12>
              <v-text-field
                v-model="new_appointment.telephone"
                label="Teléfono"
                outlined
                clearable
                required
                prepend-icon="mdi-cellphone"
              ></v-text-field>
            </v-flex>
            <!--TYPE OF SERVICE-->
            <v-flex xs12>
              <v-select
                :items="services"
                v-model="new_appointment.service"
                label="Tipo de servicio"
                outlined
                required
                prepend-icon="mdi-scissors-cutting"
              ></v-select>
            </v-flex>
            <!--DIALOG DATE PICKER-->
            <v-flex xs12>
              <v-dialog v-model="date_picker" persistent width="290px">
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="new_appointment.date"
                    label="Fecha de cita"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    outlined
                    required
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="new_appointment.date"
                  scrollable
                  :close-on-content-click="true"
                >
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="date_picker = false">
                    Cancel
                  </v-btn>
                  <v-btn text color="primary" @click="date_picker = false">
                    Aceptar
                  </v-btn>
                </v-date-picker>
              </v-dialog>
            </v-flex>
            <!--DIALOG TIME PICKER-->
            <v-flex xs12>
              <v-dialog v-model="hour_picker" persistent width="290px">
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="new_appointment.hour"
                    label="Picker in dialog"
                    prepend-icon="mdi-clock-time-four-outline"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    outlined
                  ></v-text-field>
                </template>
                <v-time-picker
                    min="8:00"
                    max="20:00"                    
                  v-if="hour_picker"
                  v-model="new_appointment.hour"
                  full-width
                >
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="hour_picker = false">
                    Cancel
                  </v-btn>
                  <v-btn text color="primary" @click="hour_picker = false">
                    Aceptar
                  </v-btn>
                </v-time-picker>
              </v-dialog>
            </v-flex>
          </v-layout>
        </v-form>        
      </v-card-text>
      <v-card-actions>
        <v-container text-center>
          <v-btn color="success" x-large @click="save_appointment()"
            >Solicitar cita</v-btn
          >
        </v-container>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "CreateCita",
  components: {},
  data() {
    return {
      services: ["Corte", "Barba"],

      date_picker: false,
      hour_picker: false,

      new_appointment: {
        name: "",
        date: "",
        hour: "",
        service: "",
        telephone: null,
      },
    };
  },

  methods: {
    async save_appointment() {
      //await this.axios.post('', this.nueva_cita);
      console.log(this.new_appointment);
      this.nuevo_cita = {};
    },
  },
};
</script>

<style scoped></style>
