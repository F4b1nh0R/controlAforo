import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { RegisterPage } from '../register/register.page';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],

})
export class LoginPage implements OnInit {

  registerPage: RegisterPage;

  constructor(public loadingController: LoadingController, private router: Router) { }

  ngOnInit() {
  }
  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
    this.router.navigate(['/home']);

  }


}
