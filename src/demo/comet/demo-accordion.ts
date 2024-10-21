import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import "../../components/accordion/comet-accordion";
import { CometIconProps } from "../../components/icon/icon.interface";
import { PEOPLE } from "../constants/people";

@customElement("demo-accordion")
export class DemoAccordion extends LitElement {
  private _tubbies: any[];

  constructor() {
    super();
    this._tubbies = [
      {
        id: "purple",
        expanded: false,
        name: "Tinky Winky",
        description:
          "(played by Dave Thompson and Simon Shelton in the original series and by Jeremiah Krage in the revival series) is the first Teletubby, as well as the largest and oldest of the group. He is covered in purple terrycloth and has a triangular antenna on his head. He often carries a red bag.",
      },
      {
        id: "green",
        expanded: false,
        name: "Dipsy",
        description:
          "(played by John Simmit in the original series and by Nick Kellington in the revival series) is the second Teletubby. He is green and named after his antenna, which resembles a dipstick. Dipsy is the most stubborn of the Teletubbies, and will occasionally refuse to go along with the others group opinion. His face is notably darker than the rest of the Teletubbies, and the creators have stated that he is black. He often wears a large hat with a black and white pattern.",
      },
      {
        id: "yellow",
        expanded: false,
        name: "Laa-Laa",
        description:
          "(played by Nikky Smedley in the original series and by Rebecca Hyland in the revival series) is the third Teletubby. She is yellow and has a curly antenna. Laa-Laa is very sweet, likes to sing and dance, and is often shown looking out for the other Teletubbies. Her favourite toy is an orange rubber ball.",
      },
      {
        id: "red",
        expanded: false,
        name: "Po",
        description:
          "(played by Pui Fan Lee in the original series and by Rachelle Beinart in the revival series) is the fourth Teletubby, as well as the shortest and youngest. She is red and has an antenna shaped like a stick used for blowing soap bubbles. Po normally speaks in a soft voice and has been stated by the show's creators to be Cantonese; she sometimes speaks the language. Her favourite toy is a blue and pink scooter.",
      },
    ];
  }

  public get properties() {
    return {
      tubbies: [],
    };
  }

  set tubbies(val) {
    let oldVal = this._tubbies;
    this._tubbies = val;
    this.requestUpdate("tubbies", oldVal);
  }

  get tubbies(): any {
    return this._tubbies;
  }

  private _title = "Michael Jones";
  private _buttonLabel = "See more details";
  private _icon = {
    name: "person",
    size: "32",
    type: "wecons-circle",
  } as CometIconProps;

  private _iconTermLife = {
    name: "product-life",
    primaryColor: "primary-70",
    size: "32",
    type: "wecons-helix",
  } as CometIconProps;

  private _iconPet = {
    name: "product-pet",
    primaryColor: "primary-70",
    size: "32",
    type: "wecons-helix",
  } as CometIconProps;

  private _theme = "card";
  private _member = PEOPLE[0];

  handleButtonClick() {
    alert("Button clicked");
  }

  goToGucci() {
    window.open("https://www.gucci.com", "_blank");
  }

  goToFendi() {
    window.open("https://www.fendi.com", "_blank");
  }

  toggleAccordion = (tubby: any) => {
    this.tubbies = this.tubbies.map((t: any) => {
      t.expanded = t.id === tubby.id ? true : false;
      return t;
    });
  };

