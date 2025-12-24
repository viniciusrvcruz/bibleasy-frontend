<script setup lang="ts">

</script>

<template>
  <section class="flex-1 relative flex flex-col justify-between">
    <div>
      <div class="navbar py-2.5 px-5 bg-base-100 shadow-sm sticky top-0 items-center min-h-0 lg:px-10">
        <span class="font-bold text-xl">
          Chapter 1
        </span>

        <div class="ms-auto space-x-2">
          <btn class="btn btn-sm">
            <Icon icon="history" :size="20" />
          </btn>
          <button class="btn btn-sm">
            <Icon icon="letter_case" :size="20" />
          </button>
          <button class="btn btn-sm">
            <Icon icon="globe" :size="20" />
            <span class="font-bold">
              NAA
            </span>
          </button>
        </div>
      </div>
      Chapter text

    </div>

    <div class="flex justify-between sticky bottom-0 w-full pointer-events-none">
      <button class="btn btn-xl btn-circle mb-20 ms-5 lg:ms-10 pointer-events-auto">
        <Icon icon="chevron_left" />
      </button>

      <button class="btn btn-xl btn-circle mb-20 me-5 lg:me-10 pointer-events-auto">
        <Icon icon="chevron_right" />
      </button>
    </div>
  </section>
</template>