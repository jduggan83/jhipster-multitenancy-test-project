import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import { Zoo } from './zoo.model';
import { ZooService } from './zoo.service';

@Component({
    selector: 'jhi-zoo-mgmt-detail',
    templateUrl: './zoo-management-detail.component.html'
})
export class ZooMgmtDetailComponent implements OnInit, OnDestroy {

    zoo: Zoo;
    private subscription: Subscription;

    constructor(
        private zooService: ZooService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
    }

    load(id) {
        this.zooService.find(id).subscribe((zoo) => {
            this.zoo = zoo;
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
