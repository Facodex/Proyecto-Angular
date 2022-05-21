import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

declare var $:any;

@Component({
  selector: 'slider', //esta es la etiqueta (siempre verificar para usar)
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  @Input() anchura: number; // para traer un valor de padre a hijo 
  @Output() conseguirAutor = new EventEmitter();   // para enviar un valor de hijo a padre 

  public autor : any;

  constructor() { 
    this.anchura = 0;
    this.autor = {
      nombre: "Facundo Benitez",
      web: "www.facodex.es",
      youtube: "No Tengo"
    }
  }

  ngOnInit(): void {

    $('#logo').click(function( e : any){
      e.preventDefault();
      $('header').css('background', 'green');
    })

    // plugin de slider 
    $('.bxslider').bxSlider({
      mode: 'fade',
      captions: true,
      slideWidth: this.anchura
    });
  }

  // Metodo para el evento de enviar datos de hijo a padre 

  lanzar(event:any){
    this.conseguirAutor.emit(this.autor);
  }


}

//utilizando jquery y plugins