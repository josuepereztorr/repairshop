<template>
  <DataTableSection
    title="Discounts"
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
          label="Create Discount"
          unelevated
          no-caps
          @click="isCreateShowing.value = true"
        />
      </div>
    </template>

    <template #create>
      <GenericFormCard
        title="Create Discount"
        submitLabel="Create"
        submitLabelStyle="primary"
        @isModalShowing="closeModal"
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
            v-model="discount.name"
            label="Name *"
            :rules="[maxCharAllowable(25), required()]"
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
            name="promoCode"
            v-model="discount.promoCode"
            label="Promo Code *"
            hint="Ex. SUMMER22"
            :rules="[required()]"
          />

          <q-input
            autocomplete="off"
            dense
            bottom-slots
            hide-bottom-space
            lazy-rules
            name="discountValue"
            step="0.01"
            v-model="discount.discountValue"
            type="number"
            label="Discount (%)"
            suffix="%"
            :rules="[numberRange(0.0, 100.0)]"
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
            name="description"
            v-model="discount.description"
            label="Description"
            hint="optional"
            :rules="[maxCharAllowable(250)]"
          />

          <q-item tag="label" class="q-pl-none q-py-sm">
            <q-item-section>
              <q-item-label>Discount Active</q-item-label>
            </q-item-section>

            <q-space />

            <q-item-section class="content-end">
              <q-toggle dense color="primary" v-model="discount.isActive" />
            </q-item-section>
          </q-item>
        </template>
      </GenericFormCard>
    </template>

    <template #delete>
      <GenericFormCard
        title="Delete Discount"
        submitLabel="Delete"
        submitLabelStyle="negative"
        @onCancel="isDeleteShowing.value = false"
        @onSubmit="remove"
      >
        <template #body>
          <div>
            <p>
              Are you sure you want delete the following discount:
              <span class="text-weight-medium">'{{ row.name }}'</span>
            </p>
          </div>
        </template>
      </GenericFormCard>
    </template>

    <template #edit>
      <GenericFormCard
        title="Create Discount"
        submitLabel="Save"
        submitLabelStyle="primary"
        @isModalShowing="closeModal"
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
            v-model="discount.name"
            label="Name *"
            :rules="[maxCharAllowable(25), required()]"
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
            name="promoCode"
            v-model="discount.promoCode"
            label="Promo Code *"
            hint="Ex. SUMMER22"
            :rules="[required()]"
          />

          <q-input
            autocomplete="off"
            dense
            bottom-slots
            hide-bottom-space
            lazy-rules
            name="discountValue"
            step="0.01"
            v-model="discount.discountValue"
            type="number"
            label="Discount (%)"
            suffix="%"
            :rules="[numberRange(0.0, 100.0)]"
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
            name="description"
            v-model="discount.description"
            label="Description"
            hint="optional"
            :rules="[maxCharAllowable(250)]"
          />

          <q-item tag="label" class="q-pl-none q-py-sm">
            <q-item-section>
              <q-item-label>Discount Active</q-item-label>
            </q-item-section>

            <q-space />

            <q-item-section class="content-end">
              <q-toggle dense color="primary" v-model="discount.isActive" />
            </q-item-section>
          </q-item>
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

// modles/utils
import Discount from "@/models/Discount";
import {
  maxCharAllowable,
  required,
  numberRange,
} from "@/utils/inputValidation";

// crud
const add = () => {
  const discountRef = collection(db, Discount.collectionName);
  addDoc(discountRef, discount.toFirestore());
  closeModal(isCreateShowing.name);
};

const remove = () => {
  deleteDoc(doc(db, Discount.collectionName, row.value.id));
  isDeleteShowing.value = false;
};

const edit = () => {
  setDoc(
    doc(db, Discount.collectionName, row.value.id),
    discount.toFirestore()
  );
  closeModal(isEditShowing.name);
};

// modals logic
const discount = reactive(new Discount());
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
  discount.name = "";
  discount.promoCode = "";
  discount.discountValue = 0;
  discount.description = "";
  discount.isActive = false;

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
    name: "promoCode",
    requred: true,
    label: "Promo Code",
    align: "left",
    field: "promoCode",
  },
  {
    name: "isActive",
    requred: true,
    label: "Is Active",
    align: "left",
    field: "isActive",
  },
  {
    name: "discountValue",
    requred: true,
    label: "Discount Value",
    align: "right",
    field: "discountValue",
    format: (val) => `${val}%`,
  },
];
const onRequest = () => {
  onSnapshot(
    collection(db, Discount.collectionName).withConverter(Discount),
    (querySnapshot) => {
      rows.value = [];
      querySnapshot.forEach((doc) => {
        rows.value.push(doc.data());
      });
    }
  );
};
const onEdit = (selectedDiscount) => {
  isEditShowing.value = true;
  row.value = selectedDiscount;
  discount.name = selectedDiscount.name;
  discount.promoCode = selectedDiscount.promoCode;
  discount.discountValue = selectedDiscount.discountValue;
  discount.description = selectedDiscount.description;
  discount.isActive = selectedDiscount.isActive;
};
const onRemove = (selectedDiscount) => {
  isDeleteShowing.value = true;
  row.value = selectedDiscount;
};
</script>
