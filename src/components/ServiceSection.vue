<template>
  <q-card flat bordered class="q-py-md q-px-lg text-primary card">
    <q-card-section horizontal class="full-width">
      <q-card-section class="q-pa-none">
        <div class="text-h5 q-mt-sm q-mb-xs">{{ title }}</div>
        <div class="text-caption text-grey">
          {{ description }}
        </div>

        <q-card-actions class="q-pt-lg q-px-none" align="right">
          <q-btn
            flat
            no-caps
            dense
            color="primary"
            icon="info"
            label="More Info"
          />
        </q-card-actions>
      </q-card-section>
    </q-card-section>
  </q-card>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    default: "",
  },
});
</script>

<style lang="scss" scoped>
.card {
  width: auto;
  height: auto;
}
</style>
