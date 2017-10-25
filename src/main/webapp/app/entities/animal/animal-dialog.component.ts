import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Zoo } from '../../admin/zoo-management/zoo.model';
import { ZooService } from '../../admin/zoo-management/zoo.service';
import { ResponseWrapper, Principal} from '../../shared';
import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Animal } from './animal.model';
import { AnimalPopupService } from './animal-popup.service';
import { AnimalService } from './animal.service';

@Component({
    selector: 'jhi-animal-dialog',
    templateUrl: './animal-dialog.component.html'
})
export class AnimalDialogComponent implements OnInit {

    animal: Animal;
    zoos: Zoo[];
    currentAccount: any;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private animalService: AnimalService,
        private eventManager: JhiEventManager,
        private zooService: ZooService,
        private principal: Principal
        ) {
            this.principal.identity().then((account) => {
                this.currentAccount = account;
            });
        }

    ngOnInit() {
        this.zooService.query()
            .subscribe((res: ResponseWrapper) => { this.zoos = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.currentAccount.zoo) {
            this.animal.zoo = this.currentAccount.zoo;
        }
        if (this.animal.id !== undefined) {
            this.subscribeToSaveResponse(
                this.animalService.update(this.animal));
        } else {
            this.subscribeToSaveResponse(
                this.animalService.create(this.animal));
        }
    }

    private subscribeToSaveResponse(result: Observable<Animal>) {
        result.subscribe((res: Animal) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Animal) {
        this.eventManager.broadcast({ name: 'animalListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    trackZooById(index: number, item: Zoo) {
        return item.id;
    }
    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-animal-popup',
    template: ''
})
export class AnimalPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private animalPopupService: AnimalPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.animalPopupService
                    .open(AnimalDialogComponent as Component, params['id']);
            } else {
                this.animalPopupService
                    .open(AnimalDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
