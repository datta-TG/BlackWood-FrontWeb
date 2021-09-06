<template>
  <div>
    <b-card>
      <div v-if="uploading">
        <b-button
          v-ripple.400="'rgba(255, 255, 255, 0.15)'"
          type="button"
          variant="warning"
          class="mr-1"
          @click="discardFile"
        >
          Discard File
        </b-button>
      </div>
      <form-wizard
        ref="upload"
        color="#44A1C2"
        :title="null"
        :subtitle="null"
        shape="circle"
        finish-button-text="Finish"
        back-button-text="Previous"
        class="steps-transparent mb-3"
        @on-complete="finishUpload"
      >
        <tab-content
          title="Upload File"
          :before-change="uploadFile"
        >
          <b-form>
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

              <!--reset -->
              <b-col>
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
        </tab-content>
        <tab-content title="View Data">
          <b-row class="mb-1">
            <b-col cols="12">
              <b-table
                responsive
                bordered
                :items="itemsBase"
                :fields="fieldsBase"
                class="mb-2"
              >
                <!-- Optional default data cell scoped slot -->
                <template #cell()="data">
                  {{ data.value }}
                </template>
              </b-table>
            </b-col>
            <b-col cols="12">
              <!-- pagination -->
              <div class="d-flex justify-content-between flex-wrap">
                <div class="d-flex align-items-center mb-0">
                  <span class="text-nowrap ">
                    Show
                  </span>
                  <b-form-select
                    v-model="perPageBase"
                    :options="['10','15','20']"
                    class="mx-1"
                    @input="viewBaseFile"
                  />
                  <span class="text-nowrap"> entries </span>
                </div>
                <div>
                  <b-pagination
                    v-model="currentPageBase"
                    :total-rows="totalRowsBase"
                    :per-page="perPageBase"
                    align="right"
                    size="md"
                    class="my-0"
                    @input="viewBaseFile"
                  />
                </div>
              </div>
            </b-col>
          </b-row>
        </tab-content>
        <tab-content
          title="Map Columns"
          :before-change="validationMap"
        >
          <div v-if="uploadMap">
            <draggable
              :group="{ name: 'unknownColumns', put: true, pull: false }"
              ghost-class="display-none"
              draggable=".draggable"
              class="my-8 mx-12 h-10"
            />
            <b-row class="mb-2">
              <b-col md="6">
                <h6 class="text-primary font-weight-bold mb-2">
                  Uknown Columns in File
                </h6>
                <!-- draggable -->
                <draggable
                  :list="unknownColumns"
                  tag="ul"
                  :group="{ name: 'unknownColumns', put: false }"
                  class="list-group list-group-flush cursor-move"
                >
                  <b-list-group-item
                    v-for="(listItem, index) in unknownColumns"
                    :key="index"
                    tag="li"
                  >
                    <div class="d-flex">
                      <b-avatar
                        variant="info"
                        :text="(index + 1).toString()"
                      />
                      <div class="ml-25">
                        <b-card-text class="mb-0 font-weight-bold">
                          {{ listItem.text }}
                        </b-card-text>
                      </div>
                    </div>
                  </b-list-group-item>
                </draggable>
              </b-col>
              <b-col md="6">
                <h6 class="text-primary font-weight-bold mb-2">
                  keep
                </h6>
                <!-- draggable -->
                <draggable
                  :list="keepColumns"
                  tag="ul"
                  group="unknownColumns"
                  class="list-group list-group-flush cursor-move"
                >
                  <b-list-group-item
                    v-for="(listItem, index) in keepColumns"
                    :key="index"
                    tag="li"
                  >
                    <div class="d-flex">
                      <b-avatar
                        variant="info"
                        :text="(index + 1).toString()"
                      />
                      <div class="ml-25">
                        <b-card-text class="mb-0 font-weight-bold">
                          {{ listItem.text }}
                        </b-card-text>
                      </div>
                    </div>
                  </b-list-group-item>
                </draggable>
              </b-col>
            </b-row>
            <b-row
              v-if="!onlyVerifyUnknown"
              class="mb-2"
            >
              <b-col md="6">
                <h6 class="text-primary font-weight-bold mb-2">
                  Missing Columns in File Type
                </h6>

                <!-- draggable -->
                <draggable
                  :list="missingColumns"
                  tag="ul"
                  :group="{ name: 'unknownColumns', pull: 'clone', put: false }"
                  class="list-group list-group-flush cursor-move"
                >
                  <b-list-group-item
                    v-for="(listItem, index) in missingColumns"
                    :key="index"
                    tag="li"
                  >
                    <div class="d-flex">
                      <b-avatar
                        variant="danger"
                        :text="(index + 1).toString()"
                      />
                      <div class="ml-25">
                        <b-card-text class="mb-0 font-weight-bold">
                          {{ listItem.text }}
                        </b-card-text>
                      </div>
                    </div>
                  </b-list-group-item>
                </draggable>
              </b-col>
              <b-col
                md="6"
                class="mt-sm-2 mt-md-0"
              >
                <h6 class="text-primary font-weight-bold mb-2">
                  Assing Missing Columns
                </h6>

                <!-- draggable -->
                <draggable
                  :list="missingColumnsAssing"
                  tag="ul"
                  group="unknownColumns"
                  class="list-group list-group-flush cursor-move"
                >
                  <b-list-group-item
                    v-for="(listItem, index) in missingColumnsAssing"
                    :key="index"
                    tag="li"
                  >
                    <div class="d-flex">
                      <b-avatar
                        variant="info"
                        :text="(index + 1).toString()"
                      />
                      <div class="ml-25">
                        <b-card-text class="mb-0 font-weight-bold">
                          {{ listItem.text }}
                        </b-card-text>
                      </div>
                    </div>
                  </b-list-group-item>
                </draggable>
              </b-col>
            </b-row>
            <b-row
              v-if="!onlyVerifyUnknown"
              class="mb-2"
            >
              <b-col md="6">
                <h6 class="text-primary font-weight-bold mb-2">
                  Missing Key Columns in File Type
                </h6>

                <!-- draggable -->
                <draggable
                  :list="missingKeyColumns"
                  tag="ul"
                  :group="{ name: 'unknownColumns', pull: 'clone', put: false }"
                  class="list-group list-group-flush cursor-move"
                >
                  <b-list-group-item
                    v-for="(listItem, index) in missingKeyColumns"
                    :key="index"
                    tag="li"
                  >
                    <div class="d-flex">
                      <b-avatar
                        variant="warning"
                        :text="(index + 1).toString()"
                      />
                      <div class="ml-25">
                        <b-card-text class="mb-0 font-weight-bold">
                          {{ listItem.text }}
                        </b-card-text>
                      </div>
                    </div>
                  </b-list-group-item>
                </draggable>
              </b-col>
              <b-col
                md="6"
                class="mt-sm-2 mt-md-0"
              >
                <h6 class="text-primary font-weight-bold mb-2">
                  Assing Missing Key Columns
                </h6>

                <!-- draggable -->
                <draggable
                  :list="missingKeyColumnsAssing"
                  tag="ul"
                  group="unknownColumns"
                  class="list-group list-group-flush cursor-move"
                >
                  <b-list-group-item
                    v-for="(listItem, index) in missingKeyColumnsAssing"
                    :key="index"
                    tag="li"
                  >
                    <div class="d-flex">
                      <b-avatar
                        variant="info"
                        :text="(index + 1).toString()"
                      />
                      <div class="ml-25">
                        <b-card-text class="mb-0 font-weight-bold">
                          {{ listItem.text }}
                        </b-card-text>
                      </div>
                    </div>
                  </b-list-group-item>
                </draggable>
              </b-col>
            </b-row>
            <!-- submit and reset -->
            <div>
              <b-button
                v-ripple.400="'rgba(186, 191, 199, 0.15)'"
                type="reset"
                variant="outline-secondary"
                @click="loadColumns"
              >
                Reload Columns
              </b-button>
            </div>
          </div>
          <div v-else>
            <!-- success -->
            <b-alert
              variant="success"
              show
            >
              <h4 class="alert-heading">
                Success
              </h4>
              <div class="alert-body">
                <span>File Uploades Successfully.</span>
              </div>
            </b-alert>
          </div>
        </tab-content>
        <tab-content
          title="Preview Data | Finish"
        >
          <b-row class="mb-1">
            <b-col cols="12">
              <b-table
                responsive
                bordered
                :items="itemsMapped"
                :fields="fieldsMapped"
                class="mb-2"
              >
                <!-- Optional default data cell scoped slot -->
                <template #cell()="data">
                  {{ data.value }}
                </template>
              </b-table>
            </b-col>
            <b-col cols="12">
              <!-- pagination -->
              <div class="d-flex justify-content-between flex-wrap">
                <div class="d-flex align-items-center mb-0">
                  <span class="text-nowrap ">
                    Show
                  </span>
                  <b-form-select
                    v-model="perPageMapped"
                    :options="['10','15','20']"
                    class="mx-1"
                    @input="viewMappedFile"
                  />
                  <span class="text-nowrap"> entries </span>
                </div>
                <div>
                  <b-pagination
                    v-model="currentPageMapped"
                    :total-rows="totalRowsMapped"
                    :per-page="perPageMapped"
                    align="right"
                    size="md"
                    class="my-0"
                    @input="viewMappedFile"
                  />
                </div>
              </div>
            </b-col>
          </b-row>
        </tab-content>
      </form-wizard>
    </b-card>
  </div>
