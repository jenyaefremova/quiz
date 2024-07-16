<template>
  <div class="navigation">
    <router-link to="/" class="tab" :class="{ active: activeTab === 'home' }">
      Home
    </router-link>
    <!-- <router-link to="/quiz" class="tab" :class="{ active: activeTab === 'quiz' }">
      Quiz
    </router-link> -->
    <router-link to="/friends" class="tab" :class="{ active: activeTab === 'friends' }">
      Friends
    </router-link>
    <router-link to="/leaderboard" class="tab" :class="{ active: activeTab === 'leaderboard' }">
      Leaderboard
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const activeTab = ref(route.name);

watch(() => route.name, (newName) => {
  activeTab.value = newName;
});
</script>

<style scoped>
.navigation {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #f2f2f2;
  height: 60px;
}

.tab {
  text-decoration: none;
  color: #333;
  font-weight: bold;
}

.tab.active {
  color: rgb(22, 169, 32);
}
</style>
