import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserData } from '../../providers/user-data';

import { UserOptions } from '../../interfaces/user-options';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';



@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
  styleUrls: ['./signup.scss'],
})
export class SignupPage {
  signup: UserOptions = { username: '', password: '' , name : '' , email : '' , roles :['ROLE_USER'] };
  submitted = false;
  HAS_LOGGED_IN = 'hasLoggedIn';

  constructor(
    public router: Router,
    public userData: UserData,
    public storage: Storage,
   public toastController: ToastController,

  ) {}

  onSignup(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
     
     this.userData.signup(this.signup).subscribe((data)=>{
    //  this.userData.setAccessToken(data.accessToken);
    console.log(data); 
      this.storage.set(this.HAS_LOGGED_IN, true).then(() => {
        window.dispatchEvent(new CustomEvent('user:signin'));
      });
    },async (err)=>{
      const toast = await this.toastController.create({
        message: err.message,
        duration: 3000,
        position: 'top',
       // color :'danger'
      });
      toast.present();
    });
    //this.router.navigateByUrl('/app/tabs/schedule');
    this.router.navigateByUrl('/login');

  }
     
     
     
      // this.userData.signup(this.signup.username);
      // this.router.navigateByUrl('/app/tabs/schedule');
    }
  
}
