import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { Validators, FormControl, FormBuilder,FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { timeout } from 'rxjs/operators';
import { timeEnd } from 'console';

@Component({
  selector: 'app-aforo',
  templateUrl: './aforo.page.html',
  styleUrls: ['./aforo.page.scss'],
})
export class AforoPage implements OnInit {


  public items: any;
  public detener: boolean;
  constructor(private http: HttpClient, public navCtrl: NavController,
    public alertController: AlertController, public loadingController: LoadingController) {

      this.getAforo();
     }

  ngOnInit() {
  }

  getAforo(){
      // eslint-disable-next-line prefer-const
      let intervalo = setInterval(() => {
      const data: Observable<any> = this.http.get(environment.apiAforo);
      data.subscribe(result => {
        this.items = result;
        console.log(result);
      });
      if(this.detener){
        console.log('al carajo');
        clearInterval(intervalo);
      }
    }, 2000);



    //const data: Observable<any> = this.http.get(environment.apiAforo);
    //data.subscribe(result => {
    //  this.items = result;
    //  console.log(result);
    //});
  }

  terminar(){
    console.log('paaraaaaa');
    this.detener = true;
  }



}

