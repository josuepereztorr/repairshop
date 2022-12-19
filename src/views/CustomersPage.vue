<template>
  <DataTableSection
    title="Customers"
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
          label="Create Customer"
          unelevated
          no-caps
          @click="isCreateShowing.value = true"
        />
      </div>
    </template>

    <template #create>
      <GenericFormCard
        title="Add Customer"
        submitLabel="Add"
        submitLabelStyle="primary"
        @onCancel="closeModal(isCreateShowing.name)"
        @onSubmit="add"
        :isCancelVisible="true"
        :isSubmitVisible="true"
      >
        <template #body>
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
            :rules="[required()]"
            mask="(###) ### - ####"
            type="tel"
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
            label="Email *"
            :rules="[required()]"
            type="email"
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
            name="year"
            v-model="vehicle.year"
            label="Year *"
            :rules="[required(), numberRange(1950, 2023)]"
            class="q-pa-none"
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
            :rules="[required(), maxCharAllowable(25)]"
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
        :isCancelVisible="true"
        :isSubmitVisible="true"
      >
        <template #body>
          <div>
            <p>
              Are you sure you want delete the following customer:
              <span class="text-weight-medium"
                >'{{ row.firstName + " " + row.lastName }}'</span
              >
            </p>
          </div>
        </template>
      </GenericFormCard>
    </template>

    <template #edit>
      <GenericFormCard
        title="Edit Customer"
        submitLabel="Save"
        submitLabelStyle="primary"
        @onCancel="closeModal(isEditShowing.name)"
        @onSubmit="edit"
        :isCancelVisible="true"
        :isSubmitVisible="true"
      >
        <template #body>
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
            :rules="[required()]"
            mask="(###) ### - ####"
            type="tel"
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
            label="Email *"
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
            name="year"
            v-model="vehicle.year"
            label="Year *"
            :rules="[required(), numberRange(1950, 2023)]"
            class="q-pa-none"
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
            :rules="[required(), maxCharAllowable(25)]"
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
import Customer from "@/models/Customer";
import Vehicle from "@/models/Vehicle";
import {
  maxCharAllowable,
  numberRange,
  required,
} from "@/utils/inputValidation";

// crud
const add = () => {
  const customerRef = collection(db, Customer.collectionName);
  customer.vehicle = vehicle;
  addDoc(customerRef, customer.toFirestore());
  closeModal(isCreateShowing.name);
};

const remove = () => {
  deleteDoc(doc(db, Customer.collectionName, row.value.id));
  isDeleteShowing.value = false;
};

const edit = () => {
  customer.vehicle = vehicle;
  setDoc(
    doc(db, Customer.collectionName, row.value.id),
    customer.toFirestore()
  );
  closeModal(isEditShowing.name);
};

// modals logic
const customer = reactive(new Customer());
const vehicle = reactive(new Vehicle());
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
  customer.firstName = "";
  customer.lastName = "";
  customer.phoneNumber = "";
  customer.emailAddress = "";
  vehicle.year = "";
  vehicle.make = "";
  vehicle.model = "";

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
    name: "firstName",
    requred: true,
    label: "First Name",
    align: "left",
    field: "firstName",
  },
  {
    name: "lastName",
    requred: true,
    label: "Last Name",
    align: "left",
    field: "lastName",
  },
  {
    name: "phoneNumber",
    requred: true,
    label: "Phone Number",
    align: "left",
    field: "phoneNumber",
  },
  {
    name: "emailAddress",
    requred: true,
    label: "Email Address",
    align: "left",
    field: "emailAddress",
  },
  {
    name: "vehicle",
    requred: true,
    label: "Vehicle",
    align: "left",
    field: "vehicle",
  },
];
const onRequest = () => {
  onSnapshot(
    collection(db, Customer.collectionName).withConverter(Customer),
    (querySnapshot) => {
      rows.value = [];
      querySnapshot.forEach((doc) => {
        rows.value.push(doc.data());
      });
      console.log(rows.value, "SERVICES FROM FIRESTORE");
    }
  );
};

const onEdit = (selectedCustomer) => {
  isEditShowing.value = true;
  row.value = selectedCustomer;
  console.log(selectedCustomer, "SELECTED CUSTOMER");
  customer.firstName = selectedCustomer.firstName;
  customer.lastName = selectedCustomer.lastName;
  customer.phoneNumber = selectedCustomer.phoneNumber;
  customer.emailAddress = selectedCustomer.emailAddress;
  vehicle.year = selectedCustomer.vehicle.year;
  vehicle.make = selectedCustomer.vehicle.make;
  vehicle.model = selectedCustomer.vehicle.model;
};
const onRemove = (selectedCustomer) => {
  isDeleteShowing.value = true;
  row.value = selectedCustomer;
};
</script>
