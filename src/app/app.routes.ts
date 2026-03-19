import { Routes } from '@angular/router';
import { WebLayout } from './layout/web-layout/web-layout';
import { Inicio } from './web/inicio/inicio';
import { Nosotros } from './web/nosotros/nosotros';
import { Servicios } from './web/servicios/servicios';
import { Perfil } from './admin/perfil/perfil';
import { Usuarios } from './admin/usuarios/usuarios';
import { authGuard } from './core/guards/auth-guard';
import { AppLayout } from './layout/component/app.layout';
import { Categoria } from './admin/inventario/categoria/categoria';

export const routes: Routes = [
    {
        path: "",
        component: WebLayout,
        children: [
            { path: "", component: Inicio },
            { path: "nosotros", component: Nosotros },
            { path: "servicios", component: Servicios },
            {
                path: "auth",
                loadChildren: () => import('./auth/auth-module').then(m => m.AuthModule)
            },
        ]
    },
    {
        path: 'admin',
        component: AppLayout,
        children: [
            {
                path: "perfil",
                component: Perfil,
                canActivate: [authGuard]
            },
            {
                path: "usuario",
                component: Usuarios,
                canActivate: [authGuard]
            },
            {
                path: "categoria",
                component: Categoria,
                canActivate: [authGuard]
            }

        ]
    }
];
