import { Observable, Subject } from "rxjs";
import { DynamicTableColumnHeader } from "../interfaces/dynamic-table-column-header.interface";
import { FilterTag } from "../interfaces/filter-tag.interface";

export class FilterService {
  private readonly ALL_WORD: string = "All";

  private _filterTags: Array<FilterTag>;
  private _valueToLabelDictionary: { [key: string]: string };
  private _columnData: Array<any>;

  // Subjects
  private _modifyTagsSection$: Subject<FilterTag> = new Subject();
  private _modifyFilterValues$: Subject<{
    displayKey?: string;
    clear?: boolean;
  }> = new Subject();

  constructor(
    columns: Array<DynamicTableColumnHeader>,
    filter: { [key: string]: string }
  ) {
    this._columnData = columns
      .filter(({ filter }) => filter)
      .map(
        ({
          cell: { displayKey },
          headerLabel,
          filterConfig: { options, type, key },
          showColumn,
        }) => ({
          displayKey,
          headerLabel,
          options,
          filterKey: key,
          filterType: type,
          showColumn,
        })
      );

    this._valueToLabelDictionary = this._columnData
      .flatMap(({ options, displayKey }) => ({ displayKey, options }))
      .filter(({ options }) => options)
      .reduce((prev, { displayKey, options }) => {
        prev[displayKey] = (
          options as Array<{ label: string; value: string }>
        ).reduce((prev, { label, value }) => {
          prev[value] = label;
          return prev;
        }, {});

        return prev;
      }, {});

    this._filterTags = this._columnData.map(
      ({ displayKey, headerLabel, filterType, filterKey, showColumn }) => {
        const defaultFilter = filter[filterKey.split(",")[0]];
        let tagValue: string | Array<string> = this.ALL_WORD;
        let value = this.ALL_WORD;

        if (defaultFilter) {
          value = defaultFilter;

          if (typeof defaultFilter !== "string")
            tagValue = (defaultFilter as Array<string>)?.map(
              (_) => this._valueToLabelDictionary[displayKey][_]
            );
          else
            tagValue = this._valueToLabelDictionary[displayKey]
              ? this._valueToLabelDictionary[displayKey][defaultFilter]
              : defaultFilter;
        }

        return {
          displayKey,
          value,
          tagValue,
          headerLabel,
          filterType,
          showColumn,
        };
      }
    );
  }

  getFilterTags(): Array<FilterTag> {
    return this._filterTags;
  }

  updateFilterTagsByNewColumns(
    columns: Array<DynamicTableColumnHeader>
  ): Array<FilterTag> {
    this._filterTags = this._filterTags.map((filterTag) => {
      const col = columns.find(
        (_) => _.cell.displayKey === filterTag.displayKey
      );
      if (col) {
        filterTag.showColumn = col.showColumn;
      }

      return filterTag;
    });

    return this._filterTags;
  }

  modifyTagsSection({
    displayKey,
    value: val,
    multi = false,
  }: FilterTag): void {
    let tagValue;

    if (multi) {
      tagValue =
        val !== this.allWord() && typeof val === "object" && val.length
          ? val.map((v) => `${this._valueToLabelDictionary[displayKey][v]}`)
          : this.ALL_WORD;
    } else if (typeof val === "string") {
      tagValue = this._valueToLabelDictionary[displayKey]
        ? this._valueToLabelDictionary[displayKey][val] || this.ALL_WORD
        : val !== ""
        ? val
        : this.ALL_WORD;
    }

    this._modifyTagsSection$.next({ displayKey, value: val, tagValue });
  }

  getModifyTagsSectionListener$(): Observable<FilterTag> {
    return this._modifyTagsSection$.asObservable();
  }

  modifyFilterValues(filterValues: {
    displayKey?: string;
    clear?: boolean;
  }): void {
    if (filterValues.clear)
      this._filterTags.forEach(({ displayKey }) =>
        this.modifyTagsSection({ displayKey, value: this.ALL_WORD })
      );
    this._modifyFilterValues$.next(filterValues);
  }

  getModifyFilterValuesListener$(): Observable<{
    displayKey?: string;
    clear?: boolean;
  }> {
    return this._modifyFilterValues$.asObservable();
  }

  getFilterOptionsByDisplayKey(
    key: string
  ): Array<{ label: string; value: string }> {
    const index: number = this._columnData.findIndex(
      ({ filterKey }) => key === filterKey
    );
    if (index === -1) return [];

    return this._columnData[index].options || [];
  }

  getFilterValueFromLabel(displayKey: string, label: string): string {
    if (
      !this._valueToLabelDictionary ||
      !this._valueToLabelDictionary[displayKey]
    )
      return label;
    return label
      .split(",")
      .map((value) => this._valueToLabelDictionary[displayKey][value] || value)
      .join(", ");
  }

  allWord(): string {
    return this.ALL_WORD;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "filter-service": FilterService;
  }
}
