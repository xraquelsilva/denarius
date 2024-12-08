import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopNabvbarComponent } from './top-nabvbar.component';

describe('TopNabvbarComponent', () => {
  let component: TopNabvbarComponent;
  let fixture: ComponentFixture<TopNabvbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopNabvbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopNabvbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
