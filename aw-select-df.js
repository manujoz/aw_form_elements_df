
import { PolymerElement, html, Polymer } 	from "../aw_polymer_3/polymer/polymer-element.js";
import { AwFormValidateMixin } 				from "../aw_form_mixins/aw-form-validate-mixin.js";
import { AwExternsFunctionsMixin } 			from "../aw_extern_functions/aw-extern-functions-mixin.js";
import { AwInputErrorMixin } 				from "../aw_form_mixins/aw-input-error-mixin.js";

import "../aw_polymer_3/iron-icons/iron-icons.js";
import "../aw_polymer_3/paper-ripple/paper-ripple.js";
import "../aw_form_helpers/aw-input-error.js";
import "./helpers/aw-select-options.js";

/**
 * Componente de select
 * 
 * @attr {Boolean} error
 * @attr {String} errmsg
 * @attr {Boolean} noerrors
 * @attr {String} connectedfunc
 * @attr {String} changefunc
 * @cssprop --aw-error-color
 * @cssprop --aw-primary-color
 * @cssprop --aw-select-arrow-color
 * @cssprop --aw-select-arrow-top
 * @cssprop --aw-select-icon-margin-top
 * @cssprop --aw-select-options-color
 * @cssprop --aw-select-options-icon-right
 * @cssprop --aw-select-options-icon-top
 * @cssprop --aw-select-options-icon-width
 * @cssprop --aw-select-options-image-right
 * @cssprop --aw-select-options-image-top
 * @cssprop --aw-select-options-image-width
 * @cssprop --aw-select-visible-icon-margin-right
 * @cssprop --aw-select-visible-icon-width
 * @cssprop --aw-select-visible-image-margin-right
 * @cssprop --aw-select-visible-image-margin-top
 * @cssprop --aw-select-visible-image-width
 */
