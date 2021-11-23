<template>
  <div class="login_page blue">
    <v-card width="400" class="pa-4">
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <h2 class="text-center mb-4">Login</h2>
          <v-text-field
            v-model="username"
            :rules="[rules.required]"
            label="Login"
            outlined
            required
          ></v-text-field>

          <v-text-field
            v-model="password"
            :rules="[rules.required, rules.length(6)]"
            label="Password"
            outlined
            required
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="show = !show"
            :type="show ? 'text' : 'password'"
          ></v-text-field>
          <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="login()"
          >
            Войти
          </v-btn>
        </v-form>
      </v-card-text>
      <v-snackbar
        :timeout="2500"
        :value="snack.status"
        absolute
        top
        color="error"
        elevation="24"
      >
        {{ snack.text }}
        <template v-slot:action="{ attrs }">
          <v-btn
            color="white"
            icon
            v-bind="attrs"
            @click="snack.status = false"
          >
            <v-icon> mdi-close </v-icon>
          </v-btn>
        </template>
      </v-snackbar>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    password: "123456",
    username: "user1",
    valid: false,
    rules: {
      required: (v) => !!v || "This field is required",
      length: (len) => (v) =>
        (v || "").length >= len ||
        `Length of this field should be at least ${len}`,
    },
    show: false,
    snack: {},
  }),
  created() {
    this.$store.dispatch('flushState')
  },
  methods: {
    login() {
      this.$refs.form.validate();
      if (this.valid) {
        axios
          .post("User/login", { login: this.username, password: this.password })
          .then((response) => {
            if (
              response.data.data.login == this.username &&
              Object.keys(response.data.data).length
            ) {
              this.$store.commit("setAuthToken", response.data.token);
              this.$store.commit("setUser", response.data.data);
              this.$router.push({ name: "chats" });
            } else {
              this.snack = {
                status: true,
                text: "Username and password does not match"
              };
            }
          })
          .catch((e) => {
            console.log("err", e);
          });
      }
    },
  },
};
</script>

<style lang='scss' scoped>
.login_page {
  width: 100%;
  height: 100vh;
  // background: red;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>