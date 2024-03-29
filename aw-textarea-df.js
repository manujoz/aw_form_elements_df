import { PolymerElement, html, Polymer } 	from "../aw_polymer_3/polymer/polymer-element.js";
import { AwInputErrorMixin } 				from "../aw_form_mixins/aw-input-error-mixin.js";
import { AwInputCharCounterMixin } 			from "../aw_form_mixins/aw-char-counter-mixin.js";
import { AwFormValidateMixin } 				from "../aw_form_mixins/aw-form-validate-mixin.js";
import { AwExternsFunctionsMixin } 			from "../aw_extern_functions/aw-extern-functions-mixin.js";

/**
 * Componente de textarea
 * 
 * @slot
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
 */
class AwTextareaDf extends AwInputErrorMixin( AwInputCharCounterMixin ( AwFormValidateMixin ( AwExternsFunctionsMixin ( PolymerElement )))) {
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
				.container textarea {
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
					resize: none;
					vertical-align: top;
				}
				.container textarea[size="small"] {
					padding: 5px;
					font-size: 12px;
				}
				.container textarea[size="big"] {
					padding: 11px 9px 10px;
					font-size: 18px;
				}
				.container textarea:focus{
                	outline: 0;
					border-top: var(--aw-input-border-top-focused,var(--aw-input-border-focused,solid 1px var(--aw-primary-color,#1C7CDD)));
					border-right: var(--aw-input-border-right-focused,var(--aw-input-border-focused,solid 1px var(--aw-primary-color,#1C7CDD)));
					border-bottom: var(--aw-input-border-bottom-focused,var(--aw-input-border-focused,solid 1px var(--aw-primary-color,#1C7CDD)));
					border-left: var(--aw-input-border-left-focused,var(--aw-input-border-focused,solid 1px var(--aw-primary-color,#1C7CDD)));
					background-color: var(--aw-input-background-color-focused,var(--aw-input-background-color,transparent));
				}
				.container textarea[error]{
					border-top: var(--aw-input-border-top-error,var(--aw-input-border-error,solid 1px var(--aw-error-color,#1C7CDD)));
					border-right: var(--aw-input-border-right-error,var(--aw-input-border-error,solid 1px var(--aw-error-color,#1C7CDD)));
					border-bottom: var(--aw-input-border-bottom-error,var(--aw-input-border-error,solid 1px var(--aw-error-color,#1C7CDD)));
					border-left: var(--aw-input-border-left-error,var(--aw-input-border-error,solid 1px var(--aw-error-color,#1C7CDD)));
					background-color: var(--aw-input-background-color-error,var(--aw-input-background-color,transparent));
				}
				.container textarea[disabled]{
					color: var(--aw-input-color-disabled, #BBBBBB);
					border: var(--aw-input-border-disabled,solid 1px #DDDDDD);
					background-color: var(--aw-input-background-color-disabled,#F9F9F9);
				}
				.container textarea::-webkit-scrollbar {
					width: 8px;
					height: 8px;
					background-color: #f0f0f0;
				}
				.container textarea::-webkit-scrollbar-track {
					background-color: #f0f0f0;
				}
				.container textarea::-webkit-scrollbar-thumb {
					background-color: #bbbbbb;
				}
				.container textarea::-webkit-scrollbar-thumb:hover {
					background-color: #999999;
				}
				.container textarea:-webkit-autofill {
					box-shadow: 0 0 0px 1000px white inset !important;
					-webkit-box-shadow: 0 0 0px 1000px white inset !important;
					-webkit-text-fill-color: var(--aw-input-color, #111111);
				}
				.container textarea::-webkit-input-placeholder {
					color: var(--aw-input-placeholder-color,#999999);
					font-family: var(--aw-input-placeholder-font-family,var(--aw-input-font-family, "arial"));
					font-style: var(--aw-input-placeholder-font-style,oblique);
				}
				.container textarea::-moz-placeholder {
					color: var(--aw-input-placeholder-color,#999999);
					font-family: var(--aw-input-placeholder-font-family,var(--aw-input-font-family, "arial"));
					font-style: var(--aw-input-placeholder-font-style,oblique);
				}
				.container textarea::-ms-input-placeholder {
					color: var(--aw-input-placeholder-color,#999999);
					font-family: var(--aw-input-placeholder-font-family,var(--aw-input-font-family, "arial"));
					font-style: var(--aw-input-placeholder-font-style,oblique);
				}
				.container textarea::-o-input-placeholder {
					color: var(--aw-input-placeholder-color,#999999);
					font-family: var(--aw-input-placeholder-font-family,var(--aw-input-font-family, "arial"));
					font-style: var(--aw-input-placeholder-font-style,oblique);
				}
				.container textarea::-ms-reveal, input::-ms-clear {
					display: none !important;
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
				<label><textarea
					id$="[[id]]"
					name$="[[name]]"
					rows$="[[rows]]" 
					placeholder="[[placeholder]]"
					minlength$="[[minlength]]"
					maxlength$="[[maxlength]]"
					readonly$="[[readonly]]"
					disabled$="[[disabled]]"
					autocapitalize$="[[autocapitalize]]"
					autocorrect$="[[autocorrect]]"
					autocomplete$="[[autocomplete]]"
					
					required$="[[required]]"
					nospaces$="[[nospaces]]"
					novalidate$=[[novalidate]]

					size$="[[size]]"

					errmsg$="{{errmsg}}"
					on-focusin="_focusin"
					on-focusout="_focusout"
					on-keyup="_keyup"
					on-keypress="_keypress"
					on-change="_change"
					>{{value}}</textarea></label>
			</div>
			<div class="flex_inf">
				<div class="left">
					<aw-input-error errmsg="{{errmsg}}">{{errmsg}}</aw-input-error>
				</div>
				<div class="right">
					<aw-char-counter unresolved hidden="{{!countchar}}">{{countCharStr}}</aw-char-counter>
				</div>
			</div>
		`;
	}

	static get properties() {
		return {
			// Atributos básicos del input
			// ...........................

			/** ID del componente */
			id: { type: String },
			/** Nombre del componente */
			name: { type: String },
			/** Filas que tendrá el textarea */
			rows: { type: String },
			/** Placeholder del componente */
			placeholder: { type: String },
			/**
			 * Autocapitaliza el valor del input
			 * @type {"off"|"none"|"on"|"sentences"|"words"|"characters"}
			 */
			autocomplete: { type: String },
			/** Longitud mínima del texto */
			minlength: { type: Number },
			/** Longitud máxima del texto */
			maxlength: { type: Number },
			/** Valor del componente */
			value: { type: String },
			/**
			 * Activa la corrección gramatical del input
			 * @type {"on"|"off"}
			 */
			autocorrect: { type: String },
			/** El componente es de solo lectura */
			readonly: {type: Boolean, observer: "_set_readonly"},
			/** El componente está desactivado */
			disabled: {type: Boolean, observer: "_set_disabled"},

			// Atributos de diseño
			// .......................

			/** Etiqueta del componente */
			label: { type: String },
			/**
			 * Tamaño del input
			 * @type {"big"|"small"}
			 */
			size: { type: String, reflectToAttribute: true },
			/** Hace focus en el componente al cargar */
			autofocus: { type: Boolean },

			// Especiales del aw-textarea
			// .......................

			/** El textarea no se ajusta en altura */
			noadjust: { type: Boolean },
			/** Altura máxima del textarea */
			maxheight: { type: Number },

			// Relación con el aw-form
			// .......................

			/** El textarea no se registra en el formulario */
			noregister: { type: Boolean },

			// Atributos de validación
			// .......................

			/** Indica que este campo es obligatorio */
			required: { type: Boolean },
			/** No permite espacios en el valor */
			nospaces: { type: String },
			/** Indica que el campo no debe ser validado */
			novalidate: { type: Boolean },
			/** Indica que el campo debe ser validado al cambiar */
			validateonchange: { type: Boolean },	
		};

	}

	constructor() {
		super();

		this.autocomplete = "off";
		this.autocorrect = undefined;
		this.autofocus = false;
		this.disabled = false;
		this.id = undefined;
		this.label = undefined;
		this.maxheight = 0;
		this.maxlength = undefined;
		this.minlength = undefined;
		this.name = undefined;
		this.noadjust = false;
		this.noregister = false;
		this.placeholder = undefined;
		this.readonly = false;
		this.rows = "1";
		this.size = undefined;
		this.value = "";

		/** @type {HTMLTextAreaElement} */
		this.inputElement = null;
		/** @type {AwForm} */
		this.parentForm = undefined;
	}

	/**
	 * @method	connectedCallback
	 * 
	 * Realiza las operaciones al conectar el componente.
	 */
	connectedCallback() {
		super.connectedCallback();

		// Asignamos el elemento

		this.inputElement = this.shadowRoot.querySelector( "textarea" );

		// Inicializamos el componente.

		this._init();

		// Hacemos ajustable el textarea
			
		this._textarea_adjust();

		// Activamos los errores

		this.error_listen();

		// Activamos el countchar

		this.set_countchar();

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
	}

	/**
	 * @method	clear
	 * 
	 * Limpia el textarea
	 */
	clear() {
		this.inputElement.value = "";
		this.inputElement.dispatchEvent(new KeyboardEvent('keyup',{'key':'Crtl'}));
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
		this.inputElement.focus();
		this.inputElement.selectionStart = this.inputElement.selectionEnd = this.inputElement.value.length;
	}

	/**
	 * @method	_init
	 * 
	 * Inicializa el componente una vez se ha conectado.
	 */
	_init() {
		// Ponemos el value si viene dado.
		
		/*
		NOTE: Desactivado de mommento a la espera de su necesidad.
		
		if ( this.value ) {
			this._keyup();
		}*/

		//  Ponemos el autofocus
		
		if( this.autofocus && !this.readonly && !this.disabled ) {
			setTimeout(() => {
				this.focus();
			},100);
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
	 * @method	_textarea_adjust
	 * 
	 * Pone el textarea como ajustable.
	 */
	_textarea_adjust() {
		if( this.noadjust || !Polymer.TextareaAdjust ) {
			return false;
		}
		
		if( this.maxheight > 0 ) {
			Polymer.TextareaAdjust.init( this.inputElement, { maxHeight: this.maxheight } );
		} else {
			Polymer.TextareaAdjust.init( this.inputElement );
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
	 * @method	_focusin
	 * 
	 * Acciones a realizar cuando se hace focus sobre el input.
	 */
	_focusin() {
		super._focusin();
		
		// Impedimos si es de solo lecutura o está desactivado.

		if( this.readonly || this.disabled ) {
			this.inputElement.blur();
			return false;
		}

		// Ponemos el focusl a label

		this.$.label.setAttribute( "focused", "" );
		this.$.container.setAttribute( "focused", "" );

		// Invocamos la función externa keyup

		if ( typeof this.focusinfunc === "function" ) {
			this.focusinfunc( this.inputElement );
		}
	}

	/**
	 * @method	_focusout
	 * 
	 * Acciones a realizar cuando se quita el focus del input.
	 */
	_focusout() {
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
	 * @method	_keypress
	 * 
	 * Acciones a realizar cuando se presiona una tecla sobre el input.
	 */
	_keypress() {
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
	_keyup() {
		super._keyup();
	
		// Invocamos la función externa keyup

		if ( typeof this.keyupfunc === "function" ) {
			this.keyupfunc( this.inputElement );
		}
	}

	/**
	 * @method	_change
	 * 
	 * Acciones a realizar cuando se realiza un cambio en el input.
	 */
	_change() {
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

window.customElements.define( "aw-textarea-df", AwTextareaDf );