const url = "http://localhost:3000/api";

// function getUsers () : Promise<any> {
//     return new Promise((resolve) => resolve());
// }

export const userService = {
  getUsers: () => {
    return fetch(url + "/users");
  },
  postUser: (body) => {
    console.log(body);
    return fetch(url + "/users", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  },
  deleteUser: (_id) => {
    return fetch(`${url}/users/${_id}`, {
      method: 'delete'
    });
  },
  updateUser: (user) => {
    return fetch(`${url}/users/${user._id}`, {
      method: 'put',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user)
    });
  },
  search: (text) => {
    return fetch(`${url}/users/search/${text}`);
  }
};
