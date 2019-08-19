import { PolymerElement, html, Polymer } 		from "../aw_polymer_3/polymer/polymer-element.js";
import { AwInputErrorMixin } 			from "../aw_form_mixins/aw-input-error-mixin.js";
import { AwInputPrefixMixin } 			from "../aw_form_mixins/aw-input-preffix-mixin.js";
import { AwFormValidateMixin } 			from "../aw_form_mixins/aw-form-validate-mixin.js";
import { AwExternsFunctionsMixin } 		from "../aw_extern_functions/aw-extern-functions-mixin.js";

import "../aw_form_helpers/aw-input-error.js";
import "../aw_calendar/aw-calendar-simple.js";
import "../aw_polymer_3/iron-icons/iron-icons.js";

class AwInputDateDf extends AwInputErrorMixin( AwInputPrefixMixin( AwExternsFunctionsMixin( AwFormValidateMixin( PolymerElement )))) {
	static get template() {
		return html`
			<style>
				:host {
					position: relative;
					width: 100%;
					padding: 0 0 10px 0;
					margin: 0;
                	font-family: var(--aw-input-font-family, "arial");
					vertical-align: var(--aw-input-vertical-align, middle);
					display: inline-block;

					--aw-calendar-icon-fill-hover: var(--aw-input-date-calendar-icon-fill-hover,var(--aw-input-label-color-focused,var(--aw-primary-color,#1C7CDD)));
					--aw-calendar-selected-color: var(--aw-input-date-calendar-selected-color,white);
					--aw-calendar-selected-background-color: var(--aw-input-date-calendar-selected-background-color,var(--aw-input-label-color-focused,var(--aw-primary-color,#1C7CDD)));
					--aw-calendar-list-color-hover: var(--aw-input-date-calendar-tit-color,white);
					--aw-calendar-list-background-color-hover: var(--aw-input-date-calendar-tit-background-color,var(--aw-primary-color,#1C7CDD));
				}

				/* #region Generales */

				.hidden, [hidden], [unresolved] {
					display: none;
				}

				/* #region Etiqueta del input */

				#label {
					position: relative;
					color: var(--aw-input-label-color,#888888);
					font-size: var(--aw-input-label-font-size,11px);
					font-weight: var(--aw-input-label-font-weight,normal);
					margin: var(--aw-input-label-margin,0);
					padding: var(--aw-input-label-padding,0);
					text-align: var(--aw-input-label-text-align,left);
					transition: color .2s;
				}
				#label[writted] {
					color: var(--aw-input-label-color-writted,var(--aw-input-label-color,#888888));
				}
				#label[focused] {
					color: var(--aw-input-label-color-focused,var(--aw-primary-color,#1C7CDD));
				}
				#label[error] {
					color: var(--aw-input-label-color-error,var(--aw-error-color,#b13033));
				}
				#label[disabled] {
					color: var(--aw-input-label-color-disabled,var(--aw-input-color-disabled,#BBBBBB));
				}

				/* #region Input visible */

				.container {
					position: relative;
				}
				.container input {
					width: 100%;
					margin: 0;
					color: var(--aw-input-color,#333333);
					background-color: var(--aw-input-background-color,transparent);
					border-top: var(--aw-input-border-top,var(--aw-input-border,solid 1px #CCCCCC));
					border-right: var(--aw-input-border-right,var(--aw-input-border,solid 1px #CCCCCC));
					border-bottom: var(--aw-input-border-bottom,var(--aw-input-border,solid 1px #CCCCCC));
					border-left: var(--aw-input-border-left,var(--aw-input-border,solid 1px #CCCCCC));
					border-radius: var(--aw-input-border-radius,2px);
					padding: var(--aw-input-padding,7px);
                	font-family: var(--aw-input-font-family, "arial");
                	font-size: var(--aw-input-font-size, 16px);
					font-weight: var(--aw-input-font-weight,normal);
					font-style: var(--aw-input-font-style,normal);
					box-shadow: var(--aw-input-box-shadow,none);
					-webkit-box-sizing: border-box;
					-moz-box-sizing: border-box;
					-ms-box-sizing: border-box;
					box-sizing: border-box;
					transition: all .2s;
				}
				.container input:focus{
                	outline: 0;
					border-top: var(--aw-input-border-top-focused,var(--aw-input-border-focused,solid 1px var(--aw-primary-color,#1C7CDD)));
					border-right: var(--aw-input-border-right-focused,var(--aw-input-border-focused,solid 1px var(--aw-primary-color,#1C7CDD)));
					border-bottom: var(--aw-input-border-bottom-focused,var(--aw-input-border-focused,solid 1px var(--aw-primary-color,#1C7CDD)));
					border-left: var(--aw-input-border-left-focused,var(--aw-input-border-focused,solid 1px var(--aw-primary-color,#1C7CDD)));
					background-color: var(--aw-input-background-color-focused,var(--aw-input-background-color,transparent));
				}
				.container[error] input,.container input[error]{
					border-top: var(--aw-input-border-top-error,var(--aw-input-border-error,solid 1px var(--aw-error-color,#1C7CDD)));
					border-right: var(--aw-input-border-right-error,var(--aw-input-border-error,solid 1px var(--aw-error-color,#1C7CDD)));
					border-bottom: var(--aw-input-border-bottom-error,var(--aw-input-border-error,solid 1px var(--aw-error-color,#1C7CDD)));
					border-left: var(--aw-input-border-left-error,var(--aw-input-border-error,solid 1px var(--aw-error-color,#1C7CDD)));
					background-color: var(--aw-input-background-color-error,var(--aw-input-background-color,transparent));
				}
				.container input[disabled]{
					color: var(--aw-input-color-disabled, #BBBBBB);
					border: var(--aw-input-border-disabled,solid 1px #DDDDDD);
					background-color: var(--aw-input-background-color-disabled,#F9F9F9);
				}
				.container input:-webkit-autofill {
					-webkit-box-shadow: 0 0 0px 1000px white inset !important;
					-webkit-text-fill-color: var(--aw-input-color, #111111);
				}
				.container input::-webkit-input-placeholder {
					color: var(--aw-input-placeholder-color,#999999);
					font-family: var(--aw-input-placeholder-font-family,var(--aw-input-font-family, "arial"));
					font-style: var(--aw-input-placeholder-font-style,oblique);
				}
				.container input::-moz-placeholder {
					color: var(--aw-input-placeholder-color,#999999);
					font-family: var(--aw-input-placeholder-font-family,var(--aw-input-font-family, "arial"));
					font-style: var(--aw-input-placeholder-font-style,oblique);
				}
				.container input::-ms-input-placeholder {
					color: var(--aw-input-placeholder-color,#999999);
					font-family: var(--aw-input-placeholder-font-family,var(--aw-input-font-family, "arial"));
					font-style: var(--aw-input-placeholder-font-style,oblique);
				}
				.container input::-o-input-placeholder {
					color: var(--aw-input-placeholder-color,#999999);
					font-family: var(--aw-input-placeholder-font-family,var(--aw-input-font-family, "arial"));
					font-style: var(--aw-input-placeholder-font-style,oblique);
				}
				.container input::-ms-reveal, input::-ms-clear {
					display: none !important;
				}
				.container input[nospinners]::-webkit-outer-spin-button,
				.container input[nospinners]::-webkit-inner-spin-button {
					-webkit-appearance: none;
					margin: 0;
				}
				.container input[nospinners] {
					-moz-appearance:textfield;
				}

				/* #region Prefix y suffix */

				.prefix {
					position: absolute;
					top: 0px;
					left: 0px;
					padding-top: var(--aw-input-prefix-padding-top,0);
					color: var(--aw-input-prefix-color,#777777);
					font-family: var(--aw-input-prefix-font-famlily,var(--aw-input-font-family, "arial"));
					font-size: var(--aw-input-prefix-font-size,var(--aw-input-font-size, 16px));
					font-weight: var(--aw-input-prefix-font-weight, bold);
					transition: all .2s;
					opacity: 0;
				}
				.suffix {
					position: absolute;
					top: 0px;
					right: 0px;
					padding-top: var(--aw-input-prefix-padding-top,0);
					color: var(--aw-input-prefix-color,#777777);
					font-family: var(--aw-input-prefix-font-famlily,var(--aw-input-font-family, "arial"));
					font-size: var(--aw-input-prefix-font-size,var(--aw-input-font-size, 16px));
					font-weight: var(--aw-input-prefix-font-weight, bold);
					transition: all .2s;
					opacity: 0;
				}
				.container[focused] .prefix,.container[focused] .suffix {
					color: var(--aw-input-prefix-color-focused,var(--aw-input-label-color-focused,var(--aw-primary-color,#1C7CDD)));
				}
				.container[error] .prefix,.container[error] .suffix {
					color: var(--aw-input-prefix-color-error,var(--aw-input-label-color-error,var(--aw-error-color,#b13033)));
				}
				.prefix[show],.suffix[show] {
					opacity: 1;
				}
				.prefix > img {
					padding: 0px 3px 0px 0px;
					height: var(--aw-input-prefix-image-height,var(--aw-input-font-size, 16px));
					margin-bottom: 3px;
				}
				.suffix > img {
					padding: 0px 0px 0px 3px;
					height: var(--aw-input-prefix-image-height,var(--aw-input-font-size, 16px));
					margin-bottom: 3px;
				}
				.prefix > iron-icon, .suffix > iron-icon {
					top: var(--aw-input-prefix-icon-top,0);
					fill: var(--aw-input-prefix-color,#555555);
					width: var(--aw-input-prefix-size,22px);
					height: var(--aw-input-prefix-size,22px);
					padding: 0px;
					transition: fill .2s;
				}
				.container[focused] .prefix > iron-icon,.container[focused] .suffix > iron-icon {
					fill: var(--aw-input-prefix-color-focused,var(--aw-input-label-color-focused,var(--aw-primary-color,#1C7CDD)));
				}
				.container[error] .prefix > iron-icon,.container[error] .suffix > iron-icon {
					fill: var(--aw-input-prefix-color-error,var(--aw-input-label-color-error,var(--aw-error-color,#b13033)));
				}
				:host([disabled]) .prefix, :host([disabled]) .suffix {
					color: var(--aw-input-prefix-color-disabled,var(--aw-input-color-disabled, #BBBBBB));
				}
				:host([disabled]) .prefix > iron-icon, :host([disabled]) .suffix > iron-icon {
					fill: var(--aw-input-prefix-color-disabled,var(--aw-input-color-disabled, #BBBBBB));
				}

				/* #region del iron-icon */

				#clear {
					position: absolute;
					top: calc(50% - 9px);
					right: 3px;
					fill: #a43b3b;
					width: 18px;
					height: 18px;
					background-color: white;
					cursor: pointer;
					display: none;
				}

				/* #region Flexible de error y contador */

				.flex_inf {
					position: relative;
					display: flex;
					flex: row wrap;
				}

				.flex_inf > .left {
					position: relative;
					flex-grow: 1;
					flex-basis: auto;
				}

				.flex_inf > .right {
					position: relative;
					flex-grow: 0;
					flex-basis: auto;
				}

				/* #region Fondo negro y calendario */

				.fondo {
					position: fixed;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					background-color: var(--aw-input-date-calendar-fondo---aw-calendar-selected-background-color,rgba(10,10,10,.7));
					z-index: 1000;
					display: none;
				}

				.cont_calendar {
					position: fixed;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					flex-flow: row wrap;
					align-items: center;
					justify-content: center;
					z-index: 1000;
					display: none;
				}
				.cont_calendar[open] {
					display: flex;
				}
				.cont_calendar .close {
					position: absolute;
					top:0;
					left: 0;
					width: 100%;
					height: 100%;
				}
				.cont_calendar .popup {
					position: relative;
					width: 0;
					background-color: white;
				}
				.cont_calendar[open] .popup {
					animation: aw-input-date-df-open .3s forwards;
				}
				.cont_calendar .title {
					position: relative;
					padding: var(--aw-input-date-calendar-tit-padding,32px 10px 30px);
					margin: var(--aw-input-date-calendar-tit-margin,0);
					text-align: var(--aw-input-date-calendar-tit-text-align,center);
					font-size: var(--aw-input-date-calendar-tit-font-size,11px);
					color: var(--aw-input-date-calendar-tit-color,white);
					background-color: var(--aw-input-date-calendar-tit-background-color,var(--aw-primary-color,#1C7CDD));
					text-transform: var(--aw-input-date-calendar-tit-text-transform,uppercase);
				}
				.cont_calendar .title iron-icon {
					top: var(--aw-input-date-calendar-tit-icon-top,-2px);
					width: var(--aw-input-date-calendar-tit-icon-size,18px);
					height: var(--aw-input-date-calendar-tit-icon-size,18px);
					fill: var(--aw-input-date-calendar-color,white);
					margin: 0 5px 0 0;
				}
				.cont_calendar .calendar {
					position: relative;
					padding: 10px;
				}
				.cont_calendar aw-calendar-simple {
					width: 100%;
				}
				.cont_calendar[open] .title, .cont_calendar[open] .calendar {
					animation: aw-input-date-df-show .3s forwards;
				}

				@keyframes aw-input-date-df-open {
					from {
						width: 0;
						overflow: hidden;
					}

					to {
						width: 280px;
					}
				}
				@keyframes aw-input-date-df-show {
					from {
						opacity: 0;
					}
					to {
						opacity: 1;
					}
				}
			</style>
			<div id="label" hidden="{{!label}}">{{label}}</div>
			<div id="container" class="container">
				<label><input readonly autocomplete="off" placeholder="[[placeholder]]" on-focusin="_focusin" on-focusout="_focusout"/></label>
				<iron-icon id="clear" icon="clear" on-click="_clear"></iron-icon>
			</div>
			<aw-input-error errmsg="{{errmsg}}">{{errmsg}}</aw-input-error>

			<div class="inputElement">
				<input
					id$="[[id]]"
					name$="[[name]]"
					type="hidden"
					value$="{{value}}"
					disabled$="[[disabled]]"
					autocapitalize$="[[autocapitalize]]"
					autocorrect$="[[autocorrect]]"
					autocomplete$="[[autocomplete]]"

					required$="[[required]]"
					isdate="aaaa-mm-dd"
					dateprevius$="[[dateprevius]]"
					minage$="[[minage]]"
					maxage$="[[maxage]]"
					novalidate$=[[novalidate]]

					error$=[[error]]
					errmsg$="{{errmsg}}"

					readonly
					/>
			</div>
			
			<div class="fondo"></div>
			<div class="cont_calendar">
				<div class="close" on-click="_close_calendar"></div>
				<div class="popup">
					<div class="title">
						<iron-icon icon="event"></iron-icon>{{titcalendar}}
					</div>
					<div class="calendar">
						<aw-calendar-simple unresolved name="{{nameCalendar}}" lang="{{lang}}" time={{time}} nomarktoday="{{nomarktoday}}" nomarkfest="{{nomarkfest}}" noselectpast={{noselectpast}} noselectsat={{noselectsat}} noselectsun={{noselectsun}} noselectfest={{noselectfest}} ccaa={{ccaa}} diasfest={{diasfest}} fechainit={{value}}></aw-calendar-simple>
					</div>
				</div>
			</div>
		`;
	}