class AwSelectDf extends AwInputErrorMixin( AwFormValidateMixin ( AwExternsFunctionsMixin ( PolymerElement ))) {
	static get template() {
		return html`
		<style>
			:host {
				position: relative;
				padding: 0 0 10px 0;
				margin: 0;
				width: 180px;
				font-family: var(--aw-input-font-family);
				vertical-align: var(--aw-input-vertical-align, middle);
				display: inline-block;
			}
			:host([fullwidth]) {
				width: 100%;
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
			#label[focused] {
				color: var(--aw-input-label-color-focused,var(--aw-primary-color,#1C7CDD));
			}
			#label[error] {
				color: var(--aw-input-label-color-error,var(--aw-error-color,#b13033));
			}
			#label[disabled] {
				color: var(--aw-input-label-color-disabled,var(--aw-input-color-disabled,#BBBBBB));
			}

			/* #region Generales */

			.hidden, [hidden] {
				display: none;
			}

			/* #region Input visible */

			.container {
				position: relative;
			}
			.container[focused] .input_visible {
				border: var(--aw-input-border-focused,solid 1px var(--aw-primary-color,#1C7CDD));
			}
			.container[error] .input_visible {
				border: var(--aw-input-border-error,solid 1px var(--aw-error-color,#b13033));
			}
			.container .input_visible {
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
			.container .input_visible > img {
				vertical-align: middle;
				width: var(--aw-select-visible-image-width,var(--aw-select-options-image-width,20px));
				margin-top: var(--aw-select-visible-image-margin-top,var(--aw-select-options-image-top,-4px));
				margin-right: var(--aw-select-visible-image-margin-right,var(--aw-select-options-image-right,7px));
			}
			.container .input_visible > iron-icon {
				width: var(--aw-select-visible-icon-width,var(--aw-select-options-icon-width,var(--aw-select-visible-image-width,var(--aw-select-options-image-width,20px))));
				height: var(--aw-select-visible-icon-width,var(--aw-select-options-icon-width,var(--aw-select-visible-image-width,var(--aw-select-options-image-width,20px))));
				fill: var(--aw-select-options-color,var(--aw-input-color, #333333));
				margin-top: var(--select-visible-icon-margin-top,var(--aw-select-options-icon-top,-2px));
				margin-right: var(--select-visible-icon-margin-right,var(--aw-select-options-icon-right,7px));
			}
			.container .input_visible[error]{
				border-top: var(--aw-input-border-top-error,var(--aw-input-border-error,solid 1px var(--aw-error-color,#1C7CDD)));
				border-right: var(--aw-input-border-right-error,var(--aw-input-border-error,solid 1px var(--aw-error-color,#1C7CDD)));
				border-bottom: var(--aw-input-border-bottom-error,var(--aw-input-border-error,solid 1px var(--aw-error-color,#1C7CDD)));
				border-left: var(--aw-input-border-left-error,var(--aw-input-border-error,solid 1px var(--aw-error-color,#1C7CDD)));
				background-color: var(--aw-input-background-color-error,var(--aw-input-background-color,transparent));
			}
			.container .input_visible[disabled]{
				color: var(--aw-input-color-disabled, #BBBBBB);
				border: var(--aw-input-border-disabled,solid 1px #DDDDDD);
				background-color: var(--aw-input-background-color-disabled,#F9F9F9);
			}
			.container .input_visible[size="small"] {
				padding: 5px;
				font-size: 12px;
			}
			.container .input_visible[size="small"] > img {
                width: 13px;
                height: 13px;
                margin-top: 0px;
			}
			.container .input_visible[size="small"] > iron-icon {
                width: 13px;
                height: 13px;
                margin-top: 0px;
			}
			.container .input_visible[size="big"] {
				padding: 11px 9px 10px;
				font-size: 18px;
			}
			.container .input_visible[size="big"] > img {
                width: 26px;
                height: 26px;
                margin-top: 0;
			}
			.container .input_visible[size="big"] > iron-icon {
                width: 26px;
                height: 26px;
                margin-top: 0;
			}

			/* #region Icono del select */

			#container > iron-icon {
				position: absolute;
				top: var(--aw-select-arrow-top,calc(50% - 12px));
				right: 0px;
				width: 24px;
				height: 24px;
				fill: var(--aw-select-arrow-color, #555555);
			}

			#container > iron-icon[disabled] {
				fill: var(--aw-input-disabled-color, #BBBBBB) !important;
			}

			/* #region Cobertura */

			.cover {
				position: absolute;
				top: 0px;
				left: 0px;
				width: 100%;
				height: 100%;
			}

			input.ghost {
				position: absolute;
				top: 0;
				left: 0;
				width: 0px;
				height: 0px;
				opacity: 0;
			}
		</style>
		<div id="label" hidden="{{!label}}">{{label}}</div>

		<div id="container" class="container">
			<label><input class="ghost" readonly on-focusin="_open" /></label>
			<div class="input_visible" disabled$="[[disabled]]" size$=[[size]]></div>
			<iron-icon icon="arrow-drop-down"></iron-icon>
			<div class="cover" on-click="_open"></div>

			<template is="dom-if" if="{{!noink}}">
				<paper-ripple></paper-ripple>
			</template>
		</div>
		<aw-input-error errmsg="{{errmsg}}">{{errmsg}}</aw-input-error>

		<div class="hidden">
			<input
				id$=[[id]]
				name$=[[name]]
                autocomplete$="[[autocomplete]]"
				value$="{{value}}"
				type="hidden"

                required$="[[required]]"
                novalidate$=[[novalidate]]
				/>
		</div>
		<aw-select-options class$="[[classOptions]]" size="[[size]]" searchable="{{searchable}}" options="{{options}}" open="{{open}}"></aw-select-options>
		`;
	}

	static get properties() {
		return {
			// Atributos básicos del input
			// ..........................

			/**
			 * Id del input
			 */
			id: { type: String },
			/**
			 * Nombre del input
			 */
			name: { type: String },
			/**
			 * Activa el auto completado del input
			 */
			autocomplete: { type: String },
			/**
			 * Pone el select desactivado
			 */
			disabled: {type: Boolean, observer: "_set_disabled"},

			// Atributos de diseño
			// ..........................

			/**
			 * Etiqueta del select
			 */
			label: { type: String },
			/**
			 * Nombre de la clase de las opciones, esta clase ha de estar disponible en el ámbito global
			 */
			classOptions: { type: String },
			/**
			 * Tamaño del input
			 * @type {"big"|"small"}
			 */
			size: { type: String, reflectToAttribute: true },
			/** Pone el botón en ancho completo */
			fullwidth: { type: Boolean, reflectToAttribute: true },

			// Atributos especiales del aw-select
			// ..........................

			/**
			 * Evita el efecto Ripple en el select
			 */
			noink: { type: Boolean },
			/**
			 * Hace focus sobre el select al cargar
			 */
			autofocus: { type: Boolean },
			/**
			 * Hace que el select tenga un campo de búsqueda
			 */
			searchable: { type: Boolean },
			/**
			 * Selecciona una opción por su índice
			 */
			selectedindex: { type: Number, observer: "_handleSelectedIndex" },
			/**
			 * Selecciona una opción por su valor
			 */
			selectedvalue: { type: String, observer: "_handleSelectedValue" },

			// Atributos de funcionamiento
			// ..........................
			
			/**
			 * Abre las opciones
			 */
			open: { type: Boolean, observer: "_handleOpen" },

			// Atributos de validación
			// ..........................
			
			/**
			 * Indica que este campo es obligatorio
			 */
			required: { type: Boolean },
			/**
			 * Indica que el campo no debe ser validado
			 */
			novalidate: { type: Boolean },
			/**
			 * Indica que el campo debe ser validado al cambiar
			 */
			validateonchange: { type: Boolean },

			// Relación con el aw-form
			// ..........................

			/**
			 * Evita que se registre en el formulario
			 */
			noregister: { type: Boolean },
		};
	}

