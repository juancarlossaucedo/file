const express = require('express');
const AWS = require('aws-sdk');
const cors = require('cors'); // Asegúrate de tener esto importado
require('dotenv').config();

const app = express();

// Configuración de CORS
app.use(cors({
  origin: 'http://localhost:4200', // Cambia según el origen de tu aplicación Angular
  methods: ['GET', 'PUT'],
}));

// Configura AWS SDK para R2
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
  endpoint: process.env.R2_ENDPOINT,
  signatureVersion: 'v4',
});

// Ruta para obtener la URL firmada para subir archivos
app.get('/get-signed-url', (req, res) => {
  const { filename, contentType } = req.query;

  const params = {
    Bucket: process.env.R2_BUCKET_NAME,
    Key: filename,
    Expires: 60,
    ContentType: contentType
  };

  s3.getSignedUrl('putObject', params, (err, url) => {
    if (err) {
      return res.status(500).json({ error: 'Error al generar la URL firmada', details: err });
    }
    res.json({ signedUrl: url });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
