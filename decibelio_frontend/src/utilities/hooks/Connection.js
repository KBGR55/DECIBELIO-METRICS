const URL_BACKEND = "http://localhost:3006/api"
export const URLBASE = "http://localhost:3006/"; 

export const peticionGet = async (key, URL) => {
    const headers = {
        "Content-Type": "application/json",
        "x-api-token": key
    };
    const datos = await (await fetch(`${URL_BACKEND}/${URL}`, {
        method: "GET",
        headers: headers,
    })).json();    
    return datos;
}

export const peticionPost = async (key, URL,data) => {
    const headers = {
        "Content-Type": "application/json",
        "x-api-token": key
    };
    const datos = await (await fetch(`${URL_BACKEND}/${URL}`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data),
    })).json();
    return datos;
}

export const peticionPut = async (key, URL,data) => {
    const headers = {
        "Content-Type": "application/json",
        "x-api-token": key
    };
    const datos = await (await fetch(`${URL_BACKEND}/${URL}`, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(data),
    })).json();
    return datos;
}
