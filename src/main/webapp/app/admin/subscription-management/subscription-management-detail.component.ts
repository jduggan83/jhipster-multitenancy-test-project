import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import { Subscription } from './subscription.model';
import { SubscriptionService } from './subscription.service';

@Component({
    selector: 'jhi-subscription-mgmt-detail',
    templateUrl: './subscription-management-detail.component.html'
})
export class SubscriptionMgmtDetailComponent implements OnInit, OnDestroy {

    subscription: Subscription;
    private subscription: Subscription;

    constructor(
        private subscriptionService: SubscriptionService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
    }

    load(id) {
        this.subscriptionService.find(id).subscribe((subscription) => {
            this.subscription = subscription;
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
