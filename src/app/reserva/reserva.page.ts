import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormBuilder,FormGroup } from '@angular/forms';
import { AforoPage } from '../aforo/aforo.page';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.page.html',
  styleUrls: ['./reserva.page.scss'],
})
export class ReservaPage implements OnInit {

  reserveForm: FormGroup;
  aforoPage: AforoPage;

  constructor(private http: HttpClient, public fbr: FormBuilder,
    public alertController: AlertController, public loadingController: LoadingController) {
    this.reserveForm = this.fbr.group({
      fechars: new FormControl('',Validators.required),
      bloquehrs: new FormControl('',Validators.required)
    });
  }
  ngOnInit() {
  }

  async reservar(){
    const f = this.reserveForm.value;

    if(this.reserveForm.invalid){
      const alert = await this.alertController.create({
        header:'Error',
        message: 'Debes llenar todos los campos',
        buttons: ['Aceptar']
      });

      await alert.present();
      return;
    }
    const reserva = {
      fecha: f.fechars.split('T')[0],
      bloqueH: f.bloquehrs

    };

    const loading = await this.loadingController.create({
      message: 'Solicitando Reserva...'
    });

    await loading.present();

    this.http.post(environment.apiReserva, reserva).subscribe(async res =>{
      await loading.dismiss();
      console.log(res);
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
