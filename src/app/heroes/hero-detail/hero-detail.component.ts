import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HeroService, Hero } from '../hero.service';

import { MatSnackBar } from '@angular/material/snack-bar'; 

/**********************************************************************************************************************/
@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  // Declaramos propiedades y variables para el héroe actual, el estado de carga y si el héroe es nuevo o existente. 
  hero: Hero = { id: 0, name: '', universe: '', power: '', superPower: '', }; // aseguramos que hero está inicializado
  isNew = true;
  loading = true; // estado de carga

  /** conmstructor: inicializamos los serivicios, router y snackbar  */
  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }
  
  
  /**********************************************************************************************************************/
  // Implementamos el ciclo de vida OnInit para cargar los detalles del héroe existente si se proporciona un id en la URL. 
  /** ngOnInit:   
      1. Obtiene el parámetro 'id' de la ruta activa.
      2. Si el 'id' existe (es decir, se está editando un héroe existente), establece 'isNew' en falso.
      3. Llama al método 'getHero' del 'heroService' para obtener los detalles del héroe con el 'id' proporcionado.
      4. Si la solicitud es exitosa, actualiza la propiedad 'hero' con los datos del héroe y establece 'loading' en falso para 
         ocultar el cargador.
      5. Si se produce un error durante la solicitud, abre una notificación de Snackbar con un mensaje de error y establece 
         'loading' en falso para ocultar el cargador.
      6. Si el 'id' no existe (es decir, se está creando un nuevo héroe), establece 'loading' en falso para ocultar el cargador, 
         ya que no se necesitan datos para un nuevo héroe.
   */
  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    if (id) {
      this.isNew = false;
      this.heroService.getHero(id).subscribe(hero => {
        this.hero = hero;
        this.loading = false; // Datos cargados, ocultar el loader
      }, error => {
        this.snackBar.open('Error al cargar el héroe', 'Cerrar', { duration: 3000 });
        this.loading = false; // En caso de error, también ocultar el loader
      });
    } else {
      this.loading = false; // Si es nuevo héroe, no se requiere cargar datos
    }
  }

  /**********************************************************************************************************************/
  /** saveHero: para guardar el héroe, ya sea agregándolo o actualizándolo, y muestra mensajes de éxito o error.
      1 Llama al método 'transformHeroFields' para transformar ciertos campos del héroe antes de guardarlo.
      2. Verifica si el héroe es nuevo (verifica la propiedad 'isNew').
      3. Si el héroe es nuevo, llama al método 'addHero' del 'heroService' para agregar el héroe.
      4. Si la solicitud de agregar es exitosa, navega al listado de héroes y abre una notificación de Snackbar con un mensaje 
         de éxito.
      5. Si se produce un error durante la solicitud de agregar, abre una notificación de Snackbar con un mensaje de error.
      6. Si el héroe no es nuevo (es decir, es un héroe existente), llama al método 'updateHero' del 'heroService' para actualizar 
         el héroe.
      7. Si la solicitud de actualización es exitosa, navega al listado de héroes y abre una notificación de Snackbar con un 
         mensaje de éxito.
      8. Si se produce un error durante la solicitud de actualización, abre una notificación de Snackbar con un mensaje de error.
  */
  saveHero(): void {
    this.transformHeroFields();

    if (this.isNew) {
      this.heroService.addHero(this.hero).subscribe(() => {
        this.router.navigate(['/heroes']);
        this.snackBar.open('Héroe agregado exitosamente', 'Cerrar', { duration: 3000 }); // Muestra el mensaje de éxito
      }, error => {
        this.snackBar.open('Error al agregar el héroe', 'Cerrar', { duration: 3000 }); // Muestra el mensaje de error
      });
    } else {
      this.heroService.updateHero(this.hero).subscribe(() => {
        this.router.navigate(['/heroes']);
        this.snackBar.open('Héroe actualizado exitosamente', 'Cerrar', { duration: 3000 }); // Muestra el mensaje de éxito
      }, error => {
        this.snackBar.open('Error al actualizar el héroe', 'Cerrar', { duration: 3000 }); // Muestra el mensaje de error
      });
    }
  }

  /**********************************************************************************************************************/
  /** transformHeroFields: para transformar ciertos campos del héroe antes de guardarlo.
      1 Convierte el nombre del héroe a mayúsculas.
      2. Capitaliza la primera letra del universo del héroe. Si el universo está vacío, devuelve una cadena vacía.
      3. Capitaliza la primera letra de la superpotencia del héroe. Si la superpotencia está vacía, devuelve una cadena vacía.
  */
  private transformHeroFields(): void {
    this.hero.name = this.hero.name.toUpperCase();
    this.hero.universe = this.capitalizeFirstLetter(this.hero.universe || '');
    this.hero.superPower = this.capitalizeFirstLetter(this.hero.superPower || '');
  }

  /**********************************************************************************************************************/
  /** capitalizeFirstLetter: para capitalizar la primera letra de ciertos campos del héroe. 
      1. Devuelve una cadena que capitaliza la primera letra del valor proporcionado.
      2. Usa el método 'charAt(0)' para obtener la primera letra y el método 'toUpperCase()' para convertirla a mayúsculas.
      3. Usa el método 'slice(1)' para obtener el resto de la cadena y el método 'toLowerCase()' para convertirlo a minúsculas.
      4. Concatena la primera letra en mayúsculas con el resto de la cadena en minúsculas para formar la cadena final.
  */
  private capitalizeFirstLetter(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  }
}