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
.footer-bar .md-button {
  border-radius: 100px !important;
  padding-left: .5em !important;
  padding-right: .5em !important;
}
</style>
