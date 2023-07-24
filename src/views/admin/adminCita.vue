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
              <v-flex text-right>
                <v-btn color="teal lighten-1 white--text" large @click="addAppointment()"
                  >Agendar cita</v-btn
                >
              </v-flex>
            </v-layout>
          </v-form>
        </v-card-text>
      </v-card>
    </v-container>
    <v-container>
      <v-card>
        <v-card-title>
          <h1 class="display-1"><v-icon large left>mdi-calendar-heart</v-icon>Citas</h1>
        </v-card-title>
        <v-card-text>
          <v-row class="mx-auto">
            <v-col
              sm="12"
              md="6"
              lg="4"
              v-for="appointment in appointments"
              :key="appointment._id"
            >
              <v-card min-height="250px">
                <v-card-text>
                  <h2 class="tittle my-2">
                    <v-icon left>mdi-account</v-icon>{{ appointment.name }}
                  </h2>
                  <h2 class="body-1 my-1">
                    <v-icon left>mdi-cellphone</v-icon>Telefono:
                    {{ appointment.phone }}
                  </h2>
                  <h2 class="body-1 my-1">
                    <v-icon left>mdi-scissors-cutting</v-icon>Tipo de servicio:
                    {{ appointment.service }}
                  </h2>
                  <h2 class="body-1 my-1">
                    <v-icon left>mdi-calendar</v-icon>Fecha:
                    {{ appointment.date }}
                  </h2>
                  <h2 class="body-1 my-1">
                    <v-icon left>mdi-clock-time-four-outline</v-icon>Hora:
                    {{ appointment.time }}
                  </h2>
                </v-card-text>
                <v-card-actions>
                  <v-flex text-right fluid>
                    <!-- EDIT APPOINTMENT-->
                    <v-dialog
                      transition="dialog-top-transition"
                      max-width="600"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          color="orange mx-1 white--text"
                          v-bind="attrs"
                          v-on="on"
                        >
                          <v-icon small left>mdi-pencil</v-icon>Editar</v-btn
                        >
                      </template>
                      <template v-slot:default="dialog">
                        <v-card>
                          <v-toolbar color="primary display-1" dark
                            ><v-icon left>mdi-calendar-heart</v-icon> Editar cita existente</v-toolbar
                          >
                          <!-- ------------- INSERT DATA ------------- -->
                          <v-card-text>
                            <v-container class="mt-3">
                              <h2 class="display-6 mb-3">
                                Modifique los datos necesarios
                              </h2>
                              <form class="my-1" v-on:submit.prevent="editAppointment">
                                <v-layout wrap>
                                  <!--NAME-->
                                  <v-flex xs12>
                                    <v-text-field
                                      v-model="appointment.name"
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
                                      v-model="appointment.phone"
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
                                      v-model="appointment.service"
                                      label="Tipo de servicio"
                                      outlined
                                      required
                                      prepend-icon="mdi-scissors-cutting"
                                    ></v-text-field>
                                  </v-flex>
                                  <!--DIALOG DATE PICKER-->
                                  <v-flex xs12>
                                    <v-dialog
                                      v-model="date_picker"
                                      persistent
                                      width="290px"
                                    >
                                      <template
                                        v-slot:activator="{ on, attrs }"
                                      >
                                        <v-text-field
                                          v-model="appointment.date"
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
                                        v-model="appointment.date"
                                        scrollable
                                        :close-on-content-click="true"
                                      >
                                        <v-spacer></v-spacer>
                                        <v-btn
                                          text
                                          color="primary"
                                          @click="date_picker = false"
                                        >
                                          Cancel
                                        </v-btn>
                                        <v-btn
                                          text
                                          color="primary"
                                          @click="date_picker = false"
                                        >
                                          Aceptar
                                        </v-btn>
                                      </v-date-picker>
                                    </v-dialog>
                                  </v-flex>
                                  <!--DIALOG TIME PICKER-->
                                  <v-flex xs12>
                                    <v-dialog
                                      v-model="hour_picker"
                                      persistent
                                      width="290px"
                                    >
                                      <template
                                        v-slot:activator="{ on, attrs }"
                                      >
                                        <v-text-field
                                          v-model="appointment.time"
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
                                        v-model="appointment.time"
                                        full-width
                                      >
                                        <v-spacer></v-spacer>
                                        <v-btn
                                          text
                                          color="primary"
                                          @click="hour_picker = false"
                                        >
                                          Cancel
                                        </v-btn>
                                        <v-btn
                                          text
                                          color="primary"
                                          @click="hour_picker = false"
                                        >
                                          Aceptar
                                        </v-btn>
                                      </v-time-picker>
                                    </v-dialog>
                                  </v-flex>
                                </v-layout>
                                <v-layout justify-end>
                                  <v-btn
                                    class="orange darken-1 white--text"
                                    @click="dialog.value = false"
                                    >Cancelar</v-btn
                                  >
                                  <v-btn
                                    class="ml-2 teal lighten-1 white--text"
                                    @click="
                                      editAppointment(appointment),
                                        (dialog.value = false)
                                    "
                                    >Editar cita</v-btn
                                  >
                                </v-layout>
                              </form>
                            </v-container>
                          </v-card-text>
                        </v-card>
                      </template>
                    </v-dialog>
                    <v-btn
                      color="error"
                      @click="deleteAppointment(appointment._id)"
                      ><v-icon small left>mdi-close-circle</v-icon
                      >Eliminar</v-btn
                    >
                  </v-flex>
                </v-card-actions>
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
  name: "adminCita",
  components: {},  
  data() {
    return {
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
  props: {
    
  },
  async mounted() {
    await this.getAppointments();
  },
  methods: {
    getAppointments() {
      axios
        .get("http://localhost:3000/api/appointments/")
        .then((result) => {
          //this.reviews = result.data.body;
          this.appointments = result.data.body;
          console.log(this.appointments);
        })
        .catch((error) => {
          alert("Error...");
          console.log(error);
        });
    },
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
          console.log(error);
        });
    },
    editAppointment(item) {
      console.log(item);
      axios
        .put(`http://localhost:3000/api/appointments/${item._id}`, {
          name: item.name,
          phone: item.phone,
          service: item.service,
          date: item.date,
          time: item.time,
        })
        .then(() => {
          alert("Cita modificada");
          this.getAppointments();
        })
        .catch((error) => {
          alert("Error...");
          console.log(error);
        });
    },
    deleteAppointment(id) {
      axios
        .delete(`http://localhost:3000/api/appointments/${id}`)
        .then(() => {
          alert("Cita eliminada");
          this.getAppointments();
        })
        .catch((error) => {
          alert("Error");
          console.log(error);
        });
    },
  },
};
</script>
