import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-historial-reservas',
  templateUrl: './historial-reservas.page.html',
  styleUrls: ['./historial-reservas.page.scss'],
})
export class HistorialReservasPage implements OnInit {

  public items: any;
  token = localStorage.getItem('token');

  constructor(private modalCtrl: ModalController, private http: HttpClient, public alertController: AlertController, public loadingController: LoadingController) { }

  ngOnInit() {

    this.historialReservas();
  }

  async historialReservas(){

    const validacion={
      token: this.token
    };

    const loading = await this.loadingController.create({
      message: 'Cargando Historial...'
    });

    await loading.present();

    this.http.post(environment.apiHistorialReservas, validacion).subscribe(async (res:any) =>{
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

}