	static get properties() {
		return {
			// Atributos del componente

			inputElement: { type: Object },
			inputVisible: { type: Object },

			// Atributos del calendario

			lang: { type: String, value: "es" },
			nameCalendar: { type: String, value: "" },
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

			// Atributos básicos del input

			id: { type: String },
			name: { type: String },
			type: { type: String },
			placeholder: { type: String },
			value: { type: String },
			readonly: {type: Boolean, value: false, observer: "_set_readonly"},
            disabled: {type: Boolean, value: false, observer: "_set_disabled"},
			autocapitalize: { type: String },
			autocorrect: { type: String },
			autocomplete: { type: String },

			// Atributos de diseño

			label: { type: String },
			autofocus: { type: Boolean, value: false },
			formatdate: { type: String, value: "numeric" }, // (numeric,numericHour,long,longDay,longFull,longHour,short,shortDay,shortFull,shortHour)

			// Atrtibutos de validación

			required: { type: Boolean, value: false },
			isdate: { type: String },
			dateprevius: { type: Boolean, value: false },
			minage: { type: String },
			maxage: { type: String },
			novalidate: { type: Boolean, value: false },
			validateonchange: { type: Boolean, value: false },
			
			// Funciones de escucha

			listenFuncs: { type: Object },

			// Relación con el aw-form y el form

			parentForm: { type: Object },
			noregister: { type: Boolean, value: false }
		};
	}

