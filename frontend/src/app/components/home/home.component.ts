
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { ProjectService } from './../../services/project.service';
import { ProjectModelServer, projectsResponse } from '../../models/response.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  projectList: any[] = [];

  constructor(
    private router: Router,
    private projectService: ProjectService
  ) { }

  ngOnInit(): void {

    // Get project list
    this.projectService.getAllProjects().subscribe((response: projectsResponse) => {
      this.projectList = response.projects;
      // console.log(this.projectList);
    });

    // Go to project details
    /*
    goProjectDetails(projectId: Number) {
      this.router.navigate(['/project', projectId].then());
    }
    */

  }

}

