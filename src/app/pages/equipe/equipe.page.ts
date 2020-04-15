import { Component, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { CrudService } from '../../crud.service';
import { IonInfiniteScroll, ModalController, LoadingController, ToastController, PopoverController } from '@ionic/angular';
import { CreateEquipePage } from '../create-equipe/create-equipe.page';
import { DetailEquipeJoueurPage } from '../detail-equipe-joueur/detail-equipe-joueur.page';
import { PopoverPage } from '../about-popover/about-popover';

@Component({
  selector: 'app-equipe',
  templateUrl: 'equipe.page.html',
  styleUrls: ['equipe.page.scss']
})
export class EquipePage {
  selectedItem: any;
  icons: string[];
  equipes: Array<object>;
  loading = true;
  loadingC;
  searchQuery = '';
  items: Array<object>;
  @ViewChild(IonInfiniteScroll, {static: false}) infiniteScroll: IonInfiniteScroll;

  constructor(public loadingController: LoadingController, public service: CrudService, public toastController: ToastController,
              private popoverCtrl: PopoverController, public modalController: ModalController) {
    // If we navigated to this page, we will have an item available as a nav param

  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.items = this.equipes;

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() !== '') {
      this.items = this.items.filter((item: {nom: string}) => {
        return (item.nom.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }
  }

  async presentLoading() {
    this.loadingC = await this.loadingController.create({
      message: 'Please wait...'
    });
    this.loadingC.present();
    console.log('Loading dismissed!');
  }


  ionViewDidEnter() {
    this.doRefresh();
  }

  doRefresh(event?) {
    console.log(event);
    this.loading = true;
    this.service.getAll('equipe').subscribe(data => {
      this.equipes = data;
      this.items = this.equipes;
      console.log(data);
      this.loading = false;
      if (event) {
        event.target.complete();
      }
    });
  }


  async editEquipe(item) {
    const modal = await this.modalController.create({
      component: CreateEquipePage,
      componentProps: { equipe: item }
    });

    const r = await modal.present();
    const { data } = await modal.onDidDismiss();
    item = data.data;
    console.log(data);
    return r;
  }
  async addEquipe() {
    const modal = await this.modalController.create({
      component: CreateEquipePage,
      componentProps: {}
    });
    const r = await modal.present();
    const { data } = await modal.onDidDismiss();
    if (data.data.id) {
      this.equipes.push(data.data);
      console.log(data);
    }
    return r;
  }

  async show(item) {
    const modal = await this.modalController.create({
      component: DetailEquipeJoueurPage,
      // tslint:disable-next-line:object-literal-shorthand
      componentProps: { item: item, type: 'equipe' }
    });
    return await modal.present();
  }

  async presentPopover(event: Event) {
    const popover = await this.popoverCtrl.create({
      component: PopoverPage,
      event
    });
    await popover.present();
  }

  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      event.target.complete();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      // if (data.length === 1000) {
      //   event.target.disabled = true;
      // }
    }, 1500);
  }

  deleteEquipe(item) {
    this.presentLoading();
    this.service.delete(item, 'equipe').subscribe(res => {
      console.log(res);
      setTimeout(() => {
        this.loadingC.dismiss();
      }, 500);
      if (res) {
        this.equipes.splice(this.equipes.findIndex((element: any) => element.id === item.id), 1);
      }
    }, async err => {
      this.loadingC.dismiss();
      console.log('error', err);
      const toast = await this.toastController.create({
        message: err.message,
        duration: 5000,
        position: 'top'
      });
      toast.present();
    });
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }
}
