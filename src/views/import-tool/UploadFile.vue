<template>
  <div>
    <b-card class="relative">
      <b-spinner
        v-if="loading"
        label="Loading..."
        class="mb-1 loading"
        variant="primary"
      />
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
                show-empty
                empty-text="No records found"
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
            <b-tabs
              pills
              align="left"
            >
              <b-tab
                title="Fields Mapping"
                active
              >
                <b-table
                  :items="itemsMap"
                  :fields="fieldsMap"
                  class="mb-0"
                >
                  <template #cell(file_schema_column)="data">
                    <v-select
                      v-model="data.item.file_schema_column"
                      placeholder="Select Field To Import"
                      label="name"
                      :options="fileSchemaColumns"
                      :selectable="(option) => !option.selected"
                      @input="reviewFileSchemaColumn"
                    >
                      <template v-slot:option="option">
                        {{ option.name }}
                        <span
                          v-if="option.is_required"
                          class="text-danger"
                        >
                          *
                        </span>
                      </template>
                    </v-select>
                  </template>

                  <template #cell(default_value)="data">
                    <input
                      v-model="data.item.default_value"
                      type="text"
                      placeholder="Replace Empty Values"
                      class="input-table form-control no-border w-full"
                    >
                  </template>

                  <template #cell(type)="data">
                    <span class="text-nowrap">
                      {{ data.item.file_schema_column?data.item.file_schema_column.type:'' }}
                    </span>
                  </template>

                  <!-- Optional default data cell scoped slot -->
                  <template #cell()="data">
                    {{ data.value }}
                  </template>
                </b-table>
              </b-tab>
              <b-tab title="Assign Default Value">
                <default-values
                  :file-schema-columns.sync="fileSchemaColumns"
                  :default-schema-columns.sync="defaultSchemaColumns"
                  :schema-extra-columns.sync="schemaExtraColumns"
                />
              </b-tab>
            </b-tabs>
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
                <span>File Uploaded Successfully.</span>
              </div>
            </b-alert>
          </div>
        </tab-content>
        <tab-content
          title="Preview Data | Finish"
        >
          <preview-data-filter
            :tags-filter.sync="tagsFilter"
            :tags-options="tagsOptions"
          />
          <b-row class="mb-1">
            <b-col
              cols="12"
              class="mb-2"
            >
              <div>
                <b-card-text class="mb-25">
                  <b>Total:</b> {{ metaInsights.total }}
                </b-card-text>
                <b-card-text class="mb-25">
                  <b>Skip:</b> {{ metaInsights.skip }}
                </b-card-text>
                <b-card-text class="mb-25">
                  <b>Update:</b> {{ metaInsights.update }}
                </b-card-text>
                <b-card-text class="mb-25">
                  <b>Review:</b> {{ metaInsights.review }}
                </b-card-text>
                <b-card-text class="mb-25">
                  <b>New:</b> {{ metaInsights.new }}
                </b-card-text>
              </div>
            </b-col>
            <b-col cols="12">
              <b-table
                responsive
                bordered
                :items="itemsMapped"
                :fields="fieldsMapped"
                class="mb-2"
                show-empty
                empty-text="No records found"
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
  BAlert,
  BTable,
  BPagination,
  BFormSelect,
  BSpinner,
  BTabs,
  BTab,
  BCardText,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import Ripple from 'vue-ripple-directive'
import { FormWizard, TabContent } from 'vue-form-wizard'
import 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import services from '@/plugins/services/import-tool'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
import DefaultValues from './upload/DefaultValues.vue'
import PreviewDataFilter from './upload/PreviewDataFilter.vue'

