import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlantasListadoComponent } from './Plantas-listado/Plantas-listado.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [PlantasListadoComponent],
  declarations: [PlantasListadoComponent]
})
export class PlantasModule { }
