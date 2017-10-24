import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Subscription } from './subscription.model';
import { SubscriptionModalService } from './subscription-modal.service';
import { SubscriptionService } from './subscription.service';

@Component({
    selector: 'jhi-subscription-mgmt-delete-dialog',
    templateUrl: './subscription-management-delete-dialog.component.html'
})
export class SubscriptionMgmtDeleteDialogComponent {

    subscription: Subscription;

    constructor(
        private subscriptionService: SubscriptionService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.subscriptionService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({ name: 'subscriptionListModification',
                content: 'Deleted a subscription'});
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-subscription-delete-dialog',
    template: ''
})
export class SubscriptionDeleteDialogComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private subscriptionModalService: SubscriptionModalService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.subscriptionModalService.open(SubscriptionMgmtDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