	constructor() {
		super();

		// Asignamos el nombre del calendario

		this.nameCalendar = "aw-input-date:" + this.name + ( Math.floor(Math.random() * (100000 - 100)) );
	}

	/**
	 * @method	connectedCallback
	 * 
	 * Acciones a realizar cuando conecta el componente.
	 */
	connectedCallback() {
		super.connectedCallback();

		// Asignamos el input

		this.inputElement = this.shadowRoot.querySelector( ".inputElement input" );
		this.inputVisible = this.shadowRoot.querySelector( ".container input" );


		// Inicializamos el componente

		this._init();

		// Activamos los errores

		this.error_listen();
		
		// Buscamos prefixs y suffixs

		this.findPrefixAndSuffixs();

		// Registramos en el formulario.

		this._register_in_form();

		// Invocamos la función externa connected

		if ( typeof this.connectedfunc === "function" ) {
			this.connectedfunc( this );
		}

		// Asignamos funciones de escucha

		this.listenFuncs = {
			calendar: this._select_date.bind( this )
		};

		// Escuchamos el evento del calendar
		
		document.addEventListener( "aw-calendar-simple", this.listenFuncs.calendar );

		// Resolvemos

		this.removeAttribute( "unresolved" );
	}

	/**
	 * @method	disconnectedCallback
	 * 
	 * Accciones a realizar cuando se desconecta el componente.
	 */
	disconnectedCallback() {
		super.disconnectedCallback();

		// Quitamos el elemento del registro

		if( !this.noregister && this.parentForm ) {
			this.parentForm._unregister_element( this.inputElement );
		}

		// Quitamos el evento de calendar

		document.removeEventListener( "aw-calendar-simple", this.listenFuncs.calendar );
	}

