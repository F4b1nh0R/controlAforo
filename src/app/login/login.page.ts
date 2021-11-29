import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { RegisterPage } from '../register/register.page';
import { LoadingController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Validators, FormControl, FormBuilder, FormGroup} from '@angular/forms';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],

})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  registerPage: RegisterPage;


  constructor(public loadingController: LoadingController, private router: Router, public fb: FormBuilder, private http: HttpClient, ) {

    this.loginForm = this.fb.group({
      correolg: new FormControl('',Validators.required),
      passlg: new FormControl('',Validators.required),
    });

  }

  ngOnInit() {}

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Validando...',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
    console.log('asdasdsadsadasd');

    //this.router.navigate(['/home']);

  }

  async ingresar(){
    const res = await this.http.get(environment.apiAforo).subscribe(data => console.log(data));
    console.log('ingresó');
  }



}
