<template>
  <div>
    <v-dialog content-class="loading" transition="0" v-model="$store.state.showLoading" fullscreen full-width>
      <Loading/>
    </v-dialog>
    <v-container class="py-0">
      <Header></Header>
    </v-container>
    <v-main>
      <router-view/>
    </v-main>
    <v-container fluid class="secondary">
      <v-container class="pt-16 footer">
        <div class="py-16">
          <v-row>
            <v-col cols="12" md="3">
              <div>
                <a class="footer-a black--text font-weight-light text-decoration-none" href="tel:98672312222">
                  +9 (867) 231 22 22
                </a>
              </div>
              <div class="mt-4">
                <a class="footer-a black--text font-weight-light text-decoration-none" href="mailto:support@bluetable.com">
                  support@bluetable.com
                </a>
              </div>
              <div class="d-flex footer__icons mt-9">
                <v-btn href="https://twitter.com" target="_blank" icon color="primary" x-large>
                  <v-icon large>mdi-twitter</v-icon>
                </v-btn>
                <v-btn href="https://www.facebook.com" target="_blank" icon color="primary" class="mx-2" x-large>
                  <v-icon large>mdi-facebook</v-icon>
                </v-btn>
                <v-btn icon color="primary" target="_blank" href="https://www.instagram.com" x-large>
                  <v-icon large>mdi-instagram</v-icon>
                </v-btn>
              </div>
            </v-col>
            <v-col md="3">
              <div>
                <a class="footer-a black--text font-weight-bold text-decoration-none" @click="$router.push({name: 'about-us'})">
                  About us
                </a>
              </div>
              <div class="mt-4">
                <a class="footer-a black--text font-weight-bold text-decoration-none" @click="$router.push({name: 'privacy-policy'})">
                  Privacy policy
                </a>
              </div>
              <div class="mt-4">
                <a class="footer-a black--text font-weight-bold text-decoration-none" href="Terms of Service" target="_blank">
                  Terms of Service
                </a>
              </div>
              <div class="mt-4">
                <a class="footer-a black--text font-weight-bold text-decoration-none" href="SSL Vertification" target="_blank">
                  SSL Vertification
                </a>
              </div>
            </v-col>
            <v-col md="6" class="d-flex justify-end align-end">
              <div class="subtitle-1">Language</div>
              <v-menu offset-y>
                <template v-slot:activator="{ on, attrs }">
                  <div
                      v-bind="attrs"
                      v-on="on"
                      class="text-capitalize mb-05 _fs-14px font-weight-bold ml-3">
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
            </v-col>
          </v-row>
        </div>
      </v-container>
    </v-container>
    <div class="under-footer subtitle-1 text-center my-4">
      Copyright 2020
    </div>
    <v-btn
        v-scroll="onScroll"
        v-show="fab"
        fab
        dark
        fixed
        bottom
        right
        color="accent"
        @click="toTop"
        class="scroll"
    >
      <v-icon>mdi-arrow-up</v-icon>
    </v-btn>
  </div>
</template>

<script>
import {mapState} from "vuex";
import Header from "@/components/Main/Header";
import Loading from "@/components/Loading/Loading";
export default {
  name: "Main",
  components: {
    Header,
    Loading
  },
  data: () => ({
    fab: false
  }),
  computed: {
    ...mapState({
      token: (state) => state.auth.getAuthToken,
    })
  },
  created() {
    if (this.token) {
      this.$store.dispatch('account/downloadAccount')
          .catch((error) => {
            this.$store.dispatch('auth/logout');
            console.log(error);
          });
    }
  },
  methods: {
    onScroll (e) {
      if (typeof window === 'undefined') return;
      const top = window.pageYOffset ||   e.target.scrollTop || 0;
      this.fab = top > 300
    },
    toTop () {
      this.$vuetify.goTo(0)
    }
  }
}
</script>

<style lang="scss">

  .v-application {
    @media all and (max-width: 600px) {
      .row {
        margin-right: 0;
        margin-left: 0;
      }
    }
  }

</style>
