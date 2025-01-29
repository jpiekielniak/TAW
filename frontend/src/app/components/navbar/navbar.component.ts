import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {Router, RouterModule} from "@angular/router";
import {AuthService} from "../../services/auth/auth.service";

@Component({
  selector: 'navbar',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  providers: [AuthService],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  constructor(public authService: AuthService, public router: Router) {
  }

  ngOnInit() : void {
  }

  signOut() {
    this.authService
      .logout()
      .subscribe(() => {
        this.router.navigate(['/login']);
      })
  }
}
