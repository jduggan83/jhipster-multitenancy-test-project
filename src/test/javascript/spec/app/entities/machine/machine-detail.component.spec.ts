/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { JhipsterTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { MachineDetailComponent } from '../../../../../../main/webapp/app/entities/machine/machine-detail.component';
import { MachineService } from '../../../../../../main/webapp/app/entities/machine/machine.service';
import { Machine } from '../../../../../../main/webapp/app/entities/machine/machine.model';

describe('Component Tests', () => {

    describe('Machine Management Detail Component', () => {
        let comp: MachineDetailComponent;
        let fixture: ComponentFixture<MachineDetailComponent>;
        let service: MachineService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterTestModule],
                declarations: [MachineDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    MachineService,
                    JhiEventManager
                ]
            }).overrideTemplate(MachineDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MachineDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MachineService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Machine(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.machine).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
