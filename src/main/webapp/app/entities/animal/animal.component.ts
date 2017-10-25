import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { Animal } from './animal.model';
import { AnimalService } from './animal.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-animal',
    templateUrl: './animal.component.html'
})
export class AnimalComponent implements OnInit, OnDestroy {
animals: Animal[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private animalService: AnimalService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.animalService.query().subscribe(
            (res: ResponseWrapper) => {
                this.animals = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInAnimals();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Animal) {
        return item.id;
    }
    registerChangeInAnimals() {
        this.eventSubscriber = this.eventManager.subscribe('animalListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
