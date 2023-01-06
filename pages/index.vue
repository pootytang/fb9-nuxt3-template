<template>
  <div>
    <button class="btn-primary" @click="signIn">Sign In</button>
    <button class="btn-primary" @click="signOut">Sign Out</button>
  </div>
</template>

<script setup>
const signIn = async () => {
  const email = "delane@testuser.test";
  const password = "password";
  const creds = await signInUser(email, password);
  console.log("index --> Credentials: ", creds);
};

const signOut = async () => {
  const res = await signOutUser();
  console.log(`index--> Singed Out Result: ${res}`);
};

onMounted(async () => {
  // SIGN UP
  // const email = "delane@testuser.test";
  // const password = "password";
  // const creds = await createUser(email, password);
  // console.log("index --> Credentials: ", creds);
  //SIGN IN
  //SIGN OUT
});
</script>

<style lang="scss" scoped></style>
