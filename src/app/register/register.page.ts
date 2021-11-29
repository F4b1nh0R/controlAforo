import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginPage } from '../login/login.page';
import {Validators, FormControl, FormBuilder, FormGroup} from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;
  loginPage: LoginPage;

  constructor(public fbr: FormBuilder, public alertController: AlertController) {

    this.registerForm = this.fbr.group({
      namerg: new FormControl('',Validators.required),
      aperg: new FormControl('',Validators.required),
      aperg2: new FormControl('',Validators.required),
      rutrg: new FormControl('',Validators.required),
      emailrg: new FormControl('',Validators.required),
      passrg: new FormControl('',Validators.required),
      passrg2: new FormControl('',Validators.required),
      secretrg: new FormControl('',Validators.required),

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
      nombre1: f.namerg,
      apellido1: f.aperg,
      apellido2: f.aperg2,
      rut: f.rut,
      mail: f.emailrg,
      clave: f.passrg,
      secreto: f.secretrg

    };
    console.log(JSON.stringify(usuario));
  }
}
