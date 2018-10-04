import Vue from 'vue'

/**
 * Renders a Vue component to an HTML element.
 * This function lets us write components in Vue, which we then can render to HTMLElements when we need this.
 * @param {Vue.Component} baseComponent - The title of the book.
 * @param {Object} propsData - The author of the book.
 * @returns {HTMLElement}
 */
export default function (baseComponent, propsData) {
  let Component = Vue.extend(baseComponent)
  let instance = new Component({ propsData })

  return instance.$mount().$el
}
