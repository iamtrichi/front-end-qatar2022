import { Component, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { CrudService } from '../../crud.service';
import { IonInfiniteScroll, ModalController, LoadingController, ToastController } from '@ionic/angular';
import { CreateStaffPage } from '../create-staff/create-staff.page';

@Component({
  selector: 'app-staff',
  templateUrl: 'staff.page.html',
  styleUrls: ['staff.page.scss']
})
export class StaffPage {
  selectedItem: any;
  icons: string[];
  staffs: Array<object>;
  loading = true;
  loadingC;
  searchQuery = '';
  items: Array<object>;
  @ViewChild(IonInfiniteScroll, {static: false}) infiniteScroll: IonInfiniteScroll;

  constructor(public loadingController: LoadingController, public service: CrudService, public toastController: ToastController,
              private router: Router, public modalController: ModalController) {
    // If we navigated to this page, we will have an item available as a nav param

  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.items = this.staffs;

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
    this.service.getAll('staff').subscribe(data => {
      this.staffs = data;
      this.items = this.staffs;
      console.log(data);
      this.loading = false;
      if (event) {
        event.target.complete();
      }
    });
  }

  getAge(str: string) {
    return new Date().getFullYear() - Number(str.substr(0, 4));
  }

  async editStaff(item) {
    const modal = await this.modalController.create({
      component: CreateStaffPage,
      componentProps: { staff: item }
    });

    const r = await modal.present();
    const { data } = await modal.onDidDismiss();
    item = data.data;
    console.log(data);
    return r;
  }
  async addStaff() {
    const modal = await this.modalController.create({
      component: CreateStaffPage,
      componentProps: {}
    });
    const r = await modal.present();
    const { data } = await modal.onDidDismiss();
    if (data.data.id) {
      this.staffs.push(data.data);
      console.log(data);
    }
    return await modal.present();
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

  deleteStaff(item) {
    this.presentLoading();
    this.service.delete(item, 'staff').subscribe(res => {
      console.log(res);
      setTimeout(() => {
        this.loadingC.dismiss();
      }, 500);
      if (res) {
        this.staffs.splice(this.staffs.findIndex((element: any) => element.id === item.id), 1);
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
