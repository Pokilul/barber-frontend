<template>
  <v-container>
    <v-app-bar dense height="60%" color="indicador" dark>
      <v-toolbar-title>
        <h2>
          <font-awesome-icon icon="fa-solid fa-calendar-plus" />
          Agendar cita
        </h2>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-spacer></v-spacer>
    <!--ADD NEW APPOINTMENT-->
    <v-container class="my-2">
      <v-card>
        <v-card-title>
          <h1 class="display-1">
            <v-icon large left>mdi-plus-box-outline</v-icon>Nueva cita
          </h1>
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-layout wrap>
              <!--NAME-->
              <v-flex xs12>
                <v-text-field
                  v-model="name"
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
                  v-model="phone"
                  label="Teléfono"
                  outlined
                  clearable
                  required
                  prepend-icon="mdi-cellphone"
                ></v-text-field>
              </v-flex>
              <!--TYPE OF SERVICE-->
              <v-flex xs12>
                <v-text-field
                  v-model="service"
                  label="Tipo de servicio"
                  outlined
                  required
                  prepend-icon="mdi-scissors-cutting"
                ></v-text-field>
              </v-flex>
              <!--DIALOG DATE PICKER-->
              <v-flex xs12>
                <v-dialog v-model="date_picker" persistent width="290px">
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="date"
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
                    v-model="date"
                    scrollable
                    :close-on-content-click="true"
                  >
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="date_picker = false">
                      Cancel
                    </v-btn>
                    <v-btn text color="teal lighten-1" @click="date_picker = false">
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
                      v-model="time"
                      label="Hora de cita"
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
                    v-model="time"
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
              <v-flex text-right v-if="userNotFound == 'true'">
                <v-btn disabled color="teal lighten-1 white--text"
                  >Agendar cita</v-btn
                >
              </v-flex>
              <v-flex text-right v-if="userNotFound == 'false'">
                <v-btn color="teal lighten-1 white--text" large @click="addAppointment()"
                  >Agendar cita</v-btn
                >
              </v-flex>
            </v-layout>
          </v-form>
        </v-card-text>
      </v-card>
    </v-container>    
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "Citas",
  components: {},
  data() {
    return {
      userNotFound: null,
      user: '',
      date_picker: false,
      hour_picker: false,
      name: "",
      phone: null,
      service: "",
      date: "",
      time: "",
      appointments: [],
    };
  },
  created() {
    this.userNotFound = localStorage.getItem("userNotFound");        
  },  
  methods: {    
    addAppointment() {
      axios
        .post("http://localhost:3000/api/appointments/", {
          name: this.name,
          phone: this.phone,
          service: this.service,
          date: this.date,
          time: this.time,
        })
        .then(() => {
          alert("Cita enviada");
          this.getAppointments();
        })
        .catch((error) => {
          alert("Error...");          
        });
    },    
  },  
};
</script>
