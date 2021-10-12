<script setup>
import { routes } from "@/router";

const catalogue = routes
  .map((route) => ({
    path: route.path,
    name: route.meta.name,
  }))
  .slice(1, routes.length);
console.log(catalogue);
</script>

<template>
  <ul>
    <li v-for="route in catalogue">
      <router-link :to="route.path">{{ route.name }}</router-link>
    </li>
  </ul>
</template>
