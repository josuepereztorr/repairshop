<template>
  <DataTableSection
    title="Services"
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
          label="Create Service"
          unelevated
          no-caps
          @click="isCreateShowing.value = true"
        />
      </div>
    </template>

    <template #create>
      <GenericFormCard
        title="Add Service"
        submitLabel="Add"
        submitLabelStyle="primary"
        @onCancel="closeModal(isCreateShowing.name)"
        @onSubmit="add"
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
            name="name"
            v-model="service.name"
            label="Name *"
            :rules="[required(), maxCharAllowable(50)]"
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
            v-model="service.completionTime"
            label="Estimate Completion Time (min) *"
            :rules="[required(), numberRange(1, 600)]"
            type="number"
            suffix="min"
          />

          <q-input
            autocorrect="off"
            autocapitalize="off"
            autocomplete="off"
            spellcheck="false"
            dense
            autogrow
            bottom-slots
            hide-bottom-space
            lazy-rules
            v-model="service.price"
            label="Price *"
            prefix="$"
            type="number"
            :rules="[required(), numberRange(0, 30000.0)]"
          />

          <q-select
            dense
            transition-show="jump-up"
            transition-hide="jump-up"
            v-model="service.discount"
            label="Discount"
            :options="discounts"
            emit-value
            map-options
          />

          <q-input
            autocorrect="off"
            autocapitalize="off"
            autocomplete="off"
            spellcheck="false"
            dense
            autogrow
            bottom-slots
            hide-bottom-space
            lazy-rules
            name="description"
            v-model="service.description"
            label="Description"
            hint="optional"
            :rules="[maxCharAllowable(250)]"
          />
        </template>
      </GenericFormCard>
    </template>

    <template #delete>
      <GenericFormCard
        title="Delete Service"
        submitLabel="Delete"
        submitLabelStyle="negative"
        @onCancel="isDeleteShowing.value = false"
        @onSubmit="remove"
      >
        <template #body>
          <div>
            <p>
              Are you sure you want delete the following service:
              <span class="text-weight-medium">'{{ row.name }}'</span>
            </p>
          </div>
        </template>
      </GenericFormCard>
    </template>

    <template #edit>
      <GenericFormCard
        title="Edit Service"
        submitLabel="Save"
        submitLabelStyle="primary"
        @onCancel="closeModal(isEditShowing.name)"
        @onSubmit="edit"
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
            name="name"
            v-model="service.name"
            label="Name *"
            :rules="[required(), maxCharAllowable(50)]"
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
            v-model="service.completionTime"
            label="Estimate Completion Time (min) *"
            :rules="[required(), numberRange(1, 600)]"
            type="number"
            suffix="min"
          />

          <q-input
            autocorrect="off"
            autocapitalize="off"
            autocomplete="off"
            spellcheck="false"
            dense
            autogrow
            bottom-slots
            hide-bottom-space
            lazy-rules
            v-model="service.price"
            label="Price *"
            prefix="$"
            type="number"
            :rules="[required(), numberRange(0, 30000.0)]"
          />

          <q-select
            dense
            transition-show="jump-up"
            transition-hide="jump-up"
            v-model="service.discount"
            label="Discount"
            :options="discounts"
            emit-value
            map-options
          />

          <q-input
            autocorrect="off"
            autocapitalize="off"
            autocomplete="off"
            spellcheck="false"
            dense
            autogrow
            bottom-slots
            hide-bottom-space
            lazy-rules
            name="description"
            v-model="service.description"
            label="Description"
            hint="optional"
            :rules="[maxCharAllowable(250)]"
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
import Service from "@/models/Service";
import Discount from "@/models/Discount";
import {
  maxCharAllowable,
  required,
  numberRange,
} from "@/utils/inputValidation";

// crud
const add = () => {
  const serviceRef = collection(db, Service.collectionName);
  addDoc(serviceRef, service.toFirestore());
  closeModal(isCreateShowing.name);
};

const remove = () => {
  deleteDoc(doc(db, Service.collectionName, row.value.id));
  isDeleteShowing.value = false;
};

const edit = () => {
  console.log(service, "discount.toFirestoer()");

  setDoc(doc(db, Service.collectionName, row.value.id), service.toFirestore());
  closeModal(isEditShowing.name);
};

// modals logic
const service = reactive(new Service());
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
  service.name = "";
  service.description = "";
  service.completionTime = "";
  service.price = "";
  service.discount = "";

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
const discounts = ref([]);
const columns = [
  {
    name: "name",
    requred: true,
    label: "Name",
    align: "left",
    field: "name",
  },
  {
    name: "description",
    requred: true,
    label: "Description",
    align: "left",
    field: "description",
    format: (val) => `${val.toString().slice(0, 75)}...`,
  },
  {
    name: "completionTime",
    requred: true,
    label: "Completion Time",
    align: "right",
    field: "completionTime",
    format: (val) => `${val} min`,
  },
  {
    name: "discount",
    requred: true,
    label: "Discount",
    align: "right",
    field: "discount",
    format: (val) => `${val.name}`,
  },
  {
    name: "price",
    requred: true,
    label: "Price",
    align: "right",
    field: "price",
    format: (val) => `$${val}`,
  },
];
const onRequest = () => {
  // GET THE DISCOUNT FROM SERVICE.
  onSnapshot(
    collection(db, Service.collectionName).withConverter(Service),
    (querySnapshot) => {
      rows.value = [];
      querySnapshot.forEach((doc) => {
        rows.value.push(doc.data());
      });
      console.log(rows.value, "SERVICES FROM FIRESTORE");
    }
  );

  onSnapshot(
    collection(db, Discount.collectionName).withConverter(Discount),
    (querySnapshot) => {
      let discountOption = { label: "", value: "" };
      discounts.value = [];
      querySnapshot.forEach((doc) => {
        discountOption.label = doc.data().name;
        discountOption.value = doc.data();
        discounts.value.push(discountOption);
        discountOption = { label: "", value: "" };
      });
      console.log(discounts.value, "DISCOUNTS");
    }
  );
};
const onEdit = (selectedService) => {
  isEditShowing.value = true;
  row.value = selectedService;
  service.name = selectedService.name;
  service.completionTime = selectedService.completionTime;
  service.price = selectedService.price;
  service.description = selectedService.description;

  // need a label and value to display to the qselect
  let discountOption = { label: "", value: "" };
  discountOption.label = selectedService.discount.name;
  discountOption.value = selectedService.discount;

  service.discount = discountOption.value;
  console.log(service, " SERVICE on edit");
};
const onRemove = (selectedService) => {
  isDeleteShowing.value = true;
  row.value = selectedService;
};
</script>
