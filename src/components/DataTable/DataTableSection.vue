<template>
  <q-page>
    <DataTable
      :title="title"
      :rows="rows"
    >
      <template #actionButtons>
        <slot name="actionButtons"></slot>
      </template>
    </DataTable>
    <q-dialog
      persistent
      v-model="isShowingModal"
    >
      <slot name="modalBody"></slot>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { toRef } from 'vue';
import DataTable from '@/components/DataTable/DataTable.vue';

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  rows: {
    type: Array,
    required: true,
  },
  isModalShowing: {
    type: Boolean,
  },
});

const isShowingModal = toRef(props, 'isModalShowing');
</script>
