import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CrudService } from '../../crud.service';
import { NavParams, ModalController, LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-create-equipe',
  templateUrl: './create-equipe.page.html',
  styleUrls: ['./create-equipe.page.scss'],
})
export class CreateEquipePage implements OnInit {

  operation = 'Ajouter';
  loading: any;
  searchQuery = '';
  segment = '';
  itemss = [];
  item = {
    id: 0,
    nomEquipe: '',
    joueurs: [],
    staffs: [],
    urlLogo: ''
  };
  itemChk = {
    id: 0,
    nomEquipe: '',
    joueurs: [],
    staffs: [],
    urlLogo: ''
  };
  fileToUpload: any;
  joueurs = [];
  itemsss = [];
  segment1;
  itemssstaffs = [];
  staffs = [];
  itemssS;
  constructor(public loadingController: LoadingController, private route: ActivatedRoute, public toastController: ToastController,
              private crud: CrudService, navParams: NavParams, private modalCtrl: ModalController) {
    // const equipeId = this.route.snapshot.paramMap.get('equipeId') || '0';
    // this.operation = equipeId === '0' ?
    this.itemChk = navParams.get('equipe')  || this.item;
    this.item.id = this.itemChk.id;
    this.item.nomEquipe = this.itemChk.nomEquipe;
    this.item.joueurs = this.itemChk.joueurs;
    this.item.staffs = this.itemChk.staffs;
    this.item.urlLogo = this.itemChk.urlLogo;
    this.operation = (this.item.id === 0 ) ? 'Ajouter' : 'Modifier';
    this.segment = this.item.joueurs.length === 0 ? 'others' : 'players';
    this.segment1 = this.item.staffs.length === 0 ? 'others' : 'staffs';
  }

  ngOnInit() {

  }

  getItems(ev: any, m?) {

    // set val to the value of the searchbar
    const val = ev.target.value;

    // Reset items back to all of the items
    if (m) {
      this.itemsss = this.item.joueurs;
      // if the value is an empty string don't filter the items
      if (val && val.trim() !== '') {
        this.itemsss = this.itemsss.filter((item: {nom: string}) => {
          return (item.nom.toLowerCase().indexOf(val.toLowerCase()) > -1);
        });
      }
    } else {
      this.itemss = this.joueurs;
      // if the value is an empty string don't filter the items
      if (val && val.trim() !== '') {
        this.itemss = this.itemss.filter((item: {nom: string}) => {
          return (item.nom.toLowerCase().indexOf(val.toLowerCase()) > -1);
        });
      }
    }
  }

  ionViewDidEnter() {
    this.crud.getAll('joueur').subscribe(joueurs => {
      this.item.joueurs.forEach(element1 => {
        joueurs.splice(joueurs.findIndex((element: any) => element.id === element1.id), 1);
      });
      this.joueurs = joueurs;
      this.itemsss = this.item.joueurs;
      this.itemss = this.joueurs;
    });

    this.crud.getAll('staff').subscribe(staffs => {
      this.item.staffs.forEach(element1 => {
        staffs.splice(staffs.findIndex((element: any) => element.id === element1.id), 1);
      });
      this.staffs = staffs;
      this.itemssstaffs = this.item.staffs;
      this.itemssS = this.staffs;
    });
  }

