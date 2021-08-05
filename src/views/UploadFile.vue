<template>
  <div>
    <b-card>
      <b-form @submit.prevent="uploadFile">
        <b-row>
          <b-col md="12">
            <b-form-group
              label="County"
              label-for="mc-county"
            >
              <v-select
                v-model="formFile.county"
                label="name"
                :reduce="(county) => county.id"
                placeholder="Select County"
                :options="countyOptions"
                @input="getFileTypes"
              />
            </b-form-group>
          </b-col>
          <b-col md="12">
            <b-form-group
              label="File Type"
              label-for="mc-file-tipe"
            >
              <v-select
                v-model="formFile.type"
                label="file_type_name"
                :reduce="(type) => type.file_schema_id"
                placeholder="File Type"
                :options="typeOptions"
              />
            </b-form-group>
          </b-col>
          <b-col md="12">
            <b-form-group
              label="File"
              label-for="mc-file"
            >
              <b-form-file
                v-model="formFile.file"
                :state="Boolean(formFile.file)"
                placeholder="Choose a file or drop it here..."
                drop-placeholder="Drop file here..."
              />
            </b-form-group>
          </b-col>

          <!-- submit and reset -->
          <b-col>
            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              type="submit"
              variant="primary"
              class="mr-1"
            >
              Submit
            </b-button>
            <b-button
              v-ripple.400="'rgba(186, 191, 199, 0.15)'"
              type="reset"
              variant="outline-secondary"
            >
              Reset
            </b-button>
          </b-col>
        </b-row>
      </b-form>
    </b-card>
    <b-card>
      <b-row>

        <!-- group 1 -->
        <b-col md="6">
          <h6 class="text-primary font-weight-bold mb-2">
            Columns in File Type
          </h6>

          <!-- draggable -->
          <draggable
            :list="list1"
            tag="ul"
            group="typeColumns"
            class="list-group list-group-flush cursor-move"
          >
            <b-list-group-item
              v-for="(listItem, index) in list1"
              :key="index"
              tag="li"
            >
              <div class="d-flex">
                <b-avatar :text="(index+1).toString()" />
                <div class="ml-25">
                  <b-card-text class="mb-0 font-weight-bold">
                    {{ listItem.text }}
                  </b-card-text>
                </div>
              </div>
            </b-list-group-item>
          </draggable>
        </b-col>

        <!-- group 2 -->
        <b-col
          md="6"
          class="mt-sm-2 mt-md-0"
        >
          <h6 class="text-primary font-weight-bold mb-2">
            Columns in File
          </h6>

          <!-- draggable -->
          <draggable
            :list="list2"
            tag="ul"
            group="fileColumns"
            class="list-group list-group-flush cursor-move"
          >
            <b-list-group-item
              v-for="(listItem, index) in list2"
              :key="index"
              tag="li"
            >
              <div class="d-flex">
                <b-avatar :text="(index+1).toString()" />
                <div class="ml-25">
                  <b-card-text class="mb-0 font-weight-bold">
                    {{ listItem.text }}
                  </b-card-text>
                </div>
              </div>
            </b-list-group-item>
          </draggable>
        </b-col>
        <b-col>
          <b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            type="Update"
            variant="primary"
            class="mr-1"
          >
            Update File
          </b-button>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
import {
  BCard, BRow, BCol, BFormGroup, BForm, BButton, BFormFile, BListGroupItem, BAvatar, BCardText,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import Ripple from 'vue-ripple-directive'
import draggable from 'vuedraggable'
import 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import services from '@/plugins/services/import-tool'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
  components: {
    BCard,
    BRow,
    BCardText,
    BCol,
    BFormGroup,
    BForm,
    BButton,
    BFormFile,
    vSelect,
    BListGroupItem,
    BAvatar,
    draggable,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      countyOptions: [],
      typeOptions: [],
      formFile: {
        county: null,
        type: null,
        file: null,
      },
      list1: [
        {
          text: 'Column 1',
        },
        {
          text: 'Column 2',
        },
        {
          text: 'Column 3',
        },
        {
          text: 'Column 4',
        },
      ],
      list2: [
        {
          text: 'Column 1',
        },
        {
          text: 'Column 4',
        },
        {
          text: 'Column 2',
        },
        {
          text: 'Column 3',
        },
        {
          text: 'Column 5',
        },
        {
          text: 'Column 6',
        },
      ],
    }
  },
  async mounted() {
    await this.getCounties()
  },
  methods: {
    getCounties() {
      services.getCounties().then(res => {
        console.log(res)
      })
    },
    getFileTypes() {
      if (this.county) {
        services.getFileTypes(this.county).then(res => {
          console.log(res)
        })
      } else {
        this.typeOptions = []
      }
    },
    uploadFile() {
      const config = {
        headers: { 'content-type': 'multipart/form-data' },
      }
      if (Boolean(this.formFile.file) && this.formFile.type) {
        const form = {
          fiel: this.formFile.file,
        }
        services.uploadFile(this.formFile.type, form, config).then(res => {
          console.log(res)
        })
      } else {
        this.$toast({
          component: ToastificationContent,
          props: {
            title: 'Warning',
            icon: 'BellIcon',
            text: 'Please fill up the form completely 🙏🏼.',
            variant: 'warning',
          },
        })
      }
    },
  },
}
</script>

<style lang="scss">

@import '@core/scss/vue/libs/vue-select.scss';

</style>
