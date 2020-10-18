# AW-FORM-ELEMENTS-DF

Este paquete proporciona inputs de formualrio de Arisman Webs similares con un estilo personalizado.

- [aw-input-df](#aw-input-df): Un input normal tipo text, email, number...
- [aw-input-date-df](#aw-input-date-df): Un input diseñado para introducir fechas.
- [aw-input-file-df](#aw-input-file-df): Un input tipo file.
- [aw-select-df](#aw-select-df): Un campo seleccionable.
- [aw-select-search-df](#aw-select-search-df): Un campo seleccionable.
- [aw-textarea-df](#aw-textarea-df): Un textarea.
- [aw-input-color-df](#aw-input-color-df): Un textarea.

Para incluir este y todos los componentes de formularios disponibles, así como los `aw_form`, `aw_button` y los `aw_form_elements_common`, bastará con añadir:

```html
<script src="/node_modules/aw_form_elements_df/aw-form-elements-df.js"></script>
```

De este modo ya tendremos disponible todo lo necesario para enviar y diseñar formularios de Arisman Webs.

___

## aw-input-df

Este es el campo básico de un input, para añadir este campo agregar:

```html
<script src="/node_modules/aw_form_elements_df/aw-input-df.js"></script>
<aw-input></aw-input>
```

Los parámetros que admite este campos son:

- `name`: El nombre del input.
- `type`: El tipo de input. Permitidos: text, number, password, email, url.
- `placeholder`: El placeholder del input. (Si tiene label, solo aparece con el atributo allwaysup).
- `label`: Pone una etiqueta similar a un label.
- `minlength`: El largo mínimo del texto introducido.
- `maxlength`: El largo máximo del texto introducido.
- `min`: El valor mínimo en un input Number.
- `max`: El valor máximo en un input Number.
- `step`: El paso de un input Number.
- `list`: Un data list establecido. (Ver datalist más abajo).
- `activelist`: Le indica al aw-input si el datalist es activo, es decir, dinámico (Ver datalist más abajo)
- `value`: El valor del campo.
- `countchar`: Pone un contador de caracteres en el input.
- `readonly`: Un input de solo lectura.
- `disabled`: Un input desactivado.
- `autofocus`: El campo se enfoca automáticamente.
- `autocapitalize`: Poner las mayúsculas automáticamente.
- `autocorrect`: Corrección ortográfica del navegador.
- `autocomplete`: Autorelleno del navegador. (Por defecto off)
- `spinners`: Pone las flechas al input number, por defecto no aparecen.
- `novalidate`: Evita que el campo sea validado por el onchange o por el aw-form.
- `validateonchange`: Valida un campo cuando se produce un cambio en él. (<a href="https://www.npmjs.com/package/aw_form_mixins#aw-form-validate-mixin">Ver</a>)
- `noregister`: Evita que el campo se registres en el aw-form o en un form normal.
- `connectedfunc`: Una función donde se retorna el componente para tratarlo fuera del componente cuando conecta.
- `changefunc`: Una función donde se retorna el input para tratarlo fuera del componente cuando cambia.
- `keyupfunc`: Una función donde se retorna el input para tratarlo fuera del componente cuando soltamos tecla.
- `keypressfunc`: Una función donde se retorna el input para tratarlo fuera del componente cuando presionamos tecla.
- `focusoutfunc`: Una función donde se retorna el input para tratarlo fuera del componente cuando hacemos focus.
- `focusinfunc`: Una función donde se retorna el input para tratarlo fuera del componente cuando quitamos focus.
- `unresolved`: No muestra el campo hasta que haya cargo el componente. Usar si usamos preffix o suffix.

#### Ejemplos:

##### Labels y placeholders

Aquí vemos los diferentes comportamientos del label con el placeholder.

```html
<aw-input-df label="Nombre de usuario"></aw-input-df>
<aw-input-df label="Nombre"></aw-input-df>
<aw-input-df label="Apellidos" placeholder="Escribe tus apellidos"></aw-input-df>
<aw-input-df label="Dirección" placeholder="Ej.: C/ Pastrana, Nº42"></aw-input-df>
```

##### Contador de caracteres

El contador de caracteres también tiene dos opciones, si va acmpañado del `maxlength`, se podrá ver cuantos caracteres hay escritos y el límite máximo, de lo contrario solo se verán cuantos hay escritos.

```html
<aw-input-df label="Nombre de usuario" countchar maxlength="20"></aw-input-df>
<aw-input-df label="Nombre" countchar></aw-input-df>
```

##### Datalist

Para añadir un datalist al input se hará lo siguiente:

```html
<aw-input-df label="Nombre" name="nombre" list="mylist">
    <datalist id="mylist" slot="datalist">
        <option value="Sevilla"></option>
        <option value="Barcelona"></option>
        <option value="Madrid"></option>
        <option value="Cáceres"></option>
        <option value="Cuenca"></option>
    </datalist>
</aw-input-df>
```

Nótese que para añadir el datalist se siguen los mismos pasos que para añadir un datalist nativo del navegador con la peculiaridad que el **datalist** tiene que llevar el atributo `slot="datalist"`, ya que será como lo identificamos en el componente.

Por defecto el datalist te mostrará el value de los options si estos no tienen un innerHTML definido. De lo contrario, te mostrará en la lista el ***innerHTML***, pero el valor que se añadirá al input será el del atributo ***value***.

Además este datalist admite dos atributos especiales: `icon` y `showvalues`. 

- `showvalues:` Este atributo nos permite mostrar además del innerHTML los values si se dan ambas combinaciones en la lista de opciones.
- `icon:` Este atributo te permite elegir el icono que queremos mostrar en el input cuando tiene un datalist dentro de la lista de iconos de iron-icons básicos.

```html
<aw-input-df id="myInput" label="Nombre" name="nombre" list="mylist">
    <datalist id="mylist" slot="datalist" showvalues icon="arrow-drop-down">
        <option value="Sevilla"></option>
        <option value="Barcelona"></option>
        <option value="Madrid"></option>
        <option value="Cáceres"></option>
        <option value="Cuenca"></option>
    </datalist>
</aw-input-df>
```

A partir de la versión 3.0.0 los datalist son siempre dinámicos, además cambia el modo en el que se tienen que insertar para activar el cambio. Anteriormente había que reinsertar el datalist completo dentro del **aw-input**, ahora solo hay que insertar las nuevas opciones dentro del propio **datalist** y éste mostrará las nuevas opciones automáticamente.

```html
<aw-input-df id="myInput" label="Nombre" name="nombre" list="mylist" activelist>
    <datalist id="mylist" slot="datalist">
        <option value="Sevilla"></option>
        <option value="Barcelona"></option>
        <option value="Madrid"></option>
        <option value="Cáceres"></option>
        <option value="Cuenca"></option>
    </datalist>
</aw-input-df>
```

```javascript
var datalist = document.getElementById( "mylist" );
var newOptions = `
    <option value="Bilbao"></option>
    <option value="La Coruña"></option>
    <option value="Salamanca"></option>
    <option value="Valencia"></option>
    <option value="Valladolid"></option>
`;

datalist.innerHTML = newOptions;
```

##### Prefixs y suffixs

Se pueden añadir prefix y suffix a los inputs para darles un estilo más personalizados, a continuación mostramos un ejemplos de prefijos y sufijos con iron-icons, texto o imágenes.

```html
<aw-input-df label="Usuario">
    <prefix><iron-icon icon="accessibility"></iron-icon></prefix>
</aw-input-df>
<aw-input-df label="Email">
    <prefix><iron-icon icon="mail"></iron-icon></prefix>
    <suffix>@arismanwebs.es</suffix>
</aw-input-df>
<aw-input-df label="Github">
    <prefix><img src="/img/Redes Sociales/github.svg"></prefix>
</aw-input-df>
<aw-input-df label="Coste">
    <suffix>€</suffix>
</aw-input-df>
```

#### Métodos

Para interactuar con el componente a través de javascrip existen varios métodos:

```html
<aw-input-df label="Usuario" name="usuario"></aw-input-df>
```
```javascript
/** @type {AwInput} */
let input = document.querySelector( "aw-input-df" );

// Obtiene el valor del input
let value = input.get_value();

// Muestra un mensaje de error en el input
input.error_show( "Error message" );

// Elimina el mensaje de error del input
input.error_hide();

// Devuelve un booleano en función de que el input tenga o no marcado un error.
let error = input.has_error();
```

#### Aplicar estilos a los aw-inputs

Con las siguientes variables CSS podemos controlar el estilo del componente por completo. Los valores separados por `|` indican si tiene varios valores disponibles y en el orden que se irán aplicando si por ejemplo, el primer valor fuera otra variable.

```css
/* Estilos generales de tema que afectan a los inputs */

--aw-error-color: THEME-VALUE;
--aw-primary-color: THEME-VALUE;

/* Estilos del input */

--aw-input-background-color: transparent;
--aw-input-background-color-disabled: #F9F9F9;
--aw-input-border: solid 1px #CCCCCC;
--aw-input-border-top: (--aw-input-border | solid 1px #CCCCCC );
--aw-input-border-right: (--aw-input-border | solid 1px #CCCCCC );
--aw-input-border-bottom: (--aw-input-border | solid 1px #CCCCCC );
--aw-input-border-left: (--aw-input-border | solid 1px #CCCCCC );
--aw-input-border-disabled: solid 1px #DDDDDD;
--aw-input-border-error: solid 1px (--aw-error-color | #b13033);
--aw-input-border-top-error: --aw-input-border-error;
--aw-input-border-right-error: --aw-input-border-error;
--aw-input-border-bottom-error: --aw-input-border-error;
--aw-input-border-left-error: --aw-input-border-error;
--aw-input-border-focused: solid 1px (--aw-primary-color | #1C7CDD);
--aw-input-border-top-focused: --aw-input-border-focused;
--aw-input-border-right-focused: --aw-input-border-focused;
--aw-input-border-bottom-focused: --aw-input-border-focused;
--aw-input-border-left-focused: --aw-input-border-focused;
--aw-input-border-radius: 2px;
--aw-input-color: #333333;
--aw-input-color-disabled: #BBBBBB;
--aw-input-font-family: arial;
--aw-input-font-size: 16px;
--aw-input-font-weight: normal;
--aw-input-font-style: normal;
--aw-input-text-align: left;
--aw-input-box-shadow: none;
--aw-input-padding: 7px;
--aw-input-placeholder-color: #999999;
--aw-input-placeholder-font-family: --aw-input-font-family | arial;
--aw-input-placeholder-font-style: oblique;
--aw-input-vertical-align: middle;

/* Estilos del label */

--aw-input-label-color: #888888;
--aw-input-label-color-writted: --aw-input-label-color | #888888;
--aw-input-label-color-focused: --aw-primary-color | #1C7CDD;
--aw-input-label-color-error: --aw-error-color | #b13033;
--aw-input-label-color-disabled: --aw-input-color-disabled | #1C7CDD;
--aw-input-label-font-size: 11px;
--aw-input-label-text-align: left;
--aw-input-label-font-weight: normal;
--aw-input-label-margin: 0;
--aw-input-label-padding: 0;

/* Estilos de prefix y suffixs */

--aw-input-prefix-padding-top: 0px;
--aw-input-prefix-color: #777777;
--aw-input-prefix-color-error: --aw-input-label-color-error | --aw-error-color | #b13033;
--aw-input-prefix-color-focused: --aw-input-label-color-focused | --aw-primary-color | #1C7CDD;
--aw-input-prefix-color-disabled: --aw-input-color-disabled | #BBBBBB;
--aw-input-prefix-font-famlily: --aw-input-font-family | arial;
--aw-input-prefix-font-size: --aw-input-font-size | 16px;
--aw-input-prefix-font-weight: bold;
--aw-input-prefix-icon-top: 0px;
--aw-input-prefix-image-height: --aw-input-font-size | 16px;
--aw-input-prefix-size: 22px;

/* Estilos del datalist */

--aw-input-datalist-arrow-top: -27px;
--aw-input-datalist-arrow-background-color: transparent;
--aw-input-datalist-arrow-background-color-hover: transparent;
--aw-input-datalist-arrow-color: #999999;
--aw-input-datalist-arrow-color-hover: --aw-primary-color | #1C7CDD;
--aw-input-datalist-background-color: white;
--aw-input-datalist-background-color-hover: #f6f6f6;
--aw-input-datalist-box-shadow: 0px 1px 3px #777777;
--aw-input-datalist-color: --aw-input-color | #333333;
--aw-input-datalist-color-hover: #3A9AE0;
--aw-input-datalist-options-color: 
--aw-input-datalist-option-padding: 13px 10px;
--aw-input-datalist-option-font-family: --aw-input-font-family | arial;
--aw-input-datalist-option-font-size: 14px;
--aw-input-datalist-value-background-color: white;
--aw-input-datalist-value-color: #777777;
--aw-input-datalist-value-font-size: 11px;
```
___

## aw-input-date-df

Este componente crea un campo que abre un calendario para la introducción sencilla de fechas, para agregar este campo:

```html
<script src="/node_modules/aw_form_elements_df/aw-input-date-df.js"></script>
<aw-input-date-df></aw-input-date-df>
```

Los parámetros que admite este campo son:

- `name`: El nombre del input.
- `label`: Pone una etiqueta similar a un label.
- `value`: El valor del campo.
- `readonly`: Un input de solo lectura.
- `disabled`: Un input desactivado.
- `autofocus`: El campo se enfoca automáticamente.
- `autocomplete`: Autorelleno del navegador. (Por defecto off)
- `novalidate`: Evita que el campo sea validado por el onchange o por el aw-form.
- `validateonchange`: Valida el campo cuando se produce un cambio en él. (<a href="https://www.npmjs.com/package/aw_form_mixins#aw-form-validate-mixin">Ver</a>)
- `noregister`: Evita que el campo se registres en el aw-form o en un form normal.
- `connectedfunc`: Una función donde se retorna el componente para tratarlo fuera del componente cuando conecta.
- `changefunc`: Una función donde se retorna el input para tratarlo fuera del componente cuando cambia.
- `keyupfunc`: Una función donde se retorna el input para tratarlo fuera del componente cuando soltamos tecla.
- `keypressfunc`: Una función donde se retorna el input para tratarlo fuera del componente cuando presionamos tecla.
- `focusoutfunc`: Una función donde se retorna el input para tratarlo fuera del componente cuando hacemos focus.
- `focusinfunc`: Una función donde se retorna el input para tratarlo fuera del componente cuando quitamos focus.
- `unresolved`: No muestra el campo hasta que haya cargado el componente. Usar si usamos preffix o suffix.

Atributos que admite el calendario, estos atributos están explicado sen el aw-calendar.

- `lang`: Idioma del calendario
- `nameCalendar`: Nombre del calendario
- `titcalendar`: Título del calendario
- `time`: Si el calendario permitirá elegir hora o no (boolean)
- `nomarktoday`: No se marcará el día actual
- `nomarkfest`: No se marcarán los festivos (solo españa)
- `noselectpast`: No se podrán seleccionar fechas pasadas
- `noselectsat`: No se podrán seleccionar los sábados
- `noselectsun`: No se podrán seleccionar los domingos
- `noselectfest`: No se podrán seleccionar los festivos (solo españa)
- `ccaa`: (String) Comunidad autónoma sobre la que calculará los festivos. ( Solo España)
- `diasfest`: Introducir días festivos manualmente en un array.

El comportamiento de este campo es muy sencillo, tan solo tienes que añadir el campo y una vez cargado puedes seleccionar fechas de un calendario como el aw-calendar:

```html
<aw-input-date-df label="Fecha de matriculación"></aw-input-date-df>
```

#### Métodos

Para interactuar con el componente a través de javascrip existen varios métodos:

```html
<aw-input-date-df label="Elige una fecha" name="date"></aw-input-date-df>
```
```javascript
/** @type {AwInputDate} */
let input = document.querySelector( "aw-input-date-df" );

// Obtiene el valor del input
let value = input.get_value();

// Muestra un mensaje de error en el input
input.error_show( "Error message" );

// Elimina el mensaje de error del input
input.error_hide();

// Devuelve un booleano en función de que el input tenga o no marcado un error.
let error = input.has_error();
```

#### Aplicar estilos a los aw-inputs-date

Los estilos del aw-input-date son compartidos con el aw-input.

___

## aw-input-file-df

Este componente crea un campo tipo file.

```html
<script src="/node_modules/aw_form_elements_df/aw-input-file-df.js"></script>
<aw-input-file-df></aw-input-file-df>
```

Los parámetros que admite este campo son:

- `id`: El ID del input.
- `name`: El nombre del input.
- `label`: Pone una etiqueta similar a un label.
- `icon`: Pone un icono de una cámara en el input como prefix.
- `allowed`: Atributo de validación específico para el input file que indica que tipo de archivos se permiten.
- `disabled`: Un input desactivado.
- `autofocus`: El campo se enfoca automáticamente.
- `novalidate`: Evita que el campo sea validado por el onchange o por el aw-form.
- `validateonchange`: Valida el campo cuando se produce un cambio en él. (<a href="https://www.npmjs.com/package/aw_form_mixins#aw-form-validate-mixin">Ver</a>)
- `noregister`: Evita que el campo se registres en el aw-form o en un form normal.
- `connectedfunc`: Una función donde se retorna el componente para tratarlo fuera del componente cuando conecta.
- `changefunc`: Una función donde se retorna el input para tratarlo fuera del componente cuando cambia.
- `clickfunc`: Una función donde se retorna el input para tratarlo fuera del componente cuando shacemos click.
- `preloadfunc`: Si carga imágenes, estas imágenes precargadas se envían a la función dada.
- `unresolved`: No muestra el campo hasta que haya cargado el componente.

##### Icon

Al igual que en el aw-input-date, no se pueden añadir prefixs y suffixs, para ello está el parámetro `icon` que añadirá el icono de una cámara al input.

```html
<aw-input-file-df label="Selecciona una imagen" icon></aw-input-file-df>
```

##### Allowed

Un atributo de validación específico del input file que indica los tipos de archivos que son permitidos. Este atributo es una array de Polymer por lo que debe ir en json y debido a que este lleva comillas dobles deberá ir envuelto entre comillas simples.

```html
<aw-input-file-df label="Selecciona una imagen" allowed='["jpg","png"]' validateonchange></aw-input-file-df>
```

##### Preloadfunc

Una de las funciones más interesantes es que este input te precarga imágenes automáticamente al ser cargadas si usamos este atributo. Este será una función o clase a la que se enviará un array con url de las imágenes precargadas.

```html
<aw-input-file-df label="Selecciona una imagen" allowed='["jpg","png"]' validateonchange multiple preloadfunc="preloadFunc"></aw-input-file-df>
```

```javascript
function preloadFunc( imgs ) {
    document.querySelector( "#preloads" ).innerHTML = "";

    for( let i = 0; i < imgs.length; i++ ) {
        var div = document.createElement( "DIV" );
        var img = document.createElement( "IMG" );
        img.src = imgs[ i ];

        div.appendChild( img );

        document.querySelector( "#preloads" ).appendChild( div );
    }
}
```

#### Métodos

Para interactuar con el componente a través de javascrip existen varios métodos:

```html
<aw-input-file-df label="Archivos" name="files" multiple></aw-input-file-df>
```
```javascript
/** @type {AwInputFile} */
let input = document.querySelector( "aw-input-file-df" );

// Obtiene el valor del input
let value = input.get_value();

// Obtiene los archivos cargados en el input
let files = input.get_files();

// Muestra un mensaje de error en el input
input.error_show( "Error message" );

// Elimina el mensaje de error del input
input.error_hide();

// Devuelve un booleano en función de que el input tenga o no marcado un error.
let error = input.has_error();
```

#### Aplicar estilos a los aw-inputs-file-df

Los estilos del aw-input-file son compartidos con el aw-input.

___

## aw-select-df

Este componente crea un campo select con el estilo material theme de Google. Para incluir el componente:

```html
<script src="/node_modules/aw_form_elements_df/aw-select-df.js"></script>
<aw-select-df></aw-select-df>
```

Los parámetros que admite este campo son:

- `id`: El id del input.
- `name`: El nombre del input.
- `label`: Pone una etiqueta similar a un label.
- `selectedindex`: Selecciona un option según el index.
- `selectedvalue`: Selecciona un option según el valor.
- `disabled`: Un input desactivado.
- `novalidate`: Evita que el campo sea validado por el onchange o por el aw-form.
- `noregister`: Evita que el campo se registres en el aw-form o en un form normal.
- `colors`: Determina si el aw-select va a tener colores en su interior.
- `connectedfunc`: Una función donde se retorna el componente para tratarlo fuera del componente cuando conecta.
- `changefunc`: Una función donde se retorna el input para tratarlo fuera del componente cuando cambia.
- `unresolved`: No muestra el campo hasta que haya cargado el componente. Usar si usamos preffix o suffix.

El aw-select-df es capaz de detectar el cambio de los options al vuelo con solo introducir una nueva lista de opciones en el interior del componente.

##### Ejemplos de aw-select-df

A continuación mostramos un ejemplo de un aw-select-df básico.

```html
<aw-select-df label="Selecciona una opción">
    <option value="" title="Selecciona una opción">Selecciona...</option>
    <option value="option_1" title="Opción 1 es una cosa">Option 1</option>
    <option value="option_2" title="Opción 2 es una cosa">Option 2</option>
    <option value="option_3" title="Opción 3 es una cosa">Option 3</option>
</aw-select-df>
```

##### Imágene e iron-icons

Es posible crear selects más atractivos añadiendo a estos imágenes o iconos de los iron-icons que tu quieras a cada option a través de simples atributos **data** en los options:

```html
<aw-select-df unresolved name="miselect" label="Prueba" icon>
    <option value="" >Selecciona...</option>
    <option value="spain" data-img="http://mydomain.com/img/spain-flag.png">España</option>
    <option value="greece" data-img="http://mydomain.com/img/greece-flag.png">Grecia</option>
    <option value="portugal" data-img="http://mydomain.com/img/portugal-flag.png">Portugal</option>
    <option value="android" data-iron="icons:android">Android</option>
</aw-select-df>
```

Las imágenes o los iconos se pueden ajustar con las variables CSS que en contrarás más abajo.

##### colors

Pon este atributo en el aw-select para convertirloo en un seleccionable de colores. `Importante`, los values de los options han de ser códigos de colores válidos para que el campo funcione correctamente. Sin empbargo el innerHTML del option puede ser cualquier cosa ya que éste no será visible.

```html
<aw-select-df label="Selecciona un color" colors>
    <option value="#FF0000">Rojo</option>
    <option value="rgb(121, 202, 89)">rgb(121, 202, 89)</option>
    <option value="rgb(67, 57, 202)">Azul</option>
    <option value="#ff00b3">#ff00b3</option>
    <option value="hsl(59, 100%, 50%)">Amarillo</option>
</aw-select-df>
```

##### selectedindex

En el siguiente ejemplo mostramos un aw-select-df en la que seleccionamos una opción en la carga.

```html
<aw-select-df label="Selecciona una opción" selectedindex="1">
    <option value="option_1">Option 1</option>
    <option value="option_2">Option 2</option>
    <option value="option_3">Option 3</option>
</aw-select-df><br>
<aw-select-df label="Selecciona una opción" allwaysup="" selectedindex="3">
    <option value="">Selecciona...</option>
    <option value="option_1">Option 1</option>
    <option value="option_2">Option 2</option>
    <option value="option_3">Option 3</option>
</aw-select-df>
```

##### selectedvalue

También podemos seleccionar una opción en la carga a través del value de las options:

```html
<aw-select-df label="Selecciona una opción" selectedvalue="option_1">
    <option value="option_1">Option 1</option>
    <option value="option_2">Option 2</option>
    <option value="option_3">Option 3</option>
</aw-select-df><br>
<aw-select-df label="Selecciona una opción" selectedvalue="option_2">
    <option value="">Selecciona...</option>
    <option value="option_1">Option 1</option>
    <option value="option_2">Option 2</option>
    <option value="option_3">Option 3</option>
</aw-select-df>
```

##### Cambiar el valor por javascript:

```javascript
var select = document.querySelector( "aw-select-df" );
select.setAttribute( "selectedvalue", "option_2" );
```

#### Métodos

Para interactuar con el componente a través de javascrip existen varios métodos:

```html
<aw-select-df label="Selecciona una opción">
    <option value="">Selecciona...</option>
    <option value="option_1">Option 1</option>
    <option value="option_2">Option 2</option>
    <option value="option_3">Option 3</option>
</aw-select-df>
```
```javascript
/** @type {AwSelect} */
let select = document.querySelector( "aw-select-df" );

// Obtiene el valor del input
let value = select.get_value();

// Muestra un mensaje de error en el input
select.error_show( "Error message" );

// Elimina el mensaje de error del input
select.error_hide();

// Devuelve un booleano en función de que el input tenga o no marcado un error.
let error = select.has_error();

// Aunque si se cambian los options del interior del aw-select-df, estos se cambian automáticamente
// con este método se puede recargar manualmente.
select.reload();
```

#### Aplicar estilos al aw-select-df

Las variables que dan estilo a los aw-select-df se comparten con el aw-input-df, pero además tenemos las siguientes opciones.

```css
/* Estilos de la flecha del aw-select */

--aw-select-arrow-top: calc(50% - 7px);             
--aw-select-arrow-color: #555555;  

/* Estilos de los options del */ 

--aw-select-options-background-color: white;
--aw-select-options-background-color-hover: #F0F0F0;
--aw-select-options-background-color-selected: --aw-primary-color | #1C7CDD; 
--aw-select-options-color: --aw-input-color | #333333;
--aw-select-options-color-hover: --aw-input-color | #333333;
--aw-select-options-color-selected: white;          
--aw-select-options-font-size: ( --aw-input-font-size | 16px );
--aw-select-options-icon-right: 7px;
--aw-select-options-icon-top: -2px;
--aw-select-options-icon-width: ( --aw-select-options-image-width | 20px );
--aw-select-options-image-right: 7px;
--aw-select-options-image-top: -4px;
--aw-select-options-image-width: 20px;
--aw-select-options-padding: 10px 25px 10px 10px;

/* Estilos de la imagen o icono seleccionada */

--aw-select-visible-image-width: ( --aw-select-options-image-width | 20px );
--aw-select-visible-icon-width: ( --aw-select-options-icon-width | --aw-select-visible-image-width | --aw-select-options-image-width | 20px);
--aw-select-visible-image-margin-top: ( --aw-select-options-image-top | -4px);
--aw-select-visible-image-margin-right: ( --aw-select-options-image-right | 7px);
--aw-select-visible-icon-margin-top: ( --aw-select-options-icon-top | -2px );
--aw-select-visible-icon-margin-right: ( --aw-select-options-icon-right | -2px );    
```

___

## aw-select-search-df

Este componente es un seleccionable similar al `aw-select-df` con la salvedad de que tiene un campode búsqueda que te permite filtrar los resultados. En esencia funciona exactamente igual que el `aw-select-df` solo que es más práctico cuando tenemos una lista de options grande.

Para hacer uso de este componente:

```html
<script src="/node_modules/aw_form_elements_df/aw-select-search-df.js"></script>
<aw-select-search-df></aw-select-search-df>
```

##### Ejemplos de aw-select-serarch-df

A continuación mostramos un ejemplo de un aw-select-df básico.

```html
<aw-select-search-df label="Selecciona una opción">
    <option value="" title="Selecciona una opción">Selecciona...</option>
    <option value="option_1" title="Opción 1 es una cosa">Option 1</option>
    <option value="option_2" title="Opción 2 es una cosa">Option 2</option>
    <option value="option_3" title="Opción 3 es una cosa">Option 3</option>
</aw-select-search-df>
```

#### Métodos

Para interactuar con el componente a través de javascrip existen varios métodos:

```html
<aw-select-search-df label="Selecciona una opción">
    <option value="">Selecciona...</option>
    <option value="option_1">Option 1</option>
    <option value="option_2">Option 2</option>
    <option value="option_3">Option 3</option>
</aw-select-search-df>
```
```javascript
/** @type {AwSelectSearch} */
let select = document.querySelector( "aw-select-search-df" );

// Obtiene el valor del input
let value = select.get_value();

// Muestra un mensaje de error en el input
select.error_show( "Error message" );

// Elimina el mensaje de error del input
select.error_hide();

// Devuelve un booleano en función de que el input tenga o no marcado un error.
let error = select.has_error();

// Aunque si se cambian los options del interior del aw-select-search-df, estos se cambian automáticamente
// con este método se puede recargar manualmente.
select.reload();
```
___

## aw-textarea-df

Este componente crea un campo textarea con el estilo material theme de Google. Para incluir el componente:

```html
<script src="/node_modules/aw_form_elements_df/aw-textarea-df.js"></script>
<aw-textarea-df></aw-textarea-df>
```

Los parámetros que admite este campo son:

- `id`: El ID del textarea.
- `name`: El nombre del textarea.
- `rows`: El número de filas del textarea.
- `label`: Pone una etiqueta similar a un label.
- `minlength`: El largo mínimo del texto introducido.
- `maxlength`: El largo máximo del texto introducido.
- `maxheight`: El alto máximo cuando el textarea es autoajustable.
- `value`: El valor del campo.
- `countchar`: Pone un contador de caracteres en el textarea.
- `noadjust`: Evita que el textarea sea autoajustable.
- `readonly`: Un textarea de solo lectura.
- `disabled`: Un textarea desactivado.
- `autofocus`: El campo se enfoca automáticamente.
- `novalidate`: Evita que el campo sea validado por el onchange o por el aw-form.
- `validateonchange`: Valida el campo cuando se produce un cambio en él. (<a href="https://www.npmjs.com/package/aw_form_mixins#aw-form-validate-mixin">Ver</a>)
- `noregister`: Evita que el campo se registres en el aw-form o en un form normal.
- `connectedfunc`: Una función donde se retorna el componente para tratarlo fuera del componente cuando conecta.
- `changefunc`: Una función donde se retorna el textarea para tratarlo fuera del componente cuando cambia.
- `keyupfunc`: Una función donde se retorna el textarea para tratarlo fuera del componente cuando soltamos tecla.
- `keypressfunc`: Una función donde se retorna el textarea para tratarlo fuera del componente cuando presionamos tecla.
- `focusoutfunc`: Una función donde se retorna el textarea para tratarlo fuera del componente cuando hacemos focus.
- `focusinfunc`: Una función donde se retorna el textarea para tratarlo fuera del componente cuando quitamos focus.
- `unresolved`: No muestra el campo hasta que haya cargado el componente.

##### maxheight

Altúra máxima en píxeles que queremos que obtenga el textarea cuando escribimos

```html
<aw-textarea-df label="Nombre de usuario" maxheight="180"></aw-textarea-df>
```

##### noadjust

Por defecto el textarea se va ajustando en altura según se escribe, si no queremos que esto ocurra añadimos el atributo `noadjust`.

```html
<aw-textarea-df label="Descripción" placeholder="Escribe aquí una breve descripción." countchar noadjust rows="5"></aw-textarea-df>
```

#### Métdos

```html
<aw-textarea-df label="Descripción" placeholder="Escribe aquí una breve descripción."></aw-textarea-df>
```
```javascript
/** @type {AwTextArea} */
let textarea = document.querySelector( "aw-textarea-df" );

// Obtiene el valor del input
let value = textarea.get_value();

// Muestra un mensaje de error en el input
textarea.error_show( "Error message" );

// Elimina el mensaje de error del input
textarea.error_hide();

// Devuelve un booleano en función de que el input tenga o no marcado un error.
let error = textarea.has_error();
```

#### Aplicar estilos al aw-textarea-df

Los estilos de aw-textarea-df son compartidos con el aw-input-df
___

## aw-input-color-df

Es un campo para seleccionar colores de la paleta de colores que el navegador trae por defecto. Para usar este componente:


```html
<script src="/node_modules/aw_form_elements_df/aw-input-color-df.js"></script>
<aw-input-color-df><aw-input-color-df>
```

El uso de este campo es muy sencillo, en esencia se comporta igual que un campo input[type=color] por defecto del navegador pero queda con un estilo más amigable y parecido al resto de los inputs de los `aw-form-elements-df`.

```html
<aw-input-color-df name="color" label="Selecciona un color"><aw-input-color-df>
```

#### Métdos

```html
<aw-input-color-df label="Descripción" placeholder="Escribe aquí una breve descripción."></aw-input-color-df>
```
```javascript
/** @type {AwTextArea} */
let textarea = document.querySelector( "aw-input-color-df" );

// Obtiene el valor del input
let value = textarea.get_value();

// Muestra un mensaje de error en el input
textarea.error_show( "Error message" );

// Elimina el mensaje de error del input
textarea.error_hide();

// Devuelve un booleano en función de que el input tenga o no marcado un error.
let error = textarea.has_error();
```


______________________________

<p style="text-align: center; padding: 50px 0">
    <b>Contacto</b><br><br>Manu J. Overa<br><a href="mailto:manu.overa@arismanwebs.es">manu.overa@arismanwebs.es</a><br><br>
    Diseño Web - <a href="https://arismanwebs.es">Arisman Webs</a>
</p>
