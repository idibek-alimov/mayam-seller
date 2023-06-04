export type WeekOrderType = {
  count: number;
  price: number;
  day: number;
  dayOfTheWeek?: string;
};
export let EmptyWeekOrder: WeekOrderType = {
  count: 0,
  price: 0,
  day: 0,
};
