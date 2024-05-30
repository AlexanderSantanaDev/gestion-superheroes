import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent {

  /** constructor:  del componente toma un parámetro 'dialogRef' de tipo 'MatDialogRef'. Este parámetro se utiliza para cerrar el diálogo cuando se confirma o se cierra.   */
  constructor(public dialogRef: MatDialogRef<ConfirmationDialogComponent>) { }

  /**********************************************************************************************************************/
  /** onConfirm: se ejecuta cuando se hace clic en el botón de confirmación. Este método cierra el diálogo y pasa 'true' como argumento para indicar que se ha confirmado la acción.  */
  onConfirm(): void {
    this.dialogRef.close(true);
  }

  /**********************************************************************************************************************/
  /** onClose: se ejecuta cuando se hace clic en el botón de cierre. Este método cierra el diálogo y pasa 'false' como argumento para indicar que se ha cerrado el diálogo sin confirmar la acción.  */
  onClose(): void {
    this.dialogRef.close(false);
  }
}