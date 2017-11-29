import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Company } from '../../admin/company-management/company.model';
import { CompanyService } from '../../admin/company-management/company.service';
import { ResponseWrapper, Principal} from '../../shared';
import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Machine } from './machine.model';
import { MachinePopupService } from './machine-popup.service';
import { MachineService } from './machine.service';

@Component({
    selector: 'jhi-machine-dialog',
    templateUrl: './machine-dialog.component.html'
})
export class MachineDialogComponent implements OnInit {

    machine: Machine;
    companies: Company[];
    currentAccount: any;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private machineService: MachineService,
        private eventManager: JhiEventManager,
        private companyService: CompanyService,
        private principal: Principal
        ) {
            this.principal.identity().then((account) => {
                this.currentAccount = account;
            });
        }

    ngOnInit() {
        this.companyService.query()
            .subscribe((res: ResponseWrapper) => { this.companies = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.currentAccount.company) {
            this.machine.company = this.currentAccount.company;
        }
        if (this.machine.id !== undefined) {
            this.subscribeToSaveResponse(
                this.machineService.update(this.machine));
        } else {
            this.subscribeToSaveResponse(
                this.machineService.create(this.machine));
        }
    }

    private subscribeToSaveResponse(result: Observable<Machine>) {
        result.subscribe((res: Machine) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Machine) {
        this.eventManager.broadcast({ name: 'machineListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    trackCompanyById(index: number, item: Company) {
        return item.id;
    }
    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-machine-popup',
    template: ''
})
export class MachinePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private machinePopupService: MachinePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.machinePopupService
                    .open(MachineDialogComponent as Component, params['id']);
            } else {
                this.machinePopupService
                    .open(MachineDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
