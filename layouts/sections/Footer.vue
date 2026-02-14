<template>
  <!-- -----------------------------------------------
        Start Footer
  ----------------------------------------------- -->
  <v-footer class="footer" color="primary">
    <v-container>
      <v-row class="py-0 py-md-15">
        <!-- -----------------------------------------------
        First Column
      ----------------------------------------------- -->
        <v-col cols="12">
          <footer class="div-footer">
            <div class="footer-sections">
              <div class="footer-section">
                <h3 class="pb-5">{{ $t("footer.mainLinks") }} :</h3>
                <ul>
                  <!-- <li>
                    <nuxt-link :to="localePath('/currencies')">{{
                      $t("footer.currencyPrices")
                    }}</nuxt-link>
                  </li> -->
                  <li>
                    <nuxt-link :to="localePath('/currencies')">{{
                      $t("footer.currencyPricesSyria")
                    }}</nuxt-link>
                  </li>

                  <!-- <li>
                    <nuxt-link :to="localePath('/gold')">{{
                      $t("footer.goldPrices")
                    }}</nuxt-link>
                  </li> -->
                  <li>
                    <nuxt-link :to="localePath('/gold')">{{
                      $t("footer.goldPricesSyria")
                    }}</nuxt-link>
                  </li>
                  <!--
                  <li>
                    <nuxt-link :to="localePath('/currency/us-dollar')">{{
                      $t("footer.usdPrice")
                    }}</nuxt-link>
                  </li> -->
                  <li>
                    <nuxt-link :to="localePath('/currency/us-dollar')">{{
                      $t("footer.usdSyp")
                    }}</nuxt-link>
                  </li>

                  <!-- <li>
                    <nuxt-link :to="localePath('/currency/turkish-lira')">{{
                      $t("footer.tryPrice")
                    }}</nuxt-link>
                  </li> -->
                  <li>
                    <nuxt-link :to="localePath('/currency/turkish-lira')">{{
                      $t("footer.trySyp")
                    }}</nuxt-link>
                  </li>

                  <!-- <li>
                    <nuxt-link :to="localePath('/currency/euro')">{{
                      $t("footer.euroPrice")
                    }}</nuxt-link>
                  </li> -->
                  <li>
                    <nuxt-link :to="localePath('/currency/euro')">{{
                      $t("footer.euroSyp")
                    }}</nuxt-link>
                  </li>
                </ul>
              </div>
              <div class="footer-section">
                <h3 class="pb-5">{{ $t("footer.infoResources") }}</h3>
                <ul>
                  <li>
                    <nuxt-link to="/">{{ $t("footer.economicNews") }}</nuxt-link>
                  </li>
                  <li>
                    <nuxt-link to="/">{{ $t("footer.syrianGuide") }}</nuxt-link>
                  </li>
                  <!-- <li>
                    <nuxt-link :to="localePath('/news')">{{
                      $t("footer.economicNews")
                    }}</nuxt-link>
                  </li>
                  <li>
                    <nuxt-link :to="localePath('/guides/syrian-exchange-market')">{{
                      $t("footer.syrianGuide")
                    }}</nuxt-link>
                  </li> -->
                </ul>
              </div>
              <div class="footer-section">
                <h3 class="pb-5">{{ $t("footer.about") }}</h3>
                <ul>
                  <li>
                    <nuxt-link :to="localePath('/about')">{{
                      $t("footer.aboutUs")
                    }}</nuxt-link>
                  </li>
                  <li>
                    <nuxt-link :to="localePath('/contact')">{{
                      $t("footer.contact")
                    }}</nuxt-link>
                  </li>
                  <li>
                    <nuxt-link :to="localePath('/privacy-policy')">{{
                      $t("footer.privacy")
                    }}</nuxt-link>
                  </li>
                  <li>
                    <nuxt-link :to="localePath('/terms-of-service')">{{
                      $t("footer.terms")
                    }}</nuxt-link>
                  </li>
                  <li>
                    <nuxt-link :to="localePath('/sitemap')">{{
                      $t("footer.sitemap")
                    }}</nuxt-link>
                  </li>
                </ul>
              </div>
            </div>
          </footer>
        </v-col>

        <v-col cols="12" sm="12" md="12" lg="5">
          <h4 class="font-weight-regular white--text font-18">
            {{ $t("Contact us") }}
          </h4>
          <p class="mt-10 white--text">
            <a alt="mail" class="white--text" href="mailto:info@sp.today"
              >info@sp.today</a
            >
          </p>
        </v-col>
        <!-- -----------------------------------------------
        Second Column
      ----------------------------------------------- -->
        <!-- <v-col cols="12" sm="12" md="12" lg="2" class="px-xs-0">
          <h4 class="font-weight-regular white--text font-18">
            {{ $t("Links") }}
          </h4>
          <p class="mt-10 mb-0 white--text">Link 1</p>
          <p class="white--text">Link 2</p>
        </v-col> -->
        <!-- -----------------------------------------------
        Third Column
      ----------------------------------------------- -->
        <v-col cols="12" sm="12" md="12" lg="3">
          <h4 class="font-weight-regular white--text font-18">
            {{ $t("Follow Us") }}
          </h4>
          <div class="social-icons mt-10">
            <a href="#">
              <v-img :src="require('@/static/svg/f.svg')" width="42" alt="facebook" />
              <!-- <i class="mdi mdi-facebook"></i> -->
            </a>
            <a href="#">
              <v-img :src="require('@/static/svg/t.svg')" width="42" alt="twitter" />
              <!-- <i class="mdi mdi-twitter"></i> -->
            </a>
            <a href="#">
              <v-img :src="require('@/static/svg/i.svg')" width="42" alt="instagram" />
              <!-- <i class="mdi mdi-instagram"></i> -->
            </a>
          </div>
        </v-col>
        <!-- -----------------------------------------------
        Fourth Column
      ----------------------------------------------- -->
        <v-col cols="12" sm="12" md="12" lg="4">
          <h4 class="font-weight-regular white--text font-18">
            {{ $t("Download our app at the following Link") }}
          </h4>
          <v-row class="mt-3 text-center">
            <v-col cols="6">
              <v-img :src="require('@/static/svg/google.svg')" width="150" alt="google" />
            </v-col>
            <v-col cols="6">
              <v-img :src="require('@/static/svg/apple.svg')" width="150" alt="apple"
            /></v-col>
          </v-row>
        </v-col>
      </v-row>
      <div class="footer-bottom-bar font-14">
        <div class="d-block d-md-flex align-center">
          <span>
            {{ $t("All Rights Reserved by") }}
            <a href="https://iwings.io/" class="link">iwings.io</a>
          </span>
          <div class="mrt-auto-custom">
            <div class="d-flex align-center">
              <n-link class="nav-link link px-4" nuxt to="/terms_of_use">
                {{ $t("Terms of Use") }}
              </n-link>
              <n-link class="nav-link link px-4" nuxt to="/privacy_policy">
                {{ $t("Privacy Policy") }}
              </n-link>
              <!-- <a href="/" class="link px-4">Terms of Use</a> -->
              <!-- <a href="/" class="link px-4">Legal Disclaimer</a> -->
              <!-- <a href="/" class="link px-4">Privacy Policy</a> -->
            </div>
          </div>
        </div>
      </div>
    </v-container>
  </v-footer>
  <!-- -----------------------------------------------
        End Footer
  ----------------------------------------------- -->
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      data: [],
    };
  },
  components: {},
};
</script>
<style scoped>
.mrt-auto-custom {
  margin-left: auto;
  margin-right: unset !important;
}
[dir="rtl"] .mrt-auto-custom {
  margin-right: auto !important;
  margin-left: unset !important;
}
</style>
<style>
.div-footer * {
  color: white !important;
  text-decoration: unset !important;
  border-bottom: 1px solid transparent;
}
.div-footer * ul li a {
  transition: all 0.1s;
  text-decoration: unset !important;
}
.div-footer * ul li a:hover {
  border-bottom: 1px solid white;
  color: rgb(96, 248, 228) !important;
}
.v-application .link:hover {
  color: rgb(96, 248, 228) !important;
}
.div-footer * ul {
  list-style: circle;
  padding-right: 12px;
}
.footer-sections {
  gap: 25px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
@media (max-width: 991px) {
  .footer-section {
    width: 100%;
  }
}
</style>
