import { PolymerElement, html, Polymer } from "../../aw_polymer_3/polymer/polymer-element.js";
import "../../aw_polymer_3/iron-icons/iron-icons.js";
import "./aw-select-option.js";

class AwSelectOptions extends PolymerElement {
    static get template() {
        return html`
        <style>
            :host {
				background-color: var(--aw-select-options-background-color, white);
				box-shadow: 0px 1px 2px #777;
				font-family: var(--aw-input-font-family);
                display: none;
                position: absolute;
                z-index: 1;
            }
			#search {
				position: relative;
				border-bottom: solid 1px #DDDDDD;
			}
			#search input {
				padding: 7px 25px 7px 5px;
				width: 100%;
				border: none;
				font-size: var(--aw-input-font-size, 16px);
				box-sizing: border-box;
			}
			#search input:focus {
				outline: 0;
			}
			#search iron-icon {
				position: absolute;
				top: 6px;
				right: 1px;
				width: 18px;
				height: 18px;
				color: #777777;
			}
			#options {
				color: var(--aw-select-options-color,var(--aw-input-color, #333333));
				max-height: 400px;
				overflow-x: auto;
				position: relative;
				scrollbar-color: #BBBBBB transparent;
				scrollbar-width: thin;
			}
			#options::-webkit-scrollbar {
			  	width: 6px;
				height: 6px;
			  	background-color: transparent;
			}
			#options::-webkit-scrollbar-track {
			  	background-color: transparent;
			}
			#options::-webkit-scrollbar-thumb {
			  	background-color: #bbbbbb;
				border-radius: 10px;
			}
			#options::-webkit-scrollbar-thumb:hover {
				background-color: #999999;
			}
            :host([size="small"]) #search input {
                font-size: 12px;
                padding: 5px 22px 5px 5px;
            }
            :host([size="small"]) #search iron-icon {
				width: 16px;
				height: 16px;
                top: 5px;
            }
            :host([size="big"]) #search input{
                font-size: 18px;
                padding: 11px 25px 10px 9px;
            }
            :host([size="big"]) #search iron-icon {
				width: 22px;
				height: 22px;
                top: 10px;
            }
        </style>
        <template is="dom-if" if="[[searchable]]">
            <div id="search">
                <input placeholder="Buscar" on-input="_filterValue">
                <iron-icon icon="search"></iron-icon>
            </div>
        </template>
        <div id="options">
            <template is="dom-repeat" items="{{options}}" as="option" filter="{{_filter(stringSearch)}}">
                <aw-select-option size="[[size]]" option="{{option}}" on-click="_optionSelected" on-mouseenter="_optionMouseEnter"></aw-select-option>
            </template>
        </div>
        `;
    }

    static get properties() {
        return {
            options: { type: Array, observer: "_handleOptions" },
            open: { type: Boolean, notify: true, observer: "_handleOpen" },
            searchable: { type: Boolean },
			/**
			 * Tamaño del input
			 * @type {"big"|"small"}
			 */
			size: { type: String, reflectToAttribute: true },
        }
    }

    /**
     * @method  constructor
     */
    constructor() {
        super();

        /** @type {Array} */
        this.options = [];
        this.open = false;
        this.searchable = false;
        this.size = undefined;

        this.height = 0;
        this.width = 0;
        this.writtedopen = "";
        this.writtedTimeOut = null;

        /** @type {AwSelect} */
        this.select = null;

        this.stringSearch = "";
    }

    /**
     * @method  connectedCallback
     */
    connectedCallback() {
        super.connectedCallback();

		// Listener del document y teclado
		this.listenDoc = (ev) => {
            if(ev.path[1] === this.shadowRoot.querySelector("#search")) {
                return false;
            }

            this.open = false
        };
		this.listenKeys = (ev) => {this._handleKeys(ev)};
    }

    /**
     * @method  disconectedCallback
     */
    disconectedCallback() {
        super.disconectedCallback();
    }

    /**
     * @method  selectedByIndex
     * 
     * Selecciona una opción por un índice dado
     * 
     * @param {number} index 
     */
    selectByIndex(index) {
        const options = this.$.options.querySelectorAll("aw-select-option");
        this._optionSelected({target: options[index]})
        this.open = false;
    }

    /**
     * @method  _addListeners
     * 
     * Añade las escuchas al abrir las opciones
     */
    _addListeners() {
        document.addEventListener( "keydown", this.listenKeys );
        
		// Ponemos a la escucha el click en el documento
		setTimeout(() => {
            document.addEventListener( "click", this.listenDoc );
        });
    }

