//este sera un servicio para subir imagenes
import { Injectable } from "@angular/core";
import { Global } from "./global";

@Injectable()
export class UploadService{
    public url : string;

    constructor(){
        this.url = Global.url;
    }

//metodo que nos permitira hacer una peticion ajax clasica y adjuntar un archivo para subir
    makeFileRequest(url : string, params : Array<string>, files: Array<File>, name: string){

        return new Promise(function(resolve, reject){
            var formData = new FormData();
            var xhr = new XMLHttpRequest();

            for(var i = 0 ; i < files.length; i++){
                formData.append(name, files[i], files[i].name);
            }

            // aqui la peticion ajax 
            xhr.onreadystatechange = function(){
                if(xhr.readyState ==4){
                    if(xhr.status == 200){
                        resolve(JSON.parse(xhr.response));
                    }else{
                        reject(xhr.response);
                    }
                }
            }

            // peticion por post 
            xhr.open('POST', url, true);
            xhr.send(formData);
        });
    }
}
