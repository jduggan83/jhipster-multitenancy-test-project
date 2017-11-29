import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { Machine } from './machine.model';
import { MachineService } from './machine.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-machine',
    templateUrl: './machine.component.html'
})
export class MachineComponent implements OnInit, OnDestroy {
machines: Machine[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private machineService: MachineService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.machineService.query().subscribe(
            (res: ResponseWrapper) => {
                this.machines = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInMachines();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Machine) {
        return item.id;
    }
    registerChangeInMachines() {
        this.eventSubscriber = this.eventManager.subscribe('machineListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
