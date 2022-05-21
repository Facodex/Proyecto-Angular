import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/project.service';
import { Global } from 'src/app/services/global';
import { newArray } from '@angular/compiler/src/util';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  providers: [ProjectService]
})
export class ProjectsComponent implements OnInit {
  public projects : Project[];
  public url : string;

  constructor(
    private _projectService : ProjectService
  ) { 
    this.projects = new Array();
    this.url = Global.url;
  }

  ngOnInit(){
    this.getProjects();
  }

  // metodo para traer y enlistar los projectos (lo usamos con el servicio get project tambien que traemos de project.service )
  getProjects(){
    this._projectService.getProjects().subscribe(
      response =>{
        if(response.projects){
          this.projects = response.projects;
        }
      },
      error =>{
        console.log(<any>error);
      }
    );
  }

}
