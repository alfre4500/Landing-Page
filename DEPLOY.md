# Despliegue en Cloudflare Pages

La landing sigue en GitHub; Cloudflare Pages la publica y ejecuta `functions/api/chat.js` como la ruta `/api/chat`. No hace falta mantener un servidor Node activo.

1. En Cloudflare, crea un proyecto Pages conectado al repositorio de GitHub.
2. Selecciona el preset **None**. Deja vacío el comando de build y configura el directorio de salida como `.`.
3. En **Settings > Variables and Secrets**, agrega `GEMINI_API_KEY` como secreto para Production. Agrégalo también a Preview si vas a probar despliegues de preview.
4. Despliega el proyecto. La landing usará `/api/chat` en el mismo dominio; no hace falta cambiar la URL del frontend.

Para desarrollo local, `npm start` sigue usando el `.env` ignorado por Git. El secreto configurado en Cloudflare es independiente de ese archivo. Rota la clave que estuvo en el HTML antes de configurarla como secreto.
