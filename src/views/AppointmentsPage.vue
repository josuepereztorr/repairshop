<template>
  <DataTableSection
    title="Appointments"
    :rows="rows"
    :columns="columns"
    :isCreateShowing="isCreateShowing.value"
    :isDeleteShowing="isDeleteShowing.value"
    :isEditShowing="isEditShowing.value"
    @onRequest="onRequest"
    @onEdit="(row) => onEdit(row)"
    @onRemove="(row) => onRemove(row)"
  >
    <template #actionButtons>
      <div class="q-gutter-x-sm">
        <q-btn
          color="primary"
          icon="add"
          label="Create Appointment"
          unelevated
          no-caps
          @click="isCreateShowing.value = true"
        />
      </div>
    </template>

    <template #create>
      <GenericFormCard
        title="Create Appointment"
        submitLabel="Create"
        submitLabelStyle="primary"
        @onCancel="closeModal(isCreateShowing.name)"
        @onSubmit="add"
      >
        <template #body>
          <q-input
            dense
            autocomplete="off"
            v-model="appointmentDate.dateOfService"
            name="dateOfService"
            hint="Date"
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
            hint="Time"
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
            v-model="appointment.customer"
            label="Customer"
            :options="customers"
            emit-value
            map-options
          />

          <q-select
            dense
            transition-show="jump-up"
            transition-hide="jump-up"
            v-model="appointment.service"
            label="Service"
            :options="services"
            emit-value
            map-options
          />
        </template>
      </GenericFormCard>
    </template>

    <template #delete>
      <GenericFormCard
        title="Delete Customer"
        submitLabel="Delete"
        submitLabelStyle="negative"
        @onCancel="isDeleteShowing.value = false"
        @onSubmit="remove"
      >
        <template #body>
          <div>
            <p>
              Are you sure you want delete the following appointment for
              <span class="text-weight-medium">{{
                row.customer.getFullName()
              }}</span>
              scheduled for
              <span class="text-weight-medium">{{
                row.appointmentDate.dateOfService +
                " at " +
                row.appointmentDate.startTime
              }}</span>
            </p>
          </div>
        </template>
      </GenericFormCard>
    </template>

    <template #edit>
      <GenericFormCard
        title="Edit Appointment"
        submitLabel="Save"
        submitLabelStyle="primary"
        @onCancel="closeModal(isEditShowing.name)"
        @onSubmit="edit"
      >
        <template #body>
          <q-input
            dense
            autocomplete="off"
            v-model="appointmentDate.dateOfService"
            name="dateOfService"
            hint="Date"
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
            hint="Time"
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
            disable
            readonly
            transition-show="jump-up"
            transition-hide="jump-up"
            v-model="appointment.customer"
            label="Customer"
            :options="customers"
            emit-value
            map-options
          />

          <q-select
            dense
            transition-show="jump-up"
            transition-hide="jump-up"
            v-model="appointment.service"
            label="Service"
            :options="services"
            emit-value
            map-options
          />
        </template>
      </GenericFormCard>
    </template>
  </DataTableSection>
</template>

<script setup>
// vue
import { ref, reactive } from "vue";

// comoponents
import DataTableSection from "@/components/DataTable/DataTableSection.vue";
import GenericFormCard from "@/components/GenericFormCard.vue";

// firebase
import {
  db,
  doc,
  addDoc,
  setDoc,
  collection,
  onSnapshot,
  deleteDoc,
} from "@/firebase/firebase";

// models/utils
import Appointment from "@/models/Appointment";
import AppointmentDate from "@/models/AppointmentDate";
import Service from "@/models/Service";
import Customer from "@/models/Customer";
import { getCurrentDateFormatted } from "@/utils/date";

// crud
const add = () => {
  appointment.appointmentDate = appointmentDate;
  const appointmentRef = collection(db, Appointment.collectionName);
  addDoc(appointmentRef, appointment.toFirestore());
  closeModal(isCreateShowing.name);
};

const remove = () => {
  deleteDoc(doc(db, Appointment.collectionName, row.value.id));
  isDeleteShowing.value = false;
};

const edit = () => {
  appointment.appointmentDate = appointmentDate;

  console.log(appointment, "ON EDITH SUBMIT");
  setDoc(
    doc(db, Appointment.collectionName, row.value.id),
    appointment.toFirestore()
  );
  closeModal(isEditShowing.name);
};

