<template>
  <client-only>
    <div class="ads-wrapper">
      <ins
        class="adsbygoogle"
        style="display:block"
        :data-ad-client="adClient"
        :data-ad-slot="adSlot"
        :data-ad-format="adFormat"
        :data-full-width-responsive="fullWidthResponsive.toString()"
      >
      </ins>
    </div>
  </client-only>
</template>

<script>
export default {
  props: {
    adClient: { type: String, default: "ca-pub-9653005764752290" },
    adSlot: { type: String, required: true },
    adFormat: { type: String, default: "auto" },
    fullWidthResponsive: { type: Boolean, default: true },
  },
  mounted() {
    this.$nextTick(() => {
      if (process.client) {
        if (!document.querySelector('script[src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"]')) {
          const script = document.createElement('script');
          script.setAttribute('async', 'true');
          script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
          script.onload = () => {
            if (window.adsbygoogle) {
              try {
                (window.adsbygoogle = window.adsbygoogle || []).push({});
              } catch (e) {
                console.error("AdSense Error:", e);
              }
            }
          };
          document.head.appendChild(script);
        } else if (window.adsbygoogle) {
          try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
          } catch (e) {
            console.error("AdSense Error:", e);
          }
        }
      }
    });
  },
};
</script>
