import { Routes } from '@angular/router';
import { WebLayout } from './layout/web-layout/web-layout';
import { Inicio } from './web/inicio/inicio';
import { Nosotros } from './web/nosotros/nosotros';
import { Servicios } from './web/servicios/servicios';

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
            }
        ]
    },
];
