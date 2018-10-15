<template>
  <portal to="footer-bar">
    <div class="footer-bar">
      <slot />
    </div>
  </portal>
</template>

<style>
.footer-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
}
</style>
