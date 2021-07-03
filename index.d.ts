interface AwInput extends HTMLElement {
	inputElement: HTMLInputElement;
	connectedfunc: Function;
	changefunc: Function;
	focusinfunc: Function;
	focusoutfunc: Function;
	keypressfunc: Function;
	keyupfunc: Function;
	validator: AwFormValidator;

	/**
	 * @method	clear
	 * 
	 * Limpia el componente
	 */
	clear(): void;

	/**
	 * @method errorHide
	 * 
	 * Muestra u oculta un mensaje de error
	 */
	errorHide() : void;

	/**
	 * @method errorShow
	 * 
	 * Muestra u oculta un mensaje de error
	 * 
	 * @param {string} message Mensaje de error que se va a mostrar
	 */
	errorShow( message: string ) : void;

	/**
	 * @method getValue
	 * 
	 * Obtiene el valor del input
	 * 
	 * @return {string}
	 */
	getValue() : string;

	/**
	 * @method	hasError
	 * 
	 * Devuelve si el campo tiene un error
	 * 
	 * @return {boolean}
	 */
	hasError() : boolean;

	/**
	 * @method	focus
	 * 
	 * Pone el foco sobre el input.
	 */
	focus() : void

	/**
	 * @method	setValue
	 * 
	 * Pone el foco sobre el input.
	 */
	setValue( value: string|number ) : void
}

declare var AwInput: {
	prototype: AwInput,
	new(): AwInput
}

interface AwSelect extends HTMLElement {
	inputElement: HTMLInputElement;
	selectedindex: number;
	selectedvalue: string;
	validator: AwFormValidator;
	connectedfunc: Function;
	changefunc: Function;

	/**
	 * @method error_hide
	 * @deprecated
	 * 
	 * Muestra u oculta un mensaje de error
	 */
	error_hide() : void;

	/**
	 * @method error_show
	 * @deprecated
	 * 
	 * Muestra u oculta un mensaje de error
	 * 
	 * @param {string} message Mensaje de error que se va a mostrar
	 */
	error_show( message: string ) : void;

	/**
	 * @method get_value
	 * @deprecated
	 * 
	 * Obtiene el valor del input
	 * 
	 * @return {string}
	 */
	get_value() : string;

	/**
	 * @method	has_error
	 * @deprecated
	 * 
	 * Devuelve si el campo tiene un error
	 * 
	 * @return {boolean}
	 */
	has_error() : boolean;

	/**
	 * @method	clear
	 * 
	 * Pone el select en la primera opción
	 */
	clear(): void;

	/**
	 * @method errorHide
	 * 
	 * Muestra u oculta un mensaje de error
	 */
	errorHide() : void;

	/**
	 * @method errorShow
	 * 
	 * Muestra u oculta un mensaje de error
	 * 
	 * @param {string} message Mensaje de error que se va a mostrar
	 */
	errorShow( message: string ) : void;

	/**
	 * @method getValue
	 * 
	 * Obtiene el valor del input
	 * 
	 * @return {string}
	 */
	getValue() : string;

	/**
	 * @method	hasError
	 * 
	 * Devuelve si el campo tiene un error
	 * 
	 * @return {boolean}
	 */
	hasError() : boolean;

	/**
	 * @method	reload
	 * 
	 * Refresca los options dentro del componente si cambiaron en el aw-select
	 */
	reload() : void;

	/**
	 * @method toIndex
	 * 
	 * Muestra u oculta un mensaje de error
	 * 
	 * @param {string} index Índidce de la opción del select que queremos seleccionar
	 * @param {boolean} notify [false] Índica si debe notificar el evento de cambio
	 */
	toIndex(index: number, notify: boolean) : void;

	/**
	 * @method toValue
	 * 
	 * Muestra u oculta un mensaje de error
	 * 
	 * @param {string} value Valor de la opción del select que queremos seleccionar
	 * @param {boolean} notify [false] Índica si debe notificar el evento de cambio
	 */
	toValue(value: string, notify: boolean) : void;
}

