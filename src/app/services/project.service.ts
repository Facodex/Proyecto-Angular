//servicio de mi componente project
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../models/project';
import { Global } from './global';


//aqui le digo que esto va a ser un servicio que voy a estar injectando
@Injectable()
export class ProjectService{
    public url : string;

    constructor(
        
        private _http : HttpClient

    ){
        this.url = Global.url;

    }

    // metodo de prueba 

    testService(){
        return 'Probando el servicio de angular';
    }

    //metodo para guardar proyecto (documento) en la base de datos
    // importantisimo el <any>
    saveProject(project: Project) :Observable<any>{
       let params = JSON.stringify(project);
       let headers = new HttpHeaders().set('Content-Type', 'application/json'); 

    //    aqui nuestra peticion por post 
    return this._http.post(this.url+'save-project', params, {headers: headers});
    }

    // metodo para traer los proyectos y listarlos
    getProjects(): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.get(this.url+'projects',{headers : headers});
    }

    //metodo para sacar los proyectos de a uno en una pagina a parte VEAMOS COMO USAMOS GET
    getProject(id:any) : Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.get(this.url+'project/'+id, {headers : headers});

    }

    //metodo para borrar los proyectos VEAMOS COMO USAMOS DELETE 
    deleteProject(id:any): Observable<any> {
        
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.delete(this.url+'project/'+id, {headers : headers});

    }

    //metodo para editar la info de nuestros proyectos
    updateProject(project : any): Observable<any> {
        let params = JSON.stringify(project);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.put(this.url+'project/'+project._id, params, {headers : headers});

    }

}

