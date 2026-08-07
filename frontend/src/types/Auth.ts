export type LoginForm = {
  email: string;
  password: string;
}

export type LoginErrors = {
  email: string;
  password: string;
}

export type RegisterForm = {
    cnp: string;
    prenume: string;
    nume: string;
    email: string;
    password: string;
    passwordConfirm: string;
    phoneNumber: string;
}

export type RegisterErrors = {
    cnp: string;
    prenume: string;
    nume: string;
    email: string;
    password: string;
    passwordConfirm: string;
    phoneNumber: string;

}
