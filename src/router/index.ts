// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import QuizView from '../views/QuizView.vue';
import FriendsView from '../views/FriendsView.vue';
import LeaderBoardView from '../views/LeaderBoardView.vue';
import GameResultView from '../views/GameResultView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/quiz',
    name: 'quiz',
    component: QuizView
  },
  {
    path: '/result',
    name: 'result',
    component: GameResultView
  },
  {
    path: '/friends',
    name: 'friends',
    component: FriendsView
  },
  {
    path: '/leaderboard',
    name: 'leaderboard',
    component: LeaderBoardView
  }
];

const router = createRouter({
  history: createWebHistory(process.env.NODE_ENV === 'production' ? '/quiz/' : '/'),
  routes
});

export default router;
