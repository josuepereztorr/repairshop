<template>
  <q-page padding class="bg-primary q-pt-none a-mb-md">
    <q-toolbar class="q-mb-md">
      <q-toolbar-title
        class="text-white text-center text-h4 text-weight-medium"
        id="title"
      >
        Services
      </q-toolbar-title>
    </q-toolbar>
    <div
      class="q-gutter-lg row wrap justify-center items-start content-start q-mx-lg"
    >
      <ServiceSection
        :title="service.name"
        :description="service.description"
        v-for="service in services"
        :key="service.name"
      ></ServiceSection>
    </div>
  </q-page>
</template>

<script setup>
import { onMounted, ref } from "vue";
import ServiceSection from "@/components/ServiceSection.vue";
import Service from "@/models/Service";
import { collection, onSnapshot, db } from "@/firebase/firebase";

const services = ref([]);

onMounted(() => {
  onSnapshot(
    collection(db, Service.collectionName).withConverter(Service),
    (querySnapshot) => {
      services.value = [];
      querySnapshot.forEach((doc) => {
        services.value.push(doc.data());
      });
      console.log(services.value, "SERVICES FROM FIRESTORE");
    }
  );
});
</script>
