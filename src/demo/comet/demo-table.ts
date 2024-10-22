import { css, html, LitElement } from "lit";
import { customElement, query, state } from "lit/decorators.js";
import { Observable, Subject } from "rxjs";
import "../../components/table/comet-table";

@customElement("demo-table")
export class BasicElement extends LitElement {
  private _faker = (window as any).faker;
  private _seed = 12345;

  @state()
  totalItems: number = 0;
  @state()
  pageSize: number = 10;
  @state()
  pageSizeOptions: number[] = [10, 20, 40];
  @state()
  items: Array<any> = [];
  @state()
  columns: Array<any>;
  @state()
  showClearButton: boolean;
  @state()
  hideColumns: boolean = false;
  @state()
  refreshDataTable$: Subject<void> = new Subject();
  @query("select")
  select: HTMLSelectElement;
  @state()
  locale = "en";

  private defaultFilters = {
    productType: ["homeowner", "motor"],
    status: "Active",
    customerType: "LegalEntity",
    criteria: "Hello world",
  };

  private loadData: (
    currentPage: number,
    pageSize: number,
    sortValue: string,
    searchBarValue: string,
    sort: Array<string>,
    filter: { [key: string]: string }
  ) => Observable<{ content: Array<any>; total_elements: number }>;
  private transformData: (data: Array<any>) => Array<any>;
  private mockItems = [];

