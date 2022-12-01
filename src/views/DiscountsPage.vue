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
      >
        <template #formBody>
          <q-input
            dense
            autofocus
            v-model="formBody.name"
            label="Name"
          />

          <q-input
            dense
            v-model="formBody.promoCode"
            label="Promo Code"
            hint="Ex. SUMMER22"
          />

          <q-input
            dense
            v-model="formBody.discountValue"
            type="number"
            min="0"
            max="100"
            label="Discount (%)"
          />

          <q-input
            dense
            v-model="formBody.validUntil"
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
                    v-model="date"
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
            dense
            autogrow
            v-model="formBody.description"
            label="Description"
          />
        </template>
      </GenericFormCard>
    </template>
  </DataTableSection>
</template>

<script setup>
import { ref, reactive } from 'vue';
import DataTableSection from '@/components/DataTable/DataTableSection.vue';
import GenericFormCard from '@/components/GenericFormCard.vue';

// modal logic
const isModalShowing = ref(false);

const closeModal = () => {
  formBody.name = '';
  formBody.promoCode = '';
  formBody.percentOff = '';
  formBody.date = '';
  formBody.description = '';

  isModalShowing.value = false;
};

const openModal = () => {
  isModalShowing.value = true;
};

// form logic

const formBody = reactive({
  name: '',
  promoCode: '',
  percentOff: '',
  validUntil: '10/21/1994',
  description: '',
});

const rows = [
  {
    Name: 'New Year',
    'Promo Code': 'NEW2023',
    'Percent Off': '20%',
    Expires: 'January 2nd, 2022',
    Description: 'End of the year sale!',
  },
];
</script>
