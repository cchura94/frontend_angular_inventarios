import PersonaInterface from "./PersonaInterface";

export default interface UsuarioInterface{
    id?: number,
    name: string,
    email: string,
    password?: string,
    // persona?: PersonaInterface
}