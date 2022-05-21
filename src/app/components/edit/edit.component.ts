import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from 'src/app/services/project.service';
import { UploadService } from 'src/app/services/upload.service';
import { Global } from 'src/app/services/global';
import { Router, ActivatedRoute, Params} from '@angular/router';


@Component({
  selector: 'app-edit',
  templateUrl: '../create/create.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [ProjectService, UploadService ]
})
export class EditComponent implements OnInit {

  public title : string;
  public project : Project;
  public save_project: any; //aca le probe any
  public status : string;
  public filesToUpload : Array<File>;
  public url : string;

  constructor(
    private _projectService : ProjectService,
    private _uploadService : UploadService,
    private _route : ActivatedRoute,
    private _router : Router

  ){
    this.title = "Editar Proyecto";
    this.project = new Project('', '', '', '',2022, '', '');
    this.status = '';
    this.filesToUpload = new Array();
    this.url = Global.url;
  }


  ngOnInit() :void{
    this._route.params.subscribe(params => {
      // let id = params.id;
      let id = params['id'];


      this.getProject(id);
    });
  }

  getProject(id : any){
    this._projectService.getProject(id).subscribe(
      response => {
        this.project = response.project;
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  //metodo onsubmit para recoger los nuevos datps del proyecto editado 
  onSubmit(form:any){
    this._projectService.updateProject(this.project).subscribe(
      response=>{
        if(response.project){
          

          if(this.filesToUpload){
            //en este momento subo la imagen
            this._uploadService.makeFileRequest(Global.url+'upload-image/'+response.project._id, [], this.filesToUpload, 'image')
            .then((result:any) =>{
            this.save_project = result.project;

            this.status = 'succes';
          });
          }else{
            this.save_project = response.project;
            this.status = 'succes';
          }
          
        }else{
          this.status = 'failed';
        }
      },
      error =>{
        console.log(<any>error);
      }
    );
  }

  //metodo para controlar la subida correcta de la img
  // Atencion de como definimos el array muy importante
  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

}
