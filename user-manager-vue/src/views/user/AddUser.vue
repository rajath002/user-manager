<template>
  <div>
    <h3>Add User</h3>
    <div>
      <form id="form" action="#" method="post" @submit="onSubmit">
        <input type="name" name="name" id="name" placeholder="Enter Name" />
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter Emailid"
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Enter Password"
        />
        <button type="submit">Add</button>
      </form>
    </div>
  </div>
</template>
<script >
import { userService } from "@/service";
export default {
  methods: {
    onSubmit(event) {
      event.preventDefault();
      const form = event.target;
      const name = form.elements["name"].value;
      const email = form.elements["email"].value;
      const password = form.elements["password"].value;
      userService.postUser({
        name,
        email,
        password,
      }).then(() => {
        form.elements["name"].value = ''
        form.elements["email"].value = ''
        form.elements["password"].value = ''
        this.$emit('reloadView');
      });
    },
  },
};
</script>
<style lang="scss" scoped>
</style>