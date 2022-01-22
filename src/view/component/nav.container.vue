<template>
  <div>
    <ul class="nav justify-content-end" style="margin: 25px 0px">
      <li class="nav-item">
        <div class="nav-link" style="cursor: pointer" @click="logout">
          ログアウト
        </div>
      </li>
      <li class="nav-item">
        <div class="nav-link" style="cursor: pointer" @click="deleteUser">
          ユーザ削除
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import { defineComponent } from "vue";
import { logOutFirebase, deleteUserFirebase } from "../../firebase";

export default defineComponent({
  setup() {
    const logout = () => {
      logOutFirebase();
    };

    const deleteUser = () => {
      if (confirm("本当に削除してもよろしいでしょうか？")) {
        deleteUserFirebase();
      }
    };
    return {
      logout,
      deleteUser,
    };
  },
});
</script>
