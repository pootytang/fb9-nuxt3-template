<template>
  <div>
    <h3>Secret Page</h3>
    <div v-if="fbUser.user">
      <ClientOnly>
        <pre>
        {{ fbUser.user }}
      </pre
        >
      </ClientOnly>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from "~~/stores/userStore";

definePageMeta({
  middleware: ["auth"],
});

const fbUser = useUserStore();
</script>

<style lang="scss" scoped></style>
