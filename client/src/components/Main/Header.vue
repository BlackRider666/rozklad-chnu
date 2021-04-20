<template>
  <div>
    <div class="d-sm-none d-flex">
      <v-toolbar dense :style="{'zIndex': '100'}">
        <template v-if="Object.keys(user).length">
          <v-app-bar-nav-icon @click="triggerMobileMenu"></v-app-bar-nav-icon>
        </template>
        <v-img :style="{'zIndex': '101'}"
               v-else
               @click="$router.push({name: 'home'})" src="../../assets/logo.svg" max-width="160"></v-img>
        <v-spacer></v-spacer>
        <template v-if="Object.keys(user).length">
          <div class="d-flex align-center">
            <v-img max-height="42px" max-width="42px" :src="user.avatar_url"></v-img>
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <div
                    v-bind="attrs"
                    v-on="on"
                    class="text-capitalize d-inline _fs-14px font-weight-bold ml-3">
                  {{ $i18n.locale }}
                  <v-icon color="black">mdi-chevron-down</v-icon>
                </div>
              </template>
              <v-list>
                <v-list-item
                    v-for="(item, index) in $i18n.availableLocales"
                    :key="index"
                >
                  <v-list-item-title @click="$i18n.locale = item" class="text-capitalize">{{ item }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
        </template>
        <v-app-bar-nav-icon v-else @click="triggerMobileMenu"></v-app-bar-nav-icon>
      </v-toolbar>
      <v-navigation-drawer
          v-model="mobileDrawer"
          width="100vw"
          height="100vh"
          :style="{'top': '48px'}"
      >
        <v-list v-if="user.roles.includes('Coach')">
          <v-list-item-group class="d-flex _XS_fc">
            <div v-for="(item, index) in mobileMenuCoach" :key="index">
              <template>
                <v-list-item :to="item.to" active-class="menu__item-active">
                  <v-list-item-content >
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </template>
            </div>
          </v-list-item-group>
        </v-list>
        <v-list v-else>
          <v-list-item-group class="d-flex _XS_fc">
            <div v-for="(item, index) in mobileMenuStudent" :key="index">
              <template v-if="'to' in item">
                <v-list-item :to="item.to" active-class="menu__item-active">
                  <v-list-item-content >
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </template>
              <template v-else>
                <v-list-item @click="goToTab(item)" active-class="menu__item-active">
                  <v-list-item-content >
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </template>
            </div>
          </v-list-item-group>
        </v-list>
        <template v-slot:append>
          <div class="header__btns-auth mobile" v-if="Object.keys(user).length">
            <div>
              <v-btn text color="primary" @click="editProfile">Edit Profile</v-btn>
            </div>
            <div>
              <v-btn outlined color="primary" class="mx-5" @click="logout">Logout</v-btn>
            </div>
          </div>
          <div v-else class="header__btns-auth mobile">
            <div>
              <v-btn text color="primary" :to="{ name: 'login' }">Log in</v-btn>
            </div>
            <div>
              <v-btn outlined color="primary" class="mx-5" :to="{ name: 'register' }">Sign up</v-btn>
            </div>
          </div>
        </template>
      </v-navigation-drawer>
    </div>
    <div class="d-sm-flex d-none">
      <v-app-bar
          color="white"
          height="80"
          class="header"
          app
          elevation="0"
      >
        <v-container class="pa-0 d-flex align-center">
          <v-img @click="$router.push({name: 'booking'})" src="../../assets/logo.svg" max-width="160"></v-img>
          <v-spacer/>
          <div class="menu">
            <v-list>
              <v-list-item-group class="d-flex">
                <v-list-item v-for="(item, index) in menu" :key="index" :to="item.to" active-class="menu__item-active">
                  <v-list-item-content>
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </div>
          <v-spacer/>
          <div class="d-flex align-center">
            <v-card width="180px" outlined class="pa-1">
              <v-list-item class="pa-0">
                <v-list-item-avatar
                    rounded="sm"
                    class="ma-0"
                    size="48"
                >
                  <v-img max-height="48px" max-width="48px" :src="user.avatar_url"></v-img>
                </v-list-item-avatar>
                <v-list-item-content class="py-0">
                  <v-list-item-title>
                    <div class="subtitle-1 pl-2 black--text font-weight-medium">{{ user.name?user.name:user.email }}</div>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-card>
            <v-menu
                left
                bottom
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                    icon
                    v-bind="attrs"
                    v-on="on"
                >
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>

              <v-list>
                <v-list-item
                    @click="editProfile"
                >
                  <v-list-item-title>Edit Profile</v-list-item-title>
                </v-list-item>
                <v-list-item
                    @click="logout"
                >
                  <v-list-item-title>Logout</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <div
                    v-bind="attrs"
                    v-on="on"
                    class="text-capitalize d-inline _fs-14px font-weight-bold ml-3">
                  {{ $i18n.locale }}
                  <v-icon color="black">mdi-chevron-down</v-icon>
                </div>
              </template>
              <v-list>
                <v-list-item
                    v-for="(item, index) in $i18n.availableLocales"
                    :key="index"
                >
                  <v-list-item-title @click="$i18n.locale = item" class="text-capitalize">{{ item }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
        </v-container>
      </v-app-bar>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  export default {
    name: "Header",
    data() {
      return {
        mobileDrawer: false,
        menu: [
          { title: 'Booking', to: { name: 'booking' } },
          { title: 'Find your coach', to: { name: 'find-coach' } },
          { title: 'About us', to: { name: 'about-us' } },
        ],
        mobileMenuStudent: [
          // { title: 'Booking', to: { name: 'booking' } },
          { title: 'Find your coach', to: { name: 'find-coach', query: { tab: 0 } } },
          { title: 'Settings', to: { name: 'find-coach', query: { tab: 1 } } },
          { title: 'Contact with service', to: { name: 'find-coach', query: { tab: 2 } } },
          { title: 'Checkout', to: { name: 'find-coach', query: { tab: 4 } } },
          { title: 'About us', to: { name: 'about-us' } },
        ],
        mobileMenuCoach: [
          { title: 'Booking', to: { name: 'booking', query: { tab: 0 } } },
          { title: 'Settings', to: { name: 'booking', query: { tab: 1 } } },
          { title: 'Schedule', to: { name: 'booking', query: { tab: 2 } } },
          { title: 'Lessons', to: { name: 'booking', query: { tab: 4 } } },
          { title: 'Contact with service', to: { name: 'booking', query: { tab: 5 } } },
          { title: 'Find your coach', to: { name: 'find-coach' } },
          { title: 'About us', to: { name: 'about-us' } },
        ],
      }
    },
    computed: {
      ...mapState({
        user: state => state.account.user,
        activeTab: state => state.mobileMenu.activeTab,
      })
    },
    methods: {
      goToTab(tab) {
        this.$store.commit('mobileMenu/SET_ACTIVE_TAB', tab.tab.name);
      },
      triggerMobileMenu() {
        this.mobileDrawer = !this.mobileDrawer;
      },
      logout() {
        this.$store.dispatch('auth/logout')
            .then( () => {
              this.$router.push('login')
            })
            .catch( () => {
              this.$router.push('login')
            })

      },
      editProfile() {
        this.$router.push({name: 'booking', query:{q:1}})
      }
    },
  }
</script>

<style lang="scss">
.v-toolbar {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  width: 100%;
}
.mobile.header__btns-auth {
  margin-top: -100px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
}
.v-navigation-drawer {
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 40px;
  bottom: 100px;
  left: 0;
  right: 0;
  z-index: 10;
  &__content {
    height: 100vh;
    width: 100vw;
    overflow-y: auto;
    overflow-x: hidden;
  }
}

  .menu {
    &__item-active {
      &.v-list-item--link {
        &:before {
          background-color: white;
        }
      }
    }
  }
</style>
