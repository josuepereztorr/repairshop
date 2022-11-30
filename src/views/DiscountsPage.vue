<template>
  <DataTableView
    title="Discounts"
    actionButtonLabel="Create Discount"
    :rows="rows"
  >
    <GenericFormCard
      title="Create Discount"
      submitLabel="Create"
    >
      <template #inputs>
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
                  <div class="row items-center justify-end">
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
  </DataTableView>
</template>

<script setup>
import DataTableView from '@/views/DataTableView.vue';
import GenericFormCard from '@/components/GenericFormCard.vue';
import { ref } from 'vue';

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
