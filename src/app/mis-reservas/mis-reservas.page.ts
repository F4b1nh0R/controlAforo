import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormBuilder,FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActionSheetController, AlertController, ModalController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-mis-reservas',
  templateUrl: './mis-reservas.page.html',
  styleUrls: ['./mis-reservas.page.scss'],
})
export class MisReservasPage implements OnInit {

  public items: any;
  token = localStorage.getItem('token');

  constructor(public actionSheetCtrl: ActionSheetController, private modalCtrl: ModalController, private http: HttpClient, public alertController: AlertController, public loadingController: LoadingController) { }

  ngOnInit() {
    this.misReservas();
  }

  async misReservas(){
    const validacion={
      token: this.token
    };

    const loading = await this.loadingController.create({
      message: 'Cargando Reservas...'
    });

    await loading.present();

    this.http.post(environment.apiMisReservas, validacion).subscribe(async (res:any) =>{
      console.log('se recibe: ', res);
      this.items = res;
      await loading.dismiss();
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

  volverReservas(){
    this.modalCtrl.dismiss();

  }


  async popupAcciones(idReserva, nombreLab, fecha) {
    const actionSheet = await this.actionSheetCtrl.create({

      header: 'Acciones',
      cssClass: 'my-custom-class',
      buttons: [{
        cssClass:'rojo',
        text: 'Eliminar reserva',
        role: 'destructive',
        icon: 'trash',
        handler: () => {

          this.eliminarReserva(idReserva);
        }
      },
      {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();

    const { role, data } = await actionSheet.onDidDismiss();
  }

  async eliminarReserva(idReserva){
    console.log('se eliminará: ',idReserva);

    const reserva ={
      idReserva:idReserva
    };

    //llamado a /eliminarReserva

    const loading = await this.loadingController.create({
      message: 'Eliminando reserva...'
    });

    await loading.present();

    this.http.post(environment.apiEliminaR, reserva).subscribe(async (res:any) =>{

      await loading.dismiss();
      const alert = await this.alertController.create({
        header: 'Estado',
        message: res.message,
        buttons: ['ok']
      });
      await alert.present();
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
