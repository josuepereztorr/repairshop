<template>
  <q-page>
    <DataTable
      :title="title"
      :actionButtonLabel="actionButtonLabel"
      :rows="rows"
      @actionButtonEvent="prompt = true"
    />
    <q-dialog
      persistent
      v-model="prompt"
    >
      <slot></slot>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref } from 'vue';
import DataTable from '@/components/DataTable.vue';

defineProps({
  title: {
    type: String,
    required: true,
  },
  rows: {
    type: Array,
    required: true,
  },
  actionButtonLabel: {
    type: String,
    required: true,
  },
});

const prompt = ref(false);
</script>
