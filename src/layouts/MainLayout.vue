<template>
  <q-layout view="lHr lpr lfr">
    <q-drawer
      class="bg-primary text-white column items-start"
      v-model="leftDrawerOpen"
      side="left"
      bordered
    >
      <!-- Navigation -->
      <q-list
        padding
        class="rounded-borders text-white full-width"
      >
        <!-- Brand -->
        <q-item class="q-py-sm q-ml-md">
          <q-icon
            size="md"
            class="q-pr-sm"
          >
            <img
              src="@/assets/car-repair.png"
              alt="car logo"
            />
          </q-icon>
          <q-item-section class="text-h6 text-weight-medium"
            >Primary Auto Repair</q-item-section
          >
        </q-item>

        <q-separator spaced />

        <!-- Menu Selectors -->
        <DrawerSelection
          v-for="link in drawerMenuList"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <RouterView />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue';
import DrawerSelection from '@/components/DrawerSelection';

// drawer
const leftDrawerOpen = ref(true);

// function toggleLeftDrawer () {
//   leftDrawerOpen.value = !leftDrawerOpen.value
// }

const drawerMenuList = [
  {
    title: 'Appointments',
    icon: 'calendar_month',
    path: '/appointments',
  },
  {
    title: 'Customers',
    icon: 'group',
    path: '/customers',
  },
  {
    title: 'Services',
    icon: 'build',
    path: 'repair-services',
  },
  {
    title: 'Discounts',
    icon: 'sell',
    path: '/discounts',
  },
];
</script>
