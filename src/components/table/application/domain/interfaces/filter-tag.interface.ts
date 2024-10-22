export interface FilterTag {
  displayKey: string;
  value: string | Array<string>;
  tagValue?: string | Array<string>;
  headerLabel?: string;
  filterType?: string;
  multi?: boolean;
  showColumn?: boolean;
}
