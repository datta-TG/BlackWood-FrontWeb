<template>
  <div>
    <!-- Filters -->
    <imported-files-filter
      :county-filter.sync="countyFilter"
      :file-type-filter.sync="fileTypeFilter"
      :file-type-options="fileTypeOptions"
      :county-options="countyOptions"
    />
    <b-card>
      <b-table
        responsive
        :items="items"
        :fields="fields"
        class="mb-2"
      >
        <template #cell(complete)="data">
          <b-badge
            pill
            :variant="data.value?'success':'warning'"
          >
            {{ data.value?'Complete':'Pending' }}
          </b-badge>
        </template>

        <template #cell(upload_date)="data">
          {{ data.value | formatDate }}
        </template>

        <!-- Column: Actions -->
        <template #cell(actions)="data">
          <div class="d-flex flex-row justify-content-center">
            <b-button
              variant="outline-primary"
              class="btn-icon"
              size="sm"
              @click="viewFile(data.item)"
            >
              <span class="align-middle">View</span>
            </b-button>
          </div>
        </template>

        <!-- Optional default data cell scoped slot -->
        <template #cell()="data">
          {{ data.value }}
        </template>
      </b-table>
      <b-row>
        <b-col cols="12">
          <!-- pagination -->
          <div class="d-flex justify-content-between flex-wrap">
            <div class="d-flex align-items-center mb-0">
              <span class="text-nowrap ">
                Show
              </span>
              <b-form-select
                v-model="perPage"
                :options="['10','15','20']"
                class="mx-1"
                @input="viewData"
              />
              <span class="text-nowrap"> entries </span>
            </div>
            <div>
              <b-pagination
                v-model="currentPage"
                :total-rows="totalRows"
                :per-page="perPage"
                align="right"
                size="md"
                class="my-0"
                @input="viewData"
              />
            </div>
          </div>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
import {
  BCard, BTable, BBadge, BRow, BCol, BPagination, BFormSelect, BButton,
} from 'bootstrap-vue'
import services from '@/plugins/services/import-tool'
import ImportedFilesFilter from './ImportedFilesFilter.vue'

export default {
  components: {
    BCard,
    BTable,
    BBadge,
    BRow,
    BCol,
    BPagination,
    BFormSelect,
    BButton,
    ImportedFilesFilter,
  },
  data() {
    return {
      fields: [
        'id',
        'file_name',
        {
          key: 'county_name', label: 'County',
        },
        {
          key: 'file_type_name', label: 'File Type',
        },
        'upload_date',
        'complete',
        'actions',
      ],
      items: [
        {
          id: 1,
          file_name: '2021_08_30_19_13_31-eviction_optimo.csv',
          upload_date: '2021-08-30T19:13:31.993487',
          complete: false,
          county_name: 'miami',
          file_type_name: 'eviction',
        },
      ],
      perPage: 10,
      totalRows: 1,
      currentPage: 1,
      fileTypeFilter: null,
      countyFilter: null,
      fileTypeOptions: [],
      countyOptions: [],
    }
  },
  watch: {
    countyFilter() {
      this.viewData()
    },
    fileTypeFilter() {
      this.viewData()
    },
  },
  async mounted() {
    await this.getCounties()
    await this.getFileTypes()
  },
  methods: {
    getCounties() {
      services.getCounties().then(res => {
        this.countyOptions = res
      })
    },
    getFileTypes() {
      services.getAllFileTypes().then(res => {
        this.fileTypeOptions = res
      })
    },
    viewData() {
      const pagination = {
        list_county_id: this.countyFilter,
        list_file_type_id: this.fileTypeFilter,
        skip: this.currentPageMapped,
        limit: this.perPageMapped,
      }
      services.viewImportedFiles(this.importedFileId, pagination).then(res => {
        this.totalRows = res.total_rows
        if (res.data) {
          this.items = res.data
        }
      })
    },
    viewFile(file) {
      localStorage.setItem('file', JSON.stringify(file))
      this.$router.push({ name: 'imported-file', params: { id: file.id } })
    },
  },
}
</script>

<style>

</style>