  private backendConfig = {
    action_buttons: [
      {
        dropdownIcons: [
          {
            displayText: "_LL_compare_in",
            eventName: "COMPARE",
            tSelector: "compare-in",
          },
          {
            displayText: "_LL_sell_in",
            eventName: "SELL",
            tSelector: "sell-in",
          },
          {
            icon: {
              key: "archive-drawer",
              size: "icon-md",
            },
            displayText: "_LL_move_to_archive",
            eventName: "ARCHIVE",
            tSelector: "move-to-archive",
          },
        ],
        eventName: "",
        icon: {
          key: "menu-vertical",
          size: "icon-md",
        },
        tSelector: "actions-dropdown",
      },
    ],
    additional_filters: [
      {
        controlName: "ownUsers",
        defaultValue: false,
        optionsPanelModifiers: "-compact",
        sourceName: "ownUsers",
        sources: [
          {
            name: "ownUsers",
            values: [
              {
                key: false,
                value: "_ROLES_permission_customer_view_all",
              },
              {
                key: true,
                value: "_ROLES_permission_customer_view_own",
              },
            ],
          },
        ],
      },
    ],
    additional_needed_data: [
      {
        name: "city",
        target_data: ["city"],
      },
      {
        name: "house_number",
        target_data: ["house_number"],
      },
      {
        name: "postal_code",
        target_data: ["postal_code"],
      },
      {
        name: "street",
        target_data: ["street"],
      },
      {
        name: "id",
        target_data: ["id"],
      },
    ],
    expandable_config: {
      data: [
        {
          name: "address",
          header: "Address",
          transform_type: "address",
        },
        {
          name: "email",
          header: "Email address",
        },
      ],
      type: "EXPANDABLE_ADDITIONAL_COLUMNS",
    },
    column_headers: [
      {
        cell: {
          displayKey: "is_favorite",
          options: {
            eventName: "CUSTOMER_STAR_CLICKED",
            iconTrue: "favorite",
            iconFalse: "nonFavorite",
          },
          tSelector: "customer_favorite_",
          type: "CELL_ICON_ACTION",
        },
        filter: false,
        clickable: true,
        headerLabel: "Favorite",
        showColumn: true,
        sort: true,
        sortDefault: "asc",
        sortKey: "is_favorite,isFavorite,lastname,firstname,legalName",
        target_data: ["is_favorite"],
        tSelector: "customer_favorite_header",
      },
      {
        cell: {
          displayKey: "customer_name",
          options: {
            eventName: "CUSTOMER_NAME_CLICKED",
          },
          tSelector: "customer_name_",
          type: "CELL_STRING_ACTION",
        },
        filter: true,
        filterConfig: {
          key: "criteria,lastName,firstName",
          name: "_COL_column_name",
          type: "FILTER_STRING",
        },
        clickable: true,
        headerLabel: "Customer name",
        showColumn: true,
        sort: true,
        sortDefault: "asc",
        sortKey: "customer_name,lastname,firstname,legalName",
        target_data: ["full_name"],
        tSelector: "customer_name_header",
      },
      // {
      //   cell: {
      //     displayKey: 'user_name',
      //     tSelector: 'user-name_',
      //     type: 'CELL_STRING_COPY'
      //   },
      //   headerLabel: '_ACC_user_name',
      //   showColumn: true,
      //   tSelector: 'user_name_header'
      // },
      // {
      //   cell: {
      //     displayKey: 'display_name',
      //     imageUrl: 'logo_icon',
      //     tooltipText: 'tooltip_text',
      //     tSelector: 'display-name_',
      //     type: 'CELL_IMAGE_STRING'
      //   },
      //   headerLabel: '_ACC_display_name',
      //   showColumn: true,
      //   tSelector: 'display_name_header'
      // },
      {
        cell: {
          displayKey: "birthdate",
          tSelector: "birthdate_",
          type: "CELL_STRING",
        },
        headerLabel: "Date of birth",
        showColumn: true,
        sort: false,
        target_data: ["birthdate"],
        transform_type: "date",
        tSelector: "birthdate_header",
      },
      {
        cell: {
          displayKey: "product_type",
          tSelector: "product_type_",
          type: "CELL_STRING",
        },
        filter: true,
        filterConfig: {
          key: "productType",
          name: "productType",
          options: [
            {
              label: "Homeowner C-Suite",
              value: "homeowner",
            },
            {
              label: "Household",
              value: "household",
            },
            {
              label: "Private liability",
              value: "liability",
            },
            {
              label: "Motor",
              value: "motor",
            },
          ],
          type: "FILTER_MULTIPLE_OPTION",
        },
        headerLabel: "Product type",
        showColumn: true,
        sort: true,
        sortKey: "product_type,productTypesCount,productTypes",
        target_data: ["product_types"],
        transform_type: "lokalise-multi-strings",
        tSelector: "product_type_header",
      },
      {
        cell: {
          displayKey: "customer_type",
          tSelector: "customer_type_",
          type: "CELL_STRING",
        },
        filter: true,
        filterConfig: {
          key: "customerType",
          name: "customerType",
          options: [
            {
              label: "Private customer",
              value: "PersonAccount",
            },
            {
              label: "Business customer",
              value: "LegalEntity",
            },
          ],
          type: "FILTER_SINGLE_OPTION",
        },
        headerLabel: "Type",
        showColumn: true,
        sort: true,
        sortKey: "customer_type,recordType.name,lastname,firstname,legalName",
        target_data: ["customer_type"],
        transform_type: "lokalise",
        tSelector: "customer_type_header",
      },
      {
        cell: {
          displayKey: "status",
          tSelector: "status_",
          type: "CELL_BADGE",
        },
        custom_prefix: "_GEN_status",
        filter: true,
        filterConfig: {
          key: "status",
          name: "status",
          options: [
            {
              label: "Active",
              value: "Active",
            },
            {
              label: "Inactive",
              value: "Inactive",
            },
            {
              label: "Don",
              value: "Don",
            },
          ],
          type: "FILTER_SINGLE_OPTION",
        },
        headerLabel: "Status",
        showColumn: true,
        sort: true,
        sortKey: "status",
        target_data: ["status"],
        transform_type: "lokalise",
        tSelector: "status_header",
      },
      {
        cell: {
          displayKey: "buttons",
          tSelector: "actions_",
          type: "CELL_BUTTON",
        },
        headerLabel: "Actions",
        showColumn: true,
        tSelector: "digital_signature_actions_header",
      },
      {
        headerLabel: "",
        auto_transform: true,
        cell: {
          displayKey: "see_more",
          tSelector: "see_more_",
          type: "CELL_EXPANDABLE_TRIGGER",
        },
        custom_prefix: " ",
        showColumn: true,
        sort: false,
        target_data: ["see_more"],
        transform_type: "lokalise",
        tSelector: "see_more_header",
      },
    ],
    list_type: "customers",
    loader_text: "_CUL_retrieving_customer_data",
    no_results_message: {
      subtitle: "_CUL_no_data_subtitle",
      title: "_CUL_no_data_title",
    },
    row_t_selector: "customers_list_row_",
    searchbar_options: {
      i18nPrefixKey: "_CUL_customer_",
    },
    type: "table",
    lokalise_prefix: "_CUL_",
  };

