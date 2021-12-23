import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormBuilder,FormGroup } from '@angular/forms';
import { AforoPage } from '../aforo/aforo.page';
import { HttpClient } from '@angular/common/http';
import { AlertController, ModalController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

import { environment } from 'src/environments/environment';
import { MisReservasPage } from '../mis-reservas/mis-reservas.page';
import { HistorialReservasPage } from '../historial-reservas/historial-reservas.page';
import { GestionaReservaPage } from '../gestiona-reserva/gestiona-reserva.page';

@Component({
  selector: 'app-mod-reserva',
  templateUrl: './mod-reserva.page.html',
  styleUrls: ['./mod-reserva.page.scss'],
})
export class ModReservaPage implements OnInit {

  filterForm: FormGroup;
  public items: any;
  public nombre;
  token = localStorage.getItem('token');

  constructor(private modalCtrl: ModalController,private http: HttpClient, public fbr: FormBuilder,
    public alertController: AlertController, public loadingController: LoadingController) {
      this.filterForm = this.fbr.group({
        laboratoriomod: new FormControl('',Validators.required),
        fechamod: new FormControl('',Validators.required),
        bloquemod: new FormControl('',Validators.required),
      });


     }


  ngOnInit() {
    this.nombre = 'fabian';

  }

  async consultaModal(){
    const f = this.filterForm.value;
    const f1 = f.laboratoriomod;
    const fx = f.fechamod;
    const f2 = fx.split('T')[0]
    const f3 = f.bloquemod;

    if(f1 == ''){

      if(f2 == ''){
        if(f3 == ''){
          console.log('elige una opcion!');
          const alert = await this.alertController.create({
            header:'Error',
            message: 'Rellena al menos un campo',
            buttons: ['Aceptar']
          });

          await alert.present();
          return;
        }
        else{
          //envía la consulta sólo con f3 bloque
          const consulta = {
            token: this.token,
            idLaboratorio: '',
            fecha: '',
            idBloque: f3
          };

          const loading = await this.loadingController.create({
            message: 'Cargando Reservas...'
          });

          await loading.present();

          this.http.post(environment.apiModR, consulta).subscribe(async (res:any) =>{

            this.items = res;
            console.log('se recibe de modr: ',res);

            await loading.dismiss();

            if(res.message === 'No hay reservas registradas para este bloque horario en los proximos 10 días'){

              await loading.dismiss();
              const alert = await this.alertController.create({
                header: 'Error',
                message: res.message,
                buttons: ['ok']
              });

            await alert.present();
            }
            else{
              await this.modalGesReservas()
            }
          }, async err => {

          });



          console.log('envía', consulta);
        }

      }
      else{
        if(f3 == ''){
          //envía consulta solo con f2 fecha.
          const consulta = {
            token: this.token,
            idLaboratorio: '',
            fecha: f2,
            idBloque: '',
          };
          console.log('envía', consulta);
          const loading = await this.loadingController.create({
            message: 'Cargando Reservas...'
          });

          await loading.present();

          this.http.post(environment.apiModR, consulta).subscribe(async (res:any) =>{

            this.items = res;
            console.log('se recibe de modr: ',res);

            await loading.dismiss();

            if(res.message === 'No hay reservas para esta fecha'){

              await loading.dismiss();
              const alert = await this.alertController.create({
                header: 'Error',
                message: res.message,
                buttons: ['ok']
              });

            await alert.present();
            }
            else{
              await this.modalGesReservas()
            }
          }, async err => {

          });
        }
        else{
          //envía la consulta con f2 y f3 fecha + bloque
          const consulta = {
            token: this.token,
            idLaboratorio: '',
            fecha: f2,
            idBloque: f3
          };
          console.log('envía', consulta);
          const loading = await this.loadingController.create({
            message: 'Cargando Reservas...'
          });

          await loading.present();

          this.http.post(environment.apiModR, consulta).subscribe(async (res:any) =>{

            this.items = res;
            console.log('se recibe de modr: ',res);

            await loading.dismiss();

            if(res.message === 'No hay reservas para esta fecha y bloque'){

              await loading.dismiss();
              const alert = await this.alertController.create({
                header: 'Error',
                message: res.message,
                buttons: ['ok']
              });

            await alert.present();
            }
            else{
              await this.modalGesReservas()
            }
          }, async err => {

          });
        }
      }
    }
    else{
      if(f2 == ''){
        if(f3 == ''){
          //envía consulta sólo con f1 lab
          const consulta = {
            token: this.token,
            idLaboratorio: f1,
            fecha: '',
            idBloque: ''
          };
          console.log('envía', consulta);
          const loading = await this.loadingController.create({
            message: 'Cargando Reservas...'
          });

          await loading.present();

          this.http.post(environment.apiModR, consulta).subscribe(async (res:any) =>{

            this.items = res;
            console.log('se recibe de modr: ',res);

            await loading.dismiss();

            if(res.message === 'No hay reservas registradas para este laboratorio en los proximos 10 días'){

              await loading.dismiss();
              const alert = await this.alertController.create({
                header: 'Error',
                message: res.message,
                buttons: ['ok']
              });

            await alert.present();
            }
            else{
              await this.modalGesReservas()
            }
          }, async err => {

          });



        }
        else{
          //envía consulta consulta con f1 y f3
          const consulta = {
            token: this.token,
            idLaboratorio: f1,
            fecha: '',
            idBloque: f3
          };
          console.log('envía', consulta);
          const loading = await this.loadingController.create({
            message: 'Cargando Reservas...'
          });

          await loading.present();

          this.http.post(environment.apiModR, consulta).subscribe(async (res:any) =>{

            this.items = res;
            console.log('se recibe de modr: ',res);

            await loading.dismiss();

            if(res.message === 'No hay reservas registradas para este laboratorio y bloque en los proximos 10 días'){

              await loading.dismiss();
              const alert = await this.alertController.create({
                header: 'Error',
                message: res.message,
                buttons: ['ok']
              });

            await alert.present();
            }
            else{
              await this.modalGesReservas()
            }
          }, async err => {

          });
        }
      }
      else{
        if(f3 == ''){

          //envía consulta con f1 y f2 lab y fecha
          const consulta = {
          token: this.token,
          idLaboratorio: f1,
          fecha: f2,
          idBloque: ''
          };
          console.log('envía', consulta);
          const loading = await this.loadingController.create({
            message: 'Cargando Reservas...'
          });

          await loading.present();

          this.http.post(environment.apiModR, consulta).subscribe(async (res:any) =>{

            this.items = res;
            console.log('se recibe de modr: ',res);

            await loading.dismiss();

            if(res.message === 'No hay reservas para este laboratorio en la fecha indicada'){

              await loading.dismiss();
              const alert = await this.alertController.create({
                header: 'Error',
                message: res.message,
                buttons: ['ok']
              });

            await alert.present();
            }
            else{
              await this.modalGesReservas()
            }
          }, async err => {

          });

        }
        else{
          //envía consulta con f1 f2 y f3
          const consulta = {
            token: this.token,
            idLaboratorio: f1,
            fecha: f2,
            idBloque: f3
          };
          console.log('envía', consulta);
          const loading = await this.loadingController.create({
            message: 'Cargando Reservas...'
          });

          await loading.present();

          this.http.post(environment.apiModR, consulta).subscribe(async (res:any) =>{

            this.items = res;
            console.log('se recibe de modr: ',res);

            await loading.dismiss();

            if(res.message === 'No hay reservas para este laboratorio en la fecha y bloque indicados'){

              await loading.dismiss();
              const alert = await this.alertController.create({
                header: 'Error',
                message: res.message,
                buttons: ['ok']
              });

              await alert.present();
            }
            else{
              await this.modalGesReservas()
            }
          }, async err => {

          });
        }

      }
    }


  }

  async modalGesReservas(){

    const modal = await this.modalCtrl.create({
      component: GestionaReservaPage,
      componentProps:{
        nombre: 'Gestiona Reservas',
        items_: this.items,
        hola: this.nombre
      }

    });

    await modal.present();

  }


}


