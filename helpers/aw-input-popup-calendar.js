import { PolymerElement, html, Polymer } from "../../aw_polymer_3/polymer/polymer-element.js";
import "../../aw_calendar/aw-calendar-simple.js";

class AwInputPopupCalendar extends PolymerElement {
    static get template() {
        return html`
        <style>
            :host {
                bottom: 0;
                display: none;
                left: 0;
                position: fixed;
                right: 0;
                top: 0;
            }
            #background {
                background-color: rgba(10,10,10,.7);    
                bottom: 0;
                left: 0;
                position: absolute;
                right: 0;
                top: 0;
            }
            #container {
                align-items: center;
                bottom: 0;
                display: flex;
                flex-flow: row wrap;
                justify-content: center;
                left: 0;
                position: absolute;
                right: 0;
                top: 0;
            }
            .close {
                bottom: 0;
                left: 0;
                position: absolute;
                right: 0;
                top: 0;
            }
            #popup {
                background-color: white;
                position: relative;
                transform: scale(0,0);
            }
            .title {
                background-color: var(--aw-input-date-calendar-tit-background-color,var(--aw-primary-color,#1C7CDD));
                color: var(--aw-input-date-calendar-tit-color,white);
                font-size: var(--aw-input-date-calendar-tit-font-size,11px);
                margin: var(--aw-input-date-calendar-tit-margin,0);
                padding: var(--aw-input-date-calendar-tit-padding,32px 10px 30px);
                position: relative;
                text-align: var(--aw-input-date-calendar-tit-text-align,center);
                text-transform: var(--aw-input-date-calendar-tit-text-transform,uppercase);
            }
            .title iron-icon {
                fill: var(--aw-input-date-calendar-color,white);
                height: var(--aw-input-date-calendar-tit-icon-size,18px);
                margin: 0 5px 0 0;
                top: var(--aw-input-date-calendar-tit-icon-top,-2px);
                width: var(--aw-input-date-calendar-tit-icon-size,18px);
            }
            .calendar {
                position: relative;
            }
            aw-calendar-simple {
                width: calc(100% - 20px);
                margin: 10px;
            }
            .ok {
                background-color: #EAEAEA;
                cursor: pointer;
                padding: 5px 0 5px;
                position: relative;
                text-align: center;
                transition: background .3s;
            }
            .ok:hover {
                background-color: #73bb39;
            }
            .ok iron-icon {
                fill: #73bb39;
                height: 24px;
                transition: fill .3s;
                width: 24px;
            }
            .ok:hover iron-icon {
                fill: white;
            }
        </style>
        <div id="background"></div>
        <div id="container">
            <div class="close" on-click="closeCalenadr"></div>
            <div id="popup">
                <div class="title">
                    <iron-icon icon="event"></iron-icon>{{titcalendar}}
                </div>
                <div class="calendar">
                    <aw-calendar-simple id="calendar" name$="{{namecalendar}}" lang="{{lang}}" time={{time}} nomarktoday="{{nomarktoday}}" nomarkfest="{{nomarkfest}}" noselectpast={{noselectpast}} noselectsat={{noselectsat}} noselectsun={{noselectsun}} noselectfest={{noselectfest}} ccaa={{ccaa}} diasfest={{diasfest}} fechainit$={{value}}></aw-calendar-simple>
                </div>
                <div class="ok" on-click="closeCalenadr">
                    <iron-icon icon="check"></iron-icon>
                </div>
            </div>
        </div>
        `;
    }

    static get properties() {
        return {
            open: {type: Boolean, value: false, observer: "_handleOpen", notify: true },
			lang: { type: String, value: "es" },
			titcalendar: { type: String, value: "Selecciona una fecha" },
			time: { type: Boolean, value: false },
			nomarktoday: { type: Boolean, value: false },
			nomarkfest: { type: Boolean, value: false },
			noselectpast: { type: Boolean, value: false },
			noselectsat: { type: Boolean, value: false },
			noselectsun: { type: Boolean, value: false },
			noselectfest: { type: Boolean, value: false },
			ccaa: { type: String, value: "" },
            diasfest: { type: Array, value: "" },
            namecalendar: { type: String, value: "" },
        }
    }

    /**
     * @method  constructor
     */
    constructor() {
        super();

        this.calendar = null;
        this.isOpen = false;

        this.namecalendar = this.getAttribute("namecalendar");

        this.functions = {
            docKeyUp: (ev) => {
                this._handleDocKeyUp(ev);
            }
        };

        
    }

    /**
     * @method connectedCallback
     */
    connectedCallback() {
        super.connectedCallback();

        this.calendar = this.$.calendar;

        
        //Resolvemos el componente
        
        this.removeAttribute( "unresolved" )
    }

    /**
     * @method disconectedCallback
     */
    disconectedCallback() {
        super.disconectedCallback();

    }

    /**
     * @method closeCalendar
     * 
     * Cierra el calendario
     */
    closeCalenadr() {
        Polymer.Animate(this.$.popup, {
            transform: "scale(0,0)"
        }, {
            speed: 150
        });

        Polymer.Fade.out(this.$.background, {
            speed: 200
        },() => {
            this.removeAttribute("style");
        });

        this.isOpen = false;
        this.open = false;

        document.removeEventListener("keyup", this.functions.docKeyUp);
    }

    /**
     * @method  openCalendar
     * 
     * Abre el calendario
     */
    openCalendar() {
        this.style.display = "block";

        Polymer.Fade.in(this.$.background, {
            speed: 200
        });

        Polymer.Animate(this.$.popup, {
            transform: "scale(1,1)"
        }, {
            speed: 300
        });

        this.isOpen = true;

        document.addEventListener("keyup", this.functions.docKeyUp);
    }

    /**
     * @method  _handleDocKeyup
     * 
     * Escucha el evento de pulsación en el documento
     * 
     * @param {KeyboardEvent} ev 
     */
    _handleDocKeyUp(ev) {
        if( ev.key === "Enter" && ev.path[3].getAttribute && ev.path[3].getAttribute("id") === "selectable_hour" ) {
            setTimeout(() => {
                const date = this.$.calendar.get_date();
                if( date) {
                    this.closeCalenadr();
                }
            });
            
        }
    }

    /**
     * @method  _handleOpen
     * 
     * Maneja la apertura y el cierre del calendario
     */
    _handleOpen() {
        if( this.open && !this.isOpen ) {
            this.openCalendar();
        }

        if( !this.open && this.isOpen ) {
            this.closeCalenadr();
        }
    }
}

window.customElements.define( "aw-input-popup-calendar", AwInputPopupCalendar );