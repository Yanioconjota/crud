import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HeroeModel } from '../models/heroe.model';
import { map } from "rxjs/operators";

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
    return this.http.put(`${this.url}/heroes/${ heroe.id }.json`, heroeTemp)
  }
}
