import { PolymerElement, html } 		from "../aw_polymer_3/polymer/polymer-element.js";
import { AwInputErrorMixin } 			from "../aw_form_mixins/aw-input-error-mixin.js";
import { AwInputCharCounterMixin } 		from "../aw_form_mixins/aw-char-counter-mixin.js";
import { AwInputPrefixMixin } 			from "../aw_form_mixins/aw-input-preffix-mixin.js";
import { AwFormValidateMixin } 			from "../aw_form_mixins/aw-form-validate-mixin.js";
import { AwExternsFunctionsMixin } 		from "../aw_extern_functions/aw-extern-functions-mixin.js";

import "../aw_form_helpers/aw-input-error.js";
import "../aw_form_helpers/aw-char-counter.js";
import "../aw_form_helpers/aw-input-datalist.js";

/**
 * Componente de input
 * 
 * @slot datalist
 * @attr {Boolean} countchar - Activa el contador de caracteres
 * @attr {Boolean} error
 * @attr {String} errmsg
 * @attr {Boolean} noerrors
 * @attr {String} connectedfunc
 * @attr {String} changefunc
 * @attr {String} focusinfunc
 * @attr {String} focusoutfunc
 * @attr {String} keypressfunc
 * @attr {String} keyupfunc
 * @cssprop --aw-primary-color
 * @cssprop --aw-error-color
 * @cssprop --aw-input-background-color
 * @cssprop --aw-input-background-color-disabled
 * @cssprop --aw-input-border
 * @cssprop --aw-input-border-bottom
 * @cssprop --aw-input-border-bottom-error
 * @cssprop --aw-input-border-bottom-focused
 * @cssprop --aw-input-border-disabled
 * @cssprop --aw-input-border-error
 * @cssprop --aw-input-border-focused
 * @cssprop --aw-input-border-left
 * @cssprop --aw-input-border-left-error
 * @cssprop --aw-input-border-left-focused
 * @cssprop --aw-input-border-radius
 * @cssprop --aw-input-border-right
 * @cssprop --aw-input-border-right-error
 * @cssprop --aw-input-border-right-focused
 * @cssprop --aw-input-border-top
 * @cssprop --aw-input-border-top-error
 * @cssprop --aw-input-border-top-focused
 * @cssprop --aw-input-box-shadow
 * @cssprop --aw-input-color
 * @cssprop --aw-input-color-disabled
 * @cssprop --aw-input-datalist-arrow-background-color
 * @cssprop --aw-input-datalist-arrow-background-color-hover
 * @cssprop --aw-input-datalist-arrow-color
 * @cssprop --aw-input-datalist-arrow-color-hover
 * @cssprop --aw-input-datalist-arrow-size
 * @cssprop --aw-input-datalist-arrow-top
 * @cssprop --aw-input-datalist-background-color-hover
 * @cssprop --aw-input-datalist-color-hover
 * @cssprop --aw-input-datalist-option-font-family
 * @cssprop --aw-input-datalist-option-font-size
 * @cssprop --aw-input-datalist-option-padding
 * @cssprop --aw-input-datalist-value-background-color
 * @cssprop --aw-input-datalist-value-color
 * @cssprop --aw-input-datalist-value-font-size
 * @cssprop --aw-input-font-family
 * @cssprop --aw-input-font-size
 * @cssprop --aw-input-font-style
 * @cssprop --aw-input-font-weight
 * @cssprop --aw-input-label-color
 * @cssprop --aw-input-label-color-disabled
 * @cssprop --aw-input-label-color-error
 * @cssprop --aw-input-label-color-focused
 * @cssprop --aw-input-label-color-writted
 * @cssprop --aw-input-label-font-size
 * @cssprop --aw-input-label-font-weight
 * @cssprop --aw-input-label-margin
 * @cssprop --aw-input-label-padding
 * @cssprop --aw-input-label-text-align
 * @cssprop --aw-input-padding
 * @cssprop --aw-input-placeholder-color
 * @cssprop --aw-input-placeholder-font-family
 * @cssprop --aw-input-placeholder-font-style
 * @cssprop --aw-input-prefix-color
 * @cssprop --aw-input-prefix-color-error
 * @cssprop --aw-input-prefix-color-focused
 * @cssprop --aw-input-prefix-font-famlily
 * @cssprop --aw-input-prefix-font-size
 * @cssprop --aw-input-prefix-font-weight
 * @cssprop --aw-input-prefix-icon-top
 * @cssprop --aw-input-prefix-image-height
 * @cssprop --aw-input-prefix-padding-top
 * @cssprop --aw-input-prefix-size
 * @cssprop --aw-input-text-align
 * @cssprop --aw-input-vertical-align
 * @cssprop --aw-primary-color
 */
