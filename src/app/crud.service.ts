import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CrudService {

    private link = 'http://localhost:8090/api/';
    constructor(public http: HttpClient) {
      console.log('Hello JoueurProvider Provider');
    }

    public getAll(url): Observable<object[]> {
        return this.http.get<object[]>(this.link  +  url  +  's');
    }

    public add(obj, url): Observable<{success: boolean}> {
        return this.http.post<{success: boolean}>(this.link + url, obj);
    }

    public update(obj, url): Observable<object> {
        return this.http.put<object>(this.link + url, obj);
    }

    public getById(id: number, url): Observable<object> {
        return this.http.get<object>(this.link + url + '/' + id);
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
      return this.http.delete<boolean>(this.link  +  url + '/' + obj.id);
    }


    postFile(fileToUpload: File): Observable<string> {
        const httpOptions = {
          headers: new HttpHeaders({
            'x-access-token': localStorage.getItem('accessToken') || '' })
        };
        const endpoint = 'http://localhost:8090/upload';
        const formData: FormData = new FormData();
        formData.append('file', fileToUpload);
        console.log(fileToUpload);
        console.log(formData);
        return this.http.post<string>(endpoint, formData);
      }
}
