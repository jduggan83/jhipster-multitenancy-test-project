import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { ZooMgmtComponent } from './zoo-management.component';
import { ZooMgmtDetailComponent } from './zoo-management-detail.component';
import { ZooDialogComponent } from './zoo-management-dialog.component';
import { ZooDeleteDialogComponent } from './zoo-management-delete-dialog.component';
import { ZooRouteAccessService } from './../../shared';

@Injectable()
export class ZooResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
        };
    }
}

export const zooMgmtRoute: Routes = [
    {
        path: 'zoo-management',
        component: ZooMgmtComponent,
        resolve: {
            'pagingParams': ZooResolvePagingParams
        },
        data: {
            pageTitle: 'zooManagement.home.title'
        },
        canActivate: [ZooRouteAccessService]
    },
    {
        path: 'zoo-management/:id',
        component: ZooMgmtDetailComponent,
        data: {
            pageTitle: 'zooManagement.home.title'
        },
        canActivate: [ZooRouteAccessService]
    }
];

export const zooDialogRoute: Routes = [
    {
        path: 'zoo-management-new',
        component: ZooDialogComponent,
        outlet: 'popup',
        canActivate: [ZooRouteAccessService]
    },
    {
        path: 'zoo-management/:id/edit',
        component: ZooDialogComponent,
        outlet: 'popup',
        canActivate: [ZooRouteAccessService]
    },
    {
        path: 'zoo-management/:id/delete',
        component: ZooDeleteDialogComponent,
        outlet: 'popup',
        canActivate: [ZooRouteAccessService]
    }
];
