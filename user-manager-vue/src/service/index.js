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
};
