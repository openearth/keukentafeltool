<script>
/**
 * Redirect all non-matching routes to home page, to prevent 404's.
 * Borrowed from https://github.com/nuxt/nuxt.js/issues/1691#issuecomment-330790116
 */
export default {
  asyncData ({ redirect }) {
    return redirect('/')
  },
  render(createElement) {
    // this route doesn't need a template, but causes errors otherwise
    return createElement('div')
  },
}
</script>
