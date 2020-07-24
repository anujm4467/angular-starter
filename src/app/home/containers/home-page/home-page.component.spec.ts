import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';

import { HomePageComponent } from './home-page.component';

xdescribe('HomePageComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatToolbarModule,
        MatMenuModule,
        MatButtonModule
      ],
      declarations: [HomePageComponent]
    })
      .compileComponents();
  }));

  function setup() {
    const fixture: ComponentFixture<HomePageComponent> = TestBed.createComponent(HomePageComponent);
    const component: HomePageComponent = fixture.componentInstance;
    fixture.detectChanges();

    return { fixture, component };
  }

  it('should create the home component', () => {
    const { component } = setup();
    expect(component).toBeTruthy();
  });
});