export default {
  components: {
    BCard,
    BRow,
    BCol,
    BFormGroup,
    BForm,
    BButton,
    BFormFile,
    vSelect,
    FormWizard,
    TabContent,
    BAlert,
    BTable,
    BPagination,
    BFormSelect,
    BSpinner,
    BTabs,
    BTab,
    BCardText,
    DefaultValues,
    PreviewDataFilter,
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
      loading: false,
      importedFileId: null,
      columnsData: null,
      uploadMap: false,
      perPageBase: 10,
      totalRowsBase: 1,
      currentPageBase: 1,
      fieldsBase: [],
      itemsBase: [],
      fieldsMap: [
        {
          key: 'file_column_name', label: 'Fields in File',
        },
        {
          key: 'file_schema_column', label: 'Fields in Database',
        },
        {
          key: 'default_value', label: 'Default Value',
        },
        {
          key: 'type', label: 'Type',
        },
        {
          key: 'first_sample', label: 'First Sample',
        },
        {
          key: 'second_sample', label: 'Second Sample',
        },
      ],
      itemsMap: [],
      fileSchemaColumns: [],
      defaultSchemaColumns: [],
      schemaExtraColumns: [],
      metaInsights: {},
      perPageMapped: 10,
      totalRowsMapped: 1,
      currentPageMapped: 1,
      tagsFilter: [],
      tagsOptions: [],
      fieldsMapped: [],
      itemsMapped: [],
    }
  },
  watch: {
    tagsFilter() {
      this.viewMappedFile()
    },
    defaultSchemaColumns() {
      this.reviewFileSchemaColumn()
    },
  },
  async mounted() {
    await this.getCounties()
    if (localStorage.getItem('uploadFile')) {
      const file = JSON.parse(localStorage.getItem('uploadFile'))
      services
        .abortUpload(file.importedFileId).then(() => {
          localStorage.removeItem('uploadFile')
          this.clearFormWizard()
        })
    }
  },
  beforeRouteLeave(to, from, next) {
    if (localStorage.getItem('uploadFile') && to.name !== 'login') {
      this.$swal({
        title: 'Are you sure?',
        text: 'If you leave the file will be deleted!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, leave it!',
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-secondary ml-1',
        },
        buttonsStyling: false,
      }).then(result => {
        if (result.value) {
          services
            .abortUpload(this.importedFileId).then(() => {
              next()
              localStorage.removeItem('uploadFile')
            })
        } else {
          next(false)
        }
      })
    } else {
      next()
    }
  },
  methods: {
    getTags() {
      services.getTags().then(res => {
        if (res.status === 200) {
          this.tagsOptions = res.data.tags.map(tag => ({
            name: tag, value: tag,
          }))
        }
      })
    },
    reviewFileSchemaColumn() {
      const fileSchemaColumns = []
      this.itemsMap.forEach(element => {
        if (element.file_schema_column) {
          fileSchemaColumns.push(element.file_schema_column.id)
        }
      })
      this.defaultSchemaColumns.forEach(element => {
        fileSchemaColumns.push(element)
      })
      this.fileSchemaColumns.forEach(element => {
        // eslint-disable-next-line no-param-reassign
        element.selected = fileSchemaColumns.includes(element.id)
      })
    },
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
          this.loading = true
          const formData = new FormData()
          formData.append('file', this.formFile.file)
          services
            .uploadFile(this.formFile.type, formData)
            .then(res => {
              this.loading = false
              this.uploading = true
              if (res.status === 201) {
                this.uploadMap = true
                const { data } = res.data
                this.importedFileId = data.imported_file_id
                this.columnsData = data
                localStorage.setItem('uploadFile', JSON.stringify(
                  { importedFileId: this.importedFileId },
                ))
                this.viewBaseFile()
                this.loadColumns()
              } else if (res.status === 400) {
                this.$toast({
                  component: ToastificationContent,
                  props: {
                    title: 'Error',
                    icon: 'BellIcon',
                    text: 'Something was wrong. ❌',
                    variant: 'danger',
                  },
                })
              }
              resolve(true)
            })
            .catch(() => {
              this.loading = false
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
      this.loading = true
      const pagination = {
        base: true,
        skip: this.currentPageBase - 1,
        limit: this.perPageBase,
      }
      services.viewFile(this.importedFileId, pagination).then(res => {
        this.loading = false
        if (res.status === 200) {
          this.totalRowsBase = res.data.total_rows
          if (res.data.data?.schema?.fields) {
            this.fieldsBase = res.data.data.schema.fields.map(field => field.name)
            this.itemsBase = res.data.data.data
          }
        }
      }).catch(() => {
        this.loading = false
      })
    },
    loadColumns() {
      const sampleData = this.columnsData.sample.data
      this.itemsMap = this.columnsData.mapping_data.file_columns_names.map(element => ({
        file_column_name: element, file_schema_column: null, default_value: null, first_sample: sampleData[0][element], second_sample: sampleData[1][element],
      }))
      this.fileSchemaColumns = this.columnsData.mapping_data.file_schema_columns.map(obj => ({ ...obj, selected: false }))
    },
    validationMap() {
      return new Promise((resolve, reject) => {
        this.fileSchemaColumns.forEach(element => {
          if (element.required && !element.selected) {
            this.$toast({
              component: ToastificationContent,
              props: {
                title: 'Error',
                icon: 'BellIcon',
                text: 'Required Schema Column is not mapped. ❌',
                variant: 'danger',
              },
            })
            reject()
          }
        })
        const mapData = {
          map_columns: [],
          file_extra_columns: [],
          schema_extra_columns: [],
        }
        this.itemsMap.filter(item => item.file_schema_column !== null).forEach(element => {
          mapData.map_columns.push(
            {
              file_column_name: element.file_column_name,
              file_schema_column_id: element.file_schema_column.id,
              default_value: element.default_value,
            },
          )
        })
        this.schemaExtraColumns.forEach(element => {
          mapData.schema_extra_columns.push(
            {
              schema_column_id: element.schema_column_id,
              default_value: element.default_value,
            },
          )
        })
        this.mapColumns(mapData)
        resolve(true)
      })
    },
    mapColumns(mapData) {
      this.loading = true
      if (this.uploadMap) {
        services
          .mapColumns(this.importedFileId, mapData)
          .then(response => {
            this.metaInsights = response.data.meta_insights
            this.loading = false
            this.getTags()
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
          }).catch(() => {
            this.loading = false
          })
      }
    },
    viewMappedFile() {
      this.loading = true
      const pagination = {
        base: !this.uploadMap,
        skip: this.currentPageMapped - 1,
        limit: this.perPageMapped,
        tags: this.tagsFilter,
      }
      services.viewFile(this.importedFileId, pagination).then(res => {
        this.loading = false
        if (res.status === 200) {
          this.totalRowsMapped = res.data.total_rows
          if (res.data?.data?.schema?.fields) {
            this.fieldsMapped = res.data.data.schema.fields.map(field => field.name).filter(field => !['__skipped__', '__updated__', '__added__'].includes(field))
            this.itemsMapped = res.data.data.data
          }
        }
      }).catch(() => {
        this.loading = false
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
        this.loading = true
        if (result.value) {
          services
            .commitUpload(this.importedFileId)
            .then(() => {
              this.loading = false
              this.$toast({
                component: ToastificationContent,
                props: {
                  title: 'Complete',
                  icon: 'BellIcon',
                  text: 'Upload Finished Successfully. ⭐️',
                  variant: 'success',
                },
              })
              this.clearFormWizard()
            }).catch(() => {
              this.loading = false
            })
        } else {
          this.loading = false
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
          services
            .abortUpload(this.importedFileId).then(() => this.clearFormWizard())
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
      this.$refs.upload.reset()
      localStorage.removeItem('uploadFile')
    },
  },
}
</script>

<style lang="scss">
@import "@core/scss/vue/libs/vue-select.scss";
.list-group {
  height: 100%;
}

.loading {
  position: absolute;
  top: 1em;
}

</style>
