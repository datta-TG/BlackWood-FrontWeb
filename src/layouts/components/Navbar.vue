<template>
  <div class="navbar-container d-flex content align-items-center">

    <!-- Nav Menu Toggler -->
    <ul class="nav navbar-nav d-xl-none">
      <li class="nav-item">
        <b-link
          class="nav-link"
          @click="toggleVerticalMenuActive"
        >
          <feather-icon
            icon="MenuIcon"
            size="21"
          />
        </b-link>
      </li>
    </ul>

    <!-- Left Col -->
    <div class="bookmark-wrapper align-items-center flex-grow-1 d-none d-lg-flex">
      <dark-Toggler class="d-none d-lg-block" />
    </div>

    <b-navbar-nav class="nav align-items-center ml-auto">
      <b-nav-item-dropdown
        right
        toggle-class="d-flex align-items-center dropdown-user-link"
        class="dropdown-user"
      >
        <template #button-content>
          <div class="d-sm-flex d-none user-nav">
            <p class="user-name font-weight-bolder mb-0">
              {{ username }}
            </p>
            <span class="user-status">Admin</span>
          </div>
          <b-avatar
            size="40"
            variant="light-primary"
            :src="require('@/assets/images/avatars/13-small.png')"
            class="badge-minimal"
          />
        </template>

        <b-dropdown-item
          link-class="d-flex align-items-center"
          @click="signOut"
        >
          <feather-icon
            size="16"
            icon="LogOutIcon"
            class="mr-50"
          />
          <span>Logout</span>
        </b-dropdown-item>

        <b-dropdown-item
          v-b-toggle.sidebar-setting
          link-class="d-flex align-items-center"
        >
          <feather-icon
            size="16"
            icon="SettingsIcon"
            class="mr-50"
          />
          <span>Settings</span>
        </b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>
    <b-sidebar
      id="sidebar-setting"
      backdrop-variant="secondary"
      backdrop
      width="400px"
      right
      shadow
    >
      <template #default="{ hide }">
        <settings
          @close="hide"
        />
      </template>
    </b-sidebar>
  </div>
</template>

<script>
import {
  BLink, BNavbarNav, BNavItemDropdown, BDropdownItem, BAvatar, BSidebar, VBToggle,
} from 'bootstrap-vue'
import DarkToggler from '@core/layouts/components/app-navbar/components/DarkToggler.vue'
import { Auth } from 'aws-amplify'
import services from '@/plugins/services/import-tool'
import Settings from '@/components/Settings.vue'

export default {
  components: {
    BLink,
    BNavbarNav,
    BNavItemDropdown,
    BDropdownItem,
    BAvatar,
    BSidebar,

    // Navbar Components
    DarkToggler,
    Settings,
  },
  directives: {
    'b-toggle': VBToggle,
  },
  props: {
    toggleVerticalMenuActive: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      username: localStorage.getItem('username'),
    }
  },
  methods: {
    async  signOut() {
      try {
        if (localStorage.getItem('uploadFile')) {
          const file = JSON.parse(localStorage.getItem('uploadFile'))
          const data = {
            secret_security_key: file.secretSecurityKey,
          }
          services
            .abortUpload(file.importedFileId, data).then(() => {
              localStorage.removeItem('uploadFile')
            })
        }
        await Auth.signOut().then(() => {
        // Remove userData from localStorage
          localStorage.removeItem('userData')
          localStorage.removeItem('username')

          // Redirect to login page
          this.$router.push({ name: 'login' })
        })
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log('error signing out: ', error)
      }
    },
  },
}
</script>
