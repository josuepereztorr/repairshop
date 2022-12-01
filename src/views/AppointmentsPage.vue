<template>
  <DataTableSection
    title="Appointments"
    actionButtonLabel="Create Appointment"
    :rows="rows"
  >
    <GenericFormCard
      title="CHECK CALENDLY API"
      submitLabel="CHECK API"
    >
    </GenericFormCard>
  </DataTableSection>
</template>

<script setup>
import DataTableSection from '@/components/DataTable/DataTableSection.vue';
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
