import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from 'src/app/services/project.service';
import { UploadService } from 'src/app/services/upload.service';
import { Global } from 'src/app/services/global';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  // cargo mi servicio 
  providers: [ProjectService, UploadService]
})
export class CreateComponent implements OnInit {
  public title : string;
  public project : Project;
  public save_project: any; //aca le probe any
  public status : string;
  public filesToUpload : Array<File>;
  public url : string;

  constructor(
    private _projectService : ProjectService,
    private _uploadService : UploadService

  ){
    this.title = "Crear Proyecto";
    this.project = new Project('', '', '', '',2022, '', '');
    this.status = '';
    this.filesToUpload = new Array();
    this.url = Global.url;
  }

  ngOnInit() {
  }



  

  // metodo de mi componente 
  //El metodo usa un servicio para guardar los datos del form de la vista en la base de datos
  //esto sin el any no serviria de ninguna manera
  onSubmit(form:any){
    this._projectService.saveProject(this.project).subscribe(
      response=>{
        if(response.project){
        
          //en este momento subo la imagen
          this._uploadService.makeFileRequest(Global.url+'upload-image/'+response.project._id, [], this.filesToUpload, 'image')
          .then((result:any) =>{
            this.save_project = result.project;

            this.status = 'succes';
            
            form.reset();
          });

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
