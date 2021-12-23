import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AlertController, ModalController, NavParams } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-mod-aforo',
  templateUrl: './mod-aforo.page.html',
  styleUrls: ['./mod-aforo.page.scss'],
})
export class ModAforoPage implements OnInit {

  public items2: any;
  token = localStorage.getItem('token');
  modAforoForm: FormGroup;
  nombreLab: any;
  aforoActual: any;

  constructor(public fbr: FormBuilder, private navParams: NavParams,
    private modalCtrl: ModalController, private http: HttpClient,
    public alertController: AlertController, public loadingController: LoadingController) {

    this.modAforoForm = this.fbr.group({
      newAforo: new FormControl('',Validators.required),
    });
  }

  ngOnInit() {
    this.nombreLab = this.navParams.get('nombreLab');
    this.aforoActual = this.navParams.get('aforoActual');
    console.log('datos recibidos: ',this.aforoActual);

  }

  async modificaAforo(nombreLab){

    const f = this.modAforoForm.value;

    console.log("aforo para:"+nombreLab+"modificado")
    const newAforo={
      nombreLab:nombreLab,
      nuevoAforo:f.newAforo
    };

    const loading = await this.loadingController.create({
      message: 'Modificando aforo...'
    });

    await loading.present();

    this.http.post(environment.apiModA, newAforo).subscribe(async (res:any) =>{
      console.log('enviando:',newAforo);
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
