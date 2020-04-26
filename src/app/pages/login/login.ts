import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

import { UserData } from '../../providers/user-data';

import { ToastController } from '@ionic/angular';



@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  styleUrls: ['./login.scss'],
})
export class LoginPage {
  login:any =   { usernameOrEmail: '', password: '' };
  submitted = false;
  HAS_LOGGED_IN = 'hasLoggedIn';

  constructor(
    public userData: UserData,
    public router: Router,
    public toastController: ToastController,
    public storage: Storage

  ) { }

  onLogin(form: NgForm) {
    this.submitted = true;
    console.log('here')
   // if (form.valid) {
      this.userData.login(this.login).subscribe( (data)=>{
        console.log(data.accessToken)
        localStorage.setItem('access_token' ,data.accessToken);
        this.storage.set(this.HAS_LOGGED_IN, true).then(async () => {
          window.dispatchEvent(new CustomEvent('user:signup'));
          const toast = await this.toastController.create({
            message: 'Successful login !! ',
            duration: 3000,
            position: 'top',
            color :'success'
          });
          toast.present();
        });
      },async (err)=>{
        const toast = await this.toastController.create({
          message: "Invalid username or password",
          duration: 3000,
          position: 'top',
          color :'danger'
        });
        toast.present();
      });
      this.router.navigateByUrl('/app/tabs/matche');

      //this.router.navigateByUrl('/app/tabs/schedule');
    //}
  }
 

  onSignup() {
    this.router.navigateByUrl('/signup');
  }
}
