export interface DynamicTableColumnFilter {
  key: string;
  name: string;
  options: {
    label: string;
    value: string;
  }[];
  type: string;
}