declare var AwSelect: {
	prototype: AwSelect,
	new(): AwSelect
}

interface AwInputColor extends HTMLElement {
	inputElement: HTMLInputElement;
	connectedfunc: Function;
	changefunc: Function;
	focusinfunc: Function;
	focusoutfunc: Function;
	validator: AwFormValidator;

	/**
	 * @method error_hide
	 * @deprecated
	 * 
	 * Muestra u oculta un mensaje de error
	 */
	error_hide() : void;

	/**
	 * @method error_show
	 * @deprecated
	 * 
	 * Muestra u oculta un mensaje de error
	 * 
	 * @param {string} message Mensaje de error que se va a mostrar
	 */
	error_show( message: string ) : void;

	/**
	 * @method get_value
	 * @deprecated
	 * 
	 * Obtiene el valor del input
	 * 
	 * @return {string}
	 */
	get_value() : string;

	/**
	 * @method	has_error
	 * @deprecated
	 * 
	 * Devuelve si el campo tiene un error
	 * 
	 * @return {boolean}
	 */
	has_error() : boolean;

	/**
	 * @method	clear
	 * 
	 * Limpia el componente
	 */
	clear(): void;

	/**
	 * @method errorHide
	 * 
	 * Muestra u oculta un mensaje de error
	 */
	errorHide() : void;

	/**
	 * @method errorShow
	 * 
	 * Muestra u oculta un mensaje de error
	 * 
	 * @param {string} message Mensaje de error que se va a mostrar
	 */
	errorShow( message: string ) : void;

	/**
	 * @method getValue
	 * 
	 * Obtiene el valor del input
	 * 
	 * @return {string}
	 */
	getValue() : string;

	/**
	 * @method	hasError
	 * 
	 * Devuelve si el campo tiene un error
	 * 
	 * @return {boolean}
	 */
	hasError() : boolean;
}

declare var AwInputColor: {
	prototype: AwInputColor,
	new(): AwInputColor
}

/**
 * @deprecated
 */
interface AwSelectSearch extends HTMLElement {
	inputElement: HTMLInputElement;
	selectedindex: number;
	selectedvalue: string;
	validator: AwFormValidator;

	/**
	 * @method error_hide
	 * @deprecated
	 * 
	 * Muestra u oculta un mensaje de error
	 */
	error_hide() : void;

	/**
	 * @method error_show
	 * @deprecated
	 * 
	 * Muestra u oculta un mensaje de error
	 * 
	 * @param {string} message Mensaje de error que se va a mostrar
	 */
	error_show( message: string ) : void;

	/**
	 * @method get_value
	 * @deprecated
	 * 
	 * Obtiene el valor del input
	 * 
	 * @return {string}
	 */
	get_value() : string;

	/**
	 * @method	has_error
	 * @deprecated
	 * 
	 * Devuelve si el campo tiene un error
	 * 
	 * @return {boolean}
	 */
	has_error() : boolean;

	/**
	 * @method	clear
	 * 
	 * Pone el select en la primera opción
	 */
	clear(): void;

	/**
	 * @method errorHide
	 * 
	 * Muestra u oculta un mensaje de error
	 */
	errorHide() : void;

	/**
	 * @method errorShow
	 * 
	 * Muestra u oculta un mensaje de error
	 * 
	 * @param {string} message Mensaje de error que se va a mostrar
	 */
	errorShow( message: string ) : void;

	/**
	 * @method getValue
	 * 
	 * Obtiene el valor del input
	 * 
	 * @return {string}
	 */
	getValue() : string;

	/**
	 * @method	hasError
	 * 
	 * Devuelve si el campo tiene un error
	 * 
	 * @return {boolean}
	 */
	hasError() : boolean;

	/**
	 * @method	reload
	 * 
	 * Refresca los options dentro del componente si cambiaron en el aw-select
	 */
	reload() : void;

