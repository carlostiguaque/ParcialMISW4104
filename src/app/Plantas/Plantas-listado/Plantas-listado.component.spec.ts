/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { PlantasListadoComponent } from './Plantas-listado.component';
import { PlantaService } from '../planta.service';
import { Planta } from '../planta';
import { faker } from '@faker-js/faker';

describe('PlantasListadoComponent', () => {
  let component: PlantasListadoComponent;
  let fixture: ComponentFixture<PlantasListadoComponent>;
  let debug: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [PlantasListadoComponent],
      providers: [PlantaService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantasListadoComponent);
    component = fixture.componentInstance;

    function getRandomTipo(): string {
      const randomIndex = faker.number.int(1); // Genera 0 o 1 aleatoriamente
      if (randomIndex === 0) {
        return "Interior";
      } else {
        return "Exterior";
      }
    }

    for (let i = 0; i < 3; i++) {
      const plantas = new Planta(
        i,
        faker.person.fullName(),
        faker.person.fullName(),
        getRandomTipo(),
        faker.number.int(),
        faker.lorem.words({ min: 2, max: 4 }),
        faker.lorem.words({ min: 2, max: 8 })
      );
      component.plantas.push(plantas);
    }

    fixture.detectChanges();
    debug = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 2 <p> elements', () => {
    expect(debug.queryAll(By.css('p'))).toHaveSize(2)
  });

  it('should have 12 <td> elements', () => {
    expect(debug.queryAll(By.css('td'))).toHaveSize(12)
  });

  it('should have 4 <th> elements', () => {
    expect(debug.queryAll(By.css('th'))).toHaveSize(4)
  });

  it('should have 1 <div.footer> elements', () => {
    expect(debug.queryAll(By.css('div.footer'))).toHaveSize(1)
  });

  it('should have 1 <img> elements', () => {
    expect(debug.queryAll(By.css('img'))).toHaveSize(1)
  });

  it('should have the corresponding id to the plantas.id', () => {
    const rows = fixture.nativeElement.querySelectorAll('.filas tr');
    expect(rows.length).toBe(3);
    for (let i = 0; i < 3; i++) {
      expect(rows[i].querySelector('td.th-id').textContent).toContain(component.plantas[i].id);
    }
  });

  it('should have the corresponding nombrecomun to the plantas.nombrecomun', () => {
    const rows = fixture.nativeElement.querySelectorAll('.filas tr');
    expect(rows.length).toBe(3);
    for (let i = 0; i < 3; i++) {
      expect(rows[i].querySelector('td.th-nombre').textContent).toContain(component.plantas[i].nombre_comun);
    }
  });

  it('should have the corresponding tipo to the plantas.tipo', () => {
    const rows = fixture.nativeElement.querySelectorAll('.filas tr');
    expect(rows.length).toBe(3);
    for (let i = 0; i < 3; i++) {
      expect(rows[i].querySelector('td.th-tipo').textContent).toContain(component.plantas[i].tipo);
    }
  });

  it('should have the corresponding clima to the plantas.clima', () => {
    const rows = fixture.nativeElement.querySelectorAll('.filas tr');
    expect(rows.length).toBe(3);
    for (let i = 0; i < 3; i++) {
      expect(rows[i].querySelector('td.th-clima').textContent).toContain(component.plantas[i].clima);
    }
  });

  it('should have the corresponding clima to the plantas.clima', () => {
    const rows = fixture.nativeElement.querySelectorAll('.filas tr');
    expect(rows.length).toBe(3);
    for (let i = 0; i < 3; i++) {
      expect(rows[i].querySelector('td.th-clima').textContent).toContain(component.plantas[i].clima);
    }
  });

  it('should have the corresponding total interior to sum plantas.tipo', () => {
    const rows = fixture.nativeElement.querySelectorAll('.totales');
    expect(rows.length).toBe(1);
    var suma = "Total plantas de interior: " + component.sumarPorTipo("Interior")
    expect(rows[0].querySelector('p.int').textContent).toContain(suma);

  });

  it('should have the corresponding total exterior to sum plantas.tipo', () => {
    const rows = fixture.nativeElement.querySelectorAll('.totales');
    expect(rows.length).toBe(1);
    var suma = "Total plantas de exterior: " + component.sumarPorTipo("Exterior")
    expect(rows[0].querySelector('p.ext').textContent).toContain(suma);

  });

  it('should have the corresponding title to Vivero El Otoño', () => {
    const rows = fixture.nativeElement.querySelectorAll('.contenedor1');
    expect(rows.length).toBe(1);
    expect(rows[0].querySelector('div.title').textContent).toContain(" Vivero El Otoño");

  });
  it('should have 2 <td> elements and the deleted planta should not exist', () => {
    const planta = component.plantas.pop()!;
    fixture.detectChanges();
    expect(debug.queryAll(By.css('td'))).toHaveSize(8)

    debug.queryAll(By.css('td')).forEach((selector, i) => {
      expect(selector.nativeElement.textContent).not.toContain(planta.id);
    });
  });
});
