<template>
  <button @click="init">Refresh</button>
  <h3>{{ title }}</h3>
  <div>Search users</div>
  <input type="text" @input="search" placeholder="Search.." />
  <div class="card-container">
    <div class="card" v-for="user in users" v-bind:key="user._id">
      <div>
        <div class="avatar center-div">
          {{ user.name.substring(0, 1).toLocaleUpperCase() }}
        </div>
        <div><span >{{ user.name }}</span> | <span class="badge">{{ user.email }}</span></div>
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
      <div class="footer">
        <button v-if="update.updateId !== user._id" @click="editUser(user)">
          Edit
        </button>
        <button v-else @click="updateUser(user)">Update</button>
        <button @click="deleteUser(user._id)">Delete</button>
      </div>
    </div>
  </div>
</template>

<script >
import { userService } from "@/service";
export default {
  props: {
    reload: Number
  },  
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
      searchTimer: null,
    };
  },
  mounted() {
    this.init();
  },
  watch: {
    reload() {
      this.init();
    }
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
            name: data.name,
            email: data.email,
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
    search(event) {
      const { value } = event.target;

      if (this.searchTimer) clearTimeout(this.searchTimer);

      this.searchTimer = setTimeout(() => {
        if (!value) this.init();
        else
          userService
            .search(value)
            .then((response) => response.json())
            .then((data) => (this.users = data))
            .catch((err) => console.error("Something went wrong! ", err));
      }, 500);
    },
  },
};
</script>

<style lang="scss" scoped>
.card-container {
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 1rem;
  .avatar {
    background: linear-gradient(45deg, #00ffe5, #ff13ffcf);
    height: 2rem;
    width: 2rem;
    border-radius: 1rem;
    display: flex;
    align-content: center;
    justify-content: center;
    align-items: center;
  }
}
.card {
  display: block;
  width: 400px;
  margin: 5px auto;
  padding: 0.5rem;
  box-shadow: 1px 1px 2px 0px #cfd8dc;
  background: linear-gradient(45deg, #cfd8dc, #efefef);
  .footer {
    display: flex;
    justify-content: space-between;
  }
}
.center-div {
  margin: 1rem auto;
}
.badge {
  background: #80808059;
  padding: 5px;
  border-radius: 1rem;
}
</style>