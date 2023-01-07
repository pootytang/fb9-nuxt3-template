<template>
  <div>
    <button class="btn-primary" @click="signIn">Sign In</button>
    <button class="btn-primary" @click="signOut">Sign Out</button>
    <pre>
    {{ creds }}
    </pre>
  </div>
</template>

<script setup>
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
