<script setup lang="ts">
import { withDefaults } from 'vue';
import Loader from '../components/ui/icons/Loader.vue';

interface Props {
  type: 'button' | 'submit' | 'reset' | 'link';
  variant?: 'primary' | 'secondary' | 'danger';
  fluid?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
  href?: string;
  target?: string;
}

const emit = defineEmits(['click'])

const props = withDefaults(defineProps<Props>(), {
  type: 'button',
  variant: 'primary',
  disabled: false,
  isLoading: false,
})

function onClick(event: MouseEvent) {
  if (!props.disabled) {
    emit('click', event)
  }
}

</script>

<template>
  <component
    :class="[
      `button--${props.variant}`,
      { 'button--fluid': props.fluid },
      { 'button--disabled': props.disabled },
      { 'button--loading': props.isLoading },
      { 'button--link': props.type === 'link' },
    ]"
    :is="props.type === 'link' ? 'a' : 'button'"
    :type="props.type !== 'link' ? props.type : undefined"
    :href="props.type === 'link' ? props.href : undefined"
    :target="props.type === 'link' ? props.target : undefined"
    :disabled="props.type !== 'link' && (props.disabled || props.isLoading)"
    @click="onClick">
    <div v-if="props.isLoading" class="fcc">
      <Loader class="loader"/>
    </div>
    <div v-else class="fcc">
      <slot />
    </div>
  </component>
</template>

<style scoped>
.button--fluid {
  width: 100%;
}

.button--link {
  display: block;
  padding: 0.9rem 2rem;
  border-radius: 0.5rem;
  cursor: pointer;
}

.button--disabled {
  opacity: 0.8;
  cursor: not-allowed;
}

.button--secondary {
  border: 1px solid rgb(22, 169, 32);
  color: rgb(22, 169, 32);
  background-color: transparent;
}

.button--danger {
  background-color: rgb(138, 9, 9);
  border: 1px solid rgb(138, 9, 9);
}

.fcc {
  display: flex;
  justify-content: center;
  align-items: center;
}

.loader {
  width: 20px;
  height: 20px;
}
</style>
