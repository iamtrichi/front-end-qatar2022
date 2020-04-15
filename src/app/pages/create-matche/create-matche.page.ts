import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CrudService } from '../../crud.service';
import { NavParams, ModalController, LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-create-matche',
  templateUrl: './create-matche.page.html',
  styleUrls: ['./create-matche.page.scss'],
})
export class CreateMatchePage implements OnInit {

  operation = 'Ajouter';
  loading: any;
  stades = [];
  segment;
  item = {
    id: 0,
    equipeA: null,
    equipeB: null,
    nbrSpectateurs: 0,
    arbitres: new Array(0),
    scoreA: 0,
    scoreB: 0,
  };
  itemChk = {
    id: 0,
    equipeA: null,
    equipeB: null,
    nbrSpectateurs: 0,
    arbitres: new Array(0),
    scoreA: 0,
    scoreB: 0,
  };
  arbitres = [];
  arbitresfiltred = [];
  equipes = [];
  compareWith;
  compareWithFn = (o1, o2) => {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }
  // ;
  constructor(public loadingController: LoadingController, private route: ActivatedRoute, public toastController: ToastController,
              private crud: CrudService, navParams: NavParams, private modalCtrl: ModalController) {
    // const matchId = this.route.snapshot.paramMap.get('matchId') || '0';
    // this.operation = matchId === '0' ?
    this.itemChk = navParams.get('match') || this.item;
    this.item.id = this.itemChk.id;
    console.log(navParams.get('match'));
    this.item.nbrSpectateurs = this.itemChk.nbrSpectateurs;
    this.item.scoreA = this.itemChk.scoreA;
    this.item.scoreB = this.itemChk.scoreB;
    this.item.equipeA = this.itemChk.equipeA;
    this.item.equipeB = this.itemChk.equipeB;
    this.item.arbitres = this.itemChk.arbitres;
    console.log(this.item);
    this.operation = (this.item.id === 0 ) ? 'Ajouter' : 'Modifier';
    console.log(this.operation);
    // this.segment = this.item.arbitres.length > 0 ? 'players' : 'others';
    this.compareWith = this.compareWithFn;
  }

  ngOnInit() {
    this.crud.getAll('stade').subscribe(res => this.stades = res);
    this.crud.getAll('arbitre').subscribe(res => {
      // this.item.arbitres.forEach(element => {
      //   res.splice(res.findIndex((o: any) => o.id === element.id), 1);
      // });
      this.arbitres = res;
      this.arbitresfiltred = res;
    });
    this.crud.getAll('equipe').subscribe(res => this.equipes = res);
  }
  changeEquipe(ev, AoB?: boolean) {
    // s
  }
  ajouter(item) {
    this.item.arbitres.push(item);
    if (this.item.id !== 0) {
      this.crud.update(this.item, 'match').subscribe(data => {
        console.log(data);
        this.arbitres.splice(this.arbitres.findIndex((element) => element.id === item.id, 1), 1);
        this.arbitresfiltred.splice(this.arbitresfiltred.findIndex((element) => element.id === item.id, 1), 1);
      }, err => {
        console.log(err);
        this.item.arbitres.pop();
      });
    }
  }


  retirer(item) {
    this.item.arbitres.splice(this.item.arbitres.findIndex((element) => element.id === item.id), 1);
    if (this.item.id !== 0) {
      this.crud.update(this.item, 'match').subscribe(data => {
        console.log(data);
        this.arbitres.push(item);
        this.arbitresfiltred.push(item);
      }, err => {
        console.log(err);
        this.item.arbitres.push(item);
      });
    }
  }
  getItemss(ev: any, m?) {

    // set val to the value of the searchbar
    const val = ev.target.value;

    // Reset items back to all of the items
    this.arbitresfiltred = this.arbitres;
    // if the value is an empty string don't filter the items
    if (val && val.trim() !== '') {
      this.arbitresfiltred = this.arbitresfiltred.filter((item: {nom: string}) => {
        return (item.nom.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }
  }

  async done() {
    const loading = await this.loadingController.create({
      message: 'Please wait...'
    });
    loading.present();
    if (this.item.id === 0) {
      delete this.item.id;
      console.log(this.item);
      this.crud.add(this.item, 'match').subscribe(res => {
        console.log(res);
        this.item = (res as any);
        loading.dismiss();
        this.dismiss();
      }, async err => {
        console.log(err);
        const toast = await this.toastController.create({
          message: err.message,
          duration: 5000,
          position: 'top'
        });
        loading.dismiss();
        toast.present();
        // this.item.urlImage = err.error.text;
      });

    } else {
      this.crud.update(this.item, 'match').subscribe(res => {
        // this.itemChk = this.item;
        this.itemChk.id = this.item.id;
        this.itemChk.nbrSpectateurs = this.item.nbrSpectateurs;
        this.itemChk.arbitres = this.item.arbitres;
        this.itemChk.equipeA = this.item.equipeA;
        this.itemChk.equipeB = this.item.equipeB;
        this.itemChk.scoreA = this.item.scoreA;
        this.itemChk.scoreB = this.item.scoreB;
        // this.item.urlImage = res;
        console.log(res);
        loading.dismiss();
        this.dismiss();
      }, async err => {
        console.log(err);
        const toast = await this.toastController.create({
          message: err.message,
          duration: 5000,
          position: 'top'
        });
        loading.dismiss();
        toast.present();
        // this.item.urlImage = err.error.text;
      });
      // this.dismiss();
    }
  }
  async presentLoading() {
    const loading = await this.loadingController.create({
        message: 'Please wait...'
      });
    loading.present();
    console.log('Loading dismissed!');
    setTimeout(() => {
      loading.dismiss();
    }, 3500);
  }

  getAge(str: string) {
    return new Date().getFullYear() - Number(str.substr(0, 4));
  }

  segmentChanged(ev) {
    console.log(ev);
  }

  cancel() {
    this.dismiss();
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      dismissed: true,
      data: this.item
    });
  }
}
