import { DynamicTableColumnFilter } from "./dynamic-table-column-filter.interface";
import { DynamicTableColumnHeaderCell } from "./dynamic-table-column-header-cell.interface";

export interface DynamicTableColumnHeader {
  auto_transform?: boolean; // used when we want to have text not part of the DTO data
  cell: DynamicTableColumnHeaderCell;
  clickable?: boolean;
  custom_prefix?: string;
  headerLabel: string;
  filter: boolean;
  filterConfig: DynamicTableColumnFilter;
  replace_empty_value?: string;
  showColumn: boolean;
  sort: boolean;
  sortDefault?: string; // asc or desc
  sortKey: string;
  target_data: string[];
  transform_type?: string;
  tSelector: string;
}
