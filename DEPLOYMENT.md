# 🌍 Despliegue Multiidioma en Vercel

## 📋 Resumen

Este portafolio web está configurado para soportar dos idiomas:
- **Inglés (EN)** - Idioma por defecto
- **Español (ES)** - Idioma secundario

## 🚀 Despliegue en Vercel

### 1. Preparación del Proyecto

Asegúrate de que todos los archivos estén en su lugar:

```
📁 Responsive-Portfolio-Website/
├── 📁 translations/
│   ├── en.json
│   └── es.json
├── 📁 css/
│   ├── style.css
│   └── i18n.css
├── 📁 js/
│   ├── i18n.js
│   └── app.js
├── index.html
├── vercel.json
└── ...otros archivos
```

### 2. Configuración de Vercel

El archivo `vercel.json` ya está configurado con:

- **Rewrites** para rutas de idioma:
  - `/en` → `index.html?lang=en`
  - `/es` → `index.html?lang=es`
  - `/en/projects/...` → `projects/...?lang=en`
  - `/es/projects/...` → `projects/...?lang=es`

- **Headers** para optimización y seguridad

### 3. Despliegue

1. **Conecta tu repositorio a Vercel:**
   ```bash
   # Instala Vercel CLI
   npm i -g vercel
   
   # Despliega
   vercel
   ```

2. **O usa la interfaz web de Vercel:**
   - Ve a [vercel.com](https://vercel.com)
   - Conecta tu repositorio de GitHub
   - Vercel detectará automáticamente la configuración

### 4. URLs Resultantes

Después del despliegue tendrás:

- **Inglés:** `https://tu-dominio.vercel.app/` o `https://tu-dominio.vercel.app/en`
- **Español:** `https://tu-dominio.vercel.app/es`

## 🔧 Funcionalidades

### Detección Automática de Idioma

El sistema detecta el idioma en este orden:

1. **Parámetro URL** (`?lang=es`)
2. **LocalStorage** (preferencia guardada)
3. **Idioma del navegador**
4. **Inglés** (por defecto)

### Selector de Idioma

- **Ubicación:** En la barra de navegación
- **Funcionalidad:** Cambio instantáneo sin recarga
- **Persistencia:** Guarda la preferencia en localStorage

### SEO Optimizado

- **Meta tags** actualizados según el idioma
- **URLs amigables** para cada idioma
- **Sitemap** automático para ambos idiomas

## 📝 Agregar Nuevas Traducciones

### 1. Actualizar archivos JSON

Edita `translations/en.json` y `translations/es.json`:

```json
{
  "nueva_seccion": {
    "titulo": "Nuevo Título",
    "descripcion": "Nueva descripción"
  }
}
```

### 2. Actualizar HTML

Agrega atributos `data-i18n`:

```html
<h1 data-i18n="nueva_seccion.titulo">Título por defecto</h1>
<p data-i18n="nueva_seccion.descripcion">Descripción por defecto</p>
```

### 3. Usar en JavaScript

```javascript
// Obtener traducción
const titulo = window.i18n.t('nueva_seccion.titulo');

// Con parámetros
const mensaje = window.i18n.t('mensaje.bienvenida', {nombre: 'Andres'});
```

## 🌐 Agregar Nuevos Idiomas

### 1. Crear archivo de traducción

Crea `translations/fr.json` (ejemplo para francés):

```json
{
  "meta": {
    "title": "Andres Araque - Site Portfolio",
    "description": "Développeur JavaScript spécialisé..."
  }
}
```

### 2. Actualizar selector de idioma

En `index.html`, agrega la nueva opción:

```html
<button class="lang-option" data-lang="fr">
  <span class="flag">🇫🇷</span>
  <span data-i18n="language.french">Français</span>
</button>
```

### 3. Actualizar Vercel

En `vercel.json`, agrega las nuevas rutas:

```json
{
  "rewrites": [
    {
      "source": "/fr",
      "destination": "/index.html?lang=fr"
    }
  ]
}
```

## 🔍 Troubleshooting

### Problemas Comunes

1. **Traducciones no cargan:**
   - Verifica que los archivos JSON estén en `/translations/`
   - Revisa la consola del navegador para errores

2. **Selector de idioma no funciona:**
   - Asegúrate de que `i18n.js` se carga antes que `app.js`
   - Verifica que los elementos tienen los IDs correctos

3. **URLs de idioma no funcionan:**
   - Verifica la configuración en `vercel.json`
   - Asegúrate de que Vercel detectó el archivo

### Debug

Abre la consola del navegador y verifica:

```javascript
// Verificar que i18n está cargado
console.log(window.i18n);

// Ver idioma actual
console.log(window.i18n.getCurrentLanguage());

// Ver traducciones cargadas
console.log(window.i18n.translations);
```

## 📊 Rendimiento

- **Carga inicial:** Solo el idioma detectado
- **Cambio de idioma:** Carga asíncrona del nuevo idioma
- **Cache:** Traducciones cacheadas en localStorage
- **Tamaño:** ~2KB por archivo de traducción

## 🎯 Próximos Pasos

1. **Despliega en Vercel**
2. **Prueba ambos idiomas**
3. **Personaliza las traducciones**
4. **Agrega más idiomas si es necesario**
5. **Configura un dominio personalizado**

¡Tu portafolio multiidioma está listo para el mundo! 🌍