// modals logic
const appointment = reactive(new Appointment());
const appointmentDate = reactive(new AppointmentDate());
const isCreateShowing = reactive({
  name: "create",
  value: false,
});
const isDeleteShowing = reactive({
  name: "delete",
  value: false,
});
const isEditShowing = reactive({
  name: "edit",
  value: false,
});
const closeModal = (type) => {
  appointment.service = "";
  appointment.customer = "";
  appointmentDate.dateOfService = getCurrentDateFormatted("MM/DD/YYYY");
  appointmentDate.startTime = getCurrentDateFormatted("h:mm");

  switch (type) {
    case isCreateShowing.name:
      isCreateShowing.value = false;
      break;
    case isEditShowing.name:
      isEditShowing.value = false;
      break;
    default:
      break;
  }
};

// table logic
const row = ref();
const rows = ref([]);
const columns = [
  {
    name: "dateOfService",
    requred: true,
    label: "Service Date",
    align: "left",
    field: "appointmentDate",
    format: (date) => `${date.dateOfService}`,
  },
  {
    name: "serviceType",
    requred: true,
    label: "Service",
    align: "left",
    field: "service",
    format: (service) => `${service.name}`,
  },

  {
    name: "startTime",
    requred: true,
    label: "Start Time",
    align: "left",
    field: "appointmentDate",
    format: (date) => `${date.startTime}`,
  },
  {
    name: "name",
    requred: true,
    label: "Customer Name",
    align: "left",
    field: "customer",
    format: (customer) => `${customer.getFullName()}`,
  },
  {
    name: "contact",
    requred: true,
    label: "Contact Information (phone/email)",
    align: "left",
    field: "customer",
    format: (customer) => `${customer.phoneNumber} | ${customer.emailAddress}`,
  },
  {
    name: "vehicle",
    requred: true,
    label: "Vehicle",
    align: "left",
    field: "customer",
    format: (customer) => `${customer.getVehicle()}`,
  },
  {
    name: "completionTime",
    requred: true,
    label: "Estimated Completion Time",
    align: "right",
    field: "service",
    format: (service) => `${service.completionTime} min`,
  },
  {
    name: "price",
    requred: true,
    label: "Cost",
    align: "right",
    field: "service",
    format: (service) => `$${service.price}`,
  },
  {
    name: "discount",
    requred: true,
    label: "Discount",
    align: "right",
    field: "service",
    format: (service) => `${service.discount.discountValue}%`,
  },
  {
    name: "dateCreated",
    requred: true,
    label: "Created On",
    align: "left",
    field: "appointmentDate",
    format: (date) => `${date.dateCreated}`,
  },
];
const services = ref([]);
const customers = ref([]);

const onRequest = () => {
  onSnapshot(
    collection(db, Appointment.collectionName).withConverter(Appointment),
    (querySnapshot) => {
      rows.value = [];
      querySnapshot.forEach((doc) => {
        rows.value.push(doc.data());
      });
      console.log(rows.value, "APPOINTMENTS FROM FIRESTORE");
    }
  );
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
  onSnapshot(
    collection(db, Customer.collectionName).withConverter(Customer),
    (querySnapshot) => {
      let customerOption = { label: "", value: "" };
      customers.value = [];
      querySnapshot.forEach((doc) => {
        customerOption.label = doc.data().getFullName();
        customerOption.value = doc.data();
        customers.value.push(customerOption);
        customerOption = { label: "", value: "" };
        // console.log(doc.data(), "CUSTOMER FROM FIRESTORE");
      });
      console.log(customers.value, "CUSTOMERS");
    }
  );
};
const onEdit = (selectedAppointment) => {
  isEditShowing.value = true;
  console.log(selectedAppointment, "SELECTED APPOINTMENT");
  row.value = selectedAppointment;
  appointmentDate.startTime = selectedAppointment.appointmentDate.startTime;
  appointmentDate.dateOfService =
    selectedAppointment.appointmentDate.dateOfService;

  // need a label and value to display to the qselect
  let customerOption = { label: "", value: "" };
  customerOption.label = selectedAppointment.customer.getFullName();
  customerOption.value = selectedAppointment.customer;

  let serviceOption = { label: "", value: "" };
  serviceOption.label = selectedAppointment.service.name;
  serviceOption.value = selectedAppointment.service;

  appointment.customer = customerOption.value;
  appointment.service = serviceOption.value;

  // this displays correctly but I have to go to the appointments
  // model and reference the value first then toFirestore()
  // but then causes further errors when saving
  // appointment.customer = customerOption;
  // appointment.service = serviceOption;
  console.log(appointment, " APPOINTMENT on edit");
};
const onRemove = (selectedAppointment) => {
  isDeleteShowing.value = true;
  row.value = selectedAppointment;
};
</script>
