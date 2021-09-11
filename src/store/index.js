import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    countries: [],
    selectedCountry: Object(),
  },
  mutations: {
    setAllCountries(state, payload) {
      state.countries = payload.data;
    },
    setSelectedCountry(state, payload) {
      state.selectedCountry = payload.country;
    },
  },
  actions: {
    // Gets the list of all countries
    getAllCountries({ commit }) {
      axios
        .get("https://restcountries.eu/rest/v2/all")
        .then((response) => {
          commit("setAllCountries", {
            data: response.data,
          });
        })
    },
    // Select a country by its Alpha 3 Code
    selectCountry({ commit }, code) {
      axios
        .get("https://restcountries.eu/rest/v2/alpha/" + code)
        .then((response) => {
          commit("setSelectedCountry", {
            country: response.data,
          });
        })
    },
  },
  getters: {
    allCountries: (state) => {
      return state.countries;
    },
    singleCountry: (state) => {
      return state.selectedCountry;
    },
  },
});

export default store;