	constructor() {
		super();

		this.id = undefined;
		this.name = undefined;
		this.autocomplete = "off";
		this.value = undefined;
		this.disabled = false;
		this.label = undefined;
		this.classOptions = undefined;
		this.noink = false;
		this.size = undefined;
		this.autofocus = false;
		this.searchable = false;
		this.selectedindex = 0;
		this.selectedvalue = "";
		this.open = false;
		this.noregister = false;
		this.fullwidth = false;


		/** @type {HTMLInputElement} */
		this.inputElement = undefined;
		/** @type {HTMLInputElement} */
		this.inputVisible = undefined;
		/** @type {optionsObj[]} */
		this.options = [];
		/** @type {AwSelectOptions} */
		this.awSelectOptions = null;
		/** @type {MutationObserver} */
		this.observOpts = null;
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

		// Asignamos los inputs del componente

		this.inputElement = this.shadowRoot.querySelector( ".hidden input" );
		this.inputVisible = this.shadowRoot.querySelector( ".input_visible" );
		this.awSelectOptions = this.shadowRoot.querySelector( "aw-select-options" );

		// Creamos las opciones
		this._create();

		// Escuchamos el cambio de los options
		this.observOpts = new MutationObserver( this._observerOptions.bind( this ));
		this.observOpts.observe( this, { childList: true } );

		// Activamos los errores
		this.error_listen();

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
	disconnectedCallback() {
		super.disconnectedCallback();

		// Dejamos de escuchar el cambio de los options
		this.observOpts.disconnect();

		// Quitamos el elemento del registro
		if( !this.noregister && this.parentForm ) {
			this.parentForm._unregister_element( this.$.input );
		}
	}

	/**
	 * @method	clear
	 * 
	 * Resetea el componente a su valor por defecto
	 */
	clear() {
		if(this.selectedindex === 0) {
			this.set("selectedindex", 999999999);
		}
		this.set("selectedindex", 0);
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
	errorShow(message) {
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
	 * @method	reload
	 * 
	 * Refresca los options dentro del componente si cambiaron en el aw-select
	 */
	reload() {
		this.inputElement.value = "";
		this.inputVisible.value = "";

		this._create();
	}

	/**
	 * @method	setSelected
	 * 
	 * @param {{value:string,inner:string,iron:string,image:string,title:string,selected:boolean}} option 
	 * @param {boolean} change 
	 */
	setSelected(option, change = true) {
		this.inputElement.value = option.value;

		if( option.iron ) {
			this.inputVisible.innerHTML = '<iron-icon icon="' + option.iron + '"></iron-icon>' + option.inner;
		} else if( option.image ) {
			this.inputVisible.innerHTML = '<img src="' + option.image + '">' + option.inner;
		} else {
			this.inputVisible.innerHTML = option.inner;
		}

		if( change ) {
			this._change();
		}
	}

	/**
	 * @method	toIndex
	 * 
	 * Selecciona una opción del selec por su índice
	 * 
	 * @param	{number} index 	Índice de la opción que queremos seleccionar
	 * @param	{number} notify	Indica si se debe notificar el cambio enviando el evento
	 */
	toIndex(index, notify = false)
	{
		for( let i = 0; i < this.options.length; i++ ) {
			if(this.options[i].selected && i === index) {
				return;
			}
		}

		if(this.selectedindex === index) {
			this.set("selectedindex", 9999999);
		}

		this.set("selectedindex", index);
		if(notify) {
			this._change();
		}
	}

	/**
	 * @method	toValue
	 * 
	 * Selecciona una opción del select por su valor
	 * 
	 * @param	{number} value 	Valor de la opción que queremos selecionar
	 * @param	{number} notify	Indica si se debe notificar el cambio enviando el evento
	 */
	toValue(value, notify = false) {
		if(this.inputElement.value === value) {
			false;
		}

		if(this.selectedvalue === value) {
			this.set("selectedvalue", "oa-asd3-ad-v-daq2eqw-");
		}

		this.set("selectedvalue", value);

		if(notify) {
			this._change();
		}
	}

	/**
	 * @method	_change
	 * 
	 * Controla el cambio del valor del campo
	 */
	_change() {
		// Invocamos la función externa de change change
		if ( typeof this.changefunc === "function" ) {
			setTimeout(() => {
				this.changefunc( this.inputElement );
			}, 200);
		}
	}

	/**
	 * @method	_create	
	 * 
	 * Crea las opciones del aw-select.
	 */
	_create() {
		// Cogemos los options
		const options = [];
		var opts = this.querySelectorAll( "option" );

		for( let i = 0; i < opts.length; i++ ) {
			let selected = false;

			if( !selected && (( parseInt(this.selectedindex) === i && !this.selectedvalue ) || ( this.selectedvalue && this.selectedvalue === opts[ i ].value ))) {
				selected = true;
			}

			var obj = {
				el: opts[ i ],
				value: opts[ i ].value,
				inner: opts[ i ].innerHTML,
				title: opts[ i ].getAttribute( "title" ),
				iron: opts[ i ].dataset.iron,
				image: ( !opts[ i ].dataset.iron ) ? opts[ i ].dataset.img : "",
				selected: selected
			}

			if(selected) {
				this.setSelected(obj, false);
			}

			options.push(obj);
		}
		this.options = options;
	}

	/**
	 * @method	_handleOpen
	 * 
	 * Escucha el cambio del atributo open
	 */
	_handleOpen() {
		if( this.open ) {
			this.$.label.setAttribute( "focused", "" );
			this.$.container.setAttribute( "focused", "" );
		} else {
			this.$.label.removeAttribute( "focused", "" );
			this.$.container.removeAttribute( "focused", "" );
		}
	}

	/**
	 * @method	_handleSelectedIndex
	 * 
	 * Observa el cambio en el selectedindex
	 */
	_handleSelectedIndex() {
		if(this.options.length === 0 || !this.options[this.selectedindex]) {
			return;
		}

		for( let i = 0; i < this.options.length; i++ ) {
			if( this.options[i].selected ) {
				this.options[i].selected = false;
				break;
			}
		}

		if(!this.options[this.selectedindex]) {
			return;
		}

		this.setSelected(this.options[this.selectedindex], false);
		this.options[this.selectedindex].selected = true;
		this.awSelectOptions.selectByIndex(this.selectedindex);
	}

	/**
	 * @method	_handleSelectedValue
	 * 
	 * Observa el cambio en el selectedvalue
	 */
	_handleSelectedValue() {
		if( this.options.length === 0 ) {
			return;
		}

		let removedSelected = false;
		let selectedindex = null;
		for( let i = 0; i < this.options.length; i++ ) {
			if( this.options[i].value === this.selectedvalue ) {
				selectedindex = i;
			}

			if( this.options[i].selected ) {
				this.options[i].selected = false;
				removedSelected = true;
			}

			if( removedSelected && selectedindex !== null ) {
				break;
			}
		}

		if(!this.options[selectedindex]) {
			return;
		}

		this.setSelected(this.options[selectedindex], false);
		this.options[selectedindex].selected = true;
		this.awSelectOptions.selectByIndex(selectedindex);
	}

	/**
	 * @method	_observer_options
	 * 
	 * Observa el cambio de los options en el aw-select y los refresca automáticamente
	 */
	_observerOptions() {
		this.reload();
	}

	/**
	 * @method	_open
	 * 
	 * Abre las opcione
	 * 
	 * @param {event} ev
	 */
	_open(ev) {
		ev.stopPropagation();

		// Invocamos la función externa de click
		if ( typeof this.clickfunc === "function" ) {
			this.clickfunc( this.inputElement );
		}

		// Si esta abierta o es disabled paramos
		if( this.open || this.disabled ) {
			return false;
		}

		// Abirmos las opcioens
		this.open = true;
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
	 * @method	_set_disabled
	 * 
	 * Pone el componente en estado desactivado
	 */
	_set_disabled() {
		if ( this.disabled ) {
			this.$.container.querySelector( "iron-icon" ).setAttribute( "disabled", "" );
			this.$.label.setAttribute( "disabled", "" );
			this.noink = true;
		} else {
			this.$.container.querySelector( "iron-icon" ).removeAttribute( "disabled" );
			this.$.label.removeAttribute( "disabled" );
			this.noink = false;
		}
	}
}

window.customElements.define( "aw-select-df", AwSelectDf );

/**
 * @typedef {{el:HTMLOptionElement,value: string, inner: string, title: string, iron: string, image: string, selected: boolean}} optionsObj
 */