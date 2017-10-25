/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { JhipsterTestModule } from '../../test.module';
import { MockActivatedRoute } from '../../helpers/mock-route.service';
import { ZooMgmtDetailComponent } from '../../../../../main/webapp/app/admin/zoo-management/zoo-management-detail.component';
import { ZooService } from '../../../../../main/webapp/app/admin/zoo-management/zoo.service';
import { Zoo } from '../../../../../main/webapp/app/admin/zoo-management/zoo.model';

describe('Component Tests', () => {

    describe('Zoo Management Detail Component', () => {
        let comp: ZooMgmtDetailComponent;
        let fixture: ComponentFixture<ZooMgmtDetailComponent>;
        let service: ZooService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterTestModule],
                declarations: [ZooMgmtDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    ZooService,
                    JhiEventManager
                ]
            }).overrideTemplate(ZooMgmtDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ZooMgmtDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ZooService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Zoo(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.zoo).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
