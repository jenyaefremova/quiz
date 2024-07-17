<template>

  <BaseLayout>
  
    <div class="layout">
      <div class="statistic">
        <div class="profile">
          <h1>Leader Board</h1>
          <p class="mt-20">Cooming soon!</p>
        </div>
        <!-- <div class="leaderboard">
          <h2>Your place: 1</h2>
        </div> -->
      </div>
      <Avocado class="center"/>
    </div>
  </BaseLayout>

</template>

<script lang="ts">

import { defineComponent } from 'vue';
import BaseLayout from '../layouts/BaseLayout.vue';
import Avocado from '../components/ui/icons/Avocado.vue';

export default defineComponent({
  name: 'LeaderBoardView',
  components: {
    BaseLayout,
    Avocado
  }
});
</script>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  flex: 1;
  height: calc(100vh - 120px);
  max-width: 500px;
  margin: auto;
}

.startGame {
  text-align: center;
}

.mt-20 {
  margin-top: 20px;
}


</style>


