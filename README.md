# Repo Files Fidner

Proyecto que trata de resolver una prueba técnica. Los requititos de la prueba son los siguientes:

## Requisitos

Debes escribir una aplicación en React, que reciba unos datos de entrada (formulario o query parameters) y muestre el resultado obtenido.

La aplicación tendrá como dato de entrada un repositorio de Github y como salida una lista de extensiones de los archivos del repositorio. Además debe indicarse cuantas veces aparece cada extensión. No es necesario parsear el contenido de los archivos, únicamente el nombre de los mismos.

Se requiere que el repositorio de Github tenga al menos tres niveles de directorios pero se recomienda usar un repositorio no demasiado grande para hacer las pruebas.

Usa el **endpoint**: `https://api.github.com/repos/[OWNER]/[REPO]/git/trees`

**NO** debes usar el parametro `?recursive=1`

## Instalación

Clonar e instalar las dependencias:

```bash 
  git clone https://github.com/McPixeI/repo-files-finder
  cd repo-files-finder
  npm install
```

## Setup

1. Copia el fichero .env.local.example y renómbrala como .env.local
2. Consigue tu propio token personal de GitHub
3. Pon el token en el fichero .env.local donde corresponde
4. Inicia el proyecto con `npm run start` or `npm start`

## Autor

- [@McPixeI](https://github.com/McPixeI)
