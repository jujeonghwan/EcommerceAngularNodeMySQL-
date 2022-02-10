import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ProjectModelServer, projectsResponse } from '../models/response.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  // SERVER_URL = 'http://localhost:3000/api';
  SERVER_URL = environment.SERVER_URL;

  constructor(
    private http: HttpClient
  ) { }


  /* Get all projects from the backend */
  getAllProjects(numberOfLimit: number = 10, page: number = 1): Observable<projectsResponse> {
    return this.http.get<projectsResponse>(this.SERVER_URL + '/project', {
      params: {
        limit: numberOfLimit.toString(),
        page: page.toString()
      }
    });
  }



}