	/**
	 * @method	_init
	 * 
	 * Inicializa el componente una vez se ha conectado.
	 */
	_init() {
		//  Ponemos el autofocus
		// . . . . . . . . . . . . . . . . . . . . . 
		
		if( this.autofocus && !this.readonly && !this.disabled ) {
			this.focus();
		}

		//  Si hay valor
		// . . . . . . . . . . . . . . . . . . . . . 
		
		if( this.value ) {
			
		}

		//  Ponemos el formato de fecha por defecto
		// . . . . . . . . . . . . . . . . . . . . . 
		
		if( this.time && this.formatdate == "numeric" ) {
			this.formatdate = "numericHour";
		}
	}

	/**
	 * @method	focus
	 * 
	 * Pone el foco sobre el input.
	 */
	focus() {
		this.inputVisible.focus();
	}

	/**
	 * @method	_set_readonly
	 * 
	 * Pone el input como solo lectura.
	 */
	_set_readonly() {
		if ( this.readonly ) {
			this.$.label.setAttribute( "readonly", "" );
		} else {
			this.$.label.removeAttribute( "readonly" );
		}
	}

	/**
	 * @method	_set_disabled
	 * 
	 * Pone el input en modo disabled.
	 */
	_set_disabled() {
		if ( this.disabled ) {
			this.$.label.setAttribute( "disabled", "" );
		} else {
			this.$.label.removeAttribute( "disabled" );
		}
	}

