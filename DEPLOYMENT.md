# Despliegue multiidioma en Vercel

## Resumen

Este portafolio soporta dos idiomas:

- **Inglés (`en`)** — por defecto
- **Español (`es`)**

La implementación técnica (componentes, orden de scripts, nombres de archivos JSON) está resumida en [`AI_CONTEXT.md`](AI_CONTEXT.md) para quien edite el código o lo use con un asistente.

## Preparación del proyecto

Estructura relevante:

```
Responsive-Portfolio-Website/
├── translations/
│   ├── en-v2.json
│   └── es-v2.json
├── css/
│   ├── style.css
│   ├── i18n.css
│   └── style-project.css
├── js/
│   ├── i18n.js
│   ├── app.js
│   ├── app-project.js
│   ├── mixitup.min.js
│   └── components/
│       ├── header.js      # <app-header>
│       ├── footer.js      # <app-footer>
│       └── language.js    # <app-language> (selector de idioma)
├── projects/
│   ├── pj1.html
│   ├── pj2.html
│   └── pj3.html
├── index.html
├── vercel.json
└── ...
```

Los bundles usan **`en-v{N}.json` / `es-v{N}.json`**; el número **`N`** está en la constante **`I18N_TRANSLATION_BUNDLE_VERSION`** al inicio de `js/i18n.js`. Para invalidar caché tras un deploy, incrementa **`N`**, crea los nuevos archivos JSON y elimina (o deja de referenciar) los anteriores.

## Configuración en Vercel (`vercel.json`)

- **Rewrites** para rutas con prefijo de idioma:
  - `/en` → `index.html?lang=en`
  - `/es` → `index.html?lang=es`
  - `/en/(path)` → `/(path)?lang=en`
  - `/es/(path)` → `/(path)?lang=es`

- **Headers**
  - `Cache-Control: public, max-age=3600, must-revalidate` para **`/translations/*`**: ~1 hora de caché en CDN/navegador; **`must-revalidate`** obliga a revalidar al expirar. Es razonable para JSON que cambia poco; para que **todos** los usuarios vean copy nuevo al instante sin esperar la hora, sube **`I18N_TRANSLATION_BUNDLE_VERSION`** y los nombres de archivo (nueva URL = caché fría).
  - Headers de seguridad en el resto de rutas estáticas.

## Despliegue

1. Conecta el repositorio en [vercel.com](https://vercel.com) o usa la CLI:

   ```bash
   npm i -g vercel
   vercel
   ```

2. Vercel sirve el sitio como proyecto estático y aplica `vercel.json`.

## URLs de ejemplo

Tras el despliegue:

- Inglés: `https://tu-dominio.vercel.app/` o `https://tu-dominio.vercel.app/en`
- Español: `https://tu-dominio.vercel.app/es`
- Proyecto con idioma: `https://tu-dominio.vercel.app/es/projects/pj1.html` (el rewrite añade `?lang=es`)

## Funcionalidad de idioma

### Detección (orden)

1. Parámetro **`?lang=en`** o **`?lang=es`**
2. **`localStorage`** (`portfolio-language`)
3. Idioma del navegador (`navigator.language`)
4. Por defecto **inglés**

### Selector de idioma

- Implementado en el custom element **`<app-language>`** (`js/components/language.js`): botón flotante con desplegable, no está incrustado en el HTML del `<header>`.
- Al elegir idioma se llama `window.i18n.changeLanguage(lang)`; la preferencia queda en `localStorage` y la URL se actualiza con `?lang=` sin recarga completa.

### SEO

- `document.title` y `<meta name="description">` se rellenan desde las claves `meta` de los JSON.

## Agregar o cambiar textos traducidos

### 1. Archivos JSON

Edita **los dos** archivos con la **misma estructura de claves**:

- `translations/en-v2.json`
- `translations/es-v2.json`

Ejemplo de clave anidada:

```json
{
  "nueva_seccion": {
    "titulo": "Nuevo título",
    "descripcion": "Nueva descripción"
  }
}
```

### 2. HTML

Añade `data-i18n` con la ruta de la clave:

```html
<h1 data-i18n="nueva_seccion.titulo">Fallback visible antes de i18n</h1>
<p data-i18n="nueva_seccion.descripcion">...</p>
```

Si necesitas HTML en el valor, el código admite `data-i18n-html` en el elemento (ver `js/i18n.js`).

### 3. JavaScript

```javascript
const titulo = window.i18n.t("nueva_seccion.titulo");
const mensaje = window.i18n.t("mensaje.bienvenida", { nombre: "Andres" });
```

Placeholders en el JSON: `{{nombre}}` para interpolación.

### 4. Tras modificar traducciones en producción

Por la caché HTTP de `/translations/*`, para cambios que deban verse al instante en todos los clientes:

- Incrementa **`I18N_TRANSLATION_BUNDLE_VERSION`** y añade `en-v{N}.json` / `es-v{N}.json`, o
- Acepta hasta ~1 hora de reutilización de caché para la **misma URL** según `max-age` en `vercel.json`.

## Agregar un nuevo idioma (ejemplo)

Requiere tocar varios sitios (hoy solo están `en` y `es`):

1. Nuevo archivo, por ejemplo `translations/fr-v2.json`, con las mismas claves que `en-v2.json`.
2. En `js/i18n.js`, ampliar listas que validan idioma (`detectLanguage`, `changeLanguage`, etc.) para incluir `fr`.
3. En `js/components/language.js`, añadir un botón `data-lang="fr"` y entradas en los JSON para las etiquetas del selector (`language.*`).
4. En `vercel.json`, añadir rewrites para `/fr` y `/fr/(.*)` similares a `/en` y `/es`.

## Troubleshooting

1. **No cargan las traducciones**
   - Comprueba que existen `translations/en-v2.json` y `translations/es-v2.json` (o la versión actual en `I18N_TRANSLATION_BUNDLE_VERSION`).
   - En páginas bajo `projects/`, la ruta de fetch usa `../translations/`.
   - Revisa la consola por errores de red (404, CORS en orígenes raros).

2. **El selector no reacciona**
   - Debe existir `window.i18n`. Revisa el **orden de scripts** en `index.html` y en `projects/pj*.html` (ver [`AI_CONTEXT.md`](AI_CONTEXT.md)).

3. **Las rutas `/es` o `/en` no aplican idioma**
   - Confirma que `vercel.json` está en el repo y desplegado.
   - Abre la URL con `?lang=es` manualmente para aislar rewrites vs detección.

### Debug en consola

```javascript
console.log(window.i18n);
console.log(window.i18n.getCurrentLanguage());
console.log(window.i18n.translations);
```

## Rendimiento

- Solo se descarga el JSON del idioma activo por carga.
- **Preferencia** de idioma: `localStorage`.
- **Contenido de traducciones**: cache HTTP en Vercel para `/translations/*` (ver `vercel.json`), no se guarda el JSON completo en `localStorage`.

## Próximos pasos habituales

1. Desplegar en Vercel y probar `/`, `/en`, `/es` y una página en `projects/`.
2. Mantener paridad de claves entre los dos JSON del idioma activo (`en-v{N}.json` y `es-v{N}.json`) en cada cambio de copy.
3. Opcional: dominio personalizado en el panel de Vercel.
