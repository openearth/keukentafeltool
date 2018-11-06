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
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  min-height: 64px;
}
.footer-bar .md-button {
  border-radius: 100px !important;
  padding-left: .5em !important;
  padding-right: .5em !important;
}
</style>
