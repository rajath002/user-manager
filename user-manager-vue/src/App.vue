<template>
  <AddUser />
  <ViewUsers />
</template>

<script>
import ViewUsers from "./views/user/ViewUsers";
import AddUser from "./views/user/AddUser.vue";

export default {
  name: "App",
  components: {
    ViewUsers,
    AddUser
},
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background: #2c3e50;
  color: white;
  margin-top: 60px;
}
</style>
