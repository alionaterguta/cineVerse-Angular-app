import { Component } from '@angular/core';
import { DeleteUserService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
/**
 * Represents the Delete User Component.
 * This component is responsible for handling the deletion of user accounts.
 * @constructor
 * @param {DeleteUserService} delUser - Service for deleting user data.
 * @param {MatSnackBar} snackBar - Angular Material's MatSnackBar service for displaying notifications.
 * @param {Router} router - Angular's Router service for navigation.
 * @param {MatDialog} dialog - Angular Material's MatDialog service for opening dialogs.
 */
@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrl: './delete-user.component.scss',
})
/**
 * Creates an instance of DeleteUserComponent.
 * @param {DeleteUserService} delUser - Service for deleting user data.
 * @param {MatSnackBar} snackBar - Angular Material's MatSnackBar service for displaying notifications.
 * @param {Router} router - Angular's Router service for navigation.
 * @param {MatDialog} dialog - Angular Material's MatDialog service for opening dialogs.
 */
export class DeleteUserComponent {
  constructor(
    private delUser: DeleteUserService,
    public snackBar: MatSnackBar,
    private router: Router,
    public dialog: MatDialog
  ) {}
  /**
   * Opens a confirmation dialog for deleting the user account.
   */
  openConfirmationDialog(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: 'Are you sure you want to delete your account?',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteUserData(result); // If the user confirms, proceed with deletion
      }
    });
  }
  /**
   * Deletes the user data.
   * @param {string} id - The ID of the user to be deleted.
   */
  deleteUserData(id: string): void {
    this.delUser.deleteUser(id).subscribe((resp: any) => {
      this.delUser = resp;

      console.log(resp);
      this.router.navigate(['/welcome']);
    });
    this.snackBar.open('Account deleted', 'Success', {
      duration: 2000,
    });
  }
}