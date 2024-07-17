import { defineStore } from 'pinia';
import axios from 'axios';
import { getScoreIncrement } from '../utils/getScoreIncrement';

interface Question {
  question: string;
  correct_answer: string;
  difficulty: string;
  category: string;
  incorrect_answers: string[];
  answers: string[];
}

export const useQuizStore = defineStore('quiz', {
  state: () => ({
    gamesAvailable: parseInt(localStorage.getItem('gamesAvailable') || '0', 10),
    score: 0,
    totalPoints: parseInt(localStorage.getItem('totalPoints') || '0', 10),
    questions: [] as Question[],
    currentIndex: 0,
    timeBeforeGameIncrese: 0,
    showScore: false,
    loading: false,
    lastIncrementTime: localStorage.getItem('lastIncrementTime') || '',
  }),
  actions: {
    async fetchQuestions() {
      this.loading = true;
      try {
        const response = await axios.get('https://opentdb.com/api.php?amount=10&type=multiple');
        this.questions = response.data.results.map((q: any) => ({
          question: q.question,
          correct_answer: q.correct_answer,
          incorrect_answers: q.incorrect_answers,
          difficulty: q.difficulty,
          category: q.category,
          answers: [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5)
        }));
        this.loading = false;
      } catch (error) {
        console.error("Error fetching questions:", error);
        this.loading = false;
      }
    },
    checkAnswer(answer: string, router: any) {
      const currentQuestion = this.questions[this.currentIndex];
      if (answer === currentQuestion.correct_answer) {
        this.score += getScoreIncrement(currentQuestion.difficulty);
      }
      if (this.currentIndex === this.questions.length - 1) {
        this.showScore = true;
        this.totalPoints += this.score;
        localStorage.setItem('totalPoints', this.totalPoints.toString());

        router.push('/result');
      } else {
        this.currentIndex++;
      }
    },
    async playQuiz(router: any) {
      this.incrementGamesAvailable();
      if (this.gamesAvailable > 0) {
        this.currentIndex = 0;
        this.showScore = false;
        this.score = 0;
        this.loading = true;
        this.gamesAvailable--;
        localStorage.setItem('gamesAvailable', this.gamesAvailable.toString());
        await this.fetchQuestions();
        router.push('/play');
      }
    },
    incrementGamesAvailable() {
      const currentTime = new Date().getTime();
      const lastIncrementTime = new Date(this.lastIncrementTime).getTime();
      const eightHours = 8 * 60 * 60 * 1000;

      if (!this.lastIncrementTime || currentTime - lastIncrementTime >= eightHours) {
        this.gamesAvailable += 3;
        this.lastIncrementTime = new Date().toISOString();
        localStorage.setItem('lastIncrementTime', this.lastIncrementTime);
        localStorage.setItem('gamesAvailable', this.gamesAvailable.toString());
        this.timeBeforeGameIncrese = 0;
      } else {
        this.timeBeforeGameIncrese = eightHours - (currentTime - lastIncrementTime);
      }
    }
  },
  getters: {
    currentQuestion: (state) => state.questions[state.currentIndex],
    questionNumber: (state) => state.currentIndex + 1,
  },
});
