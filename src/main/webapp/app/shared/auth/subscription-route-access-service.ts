import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { Principal } from '../';
import { StateStorageService } from './state-storage.service';

@Injectable()
export class SubscriptionRouteAccessService implements CanActivate {

    constructor(private router: Router,
                private principal: Principal,
                private stateStorageService: StateStorageService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Promise<boolean> {
        const principal = this.principal;
        return Promise.resolve(principal.identity().then((account) => {
            if (account.subscription === null) {
                return true;
            }
            this.stateStorageService.storeUrl(state.url);
            this.router.navigate(['accessdenied']);
        }));
    }
}
