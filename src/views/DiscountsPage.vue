<template>
  <DataTableSection
    title="Discounts"
    :rows="rows"
    :isModalShowing="isModalShowing"
  >
    <template #actionButtons>
      <div class="q-gutter-x-sm">
        <q-btn
          color="primary"
          icon="add"
          label="Create Discount"
          unelevated
          no-caps
          @click="openModal"
        />
      </div>
    </template>

    <template #modalBody>
      <GenericFormCard
        title="Create Discount"
        submitLabel="Create"
        @isModalShowing="closeModal"
      >
        <template #formBody>
          <q-input
            autocorrect="off"
            autocapitalize="off"
            autocomplete="off"
            spellcheck="false"
            dense
            autofocus
            bottom-slots
            hide-bottom-space
            lazy-rules
            name="name"
            v-model="formBody.name"
            label="Name *"
            :rules="[maxCharAllowable(25), required()]"
          />

          <q-input
            autocorrect="off"
            autocapitalize="off"
            autocomplete="off"
            spellcheck="false"
            dense
            bottom-slots
            hide-bottom-space
            lazy-rules
            name="promoCode"
            v-model="formBody.promoCode"
            label="Promo Code *"
            hint="Ex. SUMMER22"
            :rules="[required()]"
          />

          <q-input
            autocomplete="off"
            dense
            bottom-slots
            hide-bottom-space
            lazy-rules
            name="discountValue"
            step="0.01"
            v-model="formBody.discountValue"
            type="number"
            label="Discount (%)"
            suffix="%"
            :rules="[numberRange(0.0, 100.0)]"
          />

          <q-input
            dense
            autocomplete="off"
            v-model="formBody.validUntil"
            name="validUntil"
          >
            <template v-slot:prepend>
              <q-icon
                name="event"
                class="cursor-pointer"
                color="primary"
              >
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date
                    v-model="formBody.validUntil"
                    mask="MM/DD/YYYY"
                    label="fdfjhskd"
                  >
                    <div
                      class="row items-center justify-end"
                    >
                      <q-btn
                        v-close-popup
                        label="Close"
                        color="primary"
                        flat
                      />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>

          <q-input
            autocorrect="off"
            autocapitalize="off"
            autocomplete="off"
            spellcheck="false"
            dense
            autogrow
            bottom-slots
            hide-bottom-space
            name="description"
            v-model="formBody.description"
            label="Description"
            hint="optional"
            :rules="[maxCharAllowable(250)]"
          />

          <q-item
            tag="label"
            class="q-pl-none q-py-sm"
          >
            <q-item-section>
              <q-item-label>Discount Active</q-item-label>
            </q-item-section>

            <q-space />

            <q-item-section class="content-end">
              <q-toggle
                dense
                color="primary"
                v-model="formBody.isActive"
              />
            </q-item-section>
          </q-item>
        </template>
      </GenericFormCard>
    </template>
  </DataTableSection>
</template>

<script setup>
import { ref, reactive } from 'vue';
import DataTableSection from '@/components/DataTable/DataTableSection.vue';
import GenericFormCard from '@/components/GenericFormCard.vue';
import { getCurrentDateFormatted } from '@/utils/date';
import {
  maxCharAllowable,
  required,
  numberRange,
} from '@/utils/inputValidation';

// modal logic
const isModalShowing = ref(false);

const closeModal = () => {
  formBody.name = '';
  formBody.promoCode = '';
  formBody.discountValue = 0;
  formBody.validUntil =
    getCurrentDateFormatted('MM/DD/YYYY');
  formBody.description = '';
  formBody.isActive = false;
  isModalShowing.value = false;
};

const openModal = () => {
  isModalShowing.value = true;
};

// form logic

const formBody = reactive({
  name: '',
  promoCode: '',
  discountValue: 0,
  validUntil: getCurrentDateFormatted('MM/DD/YYYY'),
  description: '',
  isActive: false,
});

const rows = [
  {
    Name: 'New Year',
    'Promo Code': 'NEW2023',
    'Percent Off': '20%',
    Expires: 'January 2nd, 2022',
    Description: 'End of the year sale!',
    Active: false,
  },
];
</script>
