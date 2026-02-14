<template>
  <client-only>
    <div class="elevationCu">
      <ApexCharts
        type="area"
        height="350"
        :options="chartOptions"
        :series="series"
      ></ApexCharts>
    </div>
  </client-only>
</template>

<script>
export default {
  props: ["chartOptions", "series"],
};
</script>

<style scoped>
.elevationCu {
  border: 1px solid #99a0ab;
  border-radius: 10px;
}
</style>
