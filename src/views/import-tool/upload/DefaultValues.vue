<template>
  <div>
    <div>
      <b-form
        ref="form"
        :style="{height: trHeight}"
        class="repeater-form"
        @submit.prevent="repeateAgain"
      >

        <!-- Row Loop -->
        <b-row
          v-for="(item, index) in items"
          :id="item.id"
          :key="item.id"
          ref="row"
          class="row-input"
        >

          <!-- Name -->
          <b-col md="4">
            <b-form-group
              label="Select Field"
              label-for="name"
            >
              <v-select
                id="name"
                v-model="item.schema_column"
                class="style-chooser"
                label="name"
                placeholder="Select Field To Import"
                :options="fileSchemaColumns"
                :selectable="(option) => !option.selected"
                @input="reviewFileSchemaColumn"
              >
                <template v-slot:option="option">
                  {{ option.name }}
                  <span
                    v-if="option.required"
                    class="text-danger"
                  >
                    *
                  </span>
                </template>
              </v-select>
            </b-form-group>
          </b-col>

          <!-- Value -->
          <b-col md="4">
            <b-form-group
              label="Value"
              label-for="value"
            >
              <div>
                <b-form-datepicker
                  v-if="item.schema_column?item.schema_column.type === 'date':false"
                  v-model="item.default_value"
                  class="input-table form-control no-border w-full"
                />
                <input
                  v-else
                  id="value"
                  v-model="item.default_value"
                  type="text"
                  placeholder="Replace Empty Values"
                  class="input-table form-control no-border w-full"
                >
              </div>
            </b-form-group>
          </b-col>

          <!-- Remove Button -->
          <b-col
            lg="4"
            md="4"
            class="mb-50"
          >
            <b-button
              v-ripple.400="'rgba(234, 84, 85, 0.15)'"
              variant="outline-danger"
              class="mt-0 mt-md-2"
              @click="removeItem(index)"
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

      </b-form>
    </div>
    <b-button
      v-ripple.400="'rgba(255, 255, 255, 0.15)'"
      variant="primary"
      @click="repeateAgain"
    >
      <feather-icon
        icon="PlusIcon"
        class="mr-25"
      />
      <span>Add New</span>
    </b-button>
  </div>
</template>

<script>
import {
  BForm, BFormGroup, BRow, BCol, BButton, BFormDatepicker,
} from 'bootstrap-vue'
import { heightTransition } from '@core/mixins/ui/transition'
import Ripple from 'vue-ripple-directive'
import vSelect from 'vue-select'

export default {
  components: {
    BForm,
    BRow,
    BCol,
    BButton,
    BFormGroup,
    vSelect,
    BFormDatepicker,
  },
  directives: {
    Ripple,
  },
  mixins: [heightTransition],
  props: {
    fileSchemaColumns: {
      type: Array,
      required: true,
      default() {
        return []
      },
    },
    defaultSchemaColumns: {
      type: Array,
      default() {
        return []
      },
    },
    schemaExtraColumns: {
      type: Array,
      required: true,
      default() {
        return []
      },
    },
  },
  data() {
    return {
      items: this.schemaExtraColumns,
      nextTodoId: 1,
    }
  },
  watch: {
    items() {
      this.idForFileSchema()
      this.$emit('update:schemaExtraColumns', this.items)
    },
  },
  mounted() {
    this.initTrHeight()
  },
  created() {
    window.addEventListener('resize', this.initTrHeight)
  },
  destroyed() {
    window.removeEventListener('resize', this.initTrHeight)
  },
  methods: {
    idForFileSchema() {
      this.items.forEach(item => {
        if (item.schema_column !== null) {
          // eslint-disable-next-line no-param-reassign
          item.schema_column_id = item.schema_column.id
        }
      })
    },
    reviewFileSchemaColumn() {
      this.idForFileSchema()
      const defaultSchemaColumns = []
      this.items.forEach(element => {
        if (element.schema_column_id) {
          defaultSchemaColumns.push(element.schema_column_id)
        }
      })
      this.$emit('update:defaultSchemaColumns', defaultSchemaColumns)
    },
    repeateAgain() {
      this.items.push({
        id: this.nextTodoId += this.nextTodoId,
        schema_column_id: null,
        schema_column: null,
        default_value: null,
      })

      this.$nextTick(() => {
        this.trAddHeight(this.$refs.row[0].offsetHeight)
      })
    },
    removeItem(index) {
      this.items.splice(index, 1)
      this.trTrimHeight(this.$refs.row[0].offsetHeight)
    },
    initTrHeight() {
      this.trSetHeight(null)
      this.$nextTick(() => {
        this.trSetHeight(this.$refs.form.scrollHeight)
      })
    },
  },
}
</script>

<style>
.repeater-form {
  transition: .35s height;
}

.style-chooser .vs__search::placeholder,
.style-chooser .vs__dropdown-toggle,
.style-chooser .vs__dropdown-menu {
  z-index: 990;
}

</style>
