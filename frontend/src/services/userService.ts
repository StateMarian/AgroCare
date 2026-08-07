import apiClient from "../api/apiClient";
import type { CurrentUser } from "../types/CurrentUser";


export async function getCurrentUser() : Promise<CurrentUser>  {
    const response = await apiClient.get<CurrentUser>("/api/users/me")


    return response.data;
}