<script setup>
import { routes } from "@/router";

const catalogue = routes
  .map((route) => ({
    path: route.path,
    name: route.meta.name,
  }))
  .slice(1, routes.length);
  console.log(catalogue)
</script>

<template>
  <router-link v-for="route in catalogue" :to="route.path">{{
    route.name
  }}</router-link>
</template>
