<template>
  <h5 style="margin: 25px 0px">ログイン</h5>
  <form @submit.prevent>
    <div class="mb-3">
      <label class="form-label">メールアドレス</label>
      <input type="email" class="form-control" v-model="email" />
    </div>
    <div class="mb-3">
      <label class="form-label">パスワード</label>
      <input
        type="password"
        class="form-control"
        v-model="pw"
        autocomplete="off"
      />
    </div>
    <button type="submit" class="btn btn-primary" @click="signIn(email, pw)">
      ログイン
    </button>
  </form>
  <p style="margin: 15px 0px">
    <router-link to="/signUp">はじめての方</router-link>
  </p>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { signInFirebase } from "../firebase";

export default defineComponent({
  setup() {
    const email = ref<string>();
    const pw = ref();

    const signIn = () => {
      if (email.value === undefined || pw.value === undefined) {
        alert("両方入力してください");
        return;
      }
      if (email.value == undefined) return;
      signInFirebase(email.value, pw.value);
    };

    return {
      email,
      pw,
      signIn,
    };
  },
});
</script>
