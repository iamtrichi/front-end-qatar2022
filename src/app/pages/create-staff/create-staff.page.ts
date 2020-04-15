import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CrudService } from '../../crud.service';
import { NavParams, ModalController, LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-create-staff',
  templateUrl: './create-staff.page.html',
  styleUrls: ['./create-staff.page.scss'],
})
export class CreateStaffPage implements OnInit {

  operation = 'Ajouter';
  loading: any;
  item = {
    id: 0,
    nom: '',
    prenom: '',
    dateNaissance: '',
    role: ''
  };
  itemChk = {
    id: 0,
    nom: '',
    prenom: '',
    dateNaissance: '',
    role: ''
  };
  fileToUpload: any;
  constructor(public loadingController: LoadingController, private route: ActivatedRoute, public toastController: ToastController,
              private crud: CrudService, navParams: NavParams, private modalCtrl: ModalController) {
    // const staffId = this.route.snapshot.paramMap.get('staffId') || '0';
    // this.operation = staffId === '0' ?
    this.itemChk = navParams.get('staff') || this.item;
    this.item.id = this.itemChk.id;
    this.item.dateNaissance = this.itemChk.dateNaissance;
    this.item.nom = this.itemChk.nom;
    this.item.role = this.itemChk.role;
    this.item.prenom = this.itemChk.prenom;
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
      this.crud.add(this.item, 'staff').subscribe(res => {
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
      this.crud.update(this.item, 'staff').subscribe(res => {
        // this.itemChk = this.item;
        this.itemChk.id = this.item.id;
        this.itemChk.dateNaissance = this.item.dateNaissance;
        this.itemChk.nom = this.item.nom;
        this.itemChk.role = this.item.role;
        this.itemChk.prenom = this.item.prenom;
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