</template>

<script>
import {
  BCard,
  BRow,
  BCol,
  BFormGroup,
  BForm,
  BButton,
  BFormFile,
  BListGroupItem,
  BAvatar,
  BCardText,
  BAlert,
  BTable,
  BPagination,
  BFormSelect,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import Ripple from 'vue-ripple-directive'
import draggable from 'vuedraggable'
import { FormWizard, TabContent } from 'vue-form-wizard'
import 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import services from '@/plugins/services/import-tool'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'

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
    FormWizard,
    TabContent,
    BAlert,
    BTable,
    BPagination,
    BFormSelect,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      uploading: false,
      countyOptions: [],
      typeOptions: [],
      formFile: {
        county: null,
        type: null,
        file: null,
      },
      importedFileId: null,
      secretSecurityKey: null,
      onlyVerifyUnknown: false,
      columnsData: null,
      uploadMap: false,
      perPageBase: 10,
      totalRowsBase: 1,
      currentPageBase: 1,
      fieldsBase: [],
      itemsBase: [],
      unknownColumns: [],
      missingColumns: [],
      missingColumnsAssing: [],
      missingKeyColumns: [],
      missingKeyColumnsAssing: [],
      keepColumns: [],
      perPageMapped: 10,
      totalRowsMapped: 1,
      currentPageMapped: 1,
      fieldsMapped: [],
      itemsMapped: [],
    }
  },
  async mounted() {
    await this.getCounties()
  },
  methods: {
    getCounties() {
      services.getCounties().then(res => {
        this.countyOptions = res
      })
    },
    getFileTypes() {
      if (this.formFile.county) {
        services.getFileTypes(this.formFile.county).then(res => {
          this.typeOptions = res
        })
      } else {
        this.typeOptions = []
      }
    },
    uploadFile() {
      return new Promise((resolve, reject) => {
        if (Boolean(this.formFile.file) && this.formFile.type) {
          const formData = new FormData()
          formData.append('file', this.formFile.file)
          services
            .uploadFile(this.formFile.type, formData)
            .then(res => {
              this.uploading = true
              if (res.status === 201) {
                this.uploadMap = false
              } else if (res.status === 206) {
                this.uploadMap = true
                const { data } = res
                this.secretSecurityKey = data.secret_security_key
                this.onlyVerifyUnknown = data.only_verify_unknown
                this.importedFileId = data.imported_file_id
                this.columnsData = data
                this.viewBaseFile()
                this.loadColumns()
              }
              resolve(true)
            })
            .catch(err => {
              // eslint-disable-next-line no-console
              console.log(err)
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
          reject()
        }
      })
    },
    viewBaseFile() {
      const pagination = {
        base: true,
        skip: this.currentPageBase,
        limit: this.perPageBase,
      }
      services.viewFile(this.importedFileId, pagination).then(res => {
        if (res.status === 200) {
          this.totalRowsBase = res.data.total_rows
          if (res.data.data?.schema?.fields) {
            this.fieldsBase = res.data.data.schema.fields.map(field => field.name)
            this.itemsBase = res.data.data.data
          }
        }
      })
    },
    loadColumns() {
      const { missing_columns, missing_key_columns, unknown_columns } = this.columnsData
      this.missingColumns = missing_columns.map(item => {
        const column = { text: item, map: false }
        return column
      })
      this.missingKeyColumns = missing_key_columns.map(item => {
        const column = { text: item, map: false }
        return column
      })
      this.unknownColumns = unknown_columns.map(item => {
        const column = { text: item, map: true }
        return column
      })
    },
    validationMap() {
      return new Promise((resolve, reject) => {
        if (
          this.missingColumns.length !== this.missingColumnsAssing.length
          || this.missingKeyColumns.length !== this.missingKeyColumnsAssing.length
        ) {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Warning',
              icon: 'BellIcon',
              text: 'Please complete the missing columns 🙏🏼.',
              variant: 'warning',
            },
          })
          reject()
        } else {
          resolve(true)
          const mapData = {
            secret_security_key: this.secretSecurityKey,
            extra_columns: [],
            columns: [],
          }

          this.keepColumns.forEach(element => {
            mapData.extra_columns.push(element.text)
          })

          this.missingColumns.forEach((element, index) => {
            mapData.columns.push({
              missing_column: element.text,
              unknown_column: this.missingColumnsAssing[index].text,
              map: this.missingColumnsAssing[index].map,
            })
          })

          this.missingKeyColumns.forEach((element, index) => {
            mapData.columns.push({
              missing_column: element.text,
              unknown_column: this.missingKeyColumnsAssing[index].text,
              map: this.missingKeyColumnsAssing[index].map,
            })
          })
          this.mapColumns(mapData)
        }
      })
    },
    mapColumns(mapData) {
      if (this.uploadMap) {
        services
          .mapColumns(this.importedFileId, mapData)
          .then(() => {
            this.viewMappedFile()
            this.$toast({
              component: ToastificationContent,
              props: {
                title: 'Completed',
                icon: 'BellIcon',
                text: 'Mapped Complete.',
                variant: 'success',
              },
            })
          })
      }
    },
    viewMappedFile() {
      const pagination = {
        base: false,
        skip: this.currentPageMapped,
        limit: this.perPageMapped,
      }
      services.viewFile(this.importedFileId, pagination).then(res => {
        if (res.status === 200) {
          this.totalRows = res.data.total_rows
          if (res.data?.data?.schema?.fields) {
            this.fieldsMapped = res.data.data.schema.fields.map(field => field.name)
            this.itemsMapped = res.data.data.data
          }
        }
      })
    },
    finishUpload() {
      this.$swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, finish it!',
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-primary ml-1',
        },
        buttonsStyling: false,
      }).then(result => {
        if (result.value) {
          const data = {
            secret_security_key: this.secretSecurityKey,
          }
          services
            .commitUpload(this.importedFileId, data)
            .then(() => {
              this.$toast({
                component: ToastificationContent,
                props: {
                  title: 'Completado',
                  icon: 'BellIcon',
                  text: 'Upload Finished Successfully. ⭐️',
                  variant: 'success',
                },
              })
              this.$refs.upload.reset()
              this.clearFormWizard()
            })
        }
      })
    },
    discardFile() {
      this.$swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        customClass: {
          confirmButton: 'btn btn-danger',
          cancelButton: 'btn btn-primary ml-1',
        },
        buttonsStyling: false,
      }).then(result => {
        if (result.value) {
          const data = {
            secret_security_key: this.secretSecurityKey,
          }
          services
            .abortUpload(this.importedFileId, data).then(() => this.clearFormWizard())
        }
      })
    },
    clearFormWizard() {
      this.uploading = false
      this.typeOptions = []
      this.formFile = {
        county: null,
        type: null,
        file: null,
      }
      this.importedFileId = null
      this.secretSecurityKey = null
      this.onlyVerifyUnknown = false
      this.columnsData = null
      this.uploadMap = false
      this.perPageBase = 10
      this.totalRowsBase = 1
      this.currentPageBase = 1
      this.fieldsBase = []
      this.itemsBase = []
      this.unknownColumns = []
      this.missingColumns = []
      this.missingColumnsAssing = []
      this.missingKeyColumns = []
      this.missingKeyColumnsAssing = []
      this.keepColumns = []
      this.perPageMapped = 10
      this.totalRowsMapped = 1
      this.currentPageMapped = 1
      this.fieldsMapped = []
      this.itemsMapped = []
    },
  },
}
</script>

<style lang="scss">
@import "@core/scss/vue/libs/vue-select.scss";
</style>