	/**
	 * @method toIndex
	 * 
	 * Muestra u oculta un mensaje de error
	 * 
	 * @param {string} index Índidce de la opción del select que queremos seleccionar
	 * @param {boolean} notify [false] Índica si debe notificar el evento de cambio
	 */
	toIndex(index: number, notify: boolean) : void;

	/**
	 * @method toValue
	 * 
	 * Muestra u oculta un mensaje de error
	 * 
	 * @param {string} value Valor de la opción del select que queremos seleccionar
	 * @param {boolean} notify [false] Índica si debe notificar el evento de cambio
	 */
	toValue(value: string, notify: boolean) : void;
}

declare var AwSelectSearch: {
	prototype: AwSelectSearch,
	new(): AwSelectSearch
}

interface AwInputDate extends HTMLElement {
	inputElement: HTMLInputElement;
	connectedfunc: Function;
	changefunc: Function;
	focusinfunc: Function;
	focusoutfunc: Function;
	validator: AwFormValidator;

	/**
	 * @method clear
	 * 
	 * Limpia la fehca del calencario
	 */
	clear(): void;

	/**
	 * @method error_hide
	 * @deprecated
	 * 
	 * Muestra u oculta un mensaje de error
	 */
	error_hide() : void;

	/**
	 * @method error_show
	 * @deprecated
	 * 
	 * Muestra u oculta un mensaje de error
	 * 
	 * @param {string} message Mensaje de error que se va a mostrar
	 */
	error_show( message: string ) : void;

	/**
	 * @method get_value
	 * @deprecated
	 * 
	 * Obtiene el valor del input
	 * 
	 * @return {string}
	 */
	get_value() : string;

	/**
	 * @method	has_error
	 * @deprecated
	 * 
	 * Devuelve si el campo tiene un error
	 * 
	 * @return {boolean}
	 */
	has_error() : boolean;

	/**
	 * @method	set_value
	 * @deprecated
	 * 
	 * Asigna el valor al campo
	 * 
	 * @param {string} value Valor que queremos asignar al campo
	 */
	set_value( value: string ) : void;

	/**
	 * @method errorHide
	 * 
	 * Muestra u oculta un mensaje de error
	 */
	errorHide() : void;

	/**
	 * @method errorShow
	 * 
	 * Muestra u oculta un mensaje de error
	 * 
	 * @param {string} message Mensaje de error que se va a mostrar
	 */
	errorShow( message: string ) : void;

	/**
	 * @method getValue
	 * 
	 * Obtiene el valor del input
	 * 
	 * @return {string}
	 */
	getValue() : string;

	/**
	 * @method	hasError
	 * 
	 * Devuelve si el campo tiene un error
	 * 
	 * @return {boolean}
	 */
	hasError() : boolean;

	/**
	 * @method	setValue
	 * 
	 * Asigna el valor al campo
	 * 
	 * @param {string} value Valor que queremos asignar al campo
	 */
	setValue( value: string ) : void;

	/**
	 * @method	focus
	 * 
	 * Pone el foco sobre el input.
	 */
	focus() : void
}

declare var AwInputDate: {
	prototype: AwInputDate,
	new(): AwInputDate
}

interface AwInputFile extends HTMLElement {
	inputElement: HTMLInputElement;
	connectedfunc: Function;
	changefunc: Function;
	clickfunc: Function;
	validator: AwFormValidator;

	/**
	 * @method error_hide
	 * @deprecated
	 * 
	 * Muestra u oculta un mensaje de error
	 */
	error_hide() : void;

	/**
	 * @method error_show
	 * @deprecated
	 * 
	 * Muestra u oculta un mensaje de error
	 * 
	 * @param {string} message Mensaje de error que se va a mostrar
	 */
	error_show( message: string ) : void;

	/**
	 * @method	get_files
	 * @deprecated
	 * 
	 * Obtiene los archivos cargados en el input
	 */
	get_files() : FileList

	/**
	 * @method get_value
	 * @deprecated
	 * 
	 * Obtiene el valor del input
	 * 
	 * @return {string}
	 */
	get_value() : string;

