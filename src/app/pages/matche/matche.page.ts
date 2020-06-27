import { Component, OnInit, ViewChild } from '@angular/core';
import { IonList, AlertController, LoadingController, ModalController, IonRouterOutlet, ToastController, Config, PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';
import { CrudService } from '../../crud.service';
import { CreateMatchePage } from '../create-matche/create-matche.page';
import { MatcheDetailPage } from '../matche-detail/matche-detail.page';

@Component({
  selector: 'app-matche',
  templateUrl: './matche.page.html',
  styleUrls: ['./matche.page.scss'],
})
export class MatchePage implements OnInit {

  @ViewChild('scheduleList', { static: true }) scheduleList: IonList;

  ios: boolean;
  dayIndex = 0;
  queryText = '';
  segment = 'all';
  excludeTracks: any = [];
  shownSessions: any = [];
  groups: any = [];
  groups0: any = [];
  confDate: string;
  showSearchbar: boolean;
  initialItems = [];
  currDate = new Date();
  loadingC;
  loading;

  constructor(
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public router: Router,
    public routerOutlet: IonRouterOutlet,
    public toastController: ToastController,
    public config: Config,
    public crud: CrudService) {
      //
      this.groups.push({date: '', arr: []});
    }

  ngOnInit() {
    this.updateSchedule();

    this.ios = this.config.get('mode') === 'ios';
  }

  matchDate(date): number {
    for (let index = 0; this.groups.length > index; index++) {
      if (this.dateCmp(this.groups[index].date, date)) {
        return index;
      }
    }
    return -1;
  }
  updateSchedule(ev?) {
    // if (this.scheduleList) {
    //   this.scheduleList.closeSlidingItems();
    // }
    if (ev) {
      console.log(ev);
    }
    // Reset items back to all of the items
    this.crud.getAll('match').subscribe(items => {

      console.log(items)
      // if the value is an empty string don't filter the items
      if (this.queryText && this.queryText.trim() !== '') {
        items = items.filter((item: any) => {
          return (item.equipeA.nomEquipe.toLowerCase().indexOf(this.queryText.toLowerCase()) > -1) ||
          (item.equipeB.nomEquipe.toLowerCase().indexOf(this.queryText.toLowerCase()) > -1);
        });
      }
      this.initialItems = items;
      this.groups = [];
      console.log('matchs', this.initialItems);
      this.initialItems.forEach(element => {
        const index = this.matchDate(element.date);
        // console.log(index,element.date);
        if (index !== -1) {
          this.groups[index].arr.push(element);
        } else {
          this.groups.push({date: element.date, arr: new Array(element)});
        }
      });
      this.groups = this.groups.sort((a, b) => {
        const a1 = new Date(a.date);
        const b1 = new Date(b.date);
        console.log(b1.getMonth());
        if (a1.getTime() === b1.getTime()) {
          return 0;
        } else if (a1.getTime() > b1.getTime()) {
          return 1;
        } else {
          return -1;
        }
      });
      this.groups0 = this.groups;
      // setTimeout(() => {
      //   // your code to be executed after 1 second
      //   try {
      //     document.getElementById('today').scrollIntoView();
      //   } catch (error) {
      //     console.log(error);
      //   }
      // }, 1000);
      // console.log('events',this.events);
      }, async err => {
        const toast = await this.toastController.create({
          message: err.message,
          duration: 3000,
          position: 'top'
        });
        toast.present();
      });
    }


  gotColor(item): string {
    if (item.scoreA > item.scoreB) {
      return 'services';
    } else if (item.scoreA < item.scoreB) {
      return 'documentation';
    }
    return 'workshop';
  }
  dateCmp(dateToCmp1, dateToCmp2?): boolean {
    dateToCmp1 = new Date(dateToCmp1);
    if (dateToCmp2) {
      dateToCmp2 = new Date(dateToCmp2);
      const m = dateToCmp2.getMonth() + 1;
      dateToCmp2 = dateToCmp2.getFullYear() + '/' + m + '/' + dateToCmp2.getDate();
    } else {
      dateToCmp2 = this.currDate;
    }
    return dateToCmp1.getFullYear() + '/' + Number(dateToCmp1.getMonth() + 1) + '/' + dateToCmp1.getDate() === dateToCmp2;
  }


  async presentLoading() {
    this.loadingC = await this.loadingCtrl.create({
      message: 'Please wait...'
    });
    this.loadingC.present();
    console.log('Loading dismissed!');
  }


  ionViewDidEnter() {
    this.ngOnInit();
  }


  async editMatch(item) {
    const modal = await this.modalCtrl.create({
      component: CreateMatchePage,
      componentProps: { match: item }
    });

    const r = await modal.present();
    const { data } = await modal.onDidDismiss();
    item = data.data;
    console.log(data);
    return r;
  }
  async addMatch() {
    const modal = await this.modalCtrl.create({
      component: CreateMatchePage,
      componentProps: {}
    });
    const r = await modal.present();
    const { data } = await modal.onDidDismiss();
    if (data && data.data.id) {
      this.ngOnInit();
      console.log(data);
    }
    return r;
  }

  async show(item) {
    const modal = await this.modalCtrl.create({
      component: MatcheDetailPage,
      // tslint:disable-next-line:object-literal-shorthand
      componentProps: { item: item, type: 'match' }
    });
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

  deleteMatch(item) {
    this.presentLoading();
    this.crud.delete(item, 'match').subscribe(res => {
      console.log(res);
      setTimeout(() => {
        this.loadingC.dismiss();
      }, 500);
      if (res) {
        this.ngOnInit();
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

}
