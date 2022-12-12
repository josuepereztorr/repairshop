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
            autofocus
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
            autofocus
            bottom-slots
            hide-bottom-space
            lazy-rules
            name="phoneNumber"
            v-model="customer.phoneNumber"
            label="Phone Number *"
            :rules="[required()]"
            type="number"
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
            :rules="[required()]"
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
              Are you sure you want delete the following
              customer:
              <span class="text-weight-medium"
                >'{{ row.name }}'</span
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
            autofocus
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
            autofocus
            bottom-slots
            hide-bottom-space
            lazy-rules
            name="phoneNumber"
            v-model="customer.phoneNumber"
            label="Phone Number *"
            :rules="[required()]"
            type="number"
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
            :rules="[required()]"
          />
        </template>
      </GenericFormCard>
    </template>
  </DataTableSection>
</template>

<script setup>
// vue
import { ref, reactive } from 'vue';

// comoponents
import DataTableSection from '@/components/DataTable/DataTableSection.vue';
import GenericFormCard from '@/components/GenericFormCard.vue';

// firebase
import {
  db,
  doc,
  addDoc,
  setDoc,
  collection,
  onSnapshot,
  deleteDoc,
} from '@/firebase/firebase';

// models/utils
import Customer from '@/models/Customer';
import {
  maxCharAllowable,
  required,
} from '@/utils/inputValidation';

// crud
const add = () => {
  const customerRef = collection(
    db,
    Customer.collectionName
  );
  addDoc(customerRef, customer.toFirestore());
  closeModal(isCreateShowing.name);
};

const remove = () => {
  deleteDoc(doc(db, Customer.collectionName, row.value.id));
  isDeleteShowing.value = false;
};

const edit = () => {
  setDoc(
    doc(db, Customer.collectionName, row.value.id),
    customer.toFirestore()
  );
  closeModal(isEditShowing.name);
};

// modals logic
const customer = reactive(new Customer());
const isCreateShowing = reactive({
  name: 'create',
  value: false,
});
const isDeleteShowing = reactive({
  name: 'delete',
  value: false,
});
const isEditShowing = reactive({
  name: 'edit',
  value: false,
});
const closeModal = (type) => {
  customer.firstName = '';
  customer.lastName = '';
  customer.phoneNumber = '';
  customer.emailAddress = '';

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
    name: 'firstName',
    requred: true,
    label: 'First Name',
    align: 'left',
    field: 'firstName',
  },
  {
    name: 'lastName',
    requred: true,
    label: 'Last Name',
    align: 'left',
    field: 'lastName',
  },
  {
    name: 'phoneNumber',
    requred: true,
    label: 'Phone Number',
    align: 'left',
    field: 'phoneNumber',
  },
  {
    name: 'emailAddress',
    requred: true,
    label: 'Email Address',
    align: 'left',
    field: 'emailAddress',
  },
];
const onRequest = () => {
  onSnapshot(
    collection(db, Customer.collectionName).withConverter(
      Customer
    ),
    (querySnapshot) => {
      rows.value = [];
      querySnapshot.forEach((doc) => {
        rows.value.push(doc.data());
      });
    }
  );
};
const onEdit = (selectedCustomer) => {
  selectedCustomer;
  isEditShowing.value = true;
  row.value = selectedCustomer;
  customer.firstName = selectedCustomer.firstName;
  customer.lastName = selectedCustomer.lastName;
  customer.phoneNumber = selectedCustomer.phoneNumber;
  customer.emailAddress = selectedCustomer.emailAddress;
};
const onRemove = (selectedCustomer) => {
  selectedCustomer;
  isDeleteShowing.value = true;
  row.value = selectedCustomer;
};
</script>
