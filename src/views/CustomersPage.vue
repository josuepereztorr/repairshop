<template>
  <DataTableView
    title="Customers"
    actionButtonLabel="Create Customer"
    :rows="rows"
  >
    <GenericFormCard
      title="Create Customer"
      submitLabel="Create"
    >
      <template #inputs>
        <q-input
          dense
          autofocus
          v-model="firstName"
          label="First Name"
        />

        <q-input
          dense
          v-model="lastName"
          label="Last Name"
        />

        <q-input
          dense
          v-model="phone"
          label="Phone"
          mask="(###) ### - ####"
        />

        <q-input
          dense
          autogrow
          type="email"
          v-model="email"
          label="Email"
        />
      </template>
    </GenericFormCard>
  </DataTableView>
</template>

<script setup>
import DataTableView from '@/views/DataTableView';
import GenericFormCard from '@/components/GenericFormCard.vue';

const rows = [
  {
    'Last Name': '29',
    'First Name': 'John',
    'Phone Number': '414-123-4567',
    'E-Mail': 'smithJohn@mail.com',
    vehicle: '2019 Toyota 4Runner V6',
  },
];
</script>
