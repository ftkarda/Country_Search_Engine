<template>
  <div class="container-input">
    <div class="text-center text-6xl font-bold pb-5">Country</div>
    <div class="relative mt-6 max-w-lg mx-auto">
      <span class="absolute inset-y-0 right-0 pr-3 flex items-center text-lg">
        <svg
          class="h-5 w-5 text-gray-700 hover:text-indigo-500"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </span>

      <input
        class="
          w-full
          border-2
          rounded-md
          pl-3
          pr-10
          py-2
          focus:border-indigo-500
          focus:outline-none
          focus:shadow-outline
        "
        type="text"
        name="country-name"
        id="country-name"
        placeholder="Type any country name"
        v-model.trim="searchValue"
      />
    </div>
    <ul class="autocomplete-results" v-show="searchValue">
      <li
        class="autocomplete-result"
        v-for="(result, index) in filterResults"
        :key="index"
        @click="setResult(result)"
      >
        <router-link :to="path" @click="setResult(result)">
          {{ result.name }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "SearchField",
  props: {
    countries: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      searchValue: "",
      results: [],
      isOpen: false,
      path: "",
    };
  },
  computed: {
    filterResults() {
      return this.countries.filter(
        (country) =>
          country.name.toLowerCase().indexOf(this.searchValue.toLowerCase()) >
          -1
      );
    },
  },
  methods: {
    setResult(result) {
      this.searchValue = result.name;
      this.$store.dispatch("selectCountry", result.alpha3Code);
      this.isOpen = false;
      this.$router.push({ path: `/country/${result.alpha3Code}` });
    },
    handleClickOutside(event) {
      if (!this.$el.contains(event.target)) {
        this.isOpen = false;
      }
    },
  },
  mounted() {
    document.addEventListener("click", this.handleClickOutside);
  },
  destroyed() {
    document.removeEventListener("click", this.handleClickOutside);
  },
  watch: {
    searchValue() {
      this.results = this.countries.filter(
        (country) =>
          country.name.toLowerCase().indexOf(this.searchValue.toLowerCase()) >
          -1
      );
    },
  },
};
</script>

<style scoped>
.container-input {
  width: 90%;
  margin-left: 2rem;
  margin-inline: auto;
  margin-top: 14rem;
  position: relative;
}

.autocomplete-results {
  width: 85%;
  position: absolute;
  color: var(--clr-text);
  background-color: var(--clr-elements);
  box-shadow: 0px -1px 3px var(--clr-box-shadow);
  list-style: none;
  left: 50%;
  transform: translateX(-50%);
  top: 10rem;
  margin-inline: auto;
  border-radius: 0 0 6px 6px;
  z-index: 4;
}

.autocomplete-result {
  display: flex;
  align-items: center;
  padding: 1rem 1rem;
  font-family: var(--ff-default);
  color: var(--clr-text);
}

a,
a:visited {
  text-decoration: none;
  color: var(--clr-text);
}

@media (min-width: 1440px) {
  .container-input {
    width: 40%;
    margin-inline: unset;
    margin-left: 30rem;
    margin-top: 14rem;
  }

  .autocomplete-result {
    width: 100%;
    display: flex;
    align-items: center;
  }
}
</style>