import api from "../api/axios";

export async function login(identifier, password) {

    const response = await api.post(
        "/auth/local",
        {
            identifier,
            password
        }
    );

    return response.data;

}

export async function register(
    username,
    email,
    password
) {

    const response = await api.post(
        "/auth/local/register",
        {
            username,
            email,
            password
        }
    );

    return response.data;

}