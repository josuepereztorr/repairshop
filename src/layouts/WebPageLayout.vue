<template>
  <q-layout view="hHh lpR fFf" class="bg-primary">
    <q-header class="bg-primary text-white q-py-md">
      <q-toolbar>
        <BrandLogo></BrandLogo>
        <q-tabs v-model="tab" shrink>
          <!-- <q-route-tab
            :ripple="false"
            no-caps
            name="services"
            label="Services"
            :indicator-color="primary"
            to="/home"
          /> -->
          <q-route-tab
            :ripple="false"
            no-caps=""
            name="schedule"
            label="Schedule an Appointment"
            to="/home"
          />
        </q-tabs>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer flat class="bg-primary text-white text-center q-pt-md">
      <q-toolbar>
        <q-toolbar-title class="text-caption"
          >&#169; Primary Auto Repair 2022
          <p>Your Local Repair Shop</p>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script setup>
import BrandLogo from "@/components/BrandLogo.vue";
import { ref } from "vue";

const tab = ref("services");
</script>
