<template>
  <div
    class="
      country-details
      grid grid-cols-1
      md:grid-cols-2
      gap-4
      px-10
      py-10
      md:px-24
      md:py-24
    "
  >
    <div class="col-span-1 md:col-span-2 pb-10">
      <button
        @click="goBack"
        class="bg-indigo-500 text-white px-6 py-3 rounded-lg"
      >
        <fa-icon icon="arrow-left" class="mr-3"></fa-icon>Back to Homepage
      </button>
    </div>
    <div class="col-span-1 md:col-span-2 pb-3">
      <div class="flex flex-row items-center">
        <h1 class="text-4xl font-bold">{{ country.name }}</h1>
        <img class="flag h-8 pl-5" :src="country.flag" alt="" />
      </div>
      <div class="flex flex-row space-x-1 text-white">
        <div
          class="px-3"
          style="background-color: #8dd5cc; border-radius: 50px"
        >
          {{ altSpellings }}
        </div>
      </div>
    </div>
    <div class="relative border py-6 px-5 leading-relaxed shadow-sm">
      LatLong
      <div class="text-indigo-500 text-5xl font-bold">{{ latlng }}</div>
      <div class="absolute top-0 right-0">
        <svg
          width="160"
          height="160"
          viewBox="0 0 496 512"
          class="object-top"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M248 8C111.03 8 0 119.03 0 256C0 392.97 111.03 504 248 504C384.97 504 496 392.97 496 256C496 119.03 384.97 8 248 8ZM408 223.5V230.43C408 236.3 404.68 241.67 399.43 244.29L384.04 251.99C381.596 253.213 378.872 253.768 376.144 253.597C373.417 253.427 370.783 252.538 368.51 251.02L350.3 238.88C348.336 237.572 346.099 236.729 343.759 236.415C341.42 236.101 339.04 236.325 336.8 237.07L334.15 237.95C324.45 241.18 320.49 252.74 326.16 261.25L339.4 281.11C342.27 285.42 347.11 288.01 352.29 288.01H360.5C369.06 288.01 376 294.95 376 303.51V314.85C376 318.2 374.91 321.47 372.9 324.15L354.16 349.13C352.74 351.03 351.77 353.23 351.33 355.56L347.03 378.39C346.41 381.68 344.74 384.68 342.27 386.95C332.793 395.628 324.399 405.419 317.27 416.11L304.24 435.66C301.706 439.461 298.272 442.578 294.244 444.735C290.217 446.891 285.719 448.019 281.15 448.02C270.64 448.02 261.03 442.08 256.33 432.68C250.851 421.723 247.999 409.641 248 397.39V367.5C248 358.94 241.06 352 232.5 352H206.62C192.13 352 178.24 346.24 167.99 336C157.748 325.753 151.993 311.858 151.99 297.37V283.31C151.99 266.12 160.09 249.93 173.84 239.61L201.42 218.92C210.877 211.828 222.379 207.993 234.2 207.99H235.09C243.57 207.99 251.94 209.96 259.52 213.76L274.24 221.12C277.92 222.96 282.17 223.26 286.07 221.96L333.38 206.19C339.71 204.08 343.98 198.16 343.98 191.49C343.98 182.93 337.04 175.99 328.48 175.99H318.39C314.28 175.99 310.34 174.36 307.43 171.45L300.51 164.53C299.071 163.09 297.362 161.948 295.482 161.169C293.601 160.39 291.586 159.99 289.55 159.99H199.5C190.94 159.99 184 153.05 184 144.49V140.09C184 132.98 188.84 126.78 195.74 125.05L210.19 121.44C213.93 120.5 217.19 118.21 219.33 115L227.41 102.89C230.28 98.58 235.12 95.99 240.3 95.99H264.51C273.07 95.99 280.01 89.05 280.01 80.49V58.79C359.23 71.63 422.86 131.02 441.93 208H423.5C414.94 208 408 214.94 408 223.5Z"
            fill="black"
            fill-opacity="0.05"
          />
        </svg>
      </div>
    </div>

    <div class="border py-6 px-5 shadow-sm">
      <ul class="leading-relaxed">
        <li>Capital : {{ country.capital }}</li>
        <li>Region : {{ country.region }}</li>
        <li>Subregion: {{ country.subregion }}</li>
      </ul>
    </div>

    <div class="leading-loose pt-3">
      <div>Calling Code</div>
      <div class="text-indigo-500 text-5xl font-bold">{{ callingCodes }}</div>
      <div>
        <span class="text-indigo-500 underline cursor-pointer">1 country</span>
        with this calling code
      </div>
    </div>

    <div class="leading-loose pt-3">
      <div>Currency</div>
      <div class="text-indigo-500 text-5xl font-bold">{{ currencies }}</div>
      <div>
        <span class="text-indigo-500 underline cursor-pointer">1 country</span>
        with this currency
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CountryDetails",
  components: {},
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    loadCountry() {
      this.$store.dispatch("selectCountry", this.$route.params.countryName);
    },
  },
  computed: {
    country() {
      return this.$store.getters.singleCountry;
    },
    callingCodes() {
      return this.country.callingCodes
        ? this.country.callingCodes.join(", ")
        : "";
    },
    latlng() {
      return this.country.latlng ? this.country.latlng.join(", ") : "";
    },

    altSpellings() {
      return this.country.altSpellings
        ? this.country.altSpellings.join(", ")
        : "";
    },
    currencies() {
      let listOfCurrencies = [];
      if (this.country.currencies) {
        this.country.currencies.forEach((currency) => {
          listOfCurrencies.push(currency.code);
        });
        return listOfCurrencies.join(", ");
      }
      return "";
    },
  },
  created() {
    this.loadCountry();
  },
  watch: {
    "$route.params.countryName": function () {
      this.loadCountry();
    },
  },
};
</script>

<style scoped>
</style>
