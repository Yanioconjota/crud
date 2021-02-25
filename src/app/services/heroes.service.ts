import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, map } from "rxjs/operators";
import { HeroeModel } from '../models/heroe.model';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private url = 'https://login-app-16026-default-rtdb.firebaseio.com';
  
  constructor(private http: HttpClient) { }

  crearHeroe( heroe: HeroeModel ){
    //la URL debe terminar en .json para que pueda utilizar la REST API de firebase
    //no es obligatorio para usar en backend, es solo para firebase
    return this.http.post(`${this.url}/heroes.json`, heroe)
      .pipe(
        map((resp: any) =>  {
          //El método map lo usamos para moldear la respuesta
          heroe.id = resp.name;
          //el "id" lo igualamos al "name" que viene de la respuesta de firebase y que corresponde con el id del modelo heroe
          return heroe;
        })
      );
  }

  actualizarHeroe( heroe: HeroeModel ){

    const heroeTemp = {
      ...heroe
    };

    delete heroeTemp.id;

    //la URL debe terminar en .json para que pueda utilizar la REST API de firebase
    //no es obligatorio para usar en backend, es solo para firebase
    return this.http.put(`${this.url}/heroes/${ heroe.id }.json`, heroeTemp);
  }

  borrarHeroe(id: string) {
    return this.http.delete(`${this.url}/heroes/${id}.json`);
  }

  getHeroe(id: string) {
    return this.http.get(`${this.url}/heroes/${id}.json`);
  }

  getHeroes() {
    return this.http.get(`${this.url}/heroes.json`)
      .pipe(
        map( (resp: any) => {
          return this.crearArreglo(resp);
        }),
        delay(0)
      )
  }

  private crearArreglo( heroesObj: object){

    const heroes:HeroeModel[] = [];

    //console.log(heroesObj);

    //por si no hay nada en la base de datos
    if ( heroesObj === null ) { return []; }

    Object.keys( heroesObj ).forEach( key => {
      const heroe: HeroeModel = heroesObj[key];
      //key es el la propiedad que usamos en la base para guardar a cada heroe
      heroe.id = key;

      heroes.push(heroe);
    })

    return heroes;
  }
}
