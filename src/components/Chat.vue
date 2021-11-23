<template>
  <div>
    <div class="header_block">
      <v-app-bar class="chat_topbar" absolute elevation="0" color="white">
        <v-app-bar-nav-icon>
          <v-avatar color="primary" size="36" class="white--text">
            {{ item.icon }}
          </v-avatar>
        </v-app-bar-nav-icon>

        <v-toolbar-title>{{
          item.firstName + " " + item.lastName
        }}</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon color="primary" dark v-bind="attrs" v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item link @click="closeChat()">
              <v-list-item-title>Закрыть</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-app-bar>
    </div>

    <!-- MESSAGES BLOCK -->

    <div class="chat_messages">
      <div
        :class="['one_message', msg.from !== userID ? '' : 'to']"
        v-for="(msg, index) in messages.slice().reverse()"
        :key="index"
      >
        <v-avatar color="primary" size="36" class="white--text">
          {{ msg }}
        </v-avatar>
        <div class="text">
          {{ msg.message }}
        </div>
        <!-- <div class="accept">
          <v-icon
            v-if="accepted_messages.has(msg.messageID)"
            color="#CCFF90"
            small
          >
            mdi-check
          </v-icon>
          <v-icon v-else color="" small> mdi-timelapse </v-icon>
        </div> -->
        <div class="time">
          {{ getTime(msg.createdAt) }}
        </div>
      </div>
      <div id="bottom"></div>
    </div>

    <div class="input_block">
      <v-textarea
        id="msg"
        auto-grow
        v-model="message"
        solo
        single-line
        hide-details
        class="field white"
        clearable
        clear-icon="mdi-close"
        rows="1"
        label="Message"
        dense
        @keypress.enter="send()"
        @keydown.enter.exact.prevent="send()"
        @keydown.enter.shift.exact.prevent="message += '\n'"
      ></v-textarea>
      <v-btn
        small
        rounded
        elevation="2"
        fab
        @click="send()"
        color="primary"
        :disabled="!message"
      >
        <v-icon size="18"> mdi-send </v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Chat",
  components: {},
  data: () => ({
    to: "",
    message: "",
    messages: [],
    error: "lol",

    accepted_messages: new Map(),
  }),
  computed: {
    item: function () {
      return this.$store.getters.getSelectedChat;
    },
    userID: function () {
      return this.$store.getters.getUser._id;
    },
    key: function () {
      var sorted = [
        this.$store.getters.getUser._id,
        this.$store.getters.getSelectedChat._id,
      ].sort();
      return sorted[0] + ":" + sorted[1];
    },
  },
  mounted: function () {
    this.getMessages();
  },
  watch: {
    key() {
      this.getMessages();
    },
  },
  methods: {
    getMessages() {
      axios
        .get("privateMessage", { params: { key: this.key } })
        .then((response) => {
          this.messages = response.data.data;
          this.$store.commit(
            "unsetChatNotif",
            this.$store.getters.getSelectedChat._id
          );
        });
    },
    send() {
      axios
        .post("privateMessage", {
          to: this.$store.getters.getSelectedChat._id,
          from: this.userID,
          key: this.key,
          message: this.message,
        })
        .then((response) => {
          if (response.data.success) {
            this.messages.unshift(response.data.data);
          } else {
            console.log("errrrr");
          }
        });
    },
    getMessage(val) {
      this.messages.unshift(val);
    },
    getTime(tmp) {
      const time = new Date(tmp);
      const hours =
        time.getHours() < 10 ? "0" + time.getHours() : time.getHours();
      const minutes =
        time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes();
      return `${hours}:${minutes}`;
    },
    closeChat() {
      this.$store.commit(
        "popChatList",
        this.$store.getters.getSelectedChat._id
      );
      this.$store.commit("setSelectedChat", null);
    },
  },
};
</script>
