<template>
  <q-card>
    <div
      class="q-pa-lg"
      style="min-width: 450px"
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
        <slot name="inputs"></slot>
        <!-- <slot name="inputs"></slot> -->

        <div
          align="right"
          class="q-mt-md q-pt-lg"
        >
          <q-btn
            label="Cancel"
            flat
            no-caps
            unelevated
            color="primary"
            v-close-popup
          />
          <q-btn
            :label="submitLabel"
            type="submit"
            no-caps
            unelevated
            color="primary"
            v-close-popup
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
</script>

<style lang="scss" scoped></style>
