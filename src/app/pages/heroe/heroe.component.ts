import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HeroeModel } from 'src/app/models/heroe.model';
import { HeroesService } from 'src/app/services/heroes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [
  ]
})
export class HeroeComponent implements OnInit {

  heroe: HeroeModel = new HeroeModel();
  heroes: HeroeModel[] = [];
  mensaje: string;

  constructor(private heroesService: HeroesService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.getHeroe();
    this.getHeroes();
  }

  getHeroes() {
    this.heroesService.getHeroes()
      .subscribe(resp => {
        //console.log(resp);
        this.heroes = resp;
      });
  }

  getHeroe() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== 'nuevo') {
      this.heroesService.getHeroe(id)
        .subscribe((resp: HeroeModel) => {
          if (resp === null) {
            Swal.fire({
              title: 'Espere',
              text: 'la ruta no existe',
              icon: 'info',
            });
            this.router.navigate(['/heroes']);
          }
          this.heroe = resp;
          this.heroe.id = id;
        });
    }
  }

  guardar(form: NgForm){
    if (form.invalid) {
      Swal.fire({
        title: 'Espere',
        text: 'El formulario es inválido',
        icon: 'info',
      });
      return;
    }
    //En el ejemplo Swal.fire usan type en lugar de icon
    Swal.fire({
      title: 'Espere',
      text: 'Guardando información',
      icon: 'info',
      allowOutsideClick: false
    });

    Swal.showLoading();
    
    let peticion = new Observable<any>();
    
    if ( this.heroe.id ) {
      peticion = this.heroesService.actualizarHeroe(this.heroe);
      this.mensaje = 'El Héroe se actualizó correctamente';
    } else {
      let heroeDup = this.heroes.find(h => h.nombre === this.heroe.nombre);
      if (heroeDup) {
        Swal.fire({
          title: 'Espere',
          text: `${heroeDup.nombre} ya existe`,
          icon: 'info',
        });
      } else {
        peticion = this.heroesService.crearHeroe(this.heroe);
        this.mensaje = 'El Héroe se creó correctamente';
      }
      console.log('Heroe dup: ', heroeDup);
      
    }

    peticion.subscribe( resp => {
      Swal.fire({
        title: this.heroe.nombre,
        text: this.mensaje,
        icon: 'success'
      });
    })
  }

}
