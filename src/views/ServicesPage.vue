<template>
  <DataTableSection
    title="Services"
    actionButtonLabel="Add Service"
    :rows="rows"
  >
    <GenericFormCard
      title="Add Service"
      submitLabel="Add"
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
          v-model="serviceTime"
          label="Estimate Time of Completion (minutes)"
          suffix="min"
        />

        <q-input
          dense
          v-model="price"
          label="Price"
          prefix="$"
        />

        <q-input
          dense
          autogrow
          v-model="description"
          label="Description"
        />

        <q-select
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
        />
      </template>
    </GenericFormCard>
  </DataTableSection>
</template>

<script setup>
import DataTableSection from '@/components/DataTable/DataTableSection.vue';
import GenericFormCard from '@/components/GenericFormCard.vue';
// import { onMounted } from 'vue';
// import { collection, getDocs } from 'firebase/firestore';
// import { db } from '@/firebase';

// onMounted(async () => {
//   const querySnapshot = await getDocs(
//     collection(db, 'services')
//   );
//   querySnapshot.forEach((doc) => {
//     console.log(doc.id, ' => ', doc.data().description);
//   });
// });

const rows = [
  {
    Name: 'Oil Change',
    Description: 'Empty and replace engine oil.',
    'Estimate Service Time': '30 min',
    Price: '$45.99',
    'Promo Code': 'NEW2023',
  },
];
</script>