	/**
	 * @method	has_error
	 * @deprecated
	 * 
	 * Devuelve si el campo tiene un error
	 * 
	 * @return {boolean}
	 */
	has_error() : boolean;

	/**
	 * @method	clear
	 * 
	 * Pone el select en la primera opción
	 */
	clear(): void;

	/**
	 * @method errorHide
	 * 
	 * Muestra u oculta un mensaje de error
	 */
	errorHide() : void;

	/**
	 * @method errorShow
	 * 
	 * Muestra u oculta un mensaje de error
	 * 
	 * @param {string} message Mensaje de error que se va a mostrar
	 */
	errorShow( message: string ) : void;

	/**
	 * @method	getFiles
	 * 
	 * Obtiene los archivos cargados en el input
	 */
	getFiles() : FileList

	/**
	 * @method getValue
	 * 
	 * Obtiene el valor del input
	 * 
	 * @return {string}
	 */
	getValue() : string;

	/**
	 * @method	hasError
	 * 
	 * Devuelve si el campo tiene un error
	 * 
	 * @return {boolean}
	 */
	hasError() : boolean;

	/**
	 * @method	focus
	 * 
	 * Pone el foco sobre el input.
	 */
	focus() : void
}

declare var AwInputFile: {
	prototype: AwInputFile,
	new(): AwInputFile
}

interface AwTextArea extends HTMLElement {
	inputElement: HTMLInputElement;
	connectedfunc: Function;
	changefunc: Function;
	focusinfunc: Function;
	focusoutfunc: Function;
	keypressfunc: Function;
	keyupfunc: Function;
	validator: AwFormValidator;

	/**
	 * @method error_hide
	 * @deprecated
	 * 
	 * Muestra u oculta un mensaje de error
	 */
	error_hide() : void;

	/**
	 * @method error_show
	 * @deprecated
	 * 
	 * Muestra u oculta un mensaje de error
	 * 
	 * @param {string} message Mensaje de error que se va a mostrar
	 */
	error_show( message: string ) : void;

	/**
	 * @method get_value
	 * @deprecated
	 * 
	 * Obtiene el valor del input
	 * 
	 * @return {string}
	 */
	get_value() : string;

	/**
	 * @method	has_error
	 * @deprecated
	 * 
	 * Devuelve si el campo tiene un error
	 * 
	 * @return {boolean}
	 */
	has_error() : boolean;

	/**
	 * @method	clear
	 * 
	 * Pone el select en la primera opción
	 */
	clear(): void;

	/**
	 * @method errorHide
	 * 
	 * Muestra u oculta un mensaje de error
	 */
	errorHide() : void;

	/**
	 * @method errorShow
	 * 
	 * Muestra u oculta un mensaje de error
	 * 
	 * @param {string} message Mensaje de error que se va a mostrar
	 */
	errorShow( message: string ) : void;

	/**
	 * @method getValue
	 * 
	 * Obtiene el valor del input
	 * 
	 * @return {string}
	 */
	getValue() : string;

	/**
	 * @method	hasError
	 * 
	 * Devuelve si el campo tiene un error
	 * 
	 * @return {boolean}
	 */
	hasError() : boolean;

	/**
	 * @method	focus
	 * 
	 * Pone el foco sobre el input.
	 */
	focus() : void
}

declare var AwTextArea: {
	prototype: AwTextArea,
	new(): AwTextArea
}

interface ComunidadesAutonomas {
	ccaa: "andalucia"|"andalucía"|"aragon"|"aragón"|"asturias"|"baleares"|"canarias"|"cantabria"|"castilla"|"cataluña"|"ceuta"|"extremadura"|"galicia"|"madrid"|"mancha"|"melilla"|"murcia"|"navarra"|"rioja"|"valencia"|"vascongadas"
}

declare var ComunidadesAutonomas: {
	prototype: ComunidadesAutonomas,
	new(): ComunidadesAutonomas
}