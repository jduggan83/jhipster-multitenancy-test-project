/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { JhipsterTestModule } from '../../test.module';
import { MockActivatedRoute } from '../../helpers/mock-route.service';
import { TesterMgmtDetailComponent } from '../../../../../main/webapp/app/admin/tester-management/tester-management-detail.component';
import { TesterService } from '../../../../../main/webapp/app/admin/tester-management/tester.service';
import { Tester } from '../../../../../main/webapp/app/admin/tester-management/tester.model';

describe('Component Tests', () => {

    describe('Tester Management Detail Component', () => {
        let comp: TesterMgmtDetailComponent;
        let fixture: ComponentFixture<TesterMgmtDetailComponent>;
        let service: TesterService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterTestModule],
                declarations: [TesterMgmtDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    TesterService,
                    JhiEventManager
                ]
            }).overrideTemplate(TesterMgmtDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TesterMgmtDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TesterService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Tester(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.tester).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
