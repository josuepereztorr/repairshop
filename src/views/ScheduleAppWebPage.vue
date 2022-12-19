<template>
  <q-page padding class="bg-primary row justify-center">
    <GenericFormCard
      title="Create Appointment"
      submitLabel="Create"
      submitLabelStyle="primary"
      @onCancel="closeModal(isCreateShowing.name)"
      @onSubmit="add"
      class="q-ma-lg"
      id="form"
    >
      <template #body>
        <!-- Customer Info -->
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
        />

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
          name="lastName"
          v-model="customer.lastName"
          label="Last Name *"
        />

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
          name="phoneNumber"
          v-model="customer.phoneNumber"
          label="Phone Number *"
          mask="(###) ### - ####"
          type="tel"
        />

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
          name="email"
          v-model="customer.emailAddress"
          label="Email *"
          :rules="[]"
          type="email"
        />

        <!-- Appointment -->
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
          autofocus
          bottom-slots
          hide-bottom-space
          lazy-rules
          name="year"
          v-model="vehicle.year"
          label="Year *"
          class="q-pa-none"
          hint="Vehicle Year"
        />

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
          name="make"
          v-model="vehicle.make"
          label="Make *"
          hint="Vehicle Make"
        />

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
          name="model"
          v-model="vehicle.model"
          label="Model *"
          hint="Vehicle Model"
        />
      </template>
    </GenericFormCard>
  </q-page>
</template>

<script setup>
import { reactive } from "vue";
import GenericFormCard from "@/components/GenericFormCard.vue";
import AppointmentDate from "@/models/AppointmentDate";
import Appointment from "@/models/Appointment";
import Customer from "@/models/Customer";
import Vehicle from "@/models/Vehicle";
// import {
//   maxCharAllowable,
//   numberRange,
//   required,
// } from "@/utils/inputValidation";

const appointmentDate = reactive(new AppointmentDate());
const appointment = reactive(new Appointment());
const customer = reactive(new Customer());
const vehicle = reactive(new Vehicle());
</script>

<style scoped>
#form {
  max-width: 500px;
}
</style>
