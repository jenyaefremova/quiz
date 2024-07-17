<template>
  <GameLayout>
    <div class="layout">
      <div class="statistic">
        <Loader v-if="loading" class="loader"/>
        <div v-else>
          <div v-if="!showScore">
            <div class="question" v-if="currentQuestion">
              <div class="questionData">
                <p class="questionNumber">{{ questionNumber }} / {{ questions.length }}</p>
                <div class="description">
                  <p class="category" v-html="currentQuestion.category"></p>
                  <p>Difficulty: <span class="level" :class="difficultyClass">{{ currentQuestion.difficulty }}</span></p>
                </div>
                
              </div>
              <p v-html="currentQuestion.question" class="questionBody"></p>
              <div class="answers">
                <transition-group name="fade" tag="div" class="df">
                  <Button
                    v-for="(answer, i) in currentQuestion?.answers || []"
                    :key="i"
                    fluid
                    type="button"
                    :disabled="isButtonDisabled"
                    :variant="getButtonClass(answer)"
                    @click="checkAnswer(answer)"
                  >
                    <p v-html="answer"></p>
                  </Button>
                </transition-group>
              </div>
            </div>
          </div>
        </div>
      </div>
      <transition name="fade">
        <div v-if="showScoreAnimation" class="score-animation">+{{ currentScore }}</div>
      </transition>
    </div>
  </GameLayout>
</template>
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useQuizStore } from '../stores/quiz';
import GameLayout from '../layouts/GameLayout.vue';
import Button from '../components/Button.vue';
import router from '../router';
import Loader from '../components/ui/icons/Loader.vue';
import { getScoreIncrement } from '../utils/getScoreIncrement';

const quizStore = useQuizStore();

const currentQuestion = computed(() => quizStore.currentQuestion);
const questionNumber = computed(() => quizStore.questionNumber);
const showScore = computed(() => quizStore.showScore);
const loading = computed(() => quizStore.loading);
const questions = computed(() => quizStore.questions);
const selectedAnswer = ref<string | null>(null);
const showScoreAnimation = ref(false);
const currentScore = ref(0);

const difficultyClass = computed(() => {
  if (!currentQuestion.value) return '';
  switch (currentQuestion.value.difficulty) {
    case 'easy':
      return 'easy';
    case 'medium':
      return 'medium';
    case 'hard':
      return 'hard';
    default:
      return '';
  }
});

const getButtonClass = (answer: string) => {
  if (selectedAnswer.value === null) {
    return 'secondary';
  }
  if (answer === currentQuestion.value.correct_answer) {
    return 'primary';
  }
  if (answer === selectedAnswer.value) {
    return 'danger';
  }
  return 'secondary';
};

const isButtonDisabled = ref(false);

const checkAnswer = (answer: string) => {
  selectedAnswer.value = answer;
  const correct = answer === currentQuestion.value.correct_answer;
  if (correct) {
    currentScore.value = getScoreIncrement(currentQuestion.value.difficulty);
    showScoreAnimation.value = true;
  }
  isButtonDisabled.value = true;
  setTimeout(() => {
    quizStore.checkAnswer(answer, router);
    selectedAnswer.value = null;
    showScoreAnimation.value = false;
    isButtonDisabled.value = false;
  }, 2000);
};


onMounted(() => {
  quizStore.fetchQuestions();
});
</script>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  height: calc(100vh - 120px);
  max-width: 500px;
  margin: auto;
}

.statistic {
  position: relative;
}

.loader {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50px;
  height: 50px;
}

.question, .btnAgain, .questionBody {
  margin-top: 20px;
}

.questionData {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.questionNumber {
  min-width: 46px;
}

.description {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.category {
  text-align: right;
}

.questionBody {
  font-size: 1.2em;
  margin-top: 40px;
}

.answers {
  margin-top: 20px;

}

.df {
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

.mt-20 {
  margin-top: 20px;
}

.easy {
  color: green;
}

.medium {
  color: yellow;
}

.hard {
  color: red;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.primary {
  background-color: #007bff;
  color: white;
}

.danger {
  background-color: #dc3545;
  color: white;
}

.secondary {
  background-color: #6c757d;
  color: white;
}

.score-animation {
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 2em;
  color: #fff;
}

</style>