	/**
	 * @method	_register_in_form
	 * 
	 * Registra el elemento en el formulario.
	 */
	_register_in_form() {
		// Si no debe registrarse

		if( this.noregister ) {
			return false;
		}

		// Registramos el elemento

		this.dispatchEvent(new CustomEvent('aw-form-element-register', { detail: this, bubbles: true, composed: true }));
	}

	/**
	 * @method	_open_calendar
	 * 
	 * Abre el calendario de selección de fecha.
	 */
	_open_calendar() {
		let fondo = this.shadowRoot.querySelector( ".fondo" );
		let container = this.shadowRoot.querySelector( ".cont_calendar" );

		Polymer.Fade.in( fondo, { speed: 200 } );
		container.setAttribute( "open", "" );
	}

	/**
	 * @method	_close_calendar
	 * 
	 * Cierra el calendario de selección de fecha.
	 */
	_close_calendar() {
		let fondo = this.shadowRoot.querySelector( ".fondo" );
		let container = this.shadowRoot.querySelector( ".cont_calendar" );
		
		Polymer.Fade.out( fondo, {speed: 200 } );
		container.removeAttribute( "open" );
	}

	/**
	 * @method	_select_date
	 * 
	 * Selecciona la fecha del calendario y la pasa al input.
	 */
	_select_date( ev ) {
		let response = ev.detail.date;

		if( response.name !== this.nameCalendar ) {
			return false;
		}

		this.$.clear.style.display = "block";

		let pastDate = this.inputElement.value.split( " " )[ 0 ];
		let newDate = response.string.split( " " )[ 0 ];

		this.inputElement.value = response.string;
		this.inputVisible.value = response.format[ this.formatdate ];

		if( !this.value ) {
			if( pastDate !== newDate ) {
				this._close_calendar();
			}
			
			this._change();
		} else {
			this.value = "";
		}
	}
	
