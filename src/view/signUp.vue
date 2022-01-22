<template>
  <ul class="nav justify-content-end">
    <li class="nav-item">
      <router-link class="nav-link" to="/" style="cursor: pointer"
        >戻る</router-link
      >
    </li>
  </ul>
  <h5>ユーザ登録</h5>
  <div class="mb-3">
    <label class="form-label">メールアドレス</label>
    <input type="email" class="form-control" v-model="email" />
  </div>
  <div class="mb-3">
    <label class="form-label">パスワード</label>
    <input type="password" class="form-control" v-model="pw" />
  </div>
  <button type="submit" class="btn btn-primary" @click="signUp(email, pw)">
    登録
  </button>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { signUpFirebase } from "../firebase";
import router from "../router/router";

export default defineComponent({
  setup() {
    const email = ref<string>();
    const pw = ref();

    const signUp = () => {
      if (email.value == undefined) return;
      if (email.value === "" || pw.value === "") alert("両方入力してください");
      signUpFirebase(email.value, pw.value).then(() => {
        alert("登録できました");
        router.push("/reservationCalendar");
      });
    };
    return {
      email,
      pw,
      signUp,
    };
  },
});
</script>
