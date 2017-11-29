import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { CompanyMgmtComponent } from './company-management.component';
import { CompanyMgmtDetailComponent } from './company-management-detail.component';
import { CompanyDialogComponent } from './company-management-dialog.component';
import { CompanyDeleteDialogComponent } from './company-management-delete-dialog.component';
import { CompanyRouteAccessService } from './../../shared';

@Injectable()
export class CompanyResolvePagingParams implements Resolve<any> {

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

export const companyMgmtRoute: Routes = [
    {
        path: 'company-management',
        component: CompanyMgmtComponent,
        resolve: {
            'pagingParams': CompanyResolvePagingParams
        },
        data: {
            pageTitle: 'companyManagement.home.title'
        },
        canActivate: [CompanyRouteAccessService]
    },
    {
        path: 'company-management/:id',
        component: CompanyMgmtDetailComponent,
        data: {
            pageTitle: 'companyManagement.home.title'
        },
        canActivate: [CompanyRouteAccessService]
    }
];

export const companyDialogRoute: Routes = [
    {
        path: 'company-management-new',
        component: CompanyDialogComponent,
        outlet: 'popup',
        canActivate: [CompanyRouteAccessService]
    },
    {
        path: 'company-management/:id/edit',
        component: CompanyDialogComponent,
        outlet: 'popup',
        canActivate: [CompanyRouteAccessService]
    },
    {
        path: 'company-management/:id/delete',
        component: CompanyDeleteDialogComponent,
        outlet: 'popup',
        canActivate: [CompanyRouteAccessService]
    }
];