  render() {
    return html`
      <h1 style="color: var(--primary-50); margin-top: 0">Comet Accordion</h1>

      <h3 style="color: var(--primary-50); margin-top: 48px">
        Accordion with minimal config.
      </h3>

      <div class="accordion_container">
        <comet-accordion
          title="Accordion title"
          content="Accordion description can as long as needed. Even though the width is fixed in the component and it is meant to increase in high, the width can be adapted to every design."
        ></comet-accordion>
      </div>

      <h3 style="color: var(--primary-50); margin-top: 48px">
        Card themed accordion with custom content as a slot and default toggle
        type (icon) as chevron.
      </h3>

      <div class="accordion_container">
        <comet-accordion
          @on-click=${this.handleButtonClick}
          title=${this._title}
          buttonLabel=${this._buttonLabel}
          .icon=${this._icon}
          theme=${this._theme}
        >
          ${this._renderMember()}
        </comet-accordion>
      </div>

      <h3 style="color: var(--primary-50); margin-top: 48px">
        Default themed accordion (NOT card themed) with custom content as a
        string value and no footer action button. This also demonstrates how to
        auto close the expanded accordion when another one is opened by just
        mapping the expanded values.
      </h3>

      <div class="accordion_container">
        <h3 style="color: var(--neutral-80); margin-top: 24px; font-size: 24px">
          Teletubbies
        </h3>
        ${this._renderTeletubbies()}
      </div>

      <h3 style="color: var(--primary-50); margin-top: 48px">
        The accordions can also be nested by using accordions and an accordion
        content. The content here is of accordions with toggleType = arrow and
        footer action button. This also uses the icon slot to add a custom icon.
      </h3>

      <div class="accordion_container fashion-house">
        ${this._renderFashionHouses()}
      </div>

      <h3 style="color: var(--primary-50); margin-top: 48px">
        Card themed accordion with chevron toggleType and icon of other
        comet-icon type and no action button.
      </h3>

      <div class="accordion_container insurance-container">
        ${this._renderTermLifeAccordion()}
      </div>
    `;
  }

  private _renderMember() {
    return html`<div slot="comet-accordion-content">
      <div class="content-row">
        <div class="content-label">Firstname</div>
        <div class="content-value">${this._member.firstName}</div>
      </div>
      <div class="content-row">
        <div class="content-label">Lastname</div>
        <div class="content-value">${this._member.lastName}</div>
      </div>
      <div class="content-row">
        <div class="content-label">Email</div>
        <div class="content-value">${this._member.email}</div>
      </div>
      <div class="content-row">
        <div class="content-label">Profession</div>
        <div class="content-value">${this._member.profession}</div>
      </div>
      <div class="content-row">
        <div class="content-label">Membership type</div>
        <div class="content-value">${this._member.membership}</div>
      </div>
    </div>`;
  }

  private _renderTeletubbies() {
    return html`
      ${this.tubbies.map((tub: any) => {
        return html`<div class="a-container">
          <comet-accordion
            @click=${() => this.toggleAccordion(tub)}
            .expanded=${tub.expanded}
            title=${tub.name}
            content=${tub.description}
          ></comet-accordion>
        </div>`;
      })}
    `;
  }

  private _renderFashionHouses() {
    return html`
      <div class="parent-accordion">
        <comet-accordion title="Italian Fashion Houses">
          <div slot="comet-accordion-content" style=" margin-left: 16px;">
            <div
              class="a-container"
              style="border-bottom: 1px solid var(--secondary-30); padding-bottom: 24px;"
            >
              <comet-accordion
                @on-click=${this.goToGucci}
                title="Gucci"
                content="Founded in Florence, Italy, in 1921, Gucci is one of the world's leading luxury brands. Following the House's centenary, Gucci forges ahead continuing to redefine luxury while celebrating creativity, Italian craftsmanship, and innovation."
                buttonLabel="Website"
                toggleType="arrow"
              >
                <img
                  class="logo-icon-gucci"
                  src="https://upload.wikimedia.org/wikipedia/commons/7/79/1960s_Gucci_Logo.svg"
                  slot="comet-accordion-header-icon"
                  height="16px"
                />
              </comet-accordion>
            </div>
            <div class="a-container">
              <comet-accordion
                @on-click=${this.goToFendi}
                title="Fendi"
                content="Fendi (Italian pronunciation: [ˈfɛndi]) is an Italian luxury fashion house producing fur, ready-to-wear, leather goods, shoes, fragrances, eyewear, timepieces and accessories. Founded in Rome in 1925, Fendi is known for its fur, fur accessories, and leather goods. Since 2001, Fendi has been part of the “Fashion & Leather Goods” division of the French group LVMH. Its headquarters are in Rome, in the Palazzo della Civiltà Italiana."
                buttonLabel="Website"
                toggleType="arrow"
              >
                <img
                  class="logo-icon-fendi"
                  src="https://i.pinimg.com/originals/c4/6a/bc/c46abcf81b48d73f67a371033f2a8699.png"
                  slot="comet-accordion-header-icon"
                  height="32px"
                />
              </comet-accordion>
            </div>
          </div>
        </comet-accordion>
      </div>
    `;
  }