    /**
     * @method  _close
     * 
     * Cierra las opciones
     */
    _close() {
        this.open = false;

        // Cerramos las opciones
        Polymer.Fade.out(this, {
            speed: 150
        })
        
		// Eliminamos las escuchas
        this._removeListeners();
        
        // Quitamos el preselected
        const preselected = this.$.options.querySelector("aw-select-option[preselected]");
        if( preselected ) {
            preselected.removeAttribute("preselected");
        }

        this._filterReset();
    }

    /**
     * @method  _filter
     * 
     * Filtra los resultados cuando es tipo search
     * 
     * @param {string} string 
     */
    _filter(string) {
        const repostion = () => {
			var options = this.$.options;
			let diff = options.offsetHeight + this.scrolltop - this.inputVisible.offsetHeight;
			options.style.marginTop = "-" + diff + "px";
        }
        
        if(!string) {
            return null;
        } else {
            string = string.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
            
            return option => {
                const value = option.value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
                const inner = option.inner.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

                return (value.indexOf( string ) != -1 || inner.indexOf(string) != -1);
            }
        }
    }

    /**
     * @method  _filterReset
     * 
     * Resetea las opciones de búsqueda
     */
    _filterReset() {
        if( !this.searchable) {
            return;
        }
        this.stringSearch = "";
        this.shadowRoot.querySelector("#search input").value = "";
        this._filter();
    }

    /**
     * @method  _filterValue
     * 
     * Filtra el valor de las opciones de búsqueda
     */
    _filterValue() {
        this.stringSearch = this.shadowRoot.querySelector("#search input").value;
        setTimeout(() => {
            this._setReposition();
        }, 50);
    }

    /**
     * @method  _getDimensions
     */
    _getDimensions() {
        this.style.visibility = "hidden";
        this.style.top = 0;
        this.style.right = 0;
        this.style.zIndex = "-11111";
        this.style.display = "block";

        setTimeout(() => {
            if( this.offsetHeight === 0 ) {
                this._getDimensions();
                return;
            }

            this.height = this.offsetHeight > window.innerHeight ? window.innerHeight - 20 : this.offsetHeight;
            this.width = this.offsetWidth > window.innerWidth ? window.innerWidth - 30 : this.offsetWidth;
            
            this.removeAttribute( "style" );
        },50)
    }