  connectedCallback(): void {
    super.connectedCallback();
    this.mockItems = Array.from(
      { length: 101 },
      this._generateRandomRecord.bind(this)
    );

    console.log(this.backendConfig);

    this.columns = [
      ...this.backendConfig.column_headers.map((item) => ({ ...item })),
    ];

    this.transformData = (data: Array<any>) => {
      const obj = {
        expandableType: "EXPANDABLE_ADDITIONAL_COLUMNS",
        expandableConfig: [
          {
            header: "_PROD_address",
            t_selector: "expanded_data_address_",
            value: "Hardenbergplatz 14, 10623 Berlin",
          },
          {
            header: "_PROD_email",
            t_selector: "expanded_data_email_",
            value: "vicente.parra.this.is.the.one@wefox.com",
          },
        ],
      };

      data = data.map((item) => {
        item["expandableConfig"] =
          this.backendConfig.expandable_config.data.map(({ name, header }) => ({
            value: name,
            header,
          }));
        return {
          ...obj,
          ...item,
        };
      });

      return data;
    };

    this.loadData = (
      currentPage: number,
      pageSize: number,
      sortValue: string,
      searchBarValue: string,
      sort: Array<string>,
      filter: { [key: string]: string }
    ): Observable<{ content: Array<any>; total_elements: number }> => {
      const observable = new Observable<{
        content: Array<any>;
        total_elements: number;
      }>((subscriber) => {
        if (searchBarValue === "error")
          throw new Error("Internal server error");

        // BACKEND MOCK

        const sortKey = sort[0];
        const first: number = currentPage * pageSize;

        let filteredData = [];

        // More delay when searching
        if (searchBarValue) {
          filteredData = [...this.mockItems]
            // Filtering by search bar
            .filter((e) => {
              return Object.keys(e)
                .map((key) => String(e[key]))
                .some((property) => {
                  if (!searchBarValue) return true;

                  return property
                    .toLowerCase()
                    .includes(String(searchBarValue).toLowerCase());
                });
            });
        } else {
          filteredData = [...this.mockItems];
        }
        this.totalItems = filteredData.length;

        // Sorting
        this.items = filteredData
          .sort((a, b) => {
            if (!sortKey) return 1;

            const first = String(a[sortKey]);
            const second = String(b[sortKey]);

            return Object.create({
              asc: () => {
                return first.localeCompare(second);
              },
              desc: () => {
                return second.localeCompare(first);
              },
            })[sortValue]();
          })
          // Slicing
          .slice(first, first + pageSize);

        subscriber.next({
          content: this.items,
          total_elements: this.totalItems,
        });
        subscriber.complete();
      });

      return observable;
    };
  }

  private _setLocale() {
    this.locale = this.select.value;
  }

  private _generateRandomRecord() {
    this._faker.seed(++this._seed);
    const id = this._faker.random.uuid();
    const is_favorite = this._faker.random.boolean();
    const customer_name = this._faker.name.findName();
    // const user_name = this._faker.random.arrayElement([this._faker.internet.userName(customer_name), '-', '']);
    // const display_name = this._faker.company.companyName();
    // const logo_icon = this._faker.image.business(32, 32, false).replace('pixel', 'flickr');
    const birthdate = new Date(this._faker.date.past()).toLocaleDateString();
    const email = this._faker.internet.email();
    const product_type = this._faker.random.arrayElement([
      "homeowner",
      "household",
      "liability",
      "motor",
    ]);
    const customer_type = this._faker.random.arrayElement([
      "LegalEntity",
      "PersonAccount",
    ]);
    const person_type = this._faker.random.arrayElement([
      "Individual",
      "Business",
    ]);
    const status = this._faker.random.arrayElement([
      "Active",
      "Inactive",
      "Super long word that does not fit",
    ]);
    const statusBadge = status === "Active" ? "success" : "error";
    const see_more = "see more";
    const buttons = [
      {
        displayText: "Edit",
        eventName: "EDIT_ROLE",
        icon: {
          color: "primary-base",
          key: "edit",
          size: "icon-md",
        },
        tSelector: "edit-role",
      },
      {
        disabled: true,
        displayText: "Delete",
        eventName: "NONE",
        icon: {
          color: "neutral-base",
          key: "trash",
          size: "icon-md",
        },
        tSelector: "disabled-delete-role",
      },
      {
        dropdownIcons: [
          {
            displayText: "Price comparison",
            eventName: "COMPARE",
            tSelector: "compare-in",
          },
          {
            displayText: "Sell external policy",
            eventName: "SELL",
            tSelector: "sell-in",
          },
          {
            icon: {
              key: "archive-drawer",
              size: "icon-md",
            },
            displayText: "Move to archive",
            eventName: "ARCHIVE",
            tSelector: "move-to-archive",
          },
        ],
        eventName: "",
        icon: {
          key: "menu-vertical",
          size: "icon-md",
        },
        tSelector: "actions-dropdown",
      },
      {
        class: ["btn-square", "p-none"],
        displayText: "",
        eventName: "NONE",
        icon: {
          color: "danger-base",
          key: "feedback-info",
          size: "icon-md",
        },
        tSelector: "tooltip-disabled-delete-role",
        tooltip: {
          position: "bottomLeft",
          text: "_ROLES_delete_error_tooltip_text",
        },
      },
    ];

    return {
      id,
      is_favorite,
      customer_name,
      // user_name,
      // display_name,
      // logo_icon,
      birthdate,
      email,
      product_type,
      customer_type,
      person_type,
      status,
      statusBadge,
      buttons,
    };
  }