  private _renderTermLifeAccordion() {
    return html`<div class="insurance_a_container">
        <comet-accordion
          title="Term Life"
          theme=${this._theme}
          toggleType="arrow"
          .icon=${this._iconTermLife}
        >
          <div slot="comet-accordion-content" class="insurance-content">
            <div>
              Term life insurance or term assurance is life insurance that
              provides coverage at a fixed rate of payments for a limited period
              of time, the relevant term. After that period expires, coverage at
              the previous rate of premiums is no longer guaranteed and the
              client must either forgo coverage or potentially obtain further
              coverage with different payments or conditions. If the life
              insured dies during the term, the death benefit will be paid to
              the beneficiary. Term insurance is typically the least expensive
              way to purchase a substantial death benefit on a coverage amount
              per premium dollar basis over a specific period of time.
            </div>
            <p>
              Term life insurance can be contrasted to permanent life insurance
              such as whole life, universal life, and variable universal life,
              which guarantee coverage at fixed premiums for the lifetime of the
              covered individual unless the policy is allowed to lapse due to
              failure to pay premiums. Term insurance is not generally used for
              estate planning needs or charitable giving strategies but is used
              for pure income replacement needs for an individual. Term
              insurance functions in a manner similar to most other types of
              insurance in that it satisfies claims against what is insured if
              the premiums are up to date and the contract has not expired and
              does not provide for a return of premium dollars if no claims are
              filed. As an example, auto insurance will satisfy claims against
              the insured in the event of an accident and a homeowner policy
              will satisfy claims against the home if it is damaged or
              destroyed, for example, by fire. Whether or not these events will
              occur is uncertain. If the policyholder discontinues coverage
              because he or she has sold the insured car or home, the insurance
              company will not refund the full premium.
            </p>
          </div>
        </comet-accordion>
      </div>
      <div class="insurance_a_container-custom-style">
        <comet-accordion
          title="Pet"
          theme=${this._theme}
          toggleType="arrow"
          content="Pet insurance is an insurance policy bought by a pet owner which helps to lessen the overall costs of expensive veterinary bills. This coverage is similar to health insurance policies for humans. Pet insurance will cover, either entirely or in part, the often expensive veterinary procedures."
          .icon=${this._iconPet}
        >
        </comet-accordion>
      </div> `;
  }

  static styles = css`
    .accordion_container {
      margin-bottom: 48px;
      max-width: 400px;
    }

    .insurance_a_container {
      margin-bottom: var(--spacing-xl);
      max-width: 400px;
    }

    .insurance_a_container {
      ::part(comet-accordion-content) {
        color: var(--primary-70);
      }
    }

    .accordion_container.fashion-house {
      max-width: 300px;
      padding: 30px 16px 8px;
    }

    .content-row {
      border-bottom: 1px solid var(--neutral-20);
      margin-bottom: 16px;
    }

    .content-row:last-child {
      border-bottom: none;
      margin-bottom: 16px;
    }

    .content-label {
      color: var(--neutral-60);
      padding-bottom: 4px;
    }

    .content-value {
      font-weight: var(--typo-font-weights-semibold);
      padding-bottom: 4px;
    }

    .a-container {
      margin-bottom: 20px;
    }

    .logo-icon-gucci {
      margin-right: 8px;
      margin-bottom: 4px;
    }

    .logo-icon-fendi {
      margin-bottom: 4px;
      margin-left: -12px;
      margin-right: -2px;
    }

    .insurance-container {
      ::part(comet-accordion-header-title) {
        color: var(--primary-70);
      }
    }

    .insurance-content {
      color: var(--primary-70);
    }

    .insurance_a_container-custom-style ::part(comet-accordion-container) {
      background-color: var(--primary-10);
      border: 1px solid var(--primary-20);
      border-radius: 12px;
      box-shadow: var(--shadow-default);
    }
  `;
}
