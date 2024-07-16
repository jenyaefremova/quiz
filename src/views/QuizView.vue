<template>
  <GameLayout>
    <div class="layout">
      <div class="statistic">
        <div v-if="loading" class="loader">Loading...</div>
        <div v-else>
          <div v-if="!showScore">
            <div class="question" v-if="currentQuestion">
              <div class="questionData">
                <p class="questionName">{{ questionNumber }} / {{ questions.length }}</p>
                <p>Difficulty: <span class="level" :class="difficultyClass">{{ currentQuestion.difficulty }}</span></p>
              </div>
              <p v-html="currentQuestion.question" class="questionBody"></p>
              <div class="answers">
                <transition-group name="fade" tag="div" class="df">
                  <Button
                    v-for="(answer, i) in currentQuestion?.answers || []"
                    :key="i"
                    fluid
                    type="button"
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
    </div>
  </GameLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useQuizStore } from '../stores/quiz';
import GameLayout from '../layouts/GameLayout.vue';
import Button from '../components/Button.vue';
import router from '../router';

const quizStore = useQuizStore();

const currentQuestion = computed(() => quizStore.currentQuestion);
const questionNumber = computed(() => quizStore.questionNumber);
const showScore = computed(() => quizStore.showScore);
const loading = computed(() => quizStore.loading);
const questions = computed(() => quizStore.questions);
const selectedAnswer = ref<string | null>(null);

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

const checkAnswer = (answer: string) => {
  selectedAnswer.value = answer;
  setTimeout(() => {
    quizStore.checkAnswer(answer, router);
    selectedAnswer.value = null;
  }, 1500);
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
  margin-top: 20px;
}

.question, .btnAgain, .questionBody {
  margin-top: 20px;
}

.questionData {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.level {
  font-weight: bold;
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
</style>
