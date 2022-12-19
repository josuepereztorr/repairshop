<template>
  <q-card>
    <div style="min-width: 450px" class="q-pa-lg">
      <div v-if="!isFormSubmited">
        <q-toolbar class="q-pl-sm text-primary">
          <q-toolbar-title class="text-weight-medium">
            {{ title }}
          </q-toolbar-title>
        </q-toolbar>

        <q-form
          @submit.prevent="emit('onSubmit')"
          class="q-gutter-md q-px-sm q-pb-sm"
        >
          <slot name="body"></slot>
          <div align="right" class="q-mt-md q-pt-lg">
            <q-btn
              flat
              no-caps
              unelevated
              color="primary"
              label="Cancel"
              type="reset"
              @click="emit('onCancel')"
              v-show="isCancelVisible"
            />
            <q-btn
              no-caps
              unelevated
              :color="submitLabelStyle"
              :label="submitLabel"
              type="submit"
              v-show="isSubmitVisible"
            />
          </div>
        </q-form>
      </div>
      <!-- success form -->
      <div v-else class="row text-center text-primary text-h6 q-mt-lg">
        <div>
          <q-card-section>
            <div class="col">
              <q-icon name="check" class="row text-green" size="9em" />
            </div>
          </q-card-section>
          <q-card-section class="text-weight-bold text-h5">
            {{ formStatus }}
          </q-card-section>
          <q-btn
            label="Schedule New Appointment"
            class="bg-primary text-white q-mt-lg"
            flat
            no-caps
            @click="emit('onSuccessForm')"
          ></q-btn>
        </div>
      </div>
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
  submitLabelStyle: {
    type: String,
    required: false,
  },
  isCancelVisible: {
    type: Boolean,
    required: true,
  },
  isSubmitVisible: {
    type: Boolean,
    required: true,
  },
  isFormSubmited: {
    type: Boolean,
    required: false,
  },
  isSubmitSuccessful: {
    type: Boolean,
    required: false,
  },
  formStatus: {
    type: String,
    required: false,
  },
});

const emit = defineEmits(["onCancel", "onSubmit", "onSuccessForm"]);
</script>
