<script setup lang="ts">

</script>

<template>
  <div class="size-full flex justify-center items-center p-6">
    <div class="max-w-2xl p-4 border border-gray-200 rounded-2xl">
      <ClientOnly>
        <PdfViewer />
      </ClientOnly>
    </div>
  </div>
</template>

<style scoped>

</style>