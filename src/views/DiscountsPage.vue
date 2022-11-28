<template>
  <DataTableView
    title="Discounts"
    actionButtonLabel="Add Discount"
    actionButtonIcon="add"
    :rows="rows"
  />
</template>

<script setup>
import DataTableView from '@/views/DataTableView.vue';

const rows = [
  {
    Description: 'End of the year sale!',
    'Promo Code': 'NEW2023',
    'Percent Off': '20%',
    Expires: 'January 2nd, 2022',
  },
];
</script>
