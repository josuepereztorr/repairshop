<template>
  <q-layout view="lHr lpr lfr">
    <q-drawer
      class="bg-primary text-white column items-start"
      v-model="leftDrawerOpen"
      side="left"
      bordered
    >
      <!-- Navigation -->
      <q-list padding class="rounded-borders text-white full-width">
        <!-- Brand -->
        <BrandLogo></BrandLogo>

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
import { ref } from "vue";
import DrawerSelection from "@/components/DrawerSelection";
import BrandLogo from "@/components/BrandLogo.vue";

// drawer
const leftDrawerOpen = ref(true);

// function toggleLeftDrawer() {
//   leftDrawerOpen.value = !leftDrawerOpen.value;
// }

const drawerMenuList = [
  {
    title: "Appointments",
    icon: "calendar_month",
    path: "/appointments",
  },
  {
    title: "Customers",
    icon: "group",
    path: "/",
  },
  {
    title: "Services",
    icon: "build",
    path: "services",
  },
  {
    title: "Discounts",
    icon: "sell",
    path: "/discounts",
  },
];
</script>
