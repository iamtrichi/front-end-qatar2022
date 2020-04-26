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
  headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
  httpOptions = {
    headers: new HttpHeaders({
    'authorization':  'Bearer '+localStorage.getItem('access_token') , 
    //'Content-Type': '*' ,
  //'Content-Type': 'application/json; charset=utf-8',
  })
  }

    private link = apiUrl;
    constructor(public http: HttpClient) {
      console.log('Hello JoueurProvider Provider');
    }
    public getAll(url): Observable<any[]> {
        return this.http.get<any[]>(this.link  +  url  +  's',this.httpOptions);
    }

    public add(obj, url): Observable<{success: boolean}> {
        return this.http.post<{success: boolean}>(this.link +  url, obj,this.httpOptions);
    }

    public update(obj, url): Observable<object> {
        return this.http.put<object>(this.link +url, obj,this.httpOptions);
    }

    public getById(id: number, url): Observable<object> {
        return this.http.get<object>(this.link + url + '/' + id,this.httpOptions);
    }

    public delete(obj, url): Observable<boolean> {
      const reqOpts = {
        params: new HttpParams()
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
      return this.http.delete<boolean>(this.link  +   url + '/' + obj.id,this.httpOptions);
    }


    postFile(fileToUpload: File): Observable<string> {
        const httpOptions = {
          headers: new HttpHeaders({
            'x-access-token': localStorage.getItem('access_token') || '' })
        };
        const endpoint = 'http://localhost:8090/upload';
        const formData: FormData = new FormData();
        formData.append('file', fileToUpload);
        console.log(fileToUpload);
        console.log(formData);
        return this.http.post<string>(endpoint, formData,this.httpOptions);
      }
}