	/**
	 * @method	_getScrolltop
	 * 
	 * Asigna el scrolltop teniendo en cuenta el scrolltop de la ventana así como
	 * el scrolltop de los padres si tienen algún tipo de overflow.
     * 
     * @returns {number}
	 */
	_getScrollTop() {
		let scrollTop = 0;

		var parent = this.parentNode;
		var webcomponent = null;
		while( parent.tagName !== "BODY" ) {
			var suma = parent.scrollTop;
			parent = parent.parentNode;

			if( parent.toString() == "[object ShadowRoot]" ) {
				webcomponent = parent.host;
				parent = parent.host;
				break;
			} else {
				scrollTop += suma;
			}
		}

		if( !webcomponent ) {
			scrollTop += (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
		} else {
			scrollTop+= webcomponent.scrollTop;
        }
        
        return scrollTop;
	}

	/**
	 * @method	_getScrollLeft
	 * 
	 * Asigna el scrolltop teniendo en cuenta el scrolltop de la ventana así como
	 * el scrolltop de los padres si tienen algún tipo de overflow.
     * 
     * @returns {number}
	 */
	_getScrollLeft() {
        let scrollLeft = 0;
        
		var parent = this.parentNode;
		var webcomponent = null;
		while( parent.tagName !== "BODY" ) {
			var suma = parent.scrollLeft;
			parent = parent.parentNode;

			if( parent.toString() == "[object ShadowRoot]" ) {
				webcomponent = parent.host;
				parent = parent.host;
				break;
			} else {
				scrollLeft += suma;
			}
		}

		if( !webcomponent ) {
			scrollLeft += (window.pageXOffset !== undefined) ? window.pageXOffset : (document.documentElement || document.body.parentNode || document.body).scrollLeft;
		} else {
			scrollLeft+= webcomponent.scrollLeft;
        }
        
        return scrollLeft;
	}

    /**
     * @method  _handleKeys
     * 
     * Controla la pulsación de teclas cuando las opciones están abiertas
     * 
     * @param {event} ev 
     */
    _handleKeys(ev) {        
        // Paramos si estamos escribiendo sobre el buscador
        if( ev.path[0] === this.shadowRoot.querySelector("#search input") && ev.key !== "ArrowUp" && ev.key !== "ArrowDown" && ev.key !== "Enter") {
            return;
        }
        
        // Prevenimos el efecto
        ev.preventDefault();

        const options = this.$.options.querySelectorAll("aw-select-option");
        if(options.length === 0) {
            return;
        }

        const selected = this.$.options.querySelector("aw-select-option[selected]");
        let preselected = this.$.options.querySelector("aw-select-option[preselected]");
        
        if( !preselected ) {
            if(selected) {
                selected.setAttribute("preselected", "");
                preselected = selected;
            } else {
                options[0].setAttribute("preselected", "");
                preselected = options[0];
            }
        }
        
        // Si pulamos arriba
		if( ev.key === "ArrowUp" ) {
			preselected.removeAttribute( "preselected" );

			let prev = preselected.previousElementSibling;
			while( prev ) {
				if( prev.tagName === "AW-SELECT-OPTION" ) {
					break;
				}

				prev = prev.previousElementSibling;
			}

			if( !prev ) {
				for( let i = options.length - 1; i >= 0; i-- ) {
					if( options[ i ].tagName === "AW-SELECT-OPTION" ) {
						prev = options[i];
						break;
					}
				}
            }
            
            prev.setAttribute( "preselected", "" );
            this._keepPreselectedVisible(prev);
		} else if( ev.key === "ArrowDown" ) {
			preselected.removeAttribute( "preselected" );
            
            /** @type {HTMLElement} */
			let next = preselected.nextElementSibling;
			while( next ) {
				if( next.tagName === "AW-SELECT-OPTION" ) {
					break;
				}

				next = next.nextElementSibling;
			}

			if( !next ) {
				for( let i = 0; i < options.length; i++ ) {
					if( options[ i ].tagName === "AW-SELECT-OPTION" ) {
                        next = options[i];
						break;
					}
				}
            }
            
            next.setAttribute( "preselected", "" );
            this._keepPreselectedVisible(next);
		} else if( ev.key === "Enter" ) {
            if( !preselected ) {
                return;
            }

            preselected.removeAttribute( "preselected" );
            this._optionSelected({target: preselected});
            this.open = false;
        } else { 
			// Creamos la palabra escrita
			this.writtedopen = ev.key === "Backspace" ? "" : this.writtedopen + ev.key.toLowerCase();

			// Formamos la expresión regular
			const palabra = new RegExp( "(\<img\s+src\=\"[A-z0-9À-ÿ\\\%\s\/\.\:\-\_]+\"\>)?(\<iron\-icon\s+icon\=\"[A-z0-9À-ÿ\\\%\s\/\:\.\-\_]+\"\>\<\/iron\-icon\>)?" + this.writtedopen, "i");

            // Buscamos la palabra en las options
            /** @type {HTMLElement} */
			let elementFinder = null;
			for( let i = 0; i < options.length; i++ ) {
				const option = options[ i ];
                option.removeAttribute("preselected");
                
                const inner = option.option.inner.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                const value = option.option.value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

				if((inner.search( palabra ) != -1  || value.search( palabra ) != -1) && (!elementFinder)) {
					elementFinder = option;
				}
			}

			// Si hemos encontrado el elemento
			if( elementFinder && this.writtedopen ) {
				this.$.options.scrollTop = elementFinder.offsetTop;
                elementFinder.setAttribute( "preselected", "" )
                this._keepPreselectedVisible(elementFinder);
            }
            
            clearTimeout(this.writtedTimeOut);
            if( this.writtedopen ) {
                this.writtedTimeOut = setTimeout(() => {
                    this.writtedopen = "";
                }, 2000);
            }
		}
    }

    /**
     * @method  _keepPreselectedVisible
     * 
     * Mantien la opción preseleccionada visible
     * 
     * @param {HTMLElement} preselected 
     */
    _keepPreselectedVisible(preselected) {
        /** @type {HTMLElement} */
        const options = this.$.options;
        
        if(preselected.offsetHeight + preselected.offsetTop > options.scrollTop + options.offsetHeight) {
            options.scrollTop = preselected.offsetTop + preselected.offsetHeight - options.offsetHeight;
        }

        if(preselected.offsetTop < options.scrollTop ) {
            options.scrollTop = preselected.offsetTop;
        }
    }

    /**
     * @method  _handleOpen
     * 
     * Maneja el estado del componente
     */
    _handleOpen() {
        if( this.options.length === 0 ) {
            return;
        }

        if( this.open ) {
            this._open();
        } else {
            this._close();
        }
    }

    /**
     * @method _handleOptions
     * 
     * Crea las opciones
     */
    _handleOptions() {
        // this.$.options.textContent = '';
        // if( this.options.length === 0 ) {
        //     return;
        // }

        // this.options.forEach(option => {
        //     const selectOption = document.createElement("AW-SELECT-OPTION");
        //     selectOption.option = option;
        //     selectOption.onclick = this._select.bind(this);
        //     this.$.options.appendChild(selectOption);
        // });

        this._getDimensions();
    }

    /**
     * @method _open
     * 
     * Abre las opciones
     */
    _open() {
        if( this.parentElement?.tagName !== "BODY" ) {
            this.select = this.parentNode.host;
            document.body.appendChild(this);
        }

        // Asignamos la posició
        this._setPosition();

        // Abrimos las opciones
        Polymer.Fade.in( this, {
            speed: 150
        },() => {
            // Vamos a la opción seleccionada
            this._scrollToSelected();
        });

        if( this.searchable ) {
            this.shadowRoot.querySelector("#search input").focus();
        }
        
        // Activamos las escuchas 
        this._addListeners();
    }

    /**
     * @method  _optionMouseEnter
     * 
     * Hace hover sobre alguna de las opciones
     * 
     * @param {event} ev 
     */
    _optionMouseEnter(ev) {
        const target = ev.target;
        const preselected = this.$.options.querySelector("aw-select-option[preselected]");

        if( preselected ) {
            preselected.removeAttribute("preselected");
        }

        target.setAttribute("preselected", "");
    }

    /**
     * @method  _select
     * 
     * Método que se ejecuta cuando se selecciona una opción
     * 
     * @param {event} ev 
     */
    _optionSelected(ev) {
        this._filterReset();

        const target = ev.target;

        if(!target) {
            return;
        }
        
        if( !this.select ) {
            this.select = this.parentNode.host;
        }
        
        const option = {...target.option};

        this.select.setSelected(target.option);

        setTimeout(() => {
            const selected = this.$.options.querySelector("aw-select-option[selected]");
            selected.removeAttribute("selected");
            if(target.option.value === option.value) {
                target.setAttribute("selected", "");
            } else {
                const options = this.$.options.querySelectorAll("aw-select-option");
                for( let i = 0; i < options.length; i++ ) {
                    if( options[i].option.value === option.value) {
                        options[i].setAttribute("selected", "");
                        options[i].setAttribute("preselected", "");
                        break;
                    }
                }
            }
        }, 150);
    }

    /**
     * @method  _removeListeners
     * 
     * Elimina las escuchas al cerrar las opciones
     */
    _removeListeners() {
        document.removeEventListener( "click", this.listenDoc );
		document.removeEventListener( "keydown", this.listenKeys );
    }

    /**
     * @method  _scrollToSelected
     * 
     * Lleva al scroll hasta la opción seleccionada
     */
    _scrollToSelected() {
        /** @type {HTMLElement} */
        const options = this.$.options;

        /** @type {HTMLElement} */
        const selected = this.$.options.querySelector("aw-select-option[selected]");

        if(!selected) {
            return;
        }

        if(selected.offsetHeight + selected.offsetTop > options.scrollTop + options.offsetHeight || selected.offsetTop < options.scrollTop) {
            const top = selected.offsetTop;
            this.$.options.scrollTop = top - (this.height / 2) + (selected.offsetHeight / 2);
        }
        
    }

    /**
     * @method  _setPosition
     * 
     * Asigna la posición al select antes de abrirlo
     */
    _setPosition() {
        const scrollTop = this._getScrollTop();
        const scrollLeft = this._getScrollLeft();
        const position = this.select.getBoundingClientRect();

        let top = position.top + scrollTop;
        if( position.top + this.height > window.innerHeight ) {
            top -= (position.top + this.height ) - window.innerHeight + 10;
        }

        let left = position.left + scrollLeft;
        if( position.left + this.width > window.innerWidth ) {
            left -= (position.left + this.width ) - window.innerWidth + 10;
        }
        
        this.style.top = top + "px";
        this.style.left = left + "px";
    }

    /**
     * @method  _setReposition
     * 
     * Reposiciona las opciones cuando se escribe en el input de búsqueda
     */
    _setReposition()  {
        const scrollTop = this._getScrollTop();
        const position = this.select.getBoundingClientRect();
        const searchHeight = this.shadowRoot.querySelector("#search").offsetHeight;

        let top = position.top + scrollTop;
        if( position.top + this.$.options.offsetHeight + searchHeight > window.innerHeight ) {
            top -= (position.top + this.$.options.offsetHeight + searchHeight ) - window.innerHeight + 10;
        }
        
        this.style.top = top + "px";
    }
}

window.customElements.define( "aw-select-options", AwSelectOptions );