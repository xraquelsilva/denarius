import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeModulesComponent } from './home-modules.component';

describe('HomeModulesComponent', () => {
  let component: HomeModulesComponent;
  let fixture: ComponentFixture<HomeModulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeModulesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeModulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