  async done() {
    const loading = await this.loadingController.create({
      message: 'Please wait...'
    });
    loading.present();
    if (this.operation === 'Ajouter') {
      this.crud.add(this.item, 'equipe').subscribe(res => {
        loading.dismiss();
        console.log(res);
        this.item = (res as any);
        this.dismiss();
      }, async err => {
        console.log(err);
        loading.dismiss();
        const toast = await this.toastController.create({
          message: err.message,
          duration: 5000,
          position: 'top'
        });
        toast.present();
        // this.item.urlLogo = err.error.text;
      });

    } else {
      this.crud.update(this.item, 'equipe').subscribe(res => {
        loading.dismiss();
        // this.itemChk = this.item;
        this.itemChk.id = this.item.id;
        this.itemChk.staffs = this.item.staffs;
        this.itemChk.joueurs = this.item.joueurs;
        this.itemChk.nomEquipe = this.item.nomEquipe;
        this.itemChk.urlLogo = this.item.urlLogo;
        // this.item.urlLogo = res;
        console.log(res);
        this.dismiss();
      }, async err => {
        console.log(err);
        loading.dismiss();
        const toast = await this.toastController.create({
          message: err.message,
          duration: 5000,
          position: 'top'
        });
        toast.present();
        // this.item.urlLogo = err.error.text;
      });
      // this.dismiss();
    }
  }
  getAge(str: string) {
    return new Date().getFullYear() - Number(str.substr(0, 4));
  }

  segmentChanged(ev) {
    console.log(ev);
  }
  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Please wait...'
    });
    this.loading.present();
    console.log('Loading dismissed!');
  }

  async handleFileInput(files: FileList) {
    const loading = await this.loadingController.create({
      message: 'Please wait...'
    });
    loading.present();
    console.log('ddsf');
    this.fileToUpload = files.item(0);
    if (this.fileToUpload.size > 10485760) {
      console.log('file too long', this.fileToUpload.size);
      const toast = await this.toastController.create({
        message: 'Fichier trop grand essayer avec un fichier < 10 Mo.',
        duration: 2000
      });
      loading.dismiss();
      toast.present();
      return;
    }
    this.crud.postFile(this.fileToUpload).subscribe(res => {
      loading.dismiss();
      this.item.urlLogo = res;
      console.log(res);
    }, async err => {
      console.log(err);
      loading.dismiss();
      // const toast = await this.toastController.create({
      //   message: err.message,
      //   duration: 5000,
      //   position: 'top'
      // });
      // toast.present();
      this.item.urlLogo = err.error.text;
    });
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

  ajouter(item) {
    this.item.joueurs.push(item);
    this.crud.update(this.item, 'equipe').subscribe(data => {
      console.log(data);
      this.joueurs.splice(this.joueurs.findIndex((element) => element.id === item.id, 1), 1);
    }, err => {
      console.log(err);
      this.item.joueurs.pop();
    });
  }


  retirer(item) {
    this.item.joueurs.splice(this.item.joueurs.findIndex((element) => element.id === item.id), 1);
    this.crud.update(this.item, 'equipe').subscribe(data => {
      console.log(data);
      this.joueurs.push(item);
    }, err => {
      console.log(err);
      this.item.joueurs.push(item);
    });
  }


  ajouterS(item) {
    this.item.staffs.push(item);
    this.crud.update(this.item, 'equipe').subscribe(data => {
      console.log(data);
      this.staffs.splice(this.staffs.findIndex((element) => element.id === item.id, 1), 1);
    }, err => {
      console.log(err);
      this.item.staffs.pop();
    });
  }


  retirerS(item) {
    this.item.staffs.splice(this.item.staffs.findIndex((element) => element.id === item.id), 1);
    this.crud.update(this.item, 'equipe').subscribe(data => {
      console.log(data);
      this.staffs.push(item);
    }, err => {
      console.log(err);
      this.item.staffs.push(item);
    });
  }






  getItemss(ev: any, m?) {

    // set val to the value of the searchbar
    const val = ev.target.value;

    // Reset items back to all of the items
    if (m) {
      this.itemssstaffs = this.item.staffs;
      // if the value is an empty string don't filter the items
      if (val && val.trim() !== '') {
        this.itemsss = this.itemsss.filter((item: {nom: string}) => {
          return (item.nom.toLowerCase().indexOf(val.toLowerCase()) > -1);
        });
      }
    } else {
      this.itemssS = this.staffs;
      // if the value is an empty string don't filter the items
      if (val && val.trim() !== '') {
        this.itemssS = this.itemssS.filter((item: {nom: string}) => {
          return (item.nom.toLowerCase().indexOf(val.toLowerCase()) > -1);
        });
      }
    }
  }
}
