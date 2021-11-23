<template>
  <v-navigation-drawer v-model="drawer" :mini-variant.sync="mini" permanent>
    <v-list-item class="px-2">
      <socket-state :socketCon="socketCon"></socket-state>
      <v-list-item-content>
        <v-list-item-title class="mx-2">{{
          user.firstName + " " + user.lastName
        }}</v-list-item-title>
        <v-list-item-subtitle class="mx-2"
          ><span class="text--primary">{{
            user.login
          }}</span></v-list-item-subtitle
        >
      </v-list-item-content>
      <v-btn icon @click.stop="drawerMini()">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense>
      <chat-list :items="items"></chat-list>
    </v-list>
  </v-navigation-drawer>

  <!-- <v-list class="pa-0">
      <v-list-item
        :ripple="false"
        color="primary"
        class="logo_block"
        :to="{ name: 'chats' }"
        link
        exact-path
      >
        <v-list-item-content>
          <v-list-item-title class="d-flex align-center">
            <img class="img" :src="require('../assets/logo.png')" />
            <span> Chat </span>
          </v-list-item-title>
        </v-list-item-content>
        <v-list-item-action>
          <socket-state :socketCon="socketCon"></socket-state>
        </v-list-item-action>
      </v-list-item>
    </v-list> -->

  <!-- <v-list class="contacts_block pa-0">
      <v-list-item
        :ripple="false"
        color="primary"
        class="contact_link"
        v-for="(item, i) in 1"
        :key="i"
        link
        :to="{ name: 'chat-id', params: { id: userId === 1 ? 2 : 1 } }"
        replace
      >
        <v-list-item-icon>
          <v-avatar color="primary" class="white--text" size="36">
            ava
          </v-avatar>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title> Name </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list> -->
</template>

<script>
import SocketState from "./SocketState.vue";
import ChatList from "./ChatList.vue";
// import axios from "axios";
export default {
  name: "Contacts",
  components: {
    SocketState,
    ChatList,
  },
  props: {
    socketCon: Boolean,
  },
  computed: {
    mini: {
      get: function () {
        return this.$store.getters.getDrawerMini;
      },
      set: function () {
        return this.$store.commit("setDrawerMini", !this.mini);
      },
    },
    user: function () {
      return this.$store.getters.getUser;
    },
  },
  data: () => ({
    drawer: true,
    items: [],
  }),
  mounted: function () {
    // axios.get("User").then((response) => {
    //   var user = this.$store.getters.getUser;
    //   console.log(response.data);
    //   this.items = response.data.filter((item) => {
    //     return item._id != user._id;
    //   });
    // });
  },
  methods: {
    drawerMini() {
      this.$store.commit("setDrawerMini", !this.mini);
    },
  },
};
</script>

<style lang='scss'>
</style>