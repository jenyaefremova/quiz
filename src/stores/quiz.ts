import { defineStore } from 'pinia';
import axios from 'axios';
import OpenAI from 'openai';

interface Question {
  question: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  answers: string[];
}

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export const useQuizStore = defineStore('quiz', {
  state: () => ({
    gamesCount: 3,
    score: 0,
    totalPoints: 0,
    questions: [] as Question[],
    currentIndex: 0,
    showScore: false,
    loading: false,
  }),
  actions: {
    async fetchQuestions() {
      this.loading = true;
      try {
        const response = await axios.get('https://opentdb.com/api.php?amount=10&type=multiple');
        const translatedQuestions = await Promise.all(response.data.results.map(async (q: any) => {
          const translatedQuestion = await openai.completions.create({
            model: 'gpt-3.5-turbo',
            prompt: `Translate the following question and answers to Russian:\nQuestion: ${q.question}\nAnswers: ${q.incorrect_answers.join(', ')}, ${q.correct_answer}`,
            max_tokens: 150,
            temperature: 0.3,
          });

          const translation = translatedQuestion.choices[0].text.trim().split('\n');
          const translatedQuestionText = translation[0].replace('Question: ', '');
          const translatedAnswers = translation.slice(1).map((answer: string) => answer.replace('Answer: ', ''));

          return {
            question: translatedQuestionText,
            correct_answer: translatedAnswers.pop()!,
            incorrect_answers: translatedAnswers,
            difficulty: q.difficulty,
            answers: [...translatedAnswers, translatedAnswers.pop()!].sort(() => Math.random() - 0.5),
          };
        }));

        this.questions = translatedQuestions;
        this.loading = false;
      } catch (error) {
        console.error("Error fetching questions:", error);
        this.loading = false;
      }
    },
    checkAnswer(answer: string, router: any) {
      const currentQuestion = this.questions[this.currentIndex];
      if (answer === currentQuestion.correct_answer) {
        switch (currentQuestion.difficulty) {
          case 'easy':
            this.score += 1;
            break;
          case 'medium':
            this.score += 3;
            break;
          case 'hard':
            this.score += 5;
            break;
        }
      }
      if (this.currentIndex === this.questions.length - 1) {
        this.showScore = true;
        this.totalPoints += this.score;
        router.push('/result');
      } else {
        this.currentIndex++;
      }
    },
    async playQuiz(router: any) {
      if (this.gamesCount > 0) {
        this.currentIndex = 0;
        this.showScore = false;
        this.score = 0;
        this.loading = true;
        this.gamesCount--;
        await this.fetchQuestions();
        router.push('/play');
      }
    },
  },
  getters: {
    currentQuestion: (state) => state.questions[state.currentIndex],
    questionNumber: (state) => state.currentIndex + 1,
  },
});
