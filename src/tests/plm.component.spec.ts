import { TestBed, async } from '@angular/core/testing';
import { PlmComponent } from '../pages/plm.component';

describe('PlmComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PlmComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(PlmComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'prepper-learning-marketplace-fe'`, () => {
    const fixture = TestBed.createComponent(PlmComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('prepper-learning-marketplace-fe');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(PlmComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to prepper-learning-marketplace-fe!');
  });
});
