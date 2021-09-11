<template>
  <div>
    <div class="split">
      <SearchField :countries="countries" />
    </div>
  </div>
</template>

<script>
import SearchField from "./SearchField";

export default {
  name: "HomePage",
  components: {
    SearchField,
  },
  data() {
    return {
      filter: false,
    };
  },
  computed: {
    countries() {
      if (this.filter) {
        return this.$store.getters.filterCountriesByRegion;
      }
      return this.$store.getters.allCountries;
    },
    regions() {
      return this.$store.getters.regions;
    },
  },
  created() {
    this.$store.dispatch("getAllCountries");
  },
};
</script>

<style scoped>
body {
  font-size: var(--fs-homepage);
}

.country-container {
  display: flex;
  flex-direction: column;
}

@media (min-width: 1440px) {
  .country-container {
    flex-direction: row;
    flex-wrap: wrap;
    padding-inline: 2rem;
  }

  .split {
    display: flex;
    margin-block: 1rem;
  }
}
</style>