import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Subscription } from './subscription.model';
import { SubscriptionModalService } from './subscription-modal.service';
import { SubscriptionService } from './subscription.service';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-subscription-mgmt-dialog',
    templateUrl: './subscription-management-dialog.component.html'
})
export class SubscriptionMgmtDialogComponent implements OnInit {

    subscription: Subscription;
    isSaving: boolean;
    isEditing: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private subscriptionService: SubscriptionService,
        private eventManager: JhiEventManager
    ) {}

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.subscription.id !== undefined) {
            this.subscribeToSaveResponse(
                this.subscriptionService.update(this.subscription));
        } else {
            this.subscribeToSaveResponse(this.subscriptionService.create(this.subscription));
        }
    }

    private subscribeToSaveResponse(result: Observable<Subscription>) {
        result.subscribe((res: Subscription) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Subscription) {
        this.eventManager.broadcast({ name: 'subscriptionListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError(error) {
        try {
            error.json();
        } catch (exception) {
            error.message = error.text();
        }
        this.isSaving = false;
        this.onError(error);
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-subscription-dialog',
    template: ''
})
export class SubscriptionDialogComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private subscriptionModalService: SubscriptionModalService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.subscriptionModalService
                    .open(SubscriptionMgmtDialogComponent as Component, params['id']);
            } else {
                this.subscriptionModalService
                    .open(SubscriptionMgmtDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
