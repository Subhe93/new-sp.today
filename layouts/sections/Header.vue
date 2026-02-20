<template>
  <div>
    <!-- -----------------------------------------------
          Start Header
    ----------------------------------------------- -->
    <v-app-bar app class="app-header position-relative header2" color="primary" flat>
      <v-container class="py-0 fill-height">
        <!-- Logo -->
        <div class="logo">
          <nuxt-link class="d-flex flex-row align-center flex-no-wrap" to="/">
            <v-img
              class="header-logo"
              width="180px"
              alt="Lirtna Logo"
              src="/sp-today-logo-and-name-white.png"
            />
            <!-- <div class="white--text text-h2 mr-2">{{ $t("Lirtna") }}</div> -->
          </nuxt-link>
        </div>

        <v-spacer></v-spacer>

        <!-- Desktop view Navigation -->
        <div
          class="navigation"
          v-bind:class="[isActive ? 'd-block' : '']"
          @click="isActive = !isActive"
        >
          <ul class="navbar-nav">
            <li class="nav-item" text>
              <n-link class="nav-link" nuxt to="/"> {{ $t("Home") }} </n-link>
            </li>
            <li class="nav-item" text>
              <n-link class="nav-link" nuxt to="/currencies">
                {{ $t("currencies_label") }}
              </n-link>
            </li>
            <li class="nav-item" text>
              <n-link class="nav-link" nuxt to="/gold"> {{ $t("Gold") }}</n-link>
            </li>
            <li class="nav-item" text>
              <n-link class="nav-link" nuxt to="/currency/us-dollar">
                {{ $t("us-dollar") }}</n-link
              >
            </li>
            <li class="nav-item" text>
              <n-link class="nav-link" nuxt to="/currency/euro"> {{ $t("euro") }}</n-link>
            </li>

            <li class="nav-item" text>
              <n-link class="nav-link" nuxt to="/currency/turkish-lira">
                {{ $t("turkish-lira") }}</n-link
              >
            </li>
            <li class="nav-item" text>
              <n-link
                v-for="locale in availableLocales"
                :key="locale.code"
                :to="switchLocalePath(locale.code)"
                class="nav-link"
                nuxt
              >
                {{ locale.title }}
              </n-link>
            </li>
          </ul>
        </div>
        <!-- <v-btn class="mx-2" @click="DarkMode()" fab dark small color="primary">
          <v-icon :light="!dark"> mdi-white-balance-sunny </v-icon>
        </v-btn> -->
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="white"
              :small="$vuetify.breakpoint.smAndDown"
              class="primary--text"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon dark>mdi-chevron-down</v-icon>
              {{ $t("menu.cities") }}
            </v-btn>
          </template>

          <v-list>
            <v-list-item
              v-for="(item, index) in cityItems"
              :key="index"
              v-if="!item.divider"
              :to="item.link"
              link
            >
              <v-list-item-title>{{ $t(item.title) }}</v-list-item-title>
            </v-list-item>

            <v-divider v-else :key="'divider-' + index" />
          </v-list>
        </v-menu>

        <v-app-bar-nav-icon
          class="d-block d-md-none white--text"
          @click.stop="drawer = !drawer"
          left
        ></v-app-bar-nav-icon>
      </v-container>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" fixed left temporary>
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item>
            <v-list-item-title>
              <n-link class="nav-link" nuxt to="/">
                {{ $t("Home") }}
              </n-link>
            </v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>
              <n-link class="nav-link" nuxt to="/currencies">
                {{ $t("currencies_label") }}
              </n-link>
            </v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>
              <n-link class="nav-link" nuxt to="/gold">
                {{ $t("Gold") }}
              </n-link>
            </v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>
              <n-link class="nav-link" nuxt to="/currency/us-dollar">
                {{ $t("us-dollar") }}</n-link
              >
            </v-list-item-title>
          </v-list-item>

          <v-list-item-title>
            <v-list-item>
              <n-link class="nav-link" nuxt to="/currency/euro"> {{ $t("euro") }}</n-link>
            </v-list-item>
          </v-list-item-title>

          <v-list-item-title>
            <v-list-item>
              <n-link class="nav-link" nuxt to="/currency/turkish-lira">
                {{ $t("turkish-lira") }}</n-link
              >
            </v-list-item>
          </v-list-item-title>
          <v-list-item v-for="locale in availableLocales" :key="locale.code">
            <v-list-item-title>
              <n-link class="nav-link" nuxt :to="switchLocalePath(locale.code)">
                {{ locale.title }}
              </n-link>
            </v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <!-- -----------------------------------------------
          End Header
    ----------------------------------------------- -->
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Header2",
  data() {
    return {
      isActive: false,
      drawer: false,
      group: null,
      dark: false,
      items: [{ title: " " }],
      cityItems: [
        { title: "menu.usd_damascus", link: "/currency/us-dollar/damascus" },
        { title: "menu.usd_aleppo", link: "/currency/us-dollar/aleppo" },
        { title: "menu.usd_idlib", link: "/currency/us-dollar/idlib" },
        { divider: true },
        { title: "menu.try_aleppo", link: "/currency/turkish-lira/aleppo" },
        { title: "menu.try_idlib", link: "/currency/turkish-lira/idlib" },
      ],
    };
  },
  computed: {
    availableLocales() {
      return this.$i18n.locales.filter((i) => i.code !== this.$i18n.locale);
    },
    ...mapState({
      title: (state) => {
        return state.home.all?.translations[0]?.title || "Lirtna";
      },
    }),
  },
  methods: {
    DarkMode() {
      if (this.dark) {
        this.$vuetify.theme.dark = true;
        this.dark = false;
      } else {
        this.$vuetify.theme.dark = false;
        this.dark = true;
      }
    },
    toggleClass: function (event) {
      this.isActive = !this.isActive;
    },
  },
};
</script>