class AwInputDf extends AwInputErrorMixin( AwInputCharCounterMixin( AwInputPrefixMixin( AwExternsFunctionsMixin( AwFormValidateMixin( PolymerElement ))))) {
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
					text-align: var(--aw-input-text-align, left);
					box-shadow: var(--aw-input-box-shadow,none);
					box-sizing: border-box;
					transition: all .2s;
				}
				:host([size="small"]) {
					--aw-input-datalist-arrow-top: -23px;
					--aw-input-datalist-arrow-size: 22px;
					--aw-input-datalist-option-padding: 8px 7px;
					--aw-input-datalist-option-font-size: 12px;
				}
				.container input[size="small"] {
					padding: 5px;
					font-size: 12px;
					--aw-input-prefix-size: 20px;
					--aw-input-prefix-font-weight: normal;
					--aw-input-prefix-icon-top: -1px;
					--aw-input-prefix-image-height: 14px;
				}
				:host([size="big"]) {
					--aw-input-datalist-arrow-top: -33px;
					--aw-input-datalist-arrow-size: 26px;
					--aw-input-datalist-option-padding: 15px 10px;
					--aw-input-datalist-option-font-size: 16px;
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
				.container input[error]{
					border-top: var(--aw-input-border-top-error,var(--aw-input-border-error,solid 1px var(--aw-error-color,#b13033)));
					border-right: var(--aw-input-border-right-error,var(--aw-input-border-error,solid 1px var(--aw-error-color,#b13033)));
					border-bottom: var(--aw-input-border-bottom-error,var(--aw-input-border-error,solid 1px var(--aw-error-color,#b13033)));
					border-left: var(--aw-input-border-left-error,var(--aw-input-border-error,solid 1px var(--aw-error-color,#b13033)));
					background-color: var(--aw-input-background-color-error,var(--aw-input-background-color,transparent));
				}
				.container input[disabled]{
					color: var(--aw-input-color-disabled, #BBBBBB);
					border: var(--aw-input-border-disabled,solid 1px #DDDDDD);
					background-color: var(--aw-input-background-color-disabled,#F9F9F9);
				}
				.container input:-webkit-autofill {
					box-shadow:0 0 0px 1000px white inset !important;
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
				<label><input
					id$="[[id]]"
					name$="[[name]]"
					type$="[[type]]"
					placeholder="[[placeholder]]"
					minlength$="[[minlength]]"
					maxlength$="[[maxlength]]"
					min$="[[min]]"
					max$="[[max]]"
					step$="[[step]]"
					value$="{{value}}"
					readonly$="[[readonly]]"
					disabled$="[[disabled]]"
					autocapitalize$="[[autocapitalize]]"
					autocorrect$="[[autocorrect]]"
					autocomplete$="[[autocomplete]]"

					required$="[[required]]"
					nospaces$="[[nospaces]]"
					rangelength$="[[rangelength]]"
					isnumber$="[[isnumber]]"
					range$="[[range]]"
					isemail$="[[isemail]]"
					isurl$="[[isurl]]"
					domains$="[[domains]]"
					isdate$="[[isdate]]"
					dateprevius$="[[dateprevius]]"
					minage$="[[minage]]"
					maxage$="[[maxage]]"
					security$="[[security]]"
					equalto$="[[equalto]]"
					phonenumber$="[[phonenumber]]"
					phonecountry$="[[phonecountry]]"
					pattern$="[[pattern]]"
					novalidate$=[[novalidate]]

					error$=[[error]]
					errmsg$="{{errmsg}}"

					on-focusin="_focusin"
					on-focusout="_focusout"
					on-keyup="_keyup"
					on-keypress="_keypress"
					on-change="_change"

					size$=[[size]]
					/></label>

				<template id="datalist" is="dom-if" if="{{datalist}}">
					<aw-input-datalist input="{{inputElement}}" datalist="{{datalist}}" dlvisible="{{dlvisible}}"></aw-input-datalist>
				</template>
			</div>
			<div class="flex_inf">
				<div class="left">
					<aw-input-error errmsg="{{errmsg}}">{{errmsg}}</aw-input-error>
				</div>
				<div class="right">
					<aw-char-counter unresolved hidden$="{{!countchar}}">{{countCharStr}}</aw-char-counter>
				</div>
			</div>
			<slot name="datalist"></slot>
		`;
	}

	static get properties() {
		return {
			// Atributos básicos del input
			// ............................

			/** Id del input */
			id: { type: String },
			/** Nonbre del input */
			name: { type: String },
			/**
			 * Tipo del input
			 * @type {"text"|"number"|"password"|"email"|"url"|"date"}
			 */
			type: { type: String },
			/** Placeholder del input */
			placeholder: { type: String },
			/** Longitud mínima del valor del input */
			minlength: { type: Number },
			/** Longitud máxima del valor del input */
			maxlength: { type: Number },
			/** Valor mínimo del input (Solo para type=number) */
			min: { type: Number },
			/** Valor máximo del input (Solo para type=number) */
			max: { type: Number },
			/** Pasos de reducción|incremente del input (Solo pora type=number) */
			step: { type: String },
			/** Valor del input */
			value: { type: String },
			/** Indica si el input es de solo lectura */
			readonly: {type: Boolean, observer: "_set_readonly"},
			/** Desactiva el input */
            disabled: {type: Boolean, observer: "_set_disabled"},
			/**
			 * Autocapitaliza el valor del input
			 * @type {"off"|"none"|"on"|"sentences"|"words"|"characters"}
			 */
			autocapitalize: { type: String },
			/**
			 * Activa la corrección gramatical del input
			 * @type {"on"|"off"}
			 */
			autocorrect: { type: String },
			/** Activa el auto completado del input */
			autocomplete: { type: String },

			// Atributos de diseño
			// .......................

			/** Etiqueta el input */
			label: { type: String },
			/** Enfoca el componente al cargar */
			autofocus: { type: Boolean },
			/** Selecciona todo el texto al hacer focus */
			selectonfocus: { type: Boolean },
			/** Activa los spinners (Solo para type=number) */
			spinners: { type: Boolean },
			/** ID del datalist element */
			list: { type: String },
			/**
			 * Tamaño del input
			 * @type {"big"|"small"}
			 */
			size: { type: String, reflectToAttribute: true },

			// Relación con el aw-form
			// ..........................

			/** Evita que se registre en el formulario */
			noregister: { type: Boolean },

			// Atrtibutos de validación
			// ..........................

			/** Indica que este campo es obligatorio */
			required: { type: Boolean },
			/** No permite espacios en el valor */
			nospaces: { type: Boolean },
			/**
			 * Rango de longitud que tiene que tener el valor del input
			 * @type {number[]}
			 */
			rangelength: { type: Array },
			/** Valida que el valor sea un número */
			isnumber: { type: Boolean },
			/**
			 * Rango de cifras entre lo que tiene que estar el valor
			 * @type {number[]}
			 */
			range: { type: Array },
			/** Valida que valor sea un email */
			isemail: { type: Boolean },
			/** Valida que el valor sea una URL */
			isurl: { type: Boolean },
			/**
			 * Lista de dominios permitidos
			 * @type {string[]}
			 */
			domains: { type: Array },
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
			/**
			 * Grado de seguridad que tiene que tener el valor
			 * @type {"low"|"medium"|"hight"|"ultra"}
			 */
			security: { type: String },
			/** Indica que el valor tiene que coindidir con otro input */
			equalto: { type: String },
			/** Indica que el valor tiene que ser un número de teléfonno */
			phonenumber: { type: Boolean },
			/**
			 * El pais al que debe pertencer el número
			 * @type {Array<"es"|"uk"|"it"|"pt"|"fr"|"us">}
			 */
			phonecountry: { type: Array },
			/** Expresión regular que tiene que coincider con el valor */
			pattern: { type: String },
			/** Indica que el campo no debe ser validado */
			novalidate: { type: Boolean },
			/** Indica que el campo debe ser validado al cambiar */
			validateonchange: { type: Boolean },			
		};
	}

	constructor() {
		super();

		this.id = undefined;
		this.name = undefined;
		this.type = undefined;
		this.placeholder = undefined;
		this.minlength = undefined;
		this.maxlength = undefined;
		this.min = undefined;
		this.step = undefined;
		this.value = undefined;
		this.readonly = false;
		this.disabled = false;
		this.autocapitalize = undefined;
		this.autocorrect = undefined;
		this.autocomplete = undefined;
		this.label = undefined;
		this.size = undefined;
		this.autofocus = false;
		this.selectonfocus = false;
		this.spinners = false;
		this.list = undefined;
		this.noregister = false;

		/** @type {HTMLInputElement} */
		this.inputElement = undefined;

		/** @type {AwForm} */
		this.parentForm = undefined;

		/** @type {HTMLDataListElement} */
		this.datalist = undefined;
		/** @type {MutationObserver} */
		this.observDl = undefined;
		this.dlvisible = false;
	}

	/**
	 * @method	connectedCallback
	 * 
	 * Realiza las operaciones al conectar el componente.
	 */
	connectedCallback() {
		super.connectedCallback();

		// Asignamos el input

		this.inputElement = this.shadowRoot.querySelector( "input" );

		// Inicializamos el componente

		this._init();

		// Activamos los errores

		this.error_listen();

		// Activamos el countchar

		this.set_countchar();

		// Ponemos el datalist

		this._set_datalist();
		
		// Buscamos prefixs y suffixs

		this.findPrefixAndSuffixs();

		// Registramos en el formulario.

		this._register_in_form();

		// Invocamos la función externa connected

		if ( typeof this.connectedfunc === "function" ) {
			this.connectedfunc( this );
		}

		// Resolvemos

		this.removeAttribute( "unresolved" );
	}

	/**
	 * @method	disconnectedCallback
	 * 
	 * Realiza las operaciones necesarias al desconectar el componente.
	 */
	disconnectedCallback(){
		super.disconnectedCallback();

		// Quitamos el elemento del registro

		if( !this.noregister && this.parentForm ) {
			this.parentForm._unregister_element( this.inputElement );
		}

		// Dejamos de observar los cambios en el datalist

		if ( this.dataList ) {
			this.observDl.disconnect();
		}
	}

	/**
	 * @method	clear
	 * 
	 * Resetea el componente
	 */
	clear(){
		this.inputElement.value = "";
	}

	/**
	 * @method errorHide
	 * 
	 * Muestra u oculta un mensaje de error
	 */
	errorHide() {
		this.inputElement.setAttribute( "errmsg", "" );
	}

	/**
	 * @method errorShow
	 * 
	 * Muestra u oculta un mensaje de error
	 * 
	 * @param {string} message Mensaje de error que se va a mostrar
	 */
	errorShow(message) {
		this.inputElement.setAttribute( "errmsg", message );
	}

	/**
	 * @method getValue
	 * 
	 * Obtiene el valor del input
	 * 
	 * @return {string}
	 */
	getValue() {
		return this.inputElement.value;
	}

	/**
	 * @method	hasError
	 * 
	 * Devuelve si el campo tiene un error
	 * 
	 * @return {boolean}
	 */
	hasError() {
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
		this.inputElement.focus();
		this.inputElement.selectionStart = this.inputElement.selectionEnd = this.inputElement.value.length;
	}

	/**
	 * @method	set_value
	 * 
	 * Asigna el valor al elemento
	 * 
	 * @param {string|number} value 
	 */
	setValue(value) {
		this.inputElement.value = value;
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

	/**
	 * @method	_focusin
	 * 
	 * Acciones a realizar cuando se hace focus sobre el input.
	 */
	_focusin( ev ) {
		super._focusin();

		if( this.inputElement.value && this.selectonfocus ) {
			this.inputElement.select();
		}
		
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
		super._focusout();

		// Quitamos el label focused

		this.$.label.removeAttribute( "focused" );
		this.$.container.removeAttribute( "focused" );

		// Invocamos la función externa focusout

		if ( typeof this.focusoutfunc === "function" ) {
			this.focusoutfunc( this.inputElement );
		}
	}

	/**
	 * @method	_init
	 * 
	 * Inicializa el componente una vez se ha conectado.
	 */
	_init() {
		//  Ajustamos el type del input
		// . . . . . . . . . . . . . . . . . . . . .

		if ( this.type !== "text" && this.type !== "number" && this.type !== "password" && this.type !== "email" && this.type !== "url" && this.type !== "date" ) {
			this.type = "text";
		}

		//  Quitamos los spinners
		// . . . . . . . . . . . . . . . . . . . . .

		if( !this.spinners && this.type === "number" ) {
			this.inputElement.setAttribute( "nospinners", "" );
		}

		//  Ponemos el autofocus
		// . . . . . . . . . . . . . . . . . . . . . 
		
		if( this.autofocus && !this.readonly && !this.disabled ) {
			setTimeout(() => {
				this.focus();
			},100);
		}

		//  Si hay valor
		// . . . . . . . . . . . . . . . . . . . . . 
		
		if( this.value ) {
			this._keyup();
		}
	}

	/**
	 * @method	_keypress
	 * 
	 * Acciones a realizar cuando se presiona una tecla sobre el input.
	 */
	_keypress( ev ) {
		// Invocamos la función externa keypress

		if ( typeof this.keypressfunc === "function" ) {
			this.keypressfunc( this.inputElement );
		}
	}

	/**
	 * @method	_keyup
	 * 
	 * Acciones a realizar cuando se levanta una tecla sobre el input.
	 */
	_keyup( ev ) {
		super._keyup();
	
		// Invocamos la función externa keyup

		if ( typeof this.keyupfunc === "function" ) {
			this.keyupfunc( this.inputElement );
		}

		// Submitimos el formulario al pulsar intro

		if( ev && ev.keyCode === 13 && this.parentForm && !this.dlvisible ) {
			this.parentForm.submit();
		}
	}

	/**
	 * @method	_observe_datalist
	 * 
	 * Obserca los cambios en el datalist
	 */
	_observe_datalist( ev ) {
		// Obtenemos el viejo datalist.

		var oldDatalist = ev[ 0 ].target;
		
		// Creamos el nuevo datalist

		var newDatalist = document.createElement( "DATALIST" );
		for( var i = 0; i < this.datalist.attributes.length; i++ ) {
			newDatalist.setAttribute( this.datalist.attributes[ i ].name, this.datalist.attributes[ i ].value );
		}

		newDatalist.innerHTML = this.datalist.innerHTML;
		
		// Asignamos el nuevo datalist.

		this.datalist = newDatalist;

		this.removeChild( oldDatalist );
		this.appendChild( this.datalist );

		// Volvemos a poner a la escucha el nuevo datalist.

		this.observDl.disconnect();
		this.observDl = new MutationObserver( this._observe_datalist.bind( this ));
		this.observDl.observe( this.datalist, { childList: true } );
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
	 * @method	_set_datalist
	 * 
	 * Configura el datalist del input si existe.
	 */
	_set_datalist() {
		if( this.list ) {
			let dlSlot = this.shadowRoot.querySelector( "slot[name=datalist]" );
			this.datalist = dlSlot.assignedNodes()[ 0 ];
			let options = this.datalist.querySelectorAll( "option" );
			
			if( options.length > 0 || this.activelist ) {
				this.inputElement.classList.add( "datalist" );
				
				this.observDl = new MutationObserver( this._observe_datalist.bind( this ));
				this.observDl.observe( this.datalist, { childList: true } );
			} else {
				this.datalist = false;
			}
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
}

window.customElements.define( "aw-input-df", AwInputDf );