	/**
	 * @method	_clear
	 * 
	 * Limpia la fecha del input.
	 */
	_clear() {
		this.inputElement.value = "";
		this.inputVisible.value ="";

		this.$.clear.style.display = "none";
			
		this._change();
	}

	/**
	 * @method	_focusin
	 * 
	 * Acciones a realizar cuando se hace focus sobre el input.
	 */
	_focusin() {
		this._open_calendar();

		// Impedimos si es de solo lecutura o está desactivado.

		if( this.readonly || this.disabled ) {
			this.inputElement.blur();
			return false;
		}

		// Damos estilo de focus

		this.$.label.setAttribute( "focused", "" );
		this.$.container.setAttribute( "focused", "" );

		// Invocamos la función externa focusin

		if ( typeof this.focusinfunc === "function" ) {
			this.focusinfunc( this.inputElement );
		}
	}

	/**
	 * @method	_focusout
	 * 
	 * Acciones a realizar cuando se quita el focus del input.
	 */
	_focusout( ev ) {
		// Quitamos el label focused

		this.$.label.removeAttribute( "focused" );
		this.$.container.removeAttribute( "focused" );

		// Invocamos la función externa focusout

		if ( typeof this.focusoutfunc === "function" ) {
			this.focusoutfunc( this.inputElement );
		}
	}

	/**
	 * @method	_change
	 * 
	 * Acciones a realizar cuando se realiza un cambio en el input.
	 */
	_change( ev ) {
		// Invocamos la función externa de change change

		if ( typeof this.changefunc === "function" ) {
			this.changefunc( this.inputElement );
		}

		// Si el input tiene el atributo "novalidate" o no tiene el validateonchange, no se valida

		if ( this.novalidate ) {
			return false;
		}

		if ( !this.validateonchange ) {
			return false;
		}

		if ( this.parentForm && this.parentForm.novalidate ) {
			return false;
		}

		// Validamos el campo

		this.__errorValidateInput( this.inputElement );
	}
}

window.customElements.define( "aw-input-date-df", AwInputDateDf );