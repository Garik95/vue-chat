<template>
  <v-dialog v-model="dialog" max-width="500">
    <v-card>
      <v-card-title class="text-h5"> Начать беседу </v-card-title>

      <v-list-item
        two-line
        v-for="(item, index) in items"
        :key="index"
        link
        @click="selectChat(item)"
      >
        <v-list-item-content>
          <v-list-item-title>{{
            item.firstName + " " + item.lastName
          }}</v-list-item-title>
          <v-list-item-subtitle>{{ item._id }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from "axios";
export default {
  name: "Dialog",
  props: {
    dialogAct: Boolean,
  },
  computed: {
    dialog: {
      get: function () {
        return this.dialogAct;
      },
      set: function (val) {
        this.$emit("getDialogState", val);
      },
    },
  },
  data: () => ({
    items: [],
  }),
  mounted: function () {
    axios.get("User").then((response) => {
      var user = this.$store.getters.getUser;
      console.log(response.data);
      this.items = response.data.filter((item) => {
        return item._id != user._id;
      });
    });
  },
  methods: {
    selectChat(item) {
      this.$store.dispatch("pushChatList", item);
      this.dialog = false;
    },
  },
};
</script>
