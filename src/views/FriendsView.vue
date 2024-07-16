<template>
  <BaseLayout>
    <div>
      <h1>Invite Friends</h1>
      <p class="mt-20">You will recive 100 points for each friend and +10% of their score</p>
    </div>
  </BaseLayout>

</template>

<script lang="ts">

import { defineComponent } from 'vue';
import BaseLayout from '../layouts/BaseLayout.vue';

export default defineComponent({
  name: 'FriendsView',
  components: {
    BaseLayout
  }
});
</script>

<style scoped>
.mt-20 {
  margin-top: 20px;
}
</style>

