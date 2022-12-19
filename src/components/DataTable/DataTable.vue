<template>
  <q-table
    :title="title"
    ref="tableRef"
    :rows="rows"
    :columns="columns"
    row-key="id"
    :pagination="pagination"
    title-class="text-h4"
    class="window-height q-pa-xl"
    @request="emit('onRequest')"
  >
    <!-- column header spacer -->
    <template v-slot:header="props">
      <q-tr :props="props">
        <q-th auto-width></q-th>
        <q-th v-for="col in props.cols" :key="col.name" :props="props">
          {{ col.label }}
        </q-th>
      </q-tr>
    </template>

    <template v-slot:body="props">
      <q-tr :props="props">
        <q-td auto-width>
          <slot name="customAction" @click="emit('onCustom', props.row)"></slot>
          <q-btn
            size="sm"
            color="primary"
            round
            dense
            flat
            @click="emit('onEdit', props.row)"
            :icon="'edit'"
            class="q-mx-xs"
          ></q-btn>

          <q-btn
            size="sm"
            color="negative"
            round
            dense
            flat
            @click="emit('onRemove', props.row)"
            :icon="'delete'"
          ></q-btn>
        </q-td>
        <!-- each additional column -->
        <q-td v-for="col in props.cols" :key="col.name" :props="props">
          {{ col.value }}
        </q-td>
      </q-tr>
    </template>

    <template v-slot:top-right>
      <slot name="actionButtons"></slot>
    </template>

    <template v-slot:pagination> </template>
  </q-table>
</template>

<script setup>
import { ref, onMounted } from "vue";

defineProps({
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
});

const emit = defineEmits(["onRequest", "onEdit", "onRemove", "onCustom"]);

const tableRef = ref("");
const pagination = {
  descending: false,
  page: 1,
  rowsPerPage: 0,
};

onMounted(() => {
  tableRef.value.requestServerInteraction();
});
</script>
