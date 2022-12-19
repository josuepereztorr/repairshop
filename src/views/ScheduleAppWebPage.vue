<template>
  <q-page padding class="bg-primary row justify-center">
    <GenericFormCard
      title="Create Appointment"
      :isCancelVisible="false"
      submitLabel="Schedule Appointment"
      submitLabelStyle="primary"
      :isSubmitVisible="true"
      :isFormSubmited="isFormSubmited"
      :formStatus="formStatus"
      @onSubmit="add"
      class="q-ma-lg"
      id="form"
      @onSuccessForm="resetForm"
    >
      <template #body>
        <!-- Customer -->
        <q-input
          autocorrect="off"
          autocapitalize="off"
          autocomplete="off"
          spellcheck="false"
          dense
          autofocus
          bottom-slots
          hide-bottom-space
          lazy-rules
          name="firstName"
          v-model="customer.firstName"
          label="First Name *"
          :rules="[required(), maxCharAllowable(25)]"
        />

        <q-input
          autocorrect="off"
          autocapitalize="off"
          autocomplete="off"
          spellcheck="false"
          dense
          bottom-slots
          hide-bottom-space
          lazy-rules
          name="lastName"
          v-model="customer.lastName"
          label="Last Name *"
          :rules="[required(), maxCharAllowable(25)]"
        />

        <q-input
          autocorrect="off"
          autocapitalize="off"
          autocomplete="off"
          spellcheck="false"
          dense
          bottom-slots
          hide-bottom-space
          lazy-rules
          name="phoneNumber"
          v-model="customer.phoneNumber"
          label="Phone Number *"
          mask="(###) ### - ####"
          type="tel"
          :rules="[required()]"
        />

        <q-input
          autocorrect="off"
          autocapitalize="off"
          autocomplete="off"
          spellcheck="false"
          dense
          bottom-slots
          hide-bottom-space
          lazy-rules
          name="email"
          v-model="customer.emailAddress"
          label="Email"
          :rules="[required()]"
          type="email"
        />

        <!-- AppointmentDate -->
        <q-input
          dense
          autocomplete="off"
          v-model="appointmentDate.dateOfService"
          name="dateOfService"
          hint="Appointment Date"
        >
          <template v-slot:prepend>
            <q-icon name="event" class="cursor-pointer" color="primary">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date
                  v-model="appointmentDate.dateOfService"
                  mask="MM/DD/YYYY"
                  label="Date of Service"
                >
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>

        <q-input
          dense
          v-model="appointmentDate.startTime"
          name="startTime"
          hint="Appointment Time"
        >
          <template v-slot:prepend>
            <q-icon name="access_time" class="cursor-pointer" color="primary">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-time
                  v-model="appointmentDate.startTime"
                  mask="HH:mm"
                  label="Time of Service"
                  now-btn
                  format24h
                >
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-time>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>

        <q-select
          dense
          transition-show="jump-up"
          transition-hide="jump-up"
          v-model="appointment.service"
          label="Service"
          :options="services"
          emit-value
          map-options
          hint="Requested Service"
        />

        <!-- Vehicle -->
        <q-input
          autocorrect="off"
          autocapitalize="off"
          autocomplete="off"
          spellcheck="false"
          dense
          bottom-slots
          hide-bottom-space
          lazy-rules
          name="year"
          v-model="vehicle.year"
          label="Year *"
          class="q-pa-none"
          hint="Vehicle Year"
          :rules="[required(), numberRange(1950, 2023)]"
        />

        <q-input
          autocorrect="off"
          autocapitalize="off"
          autocomplete="off"
          spellcheck="false"
          dense
          bottom-slots
          hide-bottom-space
          lazy-rules
          name="make"
          v-model="vehicle.make"
          label="Make *"
          hint="Vehicle Make"
          :rules="[required(), maxCharAllowable(25)]"
        />

        <q-input
          autocorrect="off"
          autocapitalize="off"
          autocomplete="off"
          spellcheck="false"
          dense
          bottom-slots
          hide-bottom-space
          lazy-rules
          name="model"
          v-model="vehicle.model"
          label="Model *"
          hint="Vehicle Model"
          :rules="[required(), maxCharAllowable(25)]"
        />
      </template>
    </GenericFormCard>
  </q-page>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import GenericFormCard from "@/components/GenericFormCard.vue";
import AppointmentDate from "@/models/AppointmentDate";
import Appointment from "@/models/Appointment";
import Service from "@/models/Service";
import Customer from "@/models/Customer";
import Vehicle from "@/models/Vehicle";
import {
  maxCharAllowable,
  numberRange,
  required,
} from "@/utils/inputValidation";
import {
  db,
  // doc,
  addDoc,
  // setDoc,
  collection,
  onSnapshot,
  // deleteDoc,
} from "@/firebase/firebase";
import { getCurrentDateFormatted } from "@/utils/date";

const appointmentDate = reactive(new AppointmentDate());
const customer = reactive(new Customer());
const vehicle = reactive(new Vehicle());
const appointment = reactive(new Appointment());
const services = ref([]);

const formStatus = ref("Appointment Successfully Created");
const isFormSubmited = ref(true);

const add = () => {
  appointment.appointmentDate = appointmentDate;
  appointment.customer = customer;
  appointment.customer.vehicle = vehicle;
  console.log(appointment, "APPOINTMENT");
  const appointmentRef = collection(db, Appointment.collectionName);
  addDoc(appointmentRef, appointment.toFirestore());
  isFormSubmited.value = true;
  formStatus.value = "Appointment Successfully Created";
};

const resetForm = () => {
  appointmentDate.dateOfService = getCurrentDateFormatted("MM/DD/YYYY");
  appointmentDate.startTime = getCurrentDateFormatted("h:mm");
  customer.firstName = "";
  customer.lastName = "";
  customer.phoneNumber = "";
  customer.emailAddress = "";
  vehicle.year = "";
  vehicle.make = "";
  vehicle.model = "";
  appointment.customer = customer;
  appointment.customer.vehicle = vehicle;
  isFormSubmited.value = false;
  formStatus.value = "";
};

onMounted(() => {
  onSnapshot(
    collection(db, Service.collectionName).withConverter(Service),
    (querySnapshot) => {
      let serviceOption = { label: "", value: "" };
      services.value = [];
      querySnapshot.forEach((doc) => {
        serviceOption.label = doc.data().name;
        serviceOption.value = doc.data();
        services.value.push(serviceOption);
        serviceOption = { label: "", value: "" };
        // console.log(doc.data(), "CUSTOMER FROM FIRESTORE");
      });
      console.log(services.value, "SERVICES");
    }
  );
});
</script>

<style scoped>
#form {
  max-width: 500px;
}
</style>
