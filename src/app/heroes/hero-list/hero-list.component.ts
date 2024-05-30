import { Component, OnInit } from '@angular/core';
import { HeroService, Hero } from '../hero.service';
import { PageEvent } from '@angular/material/paginator';
import { ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
/**********************************************************************************************************************/

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.css']
})
export class HeroListComponent implements OnInit {
  // Declaramos e inicializamos propiedades y variables necesarias para el componente. 
  heroes: Hero[] = [];
  pagedHeroes: Hero[] = [];
  filteredHeroes: Hero[] = [];
  loading = false;
  filterValue: string = '';
  isLargeScreen: boolean = true;
  totalHeroesCount: number = 0; // Añade esta línea

  // Inicializamos propiedades necesarias
  constructor(
    private heroService: HeroService,
    private changeDetector: ChangeDetectorRef,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  /**********************************************************************************************************************/
  // Implementamos el ciclo de vida OnInit para cargar los héroes al iniciar el componente. 
  ngOnInit(): void {
    this.loading = true;
    this.heroService.getHeroes().subscribe(heroes => {
      //console.log(heroes); // Depuración para verificar los datos recibidos

      // Ordena los datos en orden descendente por id
      const sortedHeroes = heroes.sort((a, b) => b.id - a.id);

      // Asigna los datos ordenados a las propiedades del componente
      this.heroes = sortedHeroes;
      this.filteredHeroes = [...sortedHeroes]; // Copia los datos ordenados para filtrar
      this.totalHeroesCount = sortedHeroes.length;

      // Inicializa la paginación con los datos ordenados
      this.updatePagedHeroes({ pageIndex: 0, pageSize: 6, length: this.totalHeroesCount });

      this.changeDetector.markForCheck(); // Notifica a Angular que los datos han cambiado
      this.loading = false;
    });
  }

  /**********************************************************************************************************************/
  /** filterHeroes:  Filtra los héroes según el valor de búsqueda ingresado por el usuario.
      1. Define una función interna llamada capitalize que capitaliza la primera letra y convierte el resto del valor a minúsculas. 
      2. Filtra los héroes del arreglo original (this.heroes) basándose en si el nombre del héroe contiene el valor de búsqueda capitalizado. 
      3. Actualiza el contador total de héroes después de aplicar el filtro. 
      4. Reinicia la paginación con los héroes filtrados y notifica a Angular que los datos han cambiado.
  */
  filterHeroes(): void {
    const capitalize = (value: string): string => {
      return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    };

    this.filteredHeroes = this.heroes.filter(hero =>
      capitalize(hero.name).includes(capitalize(this.filterValue))
    );

    this.totalHeroesCount = this.filteredHeroes.length; // Actualizar totalHeroesCount después de filtrar
    this.updatePagedHeroes({ pageIndex: 0, pageSize: 6, length: this.totalHeroesCount }); // Reiniciar la paginación después de filtrar
    this.changeDetector.markForCheck(); // Notificar a Angular que los datos han cambiado
  }

  /**********************************************************************************************************************/
  /** onPageChange: paginación de los héroes para mostrar solo un número específico por página.*/
  onPageChange(event: PageEvent): void {
    this.updatePagedHeroes(event);
  }

  /**********************************************************************************************************************/
  /** updatePagedHeroes: Permite al usuario editar un héroe
      1. Calcula la cantidad de elementos por página y el índice de inicio en base al evento recibido. 
      2. Actualiza el arreglo de héroes paginados (pagedHeroes) con los elementos correspondientes a la página actual. 
      3. Notifica a Angular que los datos han cambiado utilizando el método markForCheck del ChangeDetector.
  */
  updatePagedHeroes(event: PageEvent): void {
    const itemsPerPage = event.pageSize;
    const startIndex = event.pageIndex * itemsPerPage;
    this.pagedHeroes = this.filteredHeroes.slice(startIndex, startIndex + itemsPerPage);
    this.changeDetector.markForCheck(); // Notificar a Angular que los datos han cambiado
  }

  /**********************************************************************************************************************/
  /** deleteHero: Permite al usuario eliminar un héroe a través de un cuadro de diálogo de confirmación.
      1. Abre un cuadro de diálogo de confirmación utilizando MatDialog (ConfirmationDialogComponent) para que el usuario confirme la eliminación. 
      2. Suscribe a la respuesta del cuadro de diálogo y ejecuta la lógica si el resultado es verdadero. 
      3. Llama al servicio heroService para eliminar el héroe con el id proporcionado. 
      4. Actualiza el arreglo de héroes eliminando el héroe correspondiente y vuelve a aplicar el filtro. 
      5. Muestra un mensaje de éxito con MatSnackBar si la eliminación es exitosa. 
      6. Muestra un mensaje de error con MatSnackBar si ocurre un error durante la eliminación.
  */
  deleteHero(id: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.heroService.deleteHero(id).subscribe(() => {
          this.heroes = this.heroes.filter(hero => hero.id !== id);
          this.filterHeroes();
          this.snackBar.open('Héroe eliminado exitosamente', 'Cerrar', { duration: 3000 }); // Muestra el mensaje de éxito
        }, error => {
          this.snackBar.open('Error al eliminar el héroe', 'Cerrar', { duration: 3000 }); // Muestra el mensaje de error
        });
      }
    });
  }
}
