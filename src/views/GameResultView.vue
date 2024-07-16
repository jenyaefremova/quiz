<template>
  <GameLayout>
    <div v-if="loading" class="loader">Loading...</div>
    <div v-else  class="layout">
      

      <div class="statistic">
        <div v-if="score === 0" class="stasticDetails">
          <h1>Don't worry, it will be better next time </h1>
          <p> Your score is</p>  
        </div>
        <div v-else-if="score < 10" class="stasticDetails">
          <h1>Not bad! Looks like you know somehing</h1>
          <p> Your score is</p>  
        </div>
        <div v-else-if="score >= 10 && score < 20" class="stasticDetails">
          <h1>Cool! You kinda genius huh?</h1>
          <p> Your score is</p>  
        </div>
        <div v-else class="stasticDetails">
          <h1>Yaaaaay!</h1>
          <p> Master of Quiz! Your score is</p>  
        </div>
        <h1 class="mt20">{{ score }}</h1>
      </div>

      <BrokenHeart class="logo" v-if="score == 0"/>
      <Party class="logo" v-else/>
      <div class="startGame">
        <Button variant="secondary" type="link" v-if="score !== 0">Share your win</Button>
        <Button v-if="gamesCount > 0" fluid type="button" @click="playQuiz" class="btnAgain">Play Again ({{ gamesCount }} left)</Button>
        <Button v-else fluid type="button" @click="goHome" class="btnAgain">Go Home</Button>
        
      </div>
    </div>
  </GameLayout>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useQuizStore } from '../stores/quiz';
import GameLayout from '../layouts/GameLayout.vue';
import Button from '../components/Button.vue';
import { useRouter } from 'vue-router';
import Party from '../components/ui/icons/Party.vue';
import BrokenHeart from '../components/ui/icons/BrokenHeart.vue';

const quizStore = useQuizStore();

const gamesCount = computed(() => quizStore.gamesCount);
const score = computed(() => quizStore.score);
const router = useRouter();
const loading = computed(() => quizStore.loading);

const playQuiz = async () => { 
  await quizStore.playQuiz(router); 
};

const goHome = () => {
  router.push('/');
};

onMounted(() => {
  quizStore.fetchQuestions();
});
</script>

<style scoped>
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

.loader {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.mt-20 {
  margin-top: 20px;
}

.stasticDetails {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}


.logo {
  width: 160px;
  height: 160px;
  margin: 0 auto;
  animation: pulse 2s ease-out infinite;

}

.question, .btnAgain, .questionBody {
  margin-top: 20px;
}

.answers {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

.answers button {
  width: 100%;
}

.score {
  text-align: center;
  margin-top: 20px;
}
</style>
