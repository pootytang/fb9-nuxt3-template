<template>
  <div>
    <button class="btn-primary" @click="signIn">Sign In</button>
    <button class="btn-primary" @click="signOut">Sign Out</button>
    <p><NuxtLink to="/secret">Secret Page</NuxtLink></p>
    <ClientOnly>
      <pre>
        {{ fbUser.user }}
      </pre>
    </ClientOnly>
  </div>
</template>

<script setup>
import { useUserStore } from "~~/stores/userStore";

const fbUser = useUserStore();
const creds = ref();

const signIn = async () => {
  const email = "delane@testuser.test";
  const password = "password";
  creds.value = await signInUser(email, password);
  console.log("index --> Credentials: ", creds);
};

const signOut = async () => {
  creds.value = await signOutUser();
  console.log(`index--> Singed Out Result: ${creds.value}`);
};
</script>

<style lang="scss" scoped></style>
