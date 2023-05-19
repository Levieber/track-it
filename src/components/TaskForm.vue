<script lang="ts">
import TaskTimer from "./TaskTimer.vue";
import IconPlay from "./icons/IconPlay.vue";
import IconPause from "./icons/IconPause.vue";

export default {
  components: {
    TaskTimer,
    IconPlay,
    IconPause,
  },
};
</script>

<template>
  <form @submit.prevent class="mt-3 flex flex-wrap items-center justify-center gap-3 p-2">
    <input
      class="input-bordered input w-full max-w-lg"
      type="text"
      placeholder="Qual tarefa deseja realizar?"
      aria-label="Criar tarefa"
    />
    <section class="w-full text-center">
      <TaskTimer />
    </section>
    <button type="submit" class="btn-accent btn flex gap-2 text-white"><IconPlay /> Começar</button>
    <button type="button" class="btn-error btn flex gap-2 text-white"><IconPause /> Encerrar</button>
  </form>
</template>
