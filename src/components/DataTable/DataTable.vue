<template>
  <q-table
    :title="title"
    title-class="text-h4"
    class="window-height q-pa-xl"
  >
    <template v-slot:top-right>
      <slot name="actionButtons"></slot>
    </template>
  </q-table>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
});
</script>
