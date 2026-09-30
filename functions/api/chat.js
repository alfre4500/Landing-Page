function jsonResponse(body, status) {
    return new Response(JSON.stringify(body), {
        status,
        headers: { 'Content-Type': 'application/json; charset=utf-8' }
    });
}

export async function onRequestPost({ request, env }) {
    const apiKey = env.GEMINI_API_KEY;
    if (!apiKey) {
        return jsonResponse({ error: 'El servicio de IA no está configurado.' }, 500);
    }

    let payload;
    try {
        payload = await request.json();
    } catch {
        return jsonResponse({ error: 'La solicitud no contiene JSON válido.' }, 400);
    }

    if (!payload || !Array.isArray(payload.contents)) {
        return jsonResponse({ error: 'La conversación enviada no es válida.' }, 400);
    }

    const url = new URL(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent'
    );
    url.searchParams.set('key', apiKey);

    try {
        const upstream = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: payload.contents,
                systemInstruction: payload.systemInstruction
            })
        });
        const responseBody = await upstream.text();

        return new Response(responseBody, {
            status: upstream.status,
            headers: {
                'Content-Type': upstream.headers.get('Content-Type') || 'application/json; charset=utf-8'
            }
        });
    } catch {
        return jsonResponse({ error: 'No se pudo conectar con el servicio de IA.' }, 502);
    }
}
