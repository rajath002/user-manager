<template>
  <button @click="init">Refresh</button>
  <h3>{{ title }}</h3>
  <div class="card" v-for="user in users" v-bind:key="user._id">
    <div>
      <div>{{ user.name }}</div>
      <div>{{ user.email }}</div>
      <div>{{user.createdAt}}</div>
      <div>{{user.updatedAt}}</div>
    </div>
    <div>
      <button @click="updateUser()">Update</button>
      <button @click="deleteUser()">Delete</button>
    </div>
  </div>
</template>

<script >
import { userService } from "@/service";
export default {
  data() {
    return {
      title: "VIEWS",
      users: [],
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      try {
        const response = await userService.getUsers();
        this.users = await response.json();
      } catch (error) {
        console.log("Something wrong", error);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.card {
    display: flex;
    justify-content: space-between;
    width: 400px;
    margin: 0 auto;
}
</style>