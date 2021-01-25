import { PolymerElement, html } from "../../aw_polymer_3/polymer/polymer-element.js";

class AwSelectOption extends PolymerElement {
    static get template() {
        return html`
        <style>
            :host {
				font-family: var(--aw-input-font-family);
                position: relative;
                display: block;
            }
            :host([preselected]) {
				background-color: var(--aw-select-options-background-color-hover, #F0F0F0) !important;
                color: var(--aw-select-options-color-hover,var(--aw-input-color, #333333)) !important;
            }
            :host([preselected] iron-icon) {
				fill: var(--aw-select-options-color-hover,var(--aw-input-color, #333333)) !important;
			}
            :host([selected]) {
                background-color: var(--aw-select-options-background-color-selected,var(--aw-primary-color,#1C7CDD)) !important;
				color: var(--aw-select-options-color-selected,white) !important;
            }
            :host([selected] iron-icon) {
				fill: var(--aw-select-options-color-selected,white) !important;
			}
            :host([hidden]) {
                display: none;
            }
            #option {
				cursor: pointer;
				font-size: var(--aw-select-options-font-size,var(--aw-input-font-size, 16px));
				font-weight: normal;
				padding: var(--aw-select-options-padding,10px 25px 10px 10px);
				text-align: left;
				transition: background .3s;
				vertical-align: middle;
				white-space: nowrap;
                position: relative;
            }
			#option > img {
				vertical-align: middle;
				width: var(--aw-select-options-image-width,20px);
				margin-top: var(--aw-select-options-image-top,-4px);
				margin-right: var(--aw-select-options-image-right,7px);
			}
			#option > iron-icon {
				width: var(--aw-select-options-image-width,20px);
				height: var(--aw-select-options-image-width,20px);
				fill: var(--aw-select-options-color,var(--aw-input-color, #333333));
				margin-top: var(--aw-select-options-icon-top,-2px);
				margin-right: var(--aw-select-options-icon-right,7px);
			}
        </style>
        <div id="option"></div>
        `;
    }

    static get properties() {
        return {
            option: { type: Object, value: {}, observer: "_handleOption" }
        }
    }

    /**
     * @method  constructor
     */
    constructor() {
        super();
    }

    /**
     * @method  connectedCallback
     */
    connectedCallback() {
        super.connectedCallback();
    }

    /**
     * @method  disconectedCallback
     */
    disconectedCallback() {
        super.disconectedCallback();
    }

    /**
     * @method  _handleOption
     * 
     * Controla la opción
     */
    _handleOption() {
        if( !this.option.inner && !this.option.value ) {
            this.setAttribute("hidden", "");
            this.$.option.textContent = "";
        } else {
            this.option.selected ? this.setAttribute( "selected", "" ) : this.removeAttribute("selected");
            this.option.title ? this.$.option.setAttribute( "title", this.option.title ) : this.$.option.removeAttribute("title");
            this.option.iron ? this.$.option.setAttribute( "data-iron", this.option.iron ) : this.$.option.removeAttribute("iron-icon");
            this.$.option.setAttribute( "value", this.option.value ? this.option.value : "" );
            this.$.option.innerHTML = `${this.option.image ? `<img src="${this.option.image}" />` : `` }${this.option.iron ? `<iron-icon>${this.option.iron}</iron-icon>` : `` }${this.option.inner}`;

            this.removeAttribute("hidden");
        }
    }
}

window.customElements.define( "aw-select-option", AwSelectOption );