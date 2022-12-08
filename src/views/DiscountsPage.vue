<template>
  <DataTableSection
    title="Discounts"
    :rows="rows"
    :isModalShowing="isModalShowing"
  >
    <template #actionButtons>
      <div class="q-gutter-x-sm">
        <q-btn
          color="primary"
          icon="add"
          label="Create Discount"
          unelevated
          no-caps
          @click="openModal"
        />
      </div>
    </template>

    <template #modalBody>
      <GenericFormCard
        title="Create Discount"
        submitLabel="Create"
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
            dense
            autocomplete="off"
            v-model="discount.validUntil"
            name="validUntil"
          >
            <template v-slot:prepend>
              <q-icon
                name="event"
                class="cursor-pointer"
                color="primary"
              >
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date
                    v-model="discount.validUntil"
                    mask="MM/DD/YYYY"
                    label="fdfjhskd"
                  >
                    <div
                      class="row items-center justify-end"
                    >
                      <q-btn
                        v-close-popup
                        label="Close"
                        color="primary"
                        flat
                      />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>

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

          <q-item
            tag="label"
            class="q-pl-none q-py-sm"
          >
            <q-item-section>
              <q-item-label>Discount Active</q-item-label>
            </q-item-section>

            <q-space />

            <q-item-section class="content-end">
              <q-toggle
                dense
                color="primary"
                v-model="discount.isActive"
              />
            </q-item-section>
          </q-item>
        </template>
      </GenericFormCard>
    </template>
  </DataTableSection>
</template>

<script setup>
// vue
import { ref, reactive, onMounted } from 'vue';
// components
import DataTableSection from '@/components/DataTable/DataTableSection.vue';
import GenericFormCard from '@/components/GenericFormCard.vue';
//firebase
import {
  db,
  addDoc,
  collection,
  getDocs,
} from '@/firebase/firebase';
// modles/utils
import { getCurrentDateFormatted } from '@/utils/date';
import {
  maxCharAllowable,
  required,
  numberRange,
} from '@/utils/inputValidation';
import Discount from '@/models/Discount';

onMounted(async () => {
  const discountRef = collection(
    db,
    Discount.collectionName
  ).withConverter(Discount);
  const querySnapshot = await getDocs(discountRef);

  querySnapshot.forEach((docRef) => {
    discounts.push(docRef.data());
  });
});

let discounts = [];
console.log(discounts, 'Discounts');

const discount = reactive(new Discount());

// modal logic
const isModalShowing = ref(false);
const isLoading = ref(false);

const openModal = () => {
  isModalShowing.value = true;
};

const closeModal = () => {
  discount.name = '';
  discount.promoCode = '';
  discount.discountValue = 0;
  discount.validUntil =
    getCurrentDateFormatted('MM/DD/YYYY');
  discount.description = '';
  discount.isActive = false;
  isModalShowing.value = false;
};

const submitForm = () => {
  const discountRef = collection(
    db,
    Discount.collectionName
  );
  addDoc(discountRef, discount.toFirestore());
  closeModal();
};

const rows = [
  {
    Name: 'New Year',
    'Promo Code': 'NEW2023',
    'Percent Off': '20%',
    Expires: 'January 2nd, 2022',
    Description: 'End of the year sale!',
    Active: false,
  },
];
</script>
