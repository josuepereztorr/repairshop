<template>
  <q-table
    class="window-height q-pa-xl"
    :title="title"
    title-class="text-h4"
  >
    <template v-slot:top-right>
      <q-btn
        color="primary"
        icon="add"
        :label="actionButtonLabel"
        unelevated
        no-caps
        @click="actionButtonEvent"
        v-show="actionButtonLabel ? true : false"
      />
    </template>
  </q-table>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  actionButtonLabel: {
    type: String,
    required: true,
  },
});

const emits = defineEmits(['actionButtonEvent']);

const actionButtonEvent = () => {
  emits('actionButtonEvent');
};
</script>
