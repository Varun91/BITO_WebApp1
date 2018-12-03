import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
 
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' ,
              "Access-Control-Allow-Origin":"*"})
};
 
@Injectable()
export class DemoService {
 
    constructor(private http:HttpClient) {}
 
    getMetrics() {
        return this.http.get('http://localhost:5000/');
    }

    getMetricsTable2() {
        return this.http.get('http://localhost:5000/getmetrics');
    }
    saveMetrics(metrics: any){
        return this.http.post('http://localhost:5000/savemetrics', {'metrics' : metrics}, httpOptions);
    }

}

