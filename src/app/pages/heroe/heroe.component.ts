import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HeroeModel } from 'src/app/models/heroe.model';
import { HeroesService } from 'src/app/services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [
  ]
})
export class HeroeComponent implements OnInit {

  heroe: HeroeModel = new HeroeModel();

  constructor(private heroesService: HeroesService) { }

  ngOnInit(): void {
  }

  guardar(form: NgForm){
    if (form.invalid) {
      console.log('Formulario no válido');
      return;
    }
    console.log(form);

    this.heroesService.crearheroe(this.heroe)
      .subscribe( resp => {
        console.log(resp);
        //this.heroe = resp; --> esto está demás porque ya angular lo recibe en el formulario y lo convierte en una nueva instancia de HeroeModel
      })
  }

}
