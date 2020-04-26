import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { UserOptions } from '../interfaces/user-options';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
const   apiUrl: string = environment.apiUrl;
//const   domain: string = environment.domain;

@Injectable({
  providedIn: 'root'
})
export class UserData {
  private link =apiUrl;
  httpOptions = {
    headers: new HttpHeaders({
      'authorization':  'Bearer '+localStorage.getItem('access_token'),
      'Content-Type' : 'application/json'
    })
  }
  favorites: string[] = [];
  HAS_LOGGED_IN = 'hasLoggedIn';
  HAS_SEEN_TUTORIAL = 'hasSeenTutorial';
  ACCESS_TOKEN = 'access_token' ;
  CURRENT_USER = 'current-user'
  constructor(
    public http: HttpClient, 
    public storage: Storage
  ) {

   }

  hasFavorite(sessionName: string): boolean {
    return (this.favorites.indexOf(sessionName) > -1);
  }

  addFavorite(sessionName: string): void {
    this.favorites.push(
      
    );
  }

  removeFavorite(sessionName: string): void {
    const index = this.favorites.indexOf(sessionName);
    if (index > -1) {
      this.favorites.splice(index, 1);
    }
  }

  login(obj): Observable<any> {
    return this.http.post(apiUrl+'auth/signin',obj,this.httpOptions); 
      //return window.dispatchEvent(new CustomEvent('user:login'));
    }

  signup(obj): Observable<any> {
    return this.http.post(apiUrl+'/auth/signup',obj , this.httpOptions); 
      //return window.dispatchEvent(new CustomEvent('user:login'));
    }

  logout(): Promise<any> {
    return this.storage.remove(this.HAS_LOGGED_IN).then(() => {

      return this.storage.remove('username');
    }).then(() => {
      localStorage.removeItem('access_token')

      window.dispatchEvent(new CustomEvent('user:logout'));
    });
  }

  setUsername(username: string): Promise<any> {
    return this.storage.set('username', username);
  }
  setCurrentUser(user): Promise<any> {
    return this.storage.set(this.CURRENT_USER, user);
  }
  setAccessToken(token): Promise<any>{
    return this.storage.set(this.ACCESS_TOKEN, token);
  }
  getCurrentUser(): Observable<UserData> {
    return this.http.get<UserData>(apiUrl+'auth/currentUser'
    ,this.httpOptions
    ); 
  }

  getAccessToken(): Promise<string> {
    return this.storage.get(this.ACCESS_TOKEN).then((value) => {
      return value;
    });
  }

  getUsername(): Promise<string> {
    return this.storage.get('username').then((value) => {
      return value;
    });
  }

  isLoggedIn(): Promise<boolean> {
    return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
      return value === true;
    });
  }

checkHasSeenTutorial(): Promise<string> {
    return this.storage.get(this.HAS_SEEN_TUTORIAL).then((value) => {
      return value;
    });
  }

  
}
