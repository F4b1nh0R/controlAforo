import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormBuilder,FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActionSheetController, AlertController, ModalController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { NavParams } from '@ionic/angular';

import { environment } from 'src/environments/environment';
import { actionSheetController } from '@ionic/core';

@Component({
  selector: 'app-gestiona-reserva',
  templateUrl: './gestiona-reserva.page.html',
  styleUrls: ['./gestiona-reserva.page.scss'],
})
export class GestionaReservaPage implements OnInit {


  public items: any;

  nombre = '';


  constructor(public actionSheetCtrl: ActionSheetController, private navParams: NavParams, private modalCtrl: ModalController, private http: HttpClient, public alertController: AlertController, public loadingController: LoadingController) { }

  ngOnInit() {
    this.items = this.navParams.get('items_');

    console.log(this.items);
  }

  volverModReserva(){
    this.modalCtrl.dismiss();


  }


async presentActionSheet(idReserva) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Acciones',
      cssClass: 'my-custom-class',
      buttons: [{
        cssClass: 'rojo',
        text: 'Eliminar Reserva',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.eliminarReserva(idReserva);
        }
      }, {
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

