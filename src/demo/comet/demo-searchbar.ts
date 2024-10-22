import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";
import "../../components/searchbar/comet-searchbar";

@customElement("demo-searchbar")
export class DemoSearchbar extends LitElement {
  handleSearchChange(event: CustomEvent) {
    const searchTerm = this.shadowRoot.getElementById("search-change");
    searchTerm.innerText = event.detail;
  }

  render() {
    return html`
      <h1 style="color: var(--primary-50); margin-top: 0">Comet Searchbar</h1>

      <div id="no-search-icon-container" style="padding-top: 16px;">
        <h3>Predictive search</h3>
        <div id="flex">
          <comet-searchbar
            border="light"
            placeholder="Search with predictive results"
            @search-bar-input="${this.handleSearchChange}"
            .predictive=${true}
            .items=${[
              "Agrisano",
              "AMB Assurances SA",
              "Aquilana",
              "Assura",
              "Atupri",
              "Avenir",
              "Bildende Künstler",
              "Birchmeier",
              "CONCORDIA",
              "CSS",
              "Easy Sana",
              "EGK",
              "Einsiedler Krankenkasse",
              "GALENOS",
              "Gewerbliche",
              "Glarner",
              "Helsana",
              "Hotela",
              "KLuG",
              "KPT",
              "Lumneziana",
              "Luzerner Hinterland",
              "Metallbaufirmen",
              "Mutuel Krankenversicherung",
              "Mutuel Neuchateloise",
              "ÖKK",
              "Philos",
              "rhenusana",
              "sana24",
              "sanavals",
              "Sanitas",
              "SLKK",
              "sodalis",
              "Steffisburg",
              "Sumiswalder",
              "SUPRA",
              "SWICA",
              "Vallée d'Entremort",
              "Visana",
              "Visperterminen",
              "vita surselva",
              "Vivacare",
              "Vivao Sympany",
              "Wädenswil",
              "Liechtenstein Life",
              "Simpego",
            ]}
          ></comet-searchbar>
        </div>
      </div>

      <div id="sizes-container">
        <h3>Sizes</h3>
        <div id="flex">
          <comet-searchbar
            border="medium"
            size="small"
            placeholder="Small 32px height"
            @search-bar-input="${this.handleSearchChange}"
          ></comet-searchbar>

          <comet-searchbar
            id="medium-round"
            border="medium"
            size="medium"
            placeholder="Medium 40px height (default)"
            @search-bar-input="${this.handleSearchChange}"
          ></comet-searchbar>

          <div id="test-search-term-container" style="width: 100%">
            <comet-searchbar
              id="searchbar3"
              border="medium"
              size="large"
              placeholder="Large 52px height"
              @search-bar-input="${this.handleSearchChange}"
            ></comet-searchbar>
          </div>
        </div>
      </div>

      <div id="shapes-container">
        <h3>Rectangular Shape</h3>
        <div id="flex">
          <comet-searchbar
            border="medium"
            size="small"
            shape="square"
            placeholder="Small 32px height"
            @search-bar-input="${this.handleSearchChange}"
          ></comet-searchbar>

          <comet-searchbar
            border="medium"
            size="medium"
            shape="square"
            placeholder="Medium 40px height (default)"
            @search-bar-input="${this.handleSearchChange}"
          ></comet-searchbar>

          <comet-searchbar
            border="medium"
            size="large"
            shape="square"
            placeholder="Large 52px height"
            @search-bar-input="${this.handleSearchChange}"
          ></comet-searchbar>
        </div>
      </div>

      <div id="borders-container">
        <h3>Borders</h3>
        <div id="flex">
          <comet-searchbar
            placeholder="None (default)"
            @search-bar-input="${this.handleSearchChange}"
          ></comet-searchbar>

          <comet-searchbar
            border="light"
            placeholder="Light"
            @search-bar-input="${this.handleSearchChange}"
          ></comet-searchbar>

          <comet-searchbar
            border="medium"
            placeholder="Medium"
            @search-bar-input="${this.handleSearchChange}"
          ></comet-searchbar>

          <comet-searchbar
            border="dark"
            placeholder="Dark"
            @search-bar-input="${this.handleSearchChange}"
          ></comet-searchbar>
        </div>
      </div>

      <div id="no-search-icon-container" style="padding-top: 16px;">
        <h3>Search icon display is optional</h3>
        <div id="flex">
          <comet-searchbar
            border="light"
            placeholder="No search icon"
            .showSearchIcon=${false}
            @search-bar-input="${this.handleSearchChange}"
          ></comet-searchbar>
        </div>
      </div>

      <div id="result" style="margin-top: 48px;">
        Search term: <span id="search-change"></span>
      </div>

      <div
        id="initialValue"
        style="margin-top: 48px; display: grid; grid-gap: 16px;"
      >
        <div>
          <comet-searchbar
            border="dark"
            placeholder="Search"
            value="With initial value"
            @search-bar-input="${this.handleChange}"
          ></comet-searchbar>
        </div>
        <div id="result-initial-value">
          Initial value change: <span id="search-initial-value-change"></span>
        </div>
      </div>
    `;
  }

  handleChange(event: CustomEvent) {
    const searchTerm = this.shadowRoot.getElementById(
      "search-initial-value-change"
    );
    searchTerm.innerText = event.detail;
  }

  static styles = css`
    #flex {
      align-items: center;
      display: flex;
      gap: 16px;
    }

    comet-searchbar {
      width: 100%;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "demo-searchbar": DemoSearchbar;
  }
}
