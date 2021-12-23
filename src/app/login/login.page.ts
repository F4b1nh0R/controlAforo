import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { RegisterPage } from '../register/register.page';
import { LoadingController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Validators, FormControl, FormBuilder, FormGroup} from '@angular/forms';
import { environment } from 'src/environments/environment';
import { HomeAlumnoPage } from '../home-alumno/home-alumno.page';
import { HomeAdminPage } from '../home-admin/home-admin.page';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],

})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  registerPage: RegisterPage;
  homeAlumnoPage: HomeAlumnoPage;
  homeAdminPage: HomeAdminPage;


  constructor(public alertController: AlertController,
    // eslint-disable-next-line max-len
    public loadingController: LoadingController,
    private router: Router,
    public fb: FormBuilder,
    private http: HttpClient) {

    this.loginForm = this.fb.group({
      correolg: new FormControl('',Validators.required),
      passlg: new FormControl('',Validators.required),
    });

  }

  ngOnInit() {

  }

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
      message: 'Validando....'
    });

    await loading.present();

    this.http.post(environment.apiLogin, usuario).subscribe(async (res:any) =>{

      await loading.dismiss();
      localStorage.setItem('token',res.token);
      console.log('token guardado: '+res.token)
      console.log('rango: ',res.rango);
      localStorage.setItem('nombre',res.nombre1);
      localStorage.setItem('apellido',res.apellido1);
      if(res.rango === 1){
        this.router.navigate(['/home-admin']);
      }
      else if(res.rango === 0){
        this.router.navigate(['/home-alumno']);
      } //flag

    }, async err => {
      await loading.dismiss();
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Credenciales inválidas',
        buttons: ['ok']
      });

      await alert.present();
    });


  }

}
