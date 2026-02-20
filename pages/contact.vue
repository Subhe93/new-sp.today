<template>
  <v-container
    class="py-12"
    style="max-width: 1200px"
    :dir="isArabic ? 'rtl' : 'ltr'"
  >
    <v-row>
      <!-- Left Side: Info -->
      <v-col cols="12" md="5">
        <h5
          class="text-uppercase font-weight-bold"
          :class="isArabic ? 'text-right' : 'text-left'"
          color="green1"
        >
          {{ $t("contact") }}
        </h5>
        <h2
          class="text-h2 font-weight-bold mt-4 mb-4"
          :class="isArabic ? 'text-right' : 'text-left'"
        >
          {{ $t("header") }}
        </h2>
        <p class="mb-8" :class="isArabic ? 'text-right' : 'text-left'">
          {{ $t("text") }}
        </p>
        <a
          href="mailto:info@sp.today"
          target="_blank"
          class="me-4 w-100"
          :dir="isArabic ? 'rtl' : 'ltr'"
        >
          <div
            class="d-flex align-center mb-4 rounded-lg pa-3"
            :style="{ backgroundColor: '#1c4c8c14' }"
          >
            <div
              class="pa-2 me-4 rounded-lg"
              :class="isArabic ? 'ms-4' : 'me-4'"
              :style="{ backgroundColor: '#1c4c8c29' }"
            >
              <v-icon class="" color="green1">mdi-email</v-icon>
            </div>
            <div :class="isArabic ? 'text-right' : 'text-left'">
              <p class="text-grey text-body-1">{{ $t("email") }}</p>
              <strong class="text-green1 text-body-1 font-weight-bold"
                >info@sp.today</strong
              >
            </div>
          </div>
        </a>
        <a href="tel:+46701234567" target="_blank" class="me-4">
          <div
            class="d-flex align-center w-100 mb-4 rounded-lg pa-3"
            :style="{ backgroundColor: '#1c4c8c14' }"
          >
            <div
              class="pa-2 me-4 rounded-lg"
              :class="isArabic ? 'ms-4' : 'me-4'"
              :style="{ backgroundColor: '#1c4c8c29' }"
            >
              <v-icon class="" color="green1">mdi-phone</v-icon>
            </div>
            <div :class="isArabic ? 'text-right' : 'text-left'">
              <p class="text-grey text-body-1">{{ $t("phone") }}</p>
              <strong class="text-green1 text-body-1 font-weight-bold"
                >(123) 123-1213-21</strong
              >
            </div>
          </div>
        </a>
        <div class="d-flex mt-6">
          <div class="d-flex align-center mt-6">
            <p
              class="font-weight-bold me-9"
              color="green1"
              :class="isArabic ? 'text-right' : 'text-left'"
            >
              {{ $t("text2") }}
            </p>
            <a
              href="https://facebook.com"
              target="_blank"
              class="me-4 pa-3 rounded-lg a"
              :style="{ backgroundColor: '#1c4c8c29' }"
            >
              <v-icon color="green1">mdi-facebook</v-icon>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              class="me-4 pa-3 rounded-lg a"
              :style="{ backgroundColor: '#1c4c8c29' }"
            >
              <v-icon color="green1">mdi-twitter</v-icon>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              class="me-4 pa-3 rounded-lg a"
              :style="{ backgroundColor: '#1c4c8c29' }"
            >
              <v-icon color="green1">mdi-instagram</v-icon>
            </a>
            <a
              href="https://wa.me/1234567890"
              target="_blank"
              class="me-4 pa-3 rounded-lg a"
              :style="{ backgroundColor: '#1c4c8c29' }"
            >
              <v-icon color="green1">mdi-whatsapp</v-icon>
            </a>
          </div>
        </div>
      </v-col>

      <!-- Right Side: Form -->
      <v-col cols="12" md="7">
        <v-card elevation="1" class="pa-6 form" md="6">
          <v-text-field
            v-model="form.name"
            :label="$t('name')"
            outlined
            :style="isArabic ? 'text-align: right;' : 'text-align: left;'"
            :dir="isArabic ? 'rtl' : 'ltr'"
            class="mb-4 w-100"
          />
          <v-text-field
            v-model="form.email"
            :label="$t('email')"
            outlined
            :dir="isArabic ? 'rtl' : 'ltr'"
            class="mb-4"
          />
          <v-text-field
            v-model="form.yournumber"
            :label="$t('phone')"
            outlined
            :dir="isArabic ? 'rtl' : 'ltr'"
            class="mb-4"
          />
          <v-textarea
            v-model="form.message"
            :label="$t('message')"
            outlined
            rows="4"
            :dir="isArabic ? 'rtl' : 'ltr'"
            class="mb-4"
          />

          <v-checkbox
            :label="$t('notRobot')"
            v-model="form.notRobot"
            :dir="isArabic ? 'rtl' : 'ltr'"
            class="mb-4"
          />

          <v-btn color="green1" class="text-white" block @click="submit">{{
            $t("send")
          }}</v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  head() {
    const baseUrl = "https://sp.today";
    const fullPath = this.$route.fullPath;
    const currentUrl = `${baseUrl}${fullPath}`;
    const pathWithoutLocale = (fullPath.replace(/^\/(en|ar)(\/|$)/, "$2") || "/").replace(/^$/, "/");
    const supportedLocales = ["ar", "en"];
    return {
      title: this.$t("header"),
      link: [
        { rel: "canonical", href: currentUrl },
        ...supportedLocales.map((locale) => ({
          rel: "alternate",
          hreflang: locale,
          href: locale === "ar" ? `${baseUrl}${pathWithoutLocale}` : `${baseUrl}/en${pathWithoutLocale}`,
        })),
        { rel: "alternate", hreflang: "x-default", href: `${baseUrl}${pathWithoutLocale}` },
      ],
    };
  },
  data() {
    return {
      form: {
        name: "",
        email: "",
        yournumber: "",
        message: "",
        notRobot: false,
      },
    };
  },
  computed: {
    isArabic() {
      // Vue 2 i18n: this.$i18n.locale
      return this.$i18n && this.$i18n.locale === "ar";
    },
  },
  watch: {
    "$i18n.locale"(newLocale) {
      document.dir = newLocale === "ar" ? "rtl" : "ltr";
    },
  },
  mounted() {
    this.$vuetify.rtl = this.isArabic;
  },
  methods: {
    submit() {
      console.log("Form Data:", this.form);
    },
    changeLang(lang) {
      if (this.$i18n) {
        this.$i18n.locale = lang;
      }
    },
  },
};
</script>

<style scoped>
p {
  margin: 0;
}

body {
  text-align: left;
}

.a {
  transition: all 0.3s ease;
}

.a:hover {
  transform: scale(1.1);
}

.form {
  width: 80%;
  float: right;
}

@media (max-width: 900px) {
  .form {
    width: 100%;
    margin-top: 30px;
  }
}
</style>
