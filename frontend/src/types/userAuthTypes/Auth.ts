export interface LoginForm{
  email: string;
  password: string;
}

export interface LoginErrors{
  email: string;
  password: string;
}

export interface RegisterForm{
    cnp: string;
    prenume: string;
    nume: string;
    email: string;
    password: string;
    passwordConfirm: string;
    phoneNumber: string;
}

export interface RegisterErrors{
    cnp: string;
    prenume: string;
    nume: string;
    email: string;
    password: string;
    passwordConfirm: string;
    phoneNumber: string;

}