  render() {
    return html`
      <h1 style="color: var(--primary-50); margin-top: 0">Comet Table</h1>

      <h3 style="margin-top: 60px">Comet default table</h3>

      <select @change="${this._setLocale}">
        <option value="en" selected>en</option>
        <option value="de">de</option>
        <option value="it">it</option>
        <option value="fr">fr</option>
      </select>

      <vaadin-button
        style="margin-bottom: 1em;"
        theme="${this.showClearButton ? "" : "primary"} small"
        @click=${() => {
          this.showClearButton = !this.showClearButton;
        }}
      >
        ${this.showClearButton ? "Hide clear button" : "Show clear button"}
      </vaadin-button>

      <vaadin-button
        id="hide-columns"
        theme="${this.hideColumns ? "" : "primary"} small"
        @click=${() => {
          this.hideColumns = !this.hideColumns;

          if (this.hideColumns) {
            const newColumns = [...this.columns.map((item) => ({ ...item }))];
            Array.of(1, 2, 3, 4, 7).forEach((ids) => {
              newColumns.at(ids).showColumn = false;
            });
            this.columns = [...newColumns.map((item) => ({ ...item }))];
          } else {
            this.columns = [
              ...this.backendConfig.column_headers.map((item) => ({ ...item })),
            ];
          }
        }}
      >
        ${this.hideColumns ? "Show columns" : "Hide columns"}
      </vaadin-button>

      ${this.columns && this.columns.length !== 0
        ? html`
            <comet-table
              id="default-table"
              hasGlobalSearchbar
              hasPaginator
              .defaultFilters=${this.defaultFilters}
              .searchbarPlaceholder=${"Search policies by customer name or policy ID"}
              ?showClearButton=${this.showClearButton}
              .columns=${this.columns}
              .pageSize=${this.pageSize}
              .loadData=${this.loadData}
              .transformData=${this.transformData}
              .pageSizeOptions=${this.pageSizeOptions}
              .locale=${this.locale}
              .totalItems=${this.totalItems}
              .refreshDataTable$=${this.refreshDataTable$}
              @on-table-event=${({ detail }) => {
                alert(`Dispatch ${detail.eventName} event`);

                if (detail.eventName === "ON_CLEAR_ALL_FILTERS") {
                  this.showClearButton = false;
                }
              }}
            >
              <div slot="table-header">
                <h1>Table header</h1>
              </div>
            </comet-table>
          `
        : ""}

      <h3 style="margin-top: 60px">Comet space table</h3>
      ${this.columns && this.columns.length !== 0
        ? html`
            <comet-table
              hasGlobalSearchbar
              hasPaginator
              space
              autoHeight
              .searchbarPlaceholder=${"Search policies by customer name or policy ID"}
              .columns=${this.columns}
              .loadData=${this.loadData}
              .pageSize=${2}
              .pageSizeOptions=${[2, 10]}
              .transformData=${this.transformData}
              .locale=${this.locale}
              .refreshDataTable$=${this.refreshDataTable$}
            >
            </comet-table>
          `
        : ""}
    `;
  }

  static styles = css``;
}

declare global {
  interface HTMLElementTagNameMap {
    "demo-table": BasicElement;
  }
}
