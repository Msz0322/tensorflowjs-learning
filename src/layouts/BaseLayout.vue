<script setup>
import { routes } from "@/router";

const catalogue = routes[0].children.map((route) => ({
  path: route.path,
  name: route.meta.name,
}));
</script>

<template>
  <div class="base-layout">
    <ul class="category-list">
      <li class="category-item" v-for="route in catalogue">
        <router-link :to="route.path">{{ route.name }}</router-link>
      </li>
    </ul>
    <router-view />
  </div>
</template>

<style scoped>
.base-layout {
  width: calc(100% - 550px);
}

.category-list {
  display: flex;
}

.category-item {
  margin-right: 30px;
}
</style>
