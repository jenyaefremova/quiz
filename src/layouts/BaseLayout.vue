<template>
  <div class="page">
    <div class="content">
      <slot />
    </div>
    <footer class="footer">
      <Navigation />
    </footer>
  </div>
</template>

<script setup>
import Navigation from '../components/Navigation.vue';

</script>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content {
  flex: 1;
  padding: 30px 20px;
  display: flex;
}

.footer {
  background-color: #f2f2f2;
}
</style>
