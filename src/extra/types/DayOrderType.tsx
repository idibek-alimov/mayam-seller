export type DayOrderType = {
  count: number;
  price: number;
  time: string;
  // hour?: number;
};
export let EmptyDayOrder: DayOrderType = {
  count: 0,
  price: 0,
  time: "",
  // hour: 0,
};
