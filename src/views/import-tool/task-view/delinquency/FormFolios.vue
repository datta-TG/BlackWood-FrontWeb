<template>
  <div>
    <div v-if="foliosDb.length > 0">
      <h5 class="mb-2">
        Current Folios in the Data Base
      </h5>
      <b-list-group flush>
        <b-list-group-item
          v-for="folio in foliosDb"
          :key="folio.id"
        >
          {{ folio.value }}
        </b-list-group-item>
      </b-list-group>
    </div>

    <h5 class="my-2">
      New Folios
    </h5>
    <!-- Row Loop -->
    <b-row
      v-for="(folio, index) in folios"
      :id="folio.id"
      :key="folio.id"
      ref="row"
    >

      <!-- Item Folio -->
      <b-col md="6">
        <b-form-group
          label="Folio"
          label-for="folio"
        >
          <b-form-input
            id="folio"
            type="text"
            placeholder="Folio"
          />
        </b-form-group>
      </b-col>

      <!-- Remove Button -->
      <b-col
        lg="6"
        md="6"
        class="mb-50"
      >
        <b-button
          v-ripple.400="'rgba(234, 84, 85, 0.15)'"
          variant="outline-danger"
          class="mt-0 mt-md-2"
          @click="removefolio(index)"
        >
          <feather-icon
            icon="XIcon"
            class="mr-25"
          />
          <span>Delete</span>
        </b-button>
      </b-col>
      <b-col cols="12">
        <hr>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="6">
        <b-button
          v-ripple.400="'rgba(255, 255, 255, 0.15)'"
          variant="primary"
          @click="addFolio"
        >
          <feather-icon
            icon="PlusIcon"
            class="mr-25"
          />
          <span>Add New Folio</span>
        </b-button>
      </b-col>
      <!-- submit  -->
      <b-col cols="6">
        <b-button
          v-ripple.400="'rgba(255, 255, 255, 0.15)'"
          variant="primary"
          class="float-right"
        >
          Submit
        </b-button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import {
  BFormGroup, BFormInput, BRow, BCol, BButton, BListGroup, BListGroupItem,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'

export default {
  components: {
    BRow,
    BCol,
    BButton,
    BFormGroup,
    BFormInput,
    BListGroup,
    BListGroupItem,
  },
  directives: {
    Ripple,
  },
  props: {
    data: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      folios: [{
        id: 1,
        folio: '2332C3S4',
      }],
      nextTodoId: 2,
    }
  },
  computed: {
    foliosDb() {
      return this.data?.folio_db ? this.data.folio_db : []
    },
  },
  methods: {
    addFolio() {
      this.folios.push({
        id: this.nextTodoId += this.nextTodoId,
      })
    },
    removefolio(index) {
      this.folios.splice(index, 1)
    },
  },
}
</script>

<style lang="scss" scoped>
.repeater-form {
  overflow: hidden;
  transition: .35s height;
}
</style>
