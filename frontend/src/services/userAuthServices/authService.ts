import apiClient from "../../api/apiClient"


export async function login(email: string, password: string){
    const response = await apiClient.post("/api/auth/login",
        {
            email,
            password
        }
    );

    return response.data;
}

export async function register(
    cnp:string,
    nume: string,
    prenume: string,
    email: string,
    password: string,
    phoneNumber: string 
){
    const response = await apiClient.post("/api/auth/register",{
            cnp,
            nume,
            prenume,
            email,
            password,
            phoneNumber
        }
    );   
    return response.data;
}