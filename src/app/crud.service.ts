import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

const   apiUrl: string = environment.apiUrl;
const   domain: string = environment.domain;




@Injectable({
  providedIn: 'root'
})
export class CrudService {
  headers = new HttpHeaders().set('Content-Type', 'application/json;');
  httpOptions = {
    headers: new HttpHeaders({
    //'authorization':  'Bearer '+ localStorage.getItem('access_token') , 
    //'Content-Type': '*' ,
    'Content-Type': 'application/json;',
  })
  };

    private link = apiUrl;
    constructor(public http: HttpClient) {
      console.log('Hello JoueurProvider Provider');
    }
    public getAll(url): Observable<any[]> {
        return this.http.get<any[]>(this.link  +  url  +  's', this.httpOptions);
    }

    public add(obj, url): Observable<{success: boolean}> {
      const httpOptions = {
        headers: new HttpHeaders({
        'authorization':  'Bearer ' + localStorage.getItem('access_token') ,
        'Content-Type': 'application/json;',
      })
      };
      return this.http.post<{success: boolean}>(this.link +  url, obj, httpOptions);
    }

    public update(obj, url): Observable<object> {
      const httpOptions = {
        headers: new HttpHeaders({
        'authorization':  'Bearer ' + localStorage.getItem('access_token') ,
        'Content-Type': 'application/json;',
      })
      };
      return this.http.put<object>(this.link + url, obj, httpOptions);
    }

    public getById(id: number, url): Observable<object> {
        return this.http.get<object>(this.link + url + '/' + id, this.httpOptions);
    }

    public delete(obj, url): Observable<boolean> {
      const reqOpts = {
        params: new HttpParams()
      };

      const httpOptions = {
        headers: new HttpHeaders({
        'authorization':  'Bearer ' + localStorage.getItem('access_token') ,
        'Content-Type': 'application/json;',
      })
      };
      // Support easy query params for GET requests
      if (obj) {
        reqOpts.params = new HttpParams();
        // tslint:disable-next-line:prefer-const
        for (let k in obj) {
          if (obj.hasOwnProperty(k)) {
            // code here
            reqOpts.params = reqOpts.params.set(k, obj[k]);
          }
        }
      }
      return this.http.delete<boolean>(this.link  +   url + '/' + obj.id, httpOptions);
    }


    postFile(fileToUpload: File): Observable<string> {
      const httpOptions = {
          headers: new HttpHeaders({
          'authorization':  'Bearer ' + localStorage.getItem('access_token') ,
          'Content-Type': 'application/json;',
        })
      };
      const endpoint = 'http://localhost:8090/upload';
      const formData: FormData = new FormData();
      formData.append('file', fileToUpload);
      console.log(fileToUpload);
      console.log(formData);
      return this.http.post<string>(endpoint, formData, httpOptions);
    }
}
