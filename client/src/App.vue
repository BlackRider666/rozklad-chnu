<template>
  <v-app>
    <v-dialog content-class="loading" transition="0" v-model="$store.state.showLoading" fullscreen full-width>
      <Loading/>
    </v-dialog>
    <notification-snackbar/>
    <router-view/>
  </v-app>
</template>

<script>

import Loading from "@/components/Loading/Loading";
import NotificationSnackbar from "@/components/NotificationSnackbar/NotificationSnackbar";
export default {
  name: 'App',
  components: { NotificationSnackbar, Loading},
  data: () => ({
  }),
};
</script>
