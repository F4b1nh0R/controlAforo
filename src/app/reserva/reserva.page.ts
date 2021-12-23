import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormBuilder,FormGroup } from '@angular/forms';
import { AforoPage } from '../aforo/aforo.page';
import { HttpClient } from '@angular/common/http';
import { AlertController, ModalController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

import { environment } from 'src/environments/environment';
import { MisReservasPage } from '../mis-reservas/mis-reservas.page';
import { HistorialReservasPage } from '../historial-reservas/historial-reservas.page';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.page.html',
  styleUrls: ['./reserva.page.scss'],
})
export class ReservaPage implements OnInit {

  reserveForm: FormGroup;
  aforoPage: AforoPage;
  token = localStorage.getItem('token');

  constructor(private modalCtrl: ModalController,private http: HttpClient, public fbr: FormBuilder,
    public alertController: AlertController, public loadingController: LoadingController) {
    this.reserveForm = this.fbr.group({
      laboratoriors: new FormControl('',Validators.required),
      fechars: new FormControl('',Validators.required),
      bloquehrs: new FormControl('',Validators.required)
    });
  }
  ngOnInit() {

    console.log('token heredado: '+this.token)
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
      token: this.token,
      laboratorio: f.laboratoriors,
      fecha: f.fechars.split('T')[0],
      bloqueH: f.bloquehrs

    };
    const actual = new Date();
    const newFecha = reserva.fecha.split('-')
    console.log('FECHA SIN FORMATO',newFecha[1],newFecha[2],newFecha[3]);
    console.log(newFecha);
    const mesActual = actual.getMonth() + 1;
    const anioActual = actual.getFullYear();
    const diaActual = actual.getDate();

    if(parseInt(newFecha[0]) === anioActual){
      if(parseInt(newFecha[1]) >= mesActual){
        if(parseInt(newFecha[1]) > mesActual){
          //Fecha correcta!
          const fecha_actual = actual.getFullYear()+'-'+mesActual+'-'+actual.getDate();
          console.log('fecha ', reserva.fecha, fecha_actual);


          const loading = await this.loadingController.create({
            message: 'Solicitando Reserva...'
          });

          await loading.present();

          this.http.post(environment.apiReserva, reserva).subscribe(async (res:any) =>{
            console.log('enviando:',reserva);
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
        else{

          //Fecha correcta
          if(parseInt(newFecha[2]) >= diaActual){
            const fecha_actual = actual.getFullYear()+'-'+mesActual+'-'+actual.getDate();
            console.log('fecha ', reserva.fecha, fecha_actual);


            const loading = await this.loadingController.create({
              message: 'Solicitando Reserva...'
            });

            await loading.present();

            this.http.post(environment.apiReserva, reserva).subscribe(async (res:any) =>{
              console.log('enviando:',reserva);
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
          else{
            //Elige una reserva para hoy o para dias posteriores
              const alert = await this.alertController.create({
                header: 'Error',
                message: 'Este dia ya pasó!. Elige una nueva fecha',
                buttons: ['ok']
              });

              await alert.present();
          }
        }

      }
      else{
        //Elige una reserva para este mes o los siguientes.
        const alert = await this.alertController.create({
          header: 'Error',
          message: 'Este mes ya pasó!. Elige una nueva fecha',
          buttons: ['ok']
        });

        await alert.present();

      }

    }
    else{
      //Elige una reserva para este año!
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Elige una fecha para este año',
        buttons: ['ok']
      });

      await alert.present();
    }

  }

  async modalMisReservas(){

    const modal = await this.modalCtrl.create({
      component: MisReservasPage,
      componentProps:{
        nombre: 'Mis reservas',
      }

    });

    await modal.present();

  }

  async modalHistorialReservas(){

    const modal = await this.modalCtrl.create({
      component: HistorialReservasPage,
      componentProps:{
        nombre: 'Historial reservas',
      }

    });

    await modal.present();

  }


}
