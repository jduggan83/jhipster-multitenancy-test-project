import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { AnimalComponent } from './animal.component';
import { AnimalDetailComponent } from './animal-detail.component';
import { AnimalPopupComponent } from './animal-dialog.component';
import { AnimalDeletePopupComponent } from './animal-delete-dialog.component';

export const animalRoute: Routes = [
    {
        path: 'animal',
        component: AnimalComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.animal.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'animal/:id',
        component: AnimalDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.animal.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const animalPopupRoute: Routes = [
    {
        path: 'animal-new',
        component: AnimalPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.animal.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'animal/:id/edit',
        component: AnimalPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.animal.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'animal/:id/delete',
        component: AnimalDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.animal.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
