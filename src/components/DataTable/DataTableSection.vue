<template>
  <q-page>
    <DataTable
      :title="title"
      :rows="rows"
      :columns="columns"
      @onRequest="emit('onRequest')"
      @onEdit="(row) => emit('onEdit', row)"
      @onRemove="(row) => emit('onRemove', row)"
    >
      <template #actionButtons>
        <slot name="actionButtons"></slot>
      </template>
    </DataTable>

    <q-dialog
      persistent
      v-model="isCreateShowing"
      v-if="isCreateShowing"
    >
      <slot name="create"></slot>
    </q-dialog>

    <q-dialog
      persistent
      v-model="isDeleteShowing"
      v-if="isDeleteShowing"
    >
      <slot name="delete"></slot>
    </q-dialog>

    <q-dialog
      persistent
      v-model="isEditShowing"
    >
      <slot name="edit"></slot>
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
  columns: {
    type: Array,
    required: true,
  },
  isCreateShowing: {
    type: Boolean,
    required: true,
  },
  isDeleteShowing: {
    type: Boolean,
    required: true,
  },
  isEditShowing: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits([
  'onRequest',
  'onEdit',
  'onRemove',
]);

const isCreateShowing = toRef(props, 'isCreateShowing');
const isDeleteShowing = toRef(props, 'isDeleteShowing');
const isEditShowing = toRef(props, 'isEditShowing');
</script>
