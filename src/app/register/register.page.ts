import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginPage } from '../login/login.page';
import {Validators, FormControl, FormBuilder, FormGroup} from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;
  loginPage: LoginPage;

  constructor(private router: Router, private http: HttpClient, public fbr: FormBuilder, public alertController: AlertController, public loadingController: LoadingController) {

    this.registerForm = this.fbr.group({
      namerg: new FormControl('',Validators.required),
      aperg: new FormControl('',Validators.required),
      aperg2: new FormControl('',Validators.required),
      rutrg: new FormControl('',Validators.required),
      emailrg: new FormControl('',Validators.required),
      passrg: new FormControl('',Validators.required),
      passrg2: new FormControl('',Validators.required),

    });
  }

  ngOnInit() {
  }

  async registrar(){
    const f = this.registerForm.value;

    if(this.registerForm.invalid){
      const alert = await this.alertController.create({
        header:'Error',
        message: 'Debes llenar todos los campos',
        buttons: ['Aceptar']
      });

      await alert.present();
      return;
    }
    const usuario = {
      nom1rg: f.namerg,
      ape1rg: f.aperg,
      ape2rg: f.aperg2,
      rutrg: f.rutrg,
      mailrg: f.emailrg,
      passrg: f.passrg

    };

    const loading = await this.loadingController.create({
      message: 'Enviando Datos...'
    });

    await loading.present();
    console.log(JSON.stringify(usuario));
    this.http.post(environment.apiRegister, usuario).subscribe(async (res:any) => {
      await loading.dismiss();


      if(res.message == 'Registrado Correctamente!'){

        const alert = await this.alertController.create({
          header: 'Estado',
          message: res.message,
          buttons: ['ok']
        });

        this.router.navigate(['/home']);
        await alert.present();

      }
      else{
        const alert = await this.alertController.create({
          header: 'Estado',
          message: 'Usuario ya existe!',
          buttons: ['ok']
        });
        await alert.present();

      }


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

  volver(){
    this.router.navigate(['/home']);
  }
}
