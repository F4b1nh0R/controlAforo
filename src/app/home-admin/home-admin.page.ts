import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { AlertController, ModalController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

//const mensaje = document.getElementById('usuario');

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.page.html',
  styleUrls: ['./home-admin.page.scss'],
})
export class HomeAdminPage implements OnInit {

  nombre = localStorage.getItem('nombre');
  apellido = localStorage.getItem('apellido');

  public items: any;
  constructor(private modalCtrl: ModalController, private http: HttpClient, public alertController: AlertController, public loadingController: LoadingController) { }

  ngOnInit() {
    document.getElementById("admin").innerHTML = "Administrador: "+this.nombre+" "+this.apellido;
    this.informacion();


  }

  abrir(url:string){
    window.open(url,'_system','location=yes');
  }

  async informacion(){
    const loading = await this.loadingController.create({
      message: 'Cargando Informaciones...'
    });

    await loading.present();

    this.http.get(environment.apiConsulta).subscribe(async (res:any) =>{

      this.items = res;

      localStorage.setItem('informacion1',res[0]['informacion1']);
      localStorage.setItem('informacion2',res[0]['informacion2']);
      localStorage.setItem('informacion3',res[0]['informacion3']);

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

  cerrarSesion(){
    localStorage.clear();
    localStorage.clear();
    localStorage.clear();
    localStorage.clear();
  }
}
