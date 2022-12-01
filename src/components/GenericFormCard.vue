<template>
  <q-card>
    <div
      style="min-width: 450px"
      class="q-pa-lg"
    >
      <q-toolbar class="q-pl-sm">
        <q-toolbar-title class="text-weight-medium">
          {{ title }}
        </q-toolbar-title>
      </q-toolbar>

      <q-form
        @submit.prevent="onSubmit"
        class="q-gutter-md q-px-sm q-pb-sm"
      >
        <slot name="formBody"></slot>

        <div
          align="right"
          class="q-mt-md q-pt-lg"
        >
          <q-btn
            flat
            no-caps
            unelevated
            color="primary"
            label="Cancel"
            type="reset"
            @click="$emit('isModalShowing')"
          />
          <q-btn
            no-caps
            unelevated
            color="primary"
            :label="submitLabel"
            type="submit"
          />
        </div>
      </q-form>
    </div>
  </q-card>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  submitLabel: {
    type: String,
    required: true,
  },
});

defineEmits(['isModalShowing']);
</script>
