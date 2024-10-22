export interface DisabledConfig {
  day_ranges?: number[][];
  month?: number[];
  valid_range?: ValidDateRange;
  weekday?: number[];
  year?: number[];
}

export interface ValidDateRange {
  end?: string;
  start?: string;
}

export interface RangeConfig {
  day?: number;
  month_string?: string;
  month_index?: number;
  year?: number;
}
