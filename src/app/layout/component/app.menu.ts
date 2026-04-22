import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppMenuitem } from './app.menuitem';

@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [CommonModule, AppMenuitem, RouterModule],
    template: `<ul class="layout-menu">
        @for (item of model; track item.label) {
            @if (!item.separator) {
                <li app-menuitem [item]="item" [root]="true"></li>
            } @else {
                <li class="menu-separator"></li>
            }
        }
    </ul> `,
})
export class AppMenu {
    model: MenuItem[] = [];

    ngOnInit() {
        this.model = [
            {
                label: 'Admin',
                items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/admin'] }]
            },
            {
                label: 'Gestión Usuarios',
                items: [
                    { label: 'Mi Perfil', icon: 'pi pi-fw pi-id-card', routerLink: ['/admin/perfil'] },
                    { label: 'Usuarios', icon: 'pi pi-fw pi-users', routerLink: ['/admin/usuario'] }
                   
                ]
            },
            {
                label: 'Inventarios',
                icon: 'pi pi-fw pi-briefcase',
                items: [
                    {
                        label: 'producto',
                        icon: 'pi pi-fw pi-box',
                        routerLink: ['/admin/producto']
                    },
                    {
                        label: 'Categoria',
                        icon: 'pi pi-fw pi-table',
                        routerLink: ['/admin/categoria']
                    },
                    {
                        label: 'Almacen',
                        icon: 'pi pi-fw pi-exclamation-circle',
                        routerLink: ['/admin/almacen']
                    },
                    {
                        label: 'Sucursal',
                        icon: 'pi pi-fw pi-globe',
                        routerLink: ['/admin/sucursal']
                    }
                ]
            },
            {
                label: 'Compra Venta',
                icon: 'pi pi-fw pi-briefcase',
                items: [
                    {
                        label: 'Notas Compra/Venta',
                        icon: 'pi pi-fw pi-box',
                        routerLink: ['/admin/notas']
                    },
                    {
                        label: 'Nueva Compra',
                        icon: 'pi pi-fw pi-table',
                        routerLink: ['/admin/notas/compra']
                    },
                    {
                        label: 'Nueva Venta',
                        icon: 'pi pi-fw pi-exclamation-circle',
                        routerLink: ['/admin/notas/venta']
                    }
                ]
            }
        ];
    }
}
