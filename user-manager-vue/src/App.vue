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
    AddUser,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: black;
  margin-top: 60px;
  border: 1px solid #CFD8DC;
}
</style>
