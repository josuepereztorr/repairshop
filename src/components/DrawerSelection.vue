<template>
  <q-item
    :to="path"
    clickable
    exact
    active-class="text-accent"
  >
    <div class="row q-ml-sm">
      <q-item-section
        v-if="icon"
        avatar
      >
        <q-icon :name="icon" />
      </q-item-section>

      <q-item-section class="text-subtitle1">{{
        title
      }}</q-item-section>
    </div>
  </q-item>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    default: '',
  },
  path: {
    type: String,
    required: true,
  },
});
</script>
