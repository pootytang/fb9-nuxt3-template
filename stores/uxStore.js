export default useUxStore = defineStore('ux', {
  state: () => ({
    sidebarToggleProperties: {
      isSideNavOpen: true,
      isSecondarySideNavOpen: false,
      isActiveSecondarySideNav: false,
    },
    isDarkMode: false,
  }),

  getters: {
    getSideBarToggleProperties(state) {
      return state.sidebarToggleProperties
    },
  },

  actions: {
    // MY ACTIONS
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode
    },

    /* 
      The following sections were brought over from gull-tailwind-admin which used VUEX.
      Need to clean it up:
        remove things I don't need or change the calls so no mutations are needed
    */
    // VUEX MUTATIONS
    toggleSidebarProperties() {
      this.sidebarToggleProperties.isSideNavOpen = !this.sidebarToggleProperties.isSideNavOpen
    },
    toggleSecondarySidebarProperties() {
      this.sidebarToggleProperties.isSecondarySideNavOpen = !this.sidebarToggleProperties.isSecondarySideNavOpen
    },
    toggleSecondarySidebarPropertiesViaMenuItem(data) {
      this.sidebarToggleProperties.isSecondarySideNavOpen = data;
      this.sidebarToggleProperties.isActiveSecondarySideNav = data;
    },
    toggleSecondarySidebarPropertiesViaOverlay() {
      this.sidebarToggleProperties.isSecondarySideNavOpen = !this.sidebarToggleProperties.isSecondarySideNavOpen;
    },
  
    // VUEX ACTIONS - These just called the actions so maybe delete later
    changeSidebarProperties() {
      this.toggleSidebarProperties();
    },
    changeSecondarySidebarProperties() {
        this.toggleSecondarySidebarProperties();
    },
    changeSecondarySidebarPropertiesViaMenuItem(data) {
        this.toggleSecondarySidebarPropertiesViaMenuItem(data)
    },
    changeSecondarySidebarPropertiesViaOverlay() {
        this.toggleSecondarySidebarPropertiesViaOverlay()
    }
  }
})