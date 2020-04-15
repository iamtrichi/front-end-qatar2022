import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CrudService } from '../../crud.service';
import { NavParams, ModalController, LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-create-joueur',
  templateUrl: './create-joueur.page.html',
  styleUrls: ['./create-joueur.page.scss'],
})
export class CreateJoueurPage implements OnInit {

  operation = 'Ajouter';
  loading: any;
  item = {
    id: 0,
    nom: '',
    prenom: '',
    dateNaissance: '',
    poste: '',
    urlImage: ''
  };
  itemChk = {
    id: 0,
    nom: '',
    prenom: '',
    dateNaissance: '',
    poste: '',
    urlImage: ''
  };
  fileToUpload: any;
  constructor(public loadingController: LoadingController, private route: ActivatedRoute, public toastController: ToastController,
              private crud: CrudService, navParams: NavParams, private modalCtrl: ModalController) {
    // const joueurId = this.route.snapshot.paramMap.get('joueurId') || '0';
    // this.operation = joueurId === '0' ?
    this.itemChk = navParams.get('joueur') || this.item;
    this.item.id = this.itemChk.id;
    this.item.dateNaissance = this.itemChk.dateNaissance;
    this.item.nom = this.itemChk.nom;
    this.item.poste = this.itemChk.poste;
    this.item.prenom = this.itemChk.prenom;
    this.item.urlImage = this.itemChk.urlImage;
    console.log(this.item);
    this.operation = (this.item.id === 0 ) ? 'Ajouter' : 'Modifier';
    console.log(this.operation);
  }

  ngOnInit() {

  }

  async done() {
    const loading = await this.loadingController.create({
      message: 'Please wait...'
    });
    loading.present();
    if (this.item.id === 0) {
      delete this.item.id;
      console.log(this.item);
      this.crud.add(this.item, 'joueur').subscribe(res => {
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
      this.crud.update(this.item, 'joueur').subscribe(res => {
        // this.itemChk = this.item;
        this.itemChk.id = this.item.id;
        this.itemChk.dateNaissance = this.item.dateNaissance;
        this.itemChk.nom = this.item.nom;
        this.itemChk.poste = this.item.poste;
        this.itemChk.prenom = this.item.prenom;
        this.itemChk.urlImage = this.item.urlImage;
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
      this.item.urlImage = res;
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
      this.item.urlImage = err.error.text;
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
}
