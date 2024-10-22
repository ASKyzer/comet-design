import "@vaadin/avatar";
import "@vaadin/avatar-group";
import "@vaadin/horizontal-layout";
import "@vaadin/menu-bar";
import { css, html, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";

interface Person {
  pictureUrl: string;
  firstName: string;
  lastName: string;
  id: string;
}

@customElement("demo-avatar")
export class DemoAvatar extends LitElement {
  @state()
  private person?: Person;

  @state()
  private items: Person[] = [
    {
      pictureUrl:
        "https://media.istockphoto.com/id/1389898237/photo/cute-girl-iconic-character-with-glasses-3d-rendering.webp?b=1&s=170667a&w=0&k=20&c=xEwluZU-uZyswPioZegpgz-zZMZ2S8tQsfmtD2VYRk0=",
      firstName: "Paquita",
      lastName: "Salas",
      id: "57464564",
    },
    {
      pictureUrl:
        "https://media.istockphoto.com/id/1389898138/es/foto/hombre-barbudo-sin-pelo-lindo-personaje-ic%C3%B3nico-renderizado-3d.jpg?s=612x612&w=0&k=20&c=OLXdHx2C91732Cp90d5cybgfvS09FRHyATu3g36gIIc=",
      firstName: "John",
      lastName: "Doe",
      id: "234567563",
    },
    {
      pictureUrl:
        "https://media.istockphoto.com/id/1389898125/photo/young-woman-chewing-gum-cute-iconic-character-3d-rendering.webp?b=1&s=170667a&w=0&k=20&c=8pcgITFZ5X3OxJQBVtoHxa3bmMprtKkGAId5ZkufPuo=",
      firstName: "Jane",
      lastName: "Smith",
      id: "3453453454235",
    },
    {
      pictureUrl:
        "https://media.istockphoto.com/id/1389898187/es/foto/mujer-adulta-joven-lindo-personaje-ic%C3%B3nico-renderizado-3d.jpg?s=612x612&w=0&k=20&c=jBnCaGlqnPE_JDl_c7odgJoYGWZnJzxAj8v_yDe8dLk=",
      firstName: "Michael",
      lastName: "Johnson",
      id: "3256475543",
    },
    {
      pictureUrl:
        "https://media.istockphoto.com/id/1389898125/es/foto/joven-mujer-masticando-chicle-lindo-personaje-ic%C3%B3nico-renderizado-3d.jpg?s=612x612&w=0&k=20&c=lPEnkCbPcOCPAMK8D9N-YP2zQZTLUDB1Nj_cBp8w64I=",
      firstName: "Emily",
      lastName: "Williams",
      id: "87654345",
    },
    {
      pictureUrl:
        "https://img.freepik.com/free-psd/3d-illustration-bald-person-with-glasses_23-2149436184.jpg?w=1060&t=st=1687859851~exp=1687860451~hmac=cb9fe4e4dada6476a03e92c542df6c14bd353057e6e0b1c22777a2a910c45608",
      firstName: "David",
      lastName: "Zoolander",
      id: "376235923",
    },
    {
      pictureUrl:
        "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436178.jpg?w=1060&t=st=1687859720~exp=1687860320~hmac=36a51525bc808cc1e10aa2fc0dfd6ecf3e1f784bdf4f9a902ab1909e63610bbe",
      firstName: "Edna",
      lastName: "Mode",
      id: "98034759345",
    },
  ];

  @state()
  private menuBarItems: any[] = [];

  protected override async firstUpdated() {
    this.person = this.items[0];

    const avatarElement = document.createElement("vaadin-avatar");
    avatarElement.name = `${this.person?.firstName} ${this.person?.lastName}`;
    avatarElement.img = this.person?.pictureUrl;

    this.menuBarItems = [
      {
        component: avatarElement,
        children: [
          {
            text: "Profile",
          },
          {
            text: "Settings",
          },
          {
            text: "Help",
          },
          {
            text: "Sign out",
          },
        ],
      },
    ];
  }

  protected override render() {
    return html`
      <h1 style="color: var(--primary-50); margin-top: 0">vaadin Avatar</h1>
      <div style="max-width: 800px;">
        <div style="margin-bottom: 48px;">
          <div class="section-title">Name and Abbreviation</div>
          <vaadin-horizontal-layout theme="spacing" id="basicAvatarContainer">
            ${this.items.map(
              (person) =>
                html`
                  <vaadin-avatar
                    .name="${person.firstName} ${person.lastName}"
                    .abbr=""
                  ></vaadin-avatar>
                `
            )}
          </vaadin-horizontal-layout>
        </div>

        <div style="margin-bottom: 48px;">
          <div class="section-title">Image</div>
          <vaadin-horizontal-layout theme="spacing">
            <vaadin-avatar .img="${this.items[0].pictureUrl}"></vaadin-avatar>
          </vaadin-horizontal-layout>
        </div>

        <div style="margin-bottom: 48px;">
          <div class="section-title">Avatar Group with Images</div>
          <vaadin-avatar-group .maxItemsVisible="${3}">
            ${this.items.map(
              (person) => html`
                <vaadin-avatar
                  .name="${person.firstName} ${person.lastName}"
                  .img="${person.pictureUrl}"
                ></vaadin-avatar>
              `
            )}
          </vaadin-avatar-group>
        </div>

        <div style="margin-bottom: 48px;">
          <div class="section-title">Background Color</div>
          <vaadin-avatar-group
            .items="${this.items.map((person, index) => ({
              name: `${person.firstName} ${person.lastName}`,
              colorIndex: index,
            }))}"
          >
          </vaadin-avatar-group>
        </div>

        <div style="margin-bottom: 48px;">
          <div class="section-title">Size Variants</div>
          <vaadin-horizontal-layout theme="spacing">
            ${this.items.map(
              (person) => html`
                <vaadin-avatar
                  .name="${person.firstName} ${person.lastName}"
                  .img="${person.pictureUrl}"
                  theme="${this.getTheme(person)}"
                ></vaadin-avatar>
              `
            )}
          </vaadin-horizontal-layout>
        </div>

        <div style="margin-bottom: 48px;">
          <div class="section-title">Menu Bar</div>
          <vaadin-menu-bar
            .name="${this.items[0].firstName} ${this.items[0].lastName}"
            .items="${this.menuBarItems}"
            theme="tertiary-inline"
          ></vaadin-menu-bar>
        </div>
      </div>
    `;
  }

  private getTheme(person: Person) {
    if (person.firstName === "Paquita" || person.firstName === "Edna") {
      return "xlarge";
    } else if (person.firstName === "John" || person.firstName === "David") {
      return "large";
    } else if (person.firstName === "Jane") {
      return "small";
    } else if (person.firstName === "Michael") {
      return "xsmall";
    } else {
      return "";
    }
  }

  static styles = css`
    :host {
      font-family: var(--lumo-font-family);
    }

    .section-title {
      color: var(--primary-50);
      font-weight: var(--typo-font-weights-bold);
      font-size: 1.35rem;
    }
  `;
}
