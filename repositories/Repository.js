import MainPageRepository from "~/repositories/MainPageRepository";
import CurrencyPriceRepository from "~/repositories/CurrencyPriceRepository";
import ChartRepository from "~/repositories/ChartRepository";
import GoldRepository from "~/repositories/GoldRepository";

export default ($axios) => ({
  MainPage: MainPageRepository($axios),
  CurrencyPrices: CurrencyPriceRepository($axios),
  Chart: ChartRepository($axios),
  Gold: GoldRepository($axios),
});
