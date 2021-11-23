<template>
  <div>
    <!-- <v-row>
      <v-col cols="6">
        <v-btn block rounded outlined color="success"
          >Контакты<v-icon right dark> mdi-account </v-icon></v-btn
        >
      </v-col>
      <v-col cols="6">
        <v-btn block rounded outlined color="info"
          >Группы <v-icon right dark> mdi-account-group </v-icon></v-btn
        >
      </v-col>
    </v-row> -->
    <v-list-item
      v-for="item in items"
      :key="item._id"
      link
      class="px-2 py-1"
      @click="getItem(item)"
    >
      <v-badge color="green" dot bottom overlap>
        <v-list-item-avatar class="ma-0">
          <v-img src="https://randomuser.me/api/portraits/men/83.jpg"></v-img>
        </v-list-item-avatar>
      </v-badge>

      <v-list-item-content>
        <v-list-item-title class="mx-2"
          >{{ item.firstName + " " + item.lastName }}
        </v-list-item-title>
      </v-list-item-content>
      <v-list-item-action v-show="$store.getters.getChatNotif[item._id]">
        <v-badge
          inline
          :content="$store.getters.getChatNotif[item._id]"
        ></v-badge>
      </v-list-item-action>
    </v-list-item>
  </div>
</template>

<script>
export default {
  name: "ChatList",
  props: {
    // items: Array,
  },
  computed:{
    items: function() {
      return this.$store.getters.getChatList
    }
  },
  data: () => ({}),
  methods: {
    getItem(item) {
      this.$store.commit("setSelectedChat", item);
    },
  },
};
</script>
