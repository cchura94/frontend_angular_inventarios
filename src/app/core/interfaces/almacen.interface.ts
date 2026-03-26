import { SucursalInterface } from "./sucursal.interface";

export interface AlmacenInterface {
    id?: number;
    nombre: string;
    codigo?: string;
    descripcion?: string;
    sucursal_id: number;
    sucursal?: SucursalInterface; // Cargado por Eloquent
}