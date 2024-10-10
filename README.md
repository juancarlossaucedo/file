# Proyecto Node.js con AWS S3 y R2

Este proyecto es una aplicación Node.js que configura AWS SDK para interactuar con S3 y R2, y proporciona una ruta para obtener una URL firmada para subir archivos.

## Requisitos

- Node.js
- npm

## Instalación

1. Clona el repositorio:

    ```sh
    git clone <https://github.com/juancarlossaucedo/file-with-cloudflare.git>
    cd <file-cloudflare>
    ```

2. Instala las dependencias:

    ```sh
    npm install
    ```

3. Crea un archivo `.env` en la raíz del proyecto con las siguientes variables de entorno:

    ```env
    AWS_ACCESS_KEY_ID=tu_access_key_id
    AWS_SECRET_ACCESS_KEY=tu_secret_access_key
    AWS_REGION=tu_region
    R2_BUCKET_NAME=tu_bucket_name
    R2_ENDPOINT=tu_endpoint
    ```

## Uso

1. Inicia la aplicación:

    ```sh
    node index.js
    ```

2. Accede a la ruta `/get-signed-url` para obtener una URL firmada para subir archivos. Por ejemplo:

    ```sh
    curl "http://localhost:3000/get-signed-url?filename=tu_archivo.txt&contentType=text/plain"
    ```

## Configuración de CORS

El archivo `index.js` configura CORS para permitir solicitudes desde `http://localhost:4200`. Puedes cambiar esto según el origen de tu aplicación Angular:

```javascript
app.use(cors({
  origin: 'http://localhost:4200',
  methods: ['GET', 'PUT'],
}));
