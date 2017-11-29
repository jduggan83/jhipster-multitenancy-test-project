import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { MachineComponent } from './machine.component';
import { MachineDetailComponent } from './machine-detail.component';
import { MachinePopupComponent } from './machine-dialog.component';
import { MachineDeletePopupComponent } from './machine-delete-dialog.component';

export const machineRoute: Routes = [
    {
        path: 'machine',
        component: MachineComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.machine.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'machine/:id',
        component: MachineDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.machine.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const machinePopupRoute: Routes = [
    {
        path: 'machine-new',
        component: MachinePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.machine.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'machine/:id/edit',
        component: MachinePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.machine.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'machine/:id/delete',
        component: MachineDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.machine.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
