<template>
  <q-page>
    <DataTable
      :title="title"
      :actionButtonLabel="actionButtonLabel"
      :actionButtonIcon="actionButtonIcon"
      :rows="rows"
      @actionButtonEvent="prompt = true"
    />
    <q-dialog v-model="prompt">
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Your address</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input
            dense
            v-model="address"
            autofocus
            @keyup.enter="prompt = true"
          />
        </q-card-section>

        <q-card-actions
          align="right"
          class="text-primary"
        >
          <q-btn
            flat
            label="Cancel"
            v-close-popup
          />
          <q-btn
            flat
            label="Add address"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
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
  actionButtonIcon: {
    type: String,
    required: false,
  },
});

const prompt = ref(false);
</script>
