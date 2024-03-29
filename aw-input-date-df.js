import { PolymerElement, html } 		from "../aw_polymer_3/polymer/polymer-element.js";
import { AwInputErrorMixin } 			from "../aw_form_mixins/aw-input-error-mixin.js";
import { AwInputPrefixMixin } 			from "../aw_form_mixins/aw-input-preffix-mixin.js";
import { AwFormValidateMixin } 			from "../aw_form_mixins/aw-form-validate-mixin.js";
import { AwExternsFunctionsMixin } 		from "../aw_extern_functions/aw-extern-functions-mixin.js";

import "./helpers/aw-input-popup-calendar.js";
import "../aw_form_helpers/aw-input-error.js";
import "../aw_polymer_3/iron-icons/iron-icons.js";

/**
 * Componente de fecha
 * 
 * @attr {Boolean} error
 * @attr {String} errmsg
 * @attr {Boolean} noerrors
 * @attr {String} connectedfunc
 * @attr {String} changefunc
 * @attr {String} focusinfunc
 * @attr {String} focusoutfunc
 * @cssprop --aw-primary-color
 * @cssprop --aw-error-color
 * @cssprop --aw-input-date-calendar-icon-fill-hover
 * @cssprop --aw-input-date-calendar-selected-color
 * @cssprop --aw-input-date-calendar-selected-background-color
 * @cssprop --aw-input-date-calendar-tit-color
 * @cssprop --aw-input-date-calendar-tit-background-color
 */
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
					box-sizing: border-box;
					transition: all .2s;
				}
				.container input[size="small"] {
					padding: 5px;
					font-size: 12px;
					--aw-input-prefix-size: 20px;
					--aw-input-prefix-font-weight: normal;
					--aw-input-prefix-icon-top: -1px;
					--aw-input-prefix-image-height: 14px;
				}
				.container input[size="big"] {
					padding: 11px 9px 10px;
					font-size: 18px;
					--aw-input-prefix-size: 24px;
					--aw-input-prefix-font-weight: normal;
					--aw-input-prefix-image-height: 18px;
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
					box-shadow: 0 0 0px 1000px white inset !important;
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
			</style>
			<div id="label" hidden="{{!label}}">{{label}}</div>
			<div id="container" class="container">
				<label><input readonly autocomplete="off" placeholder="[[placeholder]]" size$=[[size]] on-focusin="_focusin" on-focusout="_focusout"/></label>
				<iron-icon id="clear" icon="clear" on-click="clear"></iron-icon>
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

			<aw-input-popup-calendar id="ppCalendar" namecalendar$="{{nameCalendar}}" open={{_open}} lang="{{lang}}" time={{time}} nomarktoday="{{nomarktoday}}" nomarkfest="{{nomarkfest}}" noselectpast={{noselectpast}} noselectsat={{noselectsat}} noselectsun={{noselectsun}} noselectfest={{noselectfest}} ccaa={{ccaa}} diasfest={{diasfest}} fechainit$={{value}}></aw-input-popup-calendar>
		`;
	}

	static get properties() {
		return {
			// Atributos básicos del input
			// ..........................

			/** ID del componente */
			id: { type: String },
			/** Nombre del componente */
			name: { type: String },
			/** Placeholder del componente */
			placeholder: { type: String },
			/** Valor del componente */
			value: { type: String, observer: "_handleValue" },
			/** El componente es de solo lectura */
			readonly: {type: Boolean, observer: "_set_readonly"},
			/** El componente está desactiado */
            disabled: {type: Boolean, observer: "_set_disabled"},
			/**
			 * Autocapitaliza el valor del input
			 * @type {"off"|"none"|"on"|"sentences"|"words"|"characters"}
			 */
			autocapitalize: { type: String },
			/**
			 * Autocapitaliza el valor del input
			 * @type {"off"|"none"|"on"|"sentences"|"words"|"characters"}
			 */
			autocorrect: { type: String },
			/** Activa el auto completado del input */
			autocomplete: { type: String },
			
			// Atributos del calendario
			// ..........................

			/** 
			 * Idioma del componente 
			 * @type {"es"|"en"|"ca"|"fr"}
			 */
			lang: { type: String },
			/** Título del calendario */
			titcalendar: { type: String },
			/** Hora del calendario */
			time: { type: Boolean },
			/** No se marcará el doa actual */
			nomarktoday: { type: Boolean },
			/** No se marcarán los festivos */
			nomarkfest: { type: Boolean },
			/** No se podrán seleccionar fechas pasadas */
			noselectpast: { type: Boolean },
			/** No se podrá selecionar el sábado */
			noselectsat: { type: Boolean },
			/** No se podrá seleccionar el domingo */
			noselectsun: { type: Boolean },
			/** No se podrá seleccionar los festivos */
			noselectfest: { type: Boolean },
			/**
			 * Comunidad autónoma
			 * @type {"andalucia"|"aragon"|"asturias"|"baleares"|"canarias"|"cantabria"|"castilla"|"cataluña"|"ceuta"|"extremadura"|"galicia"|"madrid"|"mancha"|"melilla"|"murcia"|"navarra"|"rioja"|"valencia"|"vascongadas"}
			 */
			ccaa: { type: String },
			/** Array con los días festivos NOTE: Estudiar que pasar */
			diasfest: { type: Array },

			// Atributos de diseño
			// ..........................

			/**
			 * Tamaño del input
			 * @type {"big"|"small"}
			 */
			size: { type: String, reflectToAttribute: true },
			/** Etiqueta del componente */
			label: { type: String },
			/** Se hará focus al cargar */
			autofocus: { type: Boolean },
			/**
			 * Formato en que se mostrará la fecha
			 * @type {"numeric"|"numericHour"|"long"|"longDay"|"longFull"|"longHour"|"short"|"shortDay"|"shortFull"|"shortHour"}
			 */
			formatdate: { type: String },

			// Atrtibutos de validación
			// ..........................

			/** Indica que este campo es obligatorio */
			required: { type: Boolean },
			/**
			 * Formato que debe tener el valor del input
			 * @type {"aaaa-mm-dd"|"dd-mm-aaaa"|"mm-dd-aaaa"}
			 */
			isdate: { type: String },
			/** Valida que el valor sea una fecha anterior a la actual */
			dateprevius: { type: Boolean },
			/** Valida que tenga un mínumo de edad (Solo type=date) */
			minage: { type: Number },
			/** Valida que tenga un máximo de edad (Solo type=date) */
			maxage: { type: Number },
			/** Indica que el campo no debe ser validado */
			novalidate: { type: Boolean },
			/** Indica que el campo debe ser validado al cambiar */
			validateonchange: { type: Boolean },	

			// Relación con el aw-form
			// ..........................

			/** Evita que se registre en el formulario */
			noregister: { type: Boolean },
		};
	}

	constructor() {
		super();

		this.id = undefined;
		this.name = undefined;
		this.placeholder = undefined;
		this.value = undefined;
		this.readonly = false;
		this.disabled = false;
		this.autocapitalize = undefined;
		this.autocorrect = undefined;
		this.autocomplete = undefined;
		this.lang = "es";
		this.titcalendar = "Selecciona una fecha";
		this.time = false;
		this.nomarktoday = false;
		this.nomarkfest = false;
		this.noselectpast = false;
		this.noselectsat = false;
		this.noselectsun = false;
		this.noselectfest = false;
		this.ccaa = "";
		this.diasfest = "";
		this.label = undefined;
		this.autofocus = false;
		this.size = undefined;
		/** @type {formatDate} */
		this.formatdate = "numeric";

		// Propiedades privadas

		this.valueInit = "";
		this._open = false;

		/** @type {HTMLInputElement} */
		this.inputElement = undefined;
		/** @type {HTMLInputElement} */
		this.inputVisible = undefined;
		/** @type {AwForm} */
		this.parentForm = undefined;

		// Funciones de escucha
		this.listenFuncs = {};

		// Asignamos el nombre del calendario
		this.resolved = false;
		this.nameCalendar = "aw-input-date:" + this.getAttribute( "name" ) + ( Math.floor(Math.random() * (100000 - 100)) );
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

		setTimeout(() => {
			this.resolved = true;

			let calendar = this.$.ppCalendar.calendar;
			let date = calendar.get_date();
			
			if( date ) {
				this.inputElement.value = date.string;
				this.inputVisible.value = date.format[ this.formatdate ];
			}
		}, 200);
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
	 * @method	clear
	 * 
	 * Limpia la fecha del input.
	 */
	clear() {
		this.inputElement.value = "";
		this.inputVisible.value = "";

		this.$.clear.style.display = "none";
			
		this._change();
	}

	/**
	 * @method error_hide
	 * @deprecated
	 * 
	 * Muestra u oculta un mensaje de error
	 */
	error_hide()
	{
		this.errorHide();
	}

	/**
	 * @method errorHide
	 * 
	 * Muestra u oculta un mensaje de error
	 */
	errorHide()
	{
		this.inputElement.setAttribute( "errmsg", "" );
	}

	/**
	 * @method error_show
	 * @deprecated
	 * 
	 * Muestra u oculta un mensaje de error
	 * 
	 * @param {string} message Mensaje de error que se va a mostrar
	 */
	error_show( message )
	{
		this.errorShow(message);
	}

	/**
	 * @method errorShow
	 * 
	 * Muestra u oculta un mensaje de error
	 * 
	 * @param {string} message Mensaje de error que se va a mostrar
	 */
	errorShow( message )
	{
		this.inputElement.setAttribute( "errmsg", message );
	}

	/**
	 * @method get_value
	 * @deprecated
	 * 
	 * Obtiene el valor del input
	 * 
	 * @return {string}
	 */
	get_value()
	{
		return this.getValue();
	}

	/**
	 * @method getValue
	 * 
	 * Obtiene el valor del input
	 * 
	 * @return {string}
	 */
	getValue()
	{
		return this.inputElement.value;
	}

	/**
	 * @method	has_error
	 * @deprecated
	 * 
	 * Devuelve si el campo tiene un error
	 * 
	 * @return {boolean}
	 */
	has_error()
	{
		return this.hasError();
	}

	/**
	 * @method	hasError
	 * 
	 * Devuelve si el campo tiene un error
	 * 
	 * @return {boolean}
	 */
	hasError()
	{
		if( this.inputElement.getAttribute( "errmsg" )) {
			return true;
		} else {
			return false;
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
	 * @method	set_value
	 * @deprecated
	 * 
	 * Asigna el valor al campo
	 * 
	 * @param {string} value Valor que queremos asignar al campo
	 */
	set_value( value )
	{
		this.setValue(value);
	}

	/**
	 * @method	setValue
	 * 
	 * Asigna el valor al campo
	 * 
	 * @param {string} value Valor que queremos asignar al campo
	 */
	setValue( value )
	{
		if(!this._isValidDate()) {
			console.error( "[aw-input-date.js#set_value]: You have not passed a correct date" );
			return;
		}

		/** @type {AwCalendarSimple} */
		const calendar = this.$.ppCalendar.calendar;
		calendar.set_date( value );
	}

	/**
	 * @method _handleValue
	 */
	_handleValue() {
		if(this.inputVisible === undefined) {
			return;
		}

		this.$.ppCalendar.calendar.set_date(this.value);

		const date = this.$.ppCalendar.calendar.get_date().format.numericHour;
		this.valueInit = date.string;
		this.inputVisible.value = date[this.formatdate];
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
			this.valueInit = this.value;
			this.$.ppCalendar.calendar.set_date(this.value);
		}

		//  Ponemos el formato de fecha por defecto
		// . . . . . . . . . . . . . . . . . . . . . 
		
		if( this.time && this.formatdate == "numeric" ) {
			this.formatdate = "numericHour";
		}
	}

	/**
	 * @method	_isValidDate
	 * 
	 * Valida si una fecha es valida
	 * 
	 * @param {string} d 
	 */
	_isValidDate(d) {
		const date = new Date(d);
		if( date === "Invalid Date") {
			return false;
		}

		return true;
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
		if( this.$.ppCalendar.parentElement?.tagName !== "BODY" ) {
			document.body.appendChild( this.$.ppCalendar );
		}

		if(this.inputElement.value && this.inputElement.value !== this.$.ppCalendar.calendar.get_date()?.string) {
			if( this.inputElement.value !== this.$.ppCalendar.calendar.get_date()?.string ) {
				this.$.ppCalendar.calendar.set_date(this.inputElement.value);
			}			
		} else if(!this.inputElement.value) {
			this.$.ppCalendar.calendar.reset();
		}

		this._open = true;
	}

	/**
	 * @method	_select_date
	 * 
	 * Selecciona la fecha del calendario y la pasa al input.
	 */
	_select_date( ev ) {
		let response = ev.detail.date;

		if( !this.resolved ) {
			return;
		}

		if( response.name !== this.nameCalendar ) {
			return false;
		}

		this.$.clear.style.display = "block";

		this.inputElement.value = response.string;
		this.inputVisible.value = response.format[ this.formatdate ];

		if( !this.valueInit ) {
			this._change();
		} else {
			this.valueInit = "";
		}
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
