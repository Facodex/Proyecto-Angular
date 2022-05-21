import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  public widthSlider : any;
  public anchuraToSlider: any;
  public autor : any;

  //usando VIEWCHILD
  @ViewChild('textos', {static: true}) textos:any;

  constructor() { 
    
  }

  ngOnInit(): void {
    console.log(this.textos.nativeElement.innerHTML);
  }


  // Metodo para el evento de enviar datos de padre a hijo
  cargarSlider(){
    this.anchuraToSlider = this.widthSlider;
  }

  resetearSlider(){
    this.anchuraToSlider = false;
  }

  // Metodo para el evento de traer datos de hijo a padre
  getAutor(event : any){
    this.autor = event;
    console.log(this.autor);
  }

}


