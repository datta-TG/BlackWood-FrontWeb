<template>
  <div>
    <div v-if="foliosDb.length > 0">
      <h5 class="mb-2">
        Current Folios in the Data Base
      </h5>
      <b-list-group flush>
        <b-list-group-item
          v-for="folio in foliosDb"
          :key="folio.folio"
        >
          {{ folio.folio }}
        </b-list-group-item>
      </b-list-group>
    </div>

    <h5 class="my-2">
      New Folios
    </h5>
    <!-- Row Loop -->
    <b-row
      v-for="(folio, index) in folios"
      :key="folio.id"
      ref="row"
    >

      <!-- Item Folio -->
      <b-col md="6">
        <b-form-group
          label="Folio"
          label-for="folio"
        >
          <v-select
            v-model="folio.folio"
            class="w-100"
            placeholder="Folio"
            :filterable="false"
            :options="folioOptions"
            @search="onSearch"
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
          :disabled="folios.length == 0"
          @click="update"
        >
          Submit
        </b-button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import {
  BFormGroup, BRow, BCol, BButton, BListGroup, BListGroupItem,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import services from '@/plugins/services/import-tool'
import vSelect from 'vue-select'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
  components: {
    BRow,
    BCol,
    BButton,
    BFormGroup,
    BListGroup,
    BListGroupItem,
    vSelect,
  },
  directives: {
    Ripple,
  },
  props: {
    coreIndicator: {
      type: String,
      default: '',
    },
    core: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      folioOptions: [],
      folios: [],
      nextTodoId: 0,
    }
  },
  computed: {
    foliosDb() {
      return this.core?.properties ? this.core.properties : []
    },
  },
  methods: {
    onSearch(search, loading) {
      if (search.length) {
        loading(true)
        this.getFolios(loading, search)
      }
    },
    getFolios(loading, search) {
      services.foliosMatch(search).then(res => {
        if (res.status === 200) {
          // eslint-disable-next-line no-param-reassign
          this.folioOptions = res.data.folios
        }
        loading(false)
      })
    },
    addFolio() {
      this.folioOptions = []
      this.folios.push({
        id: this.nextTodoId += 1,
        folio: '',
      })
    },
    removefolio(index) {
      this.folios.splice(index, 1)
    },
    update() {
      const newFolios = [...this.folios].map(folio => folio.folio).filter(folio => folio !== '')

      const data = {
        id: this.core.id,
        properties: newFolios,
      }

      this.$swal({
        title: 'Are you sure?',
        text: 'You will update the data!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, update it!',
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-primary ml-1',
        },
        buttonsStyling: false,
      }).then(result => {
        if (result.value) {
          services.updateFoliosCoreIndicator(this.coreIndicator, data)
            .then(() => {
              this.$toast({
                component: ToastificationContent,
                props: {
                  title: 'Complete',
                  icon: 'BellIcon',
                  text: 'Updated Finished Successfully. ⭐️',
                  variant: 'success',
                },
              })
              this.$emit('close')
              this.$emit('reload')
            })
        }
      })
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
