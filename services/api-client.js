const domen = 'http://localhost:3000'

export async function sendPostRequest(endpoint, requestBody) {
    await fetch(`${domen}${endpoint}`, {
        body: JSON.stringify(requestBody), method: 'POST', headers: {
            'Content-Type': 'application/json',
        }
    });
}

export async function sendGetRequest(endpoint, query = '') {
    endpoint = endpoint + query;
    const res = await fetch(`${domen}${endpoint}`);
    return await res.json();
}

export async function sendDeleteRequest(endpoint, id) {
    await fetch(`${domen}${endpoint}/${id}`, {method: 'DELETE'});
}

export async function sendPutRequest(endpoint, requestBody) {
    await fetch(`${domen}${endpoint}/${requestBody.id}`, {
        method: 'PUT', headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
    });
}