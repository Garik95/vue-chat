<template>
  <v-container class="main_container pa-0" fluid>
    <contacts :socketCon="socketCon"></contacts>
    <v-row no-gutters>
      <v-col class="main_right">
        <v-row>
          <chat v-if="onSelectChat != null" ref="chatMessage"></chat>
          <v-btn
            color="success"
            v-else
            fab
            right
            bottom
            absolute
            style="bottom: 0; margin: 0 0 16px 16px"
            @click="dialog = true"
            ><v-icon>mdi-pencil</v-icon>
          </v-btn>
        </v-row>
        <dialog-comp
          :dialogAct="dialog"
          @getDialogState="getDialogState"
        ></dialog-comp>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { io } from "socket.io-client";
import Contacts from "../Contacts.vue";
import Chat from "../Chat.vue";
import DialogComp from "../Dialog.vue";
const socket = io("ws://10.20.0.7:7676", { autoConnect: false });

export default {
  name: "BaseLayout",
  components: {
    Contacts,
    Chat,
    DialogComp,
  },
  data: () => ({
    socket: socket,
    dialog: false,
  }),
  beforeCreate: function () {
    if (this.$store.getters.getAuthToken == null) {
      this.$router.push({ name: "LoginPage" });
      this.$store.commit("setSelectedChat", null);
    }
  },
  computed: {
    socketCon: function () {
      return this.socket.connected;
    },
    onSelectChat: function () {
      return this.$store.getters.getSelectedChat;
    },
  },
  created: function () {
    var user = this.$store.getters.getUser;
    if (user._id != null) {
      this.socket.auth = { token: user._id };
      this.socket.connect();
    }
    document.addEventListener("keyup", this.catchEsc);
    // this.socket.on("connect", () => {
    //   this.socket.emit("register", {
    //     socketId: this.socket.id,
    //     userId: this.userId,
    //   });
    //   console.log(this.userId);
    //   console.log(this.socket.id);
    // });
    this.socket.on("message", (data) => {
      if (this.$store.getters.getSelectedChat != null) {
        if (data.from == this.$store.getters.getSelectedChat._id) {
          // if in activechat
          this.$refs.chatMessage.getMessage(data);
        } else {
          this.sendNotif(data);
        }
      } else {
        // if not in active chat
        this.sendNotif(data);
      }
    });
  },
  methods: {
    catchEsc(event) {
      if (event.keyCode === 27) {
        if (this.$store.getters.getSelectedChat == null) {
          this.$store.commit("setDrawerMini", true);
        } else {
          this.$store.commit("setSelectedChat", null);
        }
      }
    },
    getDialogState(value) {
      this.dialog = value;
    },
    sendNotif(data) {
      this.$store.dispatch("pushNotif", data);
      this.$notification.new(data.message, {
        title: data.from,
        type: "success",
        timer: 5,
        position: "bottomRight",
      });
    },
  },
};
</script>