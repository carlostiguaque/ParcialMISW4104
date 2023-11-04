import { Component, OnInit } from '@angular/core';
import { Planta } from '../planta';
import { PlantaService } from '../planta.service';
@Component({
  selector: 'app-Plantas-listado',
  templateUrl: './Plantas-listado.component.html',
  styleUrls: ['./Plantas-listado.component.css']
})
export class PlantasListadoComponent implements OnInit {
  plantas: Array<Planta> = [];
  constructor(private plantaService: PlantaService) { }

  getBooks(): void {
    this.plantaService.getBooks().subscribe((plantas) => {
      this.plantas = plantas;
    });
  }

  sumarPorTipo(tipo: string): number {
    return this.plantas.reduce((total, planta) => {
      if (planta.tipo === tipo) {
        return total + 1;
      }
      return total;
    }, 0);
  }

  ngOnInit(): void {
    this.getBooks();
  }
}
