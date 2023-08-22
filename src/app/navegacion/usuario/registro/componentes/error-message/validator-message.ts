interface ErrorMessage {
    [key: string]: string;
}

const ErrorMessages: ErrorMessage = {
    required: 'Este campo es requerido',
    patternEmail: 'El correo debe ser válido',
    patternPassword: 'La contraseña no cumple con los requisitos mínimos de seguridad',
    minlength: 'Este campo debe tener 6 o más carácteres',
    maxlength: 'Este campo debe tener 20 o menos carácteres',
};

export function validatorErrorMessage(validatorName: string): string {
    return ErrorMessages[validatorName] ?? '';
}