<template>
  <BaseLayout>
    <div class="layout">
      <div class="statistic">
        <div class="profile">
          <!-- <img src="https://i.imgur.com/xPqRmG4.jpeg" class="profileImg" alt="Profile Image"> -->
          <h1>Avocado Quiz</h1>
        </div>
     
        <!-- <div class="leaderboard">
          <h2>Your place: 1</h2>
        </div> -->
      </div>
      <div >
        <p>Your score: </p>
        <h2 class="points">Q {{ totalPoints }}</h2>
      </div>
      <img :src="maskote" class="mascote">
      <div class="startGame">
        <p>Games available: {{ gamesAvailable }}</p>
        <Button type="button" fluid class="btn" @click="startGame" :disabled="gamesAvailable == 0" :isLoading="isLoading" >
          {{ gamesAvailable == 0 ? 'Play in ' + timeBeforeGameIncrese : 'Take a Quiz'}}
        </Button>
      </div>
    </div>
  </BaseLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import BaseLayout from '../layouts/BaseLayout.vue';
import Button from '../components/Button.vue';
import { useRouter } from 'vue-router';
import { useQuizStore } from '../stores/quiz';
import maskote from '../assets/maskote.png';

const router = useRouter();
const quizStore = useQuizStore();
const gamesAvailable = computed(() => quizStore.gamesAvailable);
const isLoading = computed(() => quizStore.loading);
const totalPoints = computed(() => quizStore.totalPoints);

const startGame = async () => { 
  await quizStore.playQuiz(router); 
};

const interval = ref<number | null>(null);

onMounted(() => {
  quizStore.incrementGamesAvailable();
  interval.value = window.setInterval(() => {
    quizStore.incrementGamesAvailable();
  }, 1000);
});

onUnmounted(() => {
  if (interval.value !== null) {
    clearInterval(interval.value);
  }
});


const timeBeforeGameIncrese = computed(() => {
  const time = quizStore.timeBeforeGameIncrese;
  if (time > 0) {
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return `${hours > 0 ? hours + 'h ' : ''}${minutes}m ${seconds}s`;
  }
  return '';
});
</script>

<style scoped>
.profileImg {
  width: 64px;
  height: 64px;
  border-radius: 50%;
}

.mascote {
  width: 100%;
  padding: 0 20px;
}

.points {
  font-size: 3em;
  line-height: 110%;
}

.layout {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  height: calc(100vh - 120px);
  max-width: 500px;
  margin: auto;
}

.startGame {
  text-align: center;
}

.btn {
  margin-top: 20px;
}
</style>
