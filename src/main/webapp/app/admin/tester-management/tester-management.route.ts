import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { TesterMgmtComponent } from './tester-management.component';
import { TesterMgmtDetailComponent } from './tester-management-detail.component';
import { TesterDialogComponent } from './tester-management-dialog.component';
import { TesterDeleteDialogComponent } from './tester-management-delete-dialog.component';
import { TesterRouteAccessService } from './../../shared';

@Injectable()
export class TesterResolvePagingParams implements Resolve<any> {

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

export const testerMgmtRoute: Routes = [
    {
        path: 'tester-management',
        component: TesterMgmtComponent,
        resolve: {
            'pagingParams': TesterResolvePagingParams
        },
        data: {
            pageTitle: 'testerManagement.home.title'
        },
        canActivate: [TesterRouteAccessService]
    },
    {
        path: 'tester-management/:id',
        component: TesterMgmtDetailComponent,
        data: {
            pageTitle: 'testerManagement.home.title'
        },
        canActivate: [TesterRouteAccessService]
    }
];

export const testerDialogRoute: Routes = [
    {
        path: 'tester-management-new',
        component: TesterDialogComponent,
        outlet: 'popup',
        canActivate: [TesterRouteAccessService]
    },
    {
        path: 'tester-management/:id/edit',
        component: TesterDialogComponent,
        outlet: 'popup',
        canActivate: [TesterRouteAccessService]
    },
    {
        path: 'tester-management/:id/delete',
        component: TesterDeleteDialogComponent,
        outlet: 'popup',
        canActivate: [TesterRouteAccessService]
    }
];
