<template>
  <q-page>
    <DataTable
        title="Appointments"
        :rows="[{'Last Name': '29', 'First Name': 'John', 'Phone Number': '414-123-4567', 'E-Mail': 'smithJohn@mail.com', vehicle: '2019 Toyota 4Runner V6'}]"
        class="q-pa-xl">
    </DataTable>
  </q-page>
</template>

<script setup>
import DataTable from '@/components/DataTable'
</script>
