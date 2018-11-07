<template>
  <portal to="footer-bar">
    <div class="footer-bar">
      <slot />
    </div>
  </portal>
</template>

<style>
.footer-bar {
  padding: 10px;
  min-height: 64px;
}
.footer-bar__align {
  display: flex;
  align-items: center;
}
.footer-bar__align--center {
  justify-content: center;
}
.footer-bar__align--space-between {
  justify-content: space-between;
}
.footer-bar .md-button {
  border-radius: 100px !important;
  padding-left: .5em !important;
  padding-right: .5em !important;
}
</style>
