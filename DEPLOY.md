# Despliegue en Cloudflare Pages

La landing es estática y no requiere funciones ni claves de API.

1. En Cloudflare, crea un proyecto Pages conectado al repositorio de GitHub.
2. Selecciona el preset **None**. Deja vacío el comando de build y configura el directorio de salida como `.`.
3. Despliega el proyecto. No es necesario configurar variables o secretos.

Para desarrollo local, ejecuta `npm start` y abre `http://localhost:3000`.
