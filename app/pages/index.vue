<script setup lang="ts">

</script>

<template>
  <main class="flex-1 flex justify-between">
    <section class="absolute top-0 left-0 bottom-0 right-0 z-1 lg:w-1/5 lg:relative bg-green-500">
      Verse selector
    </section>

    <BibleChapter />

    <section class="h-40 absolute left-0 bottom-0 right-0 bg-blue-500 lg:relative lg:w-2/6 lg:h-auto">
      Seleted verses
    </section>
  </main>
</template>