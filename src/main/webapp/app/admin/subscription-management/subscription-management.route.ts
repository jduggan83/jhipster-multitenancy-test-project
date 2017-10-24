import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { SubscriptionMgmtComponent } from './subscription-management.component';
import { SubscriptionMgmtDetailComponent } from './subscription-management-detail.component';
import { SubscriptionDialogComponent } from './subscription-management-dialog.component';
import { SubscriptionDeleteDialogComponent } from './subscription-management-delete-dialog.component';
import { SubscriptionRouteAccessService } from './../../shared';

@Injectable()
export class SubscriptionResolvePagingParams implements Resolve<any> {

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

export const subscriptionMgmtRoute: Routes = [
    {
        path: 'subscription-management',
        component: SubscriptionMgmtComponent,
        resolve: {
            'pagingParams': SubscriptionResolvePagingParams
        },
        data: {
            pageTitle: 'subscriptionManagement.home.title'
        },
        canActivate: [SubscriptionRouteAccessService]
    },
    {
        path: 'subscription-management/:id',
        component: SubscriptionMgmtDetailComponent,
        data: {
            pageTitle: 'subscriptionManagement.home.title'
        },
        canActivate: [SubscriptionRouteAccessService]
    }
];

export const subscriptionDialogRoute: Routes = [
    {
        path: 'subscription-management-new',
        component: SubscriptionDialogComponent,
        outlet: 'popup',
        canActivate: [SubscriptionRouteAccessService]
    },
    {
        path: 'subscription-management/:id/edit',
        component: SubscriptionDialogComponent,
        outlet: 'popup',
        canActivate: [SubscriptionRouteAccessService]
    },
    {
        path: 'subscription-management/:id/delete',
        component: SubscriptionDeleteDialogComponent,
        outlet: 'popup',
        canActivate: [SubscriptionRouteAccessService]
    }
];
