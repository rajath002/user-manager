<template>
  <button @click="init">Refresh</button>
  <h3>{{ title }}</h3>
  <div class="card" v-for="user in users" v-bind:key="user._id">
    <div>
      <div>{{ user.name }}</div>
      <div>{{ user.email }}</div>
      <div>{{ user.createdAt }}</div>
      <div>{{ user.updatedAt }}</div>
      <div class="update-user" v-if="update.updateId === user._id">
        <div>
          <input
            type="text"
            name="editUsername"
            id="updateUsername"
            v-model="update.userName"
            placeholder="Name"
          />
        </div>
        <div>
          <input
            type="text"
            name="updateUseremail"
            id="updateUseremail"
            v-model="update.userEmail"
            placeholder="Email"
          />
        </div>
      </div>
    </div>
    <div>
      <button v-if="update.updateId !== user._id" @click="editUser(user)">
        Edit
      </button>
      <button v-else @click="updateUser(user)">Update</button>
      <button @click="deleteUser(user._id)">Delete</button>
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
      update: {
        isUpdate: false,
        updateId: "",
        userName: "",
        userEmail: "",
      },
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
    },
    async deleteUser(_id) {
      const response = await userService.deleteUser(_id);
      if (response.ok) {
        const deletedUser = await response.json();
        this.users = this.users.filter((user) => user._id !== deletedUser._id);
      }
    },
    editUser(user) {
      if (this.update.isUpdate) {
        this.resetUpdate();
        return;
      }
      this.update.isUpdate = true;
      this.update.updateId = user._id;
      this.update.userName = user.name;
      this.update.userEmail = user.email;
    },
    async updateUser() {
      const payload = {
        _id: this.update.updateId,
        name: this.update.userName,
        email: this.update.userEmail,
      };
      const response = await userService.updateUser(payload);
      const data = await response.json();
      this.users = this.users.map((user) => {
        if (user._id === this.update.updateId) {
          return {
            ...user,
            ...data,
          };
        }
        return user;
      });
      this.resetUpdate();
      console.log("updated user ", data);
    },
    resetUpdate() {
      this.update.isUpdate = false;
      this.update.updateId = "";
      this.update.userName = "";
      this.update.userEmail = "";
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  display: flex;
  justify-content: space-between;
  width: 400px;
  margin: 5px auto;
  padding: 0.5rem;
  border: #f5f5f5 solid;
}
</style>