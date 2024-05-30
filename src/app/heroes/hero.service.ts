// Se importan las clases necesarias de Angular y RxJS. 
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
/**********************************************************************************************************************/

// Se define una interfaz Hero con propiedades id, name, universe, power, superPower, imgUrl. 
export interface Hero {
  id: number;
  name: string;
  universe?: string;
  power?: string;
  superPower?: string;
  imgUrl?: string;
}

// Se crea el servicio HeroService con el decorador @Injectable y se provee a nivel global. 
@Injectable({
  providedIn: 'root'
})
export class HeroService {
  // Se define la URL de donde se obtendrán los datos de los héroes y se inicializa un arreglo vacío para almacenar los héroes. 
  private heroesUrl = 'assets/data/heroes.json';
  private heroes: Hero[] = [];

  /**********************************************************************************************************************/
  /** constructor: se llama al método loadHeroes para cargar los héroes al inicializar el servicio.*/
  constructor(private http: HttpClient) {
    this.loadHeroes();
  }

  /**********************************************************************************************************************/
  /** loadHeroes: realiza una solicitud HTTP para obtener los héroes y los almacena en el arreglo heroes. 
      1. Se utiliza el método get del servicio HttpClient para obtener los datos de los héroes en formato JSON. 
      2. Se suscribe al observable devuelto por la solicitud y se asigna la respuesta de los héroes al arreglo local heroes. 
      3. Una vez que se completa la solicitud, los datos de los héroes se almacenan en la variable heroes del servicio HeroService.
  */
  private loadHeroes(): void {
    this.http.get<Hero[]>(this.heroesUrl).subscribe(data => {
      this.heroes = data;
    });
  }

  /**********************************************************************************************************************/
  /** getHeroes: Se define el método getHeroes que devuelve un Observable de héroes, primero verifica si ya se han cargado los héroes en memoria.
      1. Verifica si el arreglo local de héroes (this.heroes) tiene elementos. 
      2. Si el arreglo de héroes tiene elementos, devuelve un Observable que emite los héroes actuales con un retraso de 1000 milisegundos. 
      3. Si el arreglo de héroes está vacío, realiza una solicitud HTTP para obtener los héroes del servidor. 
      4. Devuelve un Observable que emite los héroes obtenidos del servidor con un retraso de 1000 milisegundos.
  */
  getHeroes(): Observable<Hero[]> {
    if (this.heroes.length) {
      return of(this.heroes).pipe(delay(1000));
    } else {
      return this.http.get<Hero[]>(this.heroesUrl).pipe(delay(1000));
    }
  }

  /**********************************************************************************************************************/
  /** getHero: recibe un id y devuelve un Observable con el héroe correspondiente, primero verifica si los héroes están cargados en memoria.
      1. Verifica si el arreglo local de héroes (this.heroes) tiene elementos. 
      2. Si el arreglo de héroes tiene elementos, busca el héroe con el id proporcionado y lo emite a través del Observable con un retraso de 1000 milisegundos. 
      3. Si el arreglo de héroes está vacío, realiza una solicitud HTTP para obtener los héroes del servidor. 
      4. Utiliza el operador map para buscar y emitir el héroe con el id proporcionado del arreglo de héroes obtenidos del servidor.
  */
  getHero(id: number): Observable<Hero> {
    if (this.heroes.length) {
      const hero = this.heroes.find(h => h.id === id)!;
      return of(hero).pipe(delay(1000));
    } else {
      return this.http.get<Hero[]>(this.heroesUrl).pipe(
        map(heroes => heroes.find(h => h.id === id)!)
      );
    }
  }

  /**********************************************************************************************************************/
  /** updateHero: actualiza un héroe existente en el arreglo de héroes y devuelve un Observable con el héroe actualizado.
      1. Utiliza el método findIndex para encontrar el índice del héroe en el arreglo local de héroes (this.heroes) que coincida con el id del héroe recibido. 
      2. Actualiza el héroe en el arreglo local de héroes con el héroe recibido como parámetro. 
      3. Devuelve un Observable que emite el héroe actualizado con un retraso de 1000 milisegundos.
  */
  updateHero(hero: Hero): Observable<Hero> {
    const index = this.heroes.findIndex(h => h.id === hero.id);
    this.heroes[index] = hero;
    return of(hero).pipe(delay(1000));
  }

  /**********************************************************************************************************************/
  /** addHero: agrega un nuevo héroe al arreglo de héroes y devuelve un Observable con el héroe agregado.
      1. Asigna un id al héroe incrementando en 1 la longitud del arreglo de héroes. 
      2. Luego, añade el héroe al arreglo local de héroes utilizando el método push. 
      3. Finalmente, retorna un Observable que emite el héroe añadido con un retraso de 1000 milisegundos.
  */
  addHero(hero: Hero): Observable<Hero> {
    hero.id = this.heroes.length + 1;
    this.heroes.push(hero);
    return of(hero).pipe(delay(1000));
  }

  /**********************************************************************************************************************/
  /** deleteHero: elimina un héroe del arreglo de héroes y devuelve un Observable con un valor nulo.
      1. Filtra el arreglo local de héroes (this.heroes) para eliminar el héroe cuyo id coincida con el id proporcionado. 
      2. Retorna un Observable que emite un valor nulo con un retraso de 1000 milisegundos.
  */
  deleteHero(id: number): Observable<any> {
    this.heroes = this.heroes.filter(h => h.id !== id);
    return of(null).pipe(delay(1000));
  }
}