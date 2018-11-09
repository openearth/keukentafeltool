<template>
  <span class="skeleton-value" />
</template>

<style>
  .skeleton-value {
    display: inline-block;
    vertical-align: middle;
    height: 1em;
    border-radius: .5em;
    background-color: rgb(230, 230, 230);
    animation: skeleton-value-pulse 2s infinite;
  }

  @keyframes skeleton-value-pulse {
    0%   { opacity: 0; }
    50%  { opacity: 1; }
    100% { opacity: 0; }
  }
</style>
