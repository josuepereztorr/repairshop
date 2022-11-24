<template>
  <q-page>
    <DataTable
        title="Repair Services"
        :rows="[{'Name': 'Oil Change', 'Description': 'Empty and replace engine oil.', 'Estimate Service Time': '30 min', 'Price': '$45.99', 'Promo Code': 'NEW2023'}]"
        class="q-pa-xl">
    </DataTable>
  </q-page>
</template>

<script setup>
import DataTable from '@/components/DataTable'
</script>

