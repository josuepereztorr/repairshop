<template>
  <DataTableSection
    title="Services"
    :rows="rows"
    :columns="columns"
    row-key="name"
    :isModalShowing="isModalShowing"
  >
    <template #actionButtons>
      <div class="q-gutter-x-sm">
        <q-btn
          color="primary"
          icon="add"
          label="Create Service"
          unelevated
          no-caps
          @click="openModal"
        />
      </div>
    </template>

    <template #modalBody>
      <GenericFormCard
        title="Add Service"
        submitLabel="Add"
        @isModalShowing="closeModal"
        @formSubmit="submitForm"
        :isLoading="isLoading"
      >
        <template #formBody>
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
            :rules="[required(), maxCharAllowable(25)]"
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
            :rules="[numberRange(1, 600), required()]"
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
            :rules="[required(), numberRange(0, 100.0)]"
          />

          <!-- <q-select
            dense
            transition-show="jump-up"
            transition-hide="jump-up"
            v-model="promoCode"
            label="Promo Code"
            :options="[
              'SUMMER22',
              'FALL22',
              'SPRING23',
              'WINTER23',
            ]"
          /> -->

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
import { ref, reactive, onMounted } from 'vue';
// comoponents
import DataTableSection from '@/components/DataTable/DataTableSection.vue';
import GenericFormCard from '@/components/GenericFormCard.vue';
// firebase
import {
  db,
  getDocs,
  collection,
  addDoc,
} from '@/firebase/firebase';
// models/utils
import Service from '@/models/Service';
import {
  maxCharAllowable,
  required,
  numberRange,
} from '@/utils/inputValidation';

onMounted(async () => {
  const servicesRef = collection(
    db,
    Service.collectionName
  ).withConverter(Service);
  const querySnapshot = await getDocs(servicesRef);

  querySnapshot.forEach((docRef) => {
    services.push(docRef.data());
  });
});

const service = reactive(new Service());

let services = [];
console.log(services, 'Services');

// modal logic
const isModalShowing = ref(false);
const isLoading = ref(false);

const openModal = () => {
  isModalShowing.value = true;
};

const closeModal = () => {
  service.name = '';
  service.description = '';
  service.completionTime = '';
  service.price = '';
  isModalShowing.value = false;
};

const submitForm = () => {
  const serviceRef = collection(db, Service.collectionName);
  addDoc(serviceRef, service.toFirestore());
  closeModal();
};

// table logic
const columns = [
  {
    name: 'name2',
    required: true,
    label: 'Dessert (100g serving)',
    align: 'left',
    field: (row) => row.name,
    format: (val) => `${val}`,
  },
  {
    name: 'name',
    required: true,
    label: 'Name',
    field: 'name',
    align: 'left',
  },
  {
    name: 'completion Time',
    required: true,
    label: 'Completion Time (min)',
    field: 'completionTime',
    align: 'left',
  },

  {
    name: 'price',
    required: true,
    label: 'Repair Price ($)',
    field: 'price',
    align: 'right',
  },
  {
    name: 'description',
    required: true,
    label: 'Description',
    field: 'description',
    align: 'left',
  },
];

const rows = [
  {
    name: 'josue',
    description: 'This is a sample description',
    price: 33.22,
    completionTime: 25,
  },
  {
    name: 'Frozen Yogurt',
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
    sodium: 87,
    calcium: '14%',
    iron: '1%',
  },
];
</script>
