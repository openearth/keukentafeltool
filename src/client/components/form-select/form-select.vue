<template>
  <div/>
</template>

<style>
  /*
  ** Custom form select styling:
  ** Vue material select components
  ** do not work with the Vue material table
  ** decided together with  the designers that
  ** this is an oportunity to build a better
  ** custom solution. Fully css based.
  */

  .form-select {
    position: relative;
    height: 40px;
    width: 130px;
    border: 1px solid transparent;
    margin-left: -10px; /* For alignment in the table column */
  }

  .form-select:after {
    content: '';
    position: absolute;
    top: 0;
    width: 0;
    height: 0;
    right: 10px;
    bottom: 0;
    margin: auto;
    border-style: solid;
    border-width: 5px 5px 0 5px;
    border-color: #000000 transparent transparent transparent;
    pointer-events: none;
  }

  .form-select:before {
    width: 30px;
    position: absolute;
    top: 1px;
    right: 1px;
    bottom: 1px;
    content: '';
    pointer-events: none;
  }

  .form-select:hover {
      transition: all 200ms ease-in-out;
      border: 1px solid rgba(0,0,0,0.5);
      background: #ffffff;
  }

  .form-select__select {
    font-size: 14px;
    border: none;
    box-shadow: none;
    border-radius: 0;
    background: transparent;
    height: 100%;
    width: 100%;
    cursor: pointer;
    outline: none;
    padding-right: 30px;
    padding-left: 10px;

    /* Disable default styling on ff */
    -moz-appearance: none;

    /* Disable default styling on webkit browsers */
    -webkit-appearance: none;
  }

  /* Disable ugly outline on firefox */
  .form-select__select:-moz-focusring {
    color: transparent;
    text-shadow: 0 0 0 #000;
  }

  /* Disable default arrow on IE 11+ */
  .form-select__select::-ms-expand {
    display: none;
  }
</style>
