import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomNabvbarComponent } from './bottom-nabvbar.component';

describe('BottomNabvbarComponent', () => {
  let component: BottomNabvbarComponent;
  let fixture: ComponentFixture<BottomNabvbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BottomNabvbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BottomNabvbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
