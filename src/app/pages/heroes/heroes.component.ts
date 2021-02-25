import { Component, OnInit } from '@angular/core';
import { HeroeModel } from 'src/app/models/heroe.model';
import { HeroesService } from 'src/app/services/heroes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styles: [
  ]
})
export class HeroesComponent implements OnInit {

  heroes: HeroeModel[] = [];

  cargando = false;

  constructor(private heroesService: HeroesService) { }

  ngOnInit(): void {
    this.cargando = true;
    this.heroesService.getHeroes()
      .subscribe( resp => {
        console.log(resp);
        this.heroes = resp;
        this.cargando = false;
      });
  }

  borrarHeroe( heroe: HeroeModel, i: number ) {

    Swal.fire({
      text: `¿Estás seguro que quieres borrar a ${heroe.nombre}?`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then( resp => {
      //Sweetalert devuelve una promesa
      //Si hay respuesta y le damos OK entonces borra
      if (resp.value) {
        this.heroesService.borrarHeroe(heroe.id).subscribe();
        this.heroes.splice(i, 1);  
      }
    })
  }

}
