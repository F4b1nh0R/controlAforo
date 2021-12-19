import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { RegisterPage } from '../register/register.page';
import { LoadingController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Validators, FormControl, FormBuilder, FormGroup} from '@angular/forms';
import { environment } from 'src/environments/environment';
import {Storage} from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],

})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  registerPage: RegisterPage;


  constructor(public alertController: AlertController,
    // eslint-disable-next-line max-len
    public loadingController: LoadingController,
    private router: Router,
    public fb: FormBuilder,
    private http: HttpClient,
    private guardar: Storage) {

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

    console.log('función ingresar');
    const f = this.loginForm.value;

    if(this.loginForm.invalid){
      const alert = await this.alertController.create({
        header:'Error',
        message: 'Debes rellenar todos los campos',
        buttons: ['Aceptar']
      });

      await alert.present();
      return;
    }
    const usuario = {
      maillg: f.correolg,
      passlg: f.passlg,
    };
    const loading = await this.loadingController.create({
      message: 'Iniciando Sesión....'
    });

    await loading.present();

    this.http.post(environment.apiLogin, usuario).subscribe(async res =>{
      await loading.dismiss();
      const hola = JSON.stringify(res);
      console.log('version string:'+hola);
      console.log('version string:');
      //this.guardar.set('Token',);
    }, async err => {
      await loading.dismiss();
      const alert = await this.alertController.create({
        header: 'Error',
        message: err.message,
        buttons: ['ok']
      });

      await alert.present();
    });


  }

}
