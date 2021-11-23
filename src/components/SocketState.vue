<template>
  <div>
    <v-badge v-if="socketCon" color="green" dot bottom overlap>
      <v-list-item-avatar class="ma-0">
        <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
      </v-list-item-avatar>
    </v-badge>
    <v-badge v-else color="red" dot bottom overlap>
      <v-list-item-avatar class="ma-0">
        <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
      </v-list-item-avatar>
    </v-badge>
  </div>
</template>

<script>
export default {
  name: "SocketState",
  props: {
    socketCon: Boolean,
  },
  data: () => ({}),
};
</script>
