<template>
  <q-table
    class="window-height q-pa-xl"
    :title="title"
    title-class="text-h4"
  >
    <template v-slot:top-right>
      <q-btn
        color="primary"
        :icon="actionButtonIcon"
        :label="actionButtonLabel"
        unelevated
        no-caps
        @click="actionButtonEvent"
        v-show="
          actionButtonLabel && actionButtonIcon
            ? true
            : false
        "
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
  actionButtonIcon: {
    type: String,
    required: false,
  },
});

const emits = defineEmits(['actionButtonEvent']);

const actionButtonEvent = () => {
  emits('actionButtonEvent');
};
</script>
