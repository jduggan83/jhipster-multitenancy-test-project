import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Zoo } from './zoo.model';
import { ZooModalService } from './zoo-modal.service';
import { ZooService } from './zoo.service';

@Component({
    selector: 'jhi-zoo-mgmt-delete-dialog',
    templateUrl: './zoo-management-delete-dialog.component.html'
})
export class ZooMgmtDeleteDialogComponent {

    zoo: Zoo;

    constructor(
        private zooService: ZooService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.zooService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({ name: 'zooListModification',
                content: 'Deleted a zoo'});
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-zoo-delete-dialog',
    template: ''
})
export class ZooDeleteDialogComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private zooModalService: ZooModalService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.zooModalService.open(ZooMgmtDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
