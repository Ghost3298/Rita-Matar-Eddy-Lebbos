import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BloodType, Role, User } from '../../shared/models/user.model';
import { UserDataOperations } from '../../shared/databases/user-data.operations';

@Component({
  selector: 'app-admin-panel',
  standalone: false,
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css'
})
export class AdminPanelComponent implements OnInit{

  public users: User[] = [];
  public isModalOpen = false;

  userForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    role: new FormControl<Role | null>(null, [Validators.required]),
    firstname: new FormControl('', [Validators.required]),
    fathersname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    yob: new FormControl('', [Validators.required]),
    bloodType: new FormControl<BloodType | null>(null , [Validators.required]),
    field: new FormControl<string>(''),
  })

  constructor(
    private userDataOperation: UserDataOperations
  ) {}

  ngOnInit(): void {
    this.loadUsers();
    document.addEventListener('keydown', (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if(this.isModalOpen)
          {this.openAddModal()};
      }
    });
  }

  loadUsers(): void {
    this.users = this.userDataOperation.getAllUsers();
  }

  openAddModal(): void {
    this.isModalOpen = !this.isModalOpen;
    if (!this.isModalOpen) {
      this.userForm.reset();
    }
  }

  onSubmit() {
    if (this.userForm.valid) {
      const formValue = this.userForm.value;
      
      const newUser : User = {
        id: 0,
        username: this.userForm.value.username!,
        password: this.userForm.value.password!,
        firstName: this.userForm.value.firstname!,
        fatherSName: this.userForm.value.fathersname!,
        lastName: this.userForm.value.lastname!,
        role: this.userForm.value.role!,
        dob: this.userForm.value.yob!,
        bloodType: this.userForm.value.bloodType!,
        field: this.userForm.value.field || ''
      };
      
      this.userDataOperation.addUser(newUser);
      this.loadUsers();
      this.openAddModal();
    }
  }
}
