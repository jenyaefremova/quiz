<template>
  <BaseLayout>
    <div class="layout">
      <div class="statistic">
        <div class="profile">
          <img src="https://i.imgur.com/xPqRmG4.jpeg" class="profileImg" alt="Profile Image">
          <h1>avocadohaas</h1>
        </div>
        <div class="points">
          <h2>Q {{ totalPoints }}</h2>
        </div>
        <!-- <div class="leaderboard">
          <h2>Your place: 1</h2>
        </div> -->
      </div>
      <Avocado />
      <div class="startGame">
        <p>Quiz game: {{ gamesCount }}</p>
        <Button type="button" fluid class="btn" @click="startGame" :disabled="gamesCount == 0">Take a Quiz</Button>
      </div>
    </div>
  </BaseLayout>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import BaseLayout from '../layouts/BaseLayout.vue';
import Button from '../components/Button.vue';
import Avocado from '../components/ui/icons/Avocado.vue';
import { useRouter } from 'vue-router';
import { useQuizStore } from '../stores/quiz';

const router = useRouter();
const quizStore = useQuizStore();
const gamesCount = computed(() => quizStore.gamesCount);

const totalPoints = computed(() => quizStore.totalPoints);

const startGame = async () => { 
  await quizStore.playQuiz(router); 
};
</script>

<style scoped>


.profileImg {
  width: 64px;
  height: 64px;
  border-radius: 50%;
}

.points {
  font-size: 3em;
}

.layout {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  height: 100%;
  min-height: calc(100vh - 140px);
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
