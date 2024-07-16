<script setup lang="ts">
import { withDefaults } from 'vue';


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
  withArror: false
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
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none" class="animate-spin-slow">
          <path d="M12.5 2V6M12.5 18V22M6.5 12H2.5M22.5 12H18.5M19.5784 19.0784L16.75 16.25M19.5784 4.99994L16.75 7.82837M5.42157 19.0784L8.25 16.25M5.42157 4.99994L8.25 7.82837" stroke="white" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
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
  opacity: 0.5;
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

  .animate-spin-slow {
    animation: spin 1.5s linear infinite;
  }

  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }


</style>
