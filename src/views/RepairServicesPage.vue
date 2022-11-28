<template>
  <q-page>
    <DataTable
        title="Repair Services"
        :rows="rows"
        class="q-pa-xl">
    </DataTable>

  </q-page>
</template>

<script setup>
import { onMounted } from 'vue';
import DataTable from '@/components/DataTable'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/firebase';


onMounted(async () => {
  const querySnapshot = await getDocs(collection(db, 'services'));
  querySnapshot.forEach((doc) => {
    console.log(doc.id, ' => ', doc.data().description);
  })
});

const rows = [{'Name': 'Oil Change', 'Description': 'Empty and replace engine oil.', 'Estimate Service Time': '30 min', 'Price': '$45.99', 'Promo Code': 'NEW2023'}];
</script>

