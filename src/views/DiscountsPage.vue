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
            v-model="promoCode"
            label="Name"
          />

          <q-input
            dense
            v-model="promoCode"
            label="Promo Code"
            hint="Ex. SUMMER22 "
          />

          <q-input
            dense
            v-model="percentOff"
            label="Percent Off"
          />

          <q-input
            dense
            v-model="date"
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
            v-model="description"
            label="Description"
          />
        </template>
      </GenericFormCard>
    </template>
  </DataTableSection>
</template>

<script setup>
import { ref } from 'vue';
import DataTableSection from '@/components/DataTable/DataTableSection.vue';
import GenericFormCard from '@/components/GenericFormCard.vue';

// modal reactivity
const isModalShowing = ref(false);

const closeModal = () => {
  isModalShowing.value = false;
};

const openModal = () => {
  isModalShowing.value = true;
};

let date = ref('');

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
