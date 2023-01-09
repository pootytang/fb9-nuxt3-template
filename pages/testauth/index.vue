<script setup>
import { useUserStore } from "~~/stores/userStore";

const fbUser = useUserStore();
const creds = ref();
const register_form = ref({
  email: "",
  password: "",
});
const login_form = ref({
  email: "",
  password: "",
});

const registerWithEmail = () => {
  console.log("index.registerWithEmail() --> Called");
  const email = register_form.value.email;
  const password = register_form.value.password;
  creds.value = fbUser.registerUser(email, password);
  resetForm();
  console.log("index.registerWithEmail() --> Credentials: ", creds.value);
};

const logInWithEmail = () => {
  console.log("index.loginWithEmail() --> Called");
  const email = login_form.value.email;
  const password = login_form.value.password;
  creds.value = fbUser.signInUserWithEmail(email, password);
  resetForm();
  console.log("index.loginWithEmail() --> Credentials: ", creds.value);
};

const logInWithGoogle = async () => {
  console.log("testauth_index.loginWithGoogle()--> Called");
  creds.value = await fbUser.signInWithGoogle();
  console.log("index.loginWithGoogle() --> Credentials: ", creds.value);
};

const signOut = async () => {
  creds.value = await signOutUser();
  console.log(`index--> Singed Out Result: ${creds.value}`);
};

function resetForm() {
  register_form.value.email = "";
  register_form.value.password = "";
  login_form.value.email = "";
  login_form.value.password = "";
}
</script>

<template>
  <div>
    <div class="forms">
      <form class="register" @submit.prevent="registerWithEmail">
        <h2>Register With Email</h2>
        <input type="email" placeholder="Email Address" v-model="register_form.email" />
        <input type="password" placeholder="Password" v-model="register_form.password" />
        <input type="submit" value="Register" />
      </form>

      <form class="login" @submit.prevent="logInWithEmail">
        <h2>Login With Email</h2>
        <input type="email" placeholder="Email Address" v-model="login_form.email" />
        <input type="password" placeholder="Password" v-model="login_form.password" />
        <input type="submit" value="Login" />
      </form>
    </div>
    <div>
      <button
        class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 mr-1 rounded"
        @click="logInWithGoogle"
      >
        Login With Google
      </button>
      <button
        class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        @click="signOut"
      >
        Sign Out
      </button>
    </div>
    <p><NuxtLink to="/testauth/secret">Secret Page</NuxtLink></p>

    <ClientOnly>
      <pre>
        {{ fbUser.user }}
      </pre>
    </ClientOnly>
  </div>
</template>

<style>
.forms {
  display: flex;
  min-height: 100vh;
}
form {
  flex: 1 1 0%;
  padding: 8rem 1rem 1rem;
}
form.register {
  color: #fff;
  background-color: rgb(245, 66, 101);
  background-image: linear-gradient(
    to bottom right,
    rgb(245, 66, 101) 0%,
    rgb(186, 28, 60) 100%
  );
}
h2 {
  font-size: 2rem;
  text-transform: uppercase;
  margin-bottom: 2rem;
}

input {
  appearance: none;
  border: none;
  outline: none;
  background: none;

  display: block;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  font-size: 1.5rem;
  margin-bottom: 2rem;
  padding: 0.5rem 0rem;
}

input:not([type="submit"]) {
  opacity: 0.8;
  transition: 0.4s;
}

input:focus:not([type="submit"]) {
  opacity: 1;
}

input::placeholder {
  color: inherit;
}

form.register input:not([type="submit"]) {
  color: #fff;
  border-bottom: 2px solid #fff;
}

form.login input:not([type="submit"]) {
  color: #2c3e50;
  border-bottom: 2px solid #2c3e50;
}

form.login input[type="submit"] {
  background-color: rgb(245, 66, 101);
  color: #fff;
  font-weight: 700;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  cursor: pointer;
  text-transform: uppercase;
}

form.register input[type="submit"] {
  background-color: #fff;
  color: rgb(245, 66, 101);
  font-weight: 700;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  cursor: pointer;
  text-transform: uppercase;
}
</style>
