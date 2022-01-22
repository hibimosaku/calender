<template>
  <div class="container">
    <h3 style="margin-bottom: 15px">ユーザ作成</h3>
    <div class="row g-3">
      <label class="col-sm-2 col-form-label">ユーザ名</label>
      <div class="col-auto">
        <input type="text" v-model="user" class="form-control" />
      </div>
      <div class="col-auto">
        <button class="btn btn-primary mb-3" @click="createUser">登録</button>
      </div>
    </div>
    <div class="container row row-cols-3">
      <template v-for="user in users" :key="user">
        <div class="col border p-2 rounded" style="text-align: center">
          {{ user.name }}
          <span
            class="badge bg-primary rounded-pill"
            style="cursor: pointer"
            @click="deleteUser(user.id)"
            >削除</span
          >
        </div>
      </template>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const user = ref<string>();

    const createUser = () => {
      if (user.value === "" || user.value === undefined) {
        alert("入力お願いします");
        return;
      }
    };

    const deleteUser = (userId: string) => {};
    return {
      user,
      createUser,
      deleteUser,
    };
  },
});
</script>
