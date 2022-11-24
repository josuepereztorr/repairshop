<template>
  <q-page>
    <DataTable
        title="Discounts"
        :rows="[
            {'Description': 'End of the year sale!', 'Promo Code': 'NEW2023', 'Percent Off': '20%', 'Expires': 'January 2nd, 2022'}
            ]"
        class="q-pa-xl">
    </DataTable>
  </q-page>
</template>

<script setup>
import DataTable from '@/components/DataTable'
</script>
