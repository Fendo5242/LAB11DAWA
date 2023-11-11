import { Component, NgModule } from '@angular/core';
import { Tienda } from 'src/app/models/tienda';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TiendaService } from 'src/app/services/tienda.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';


interface MarkerProperties {
  position: {
    lat: number;
    lng: number;
  };
  label: {
    color: string;
    text: string;
    fontSize: string;
    fontWeight: string;
  };
  title: string;
  info: string;
}

@NgModule({
  imports: [ReactiveFormsModule],
})
export class TiendasModule {}

@Component({
  selector: 'app-tiendas',
  templateUrl: './tiendas.component.html',
  styleUrls: ['./tiendas.component.css'],
})

export class TiendasComponent {

  markers: MarkerProperties[] = []; // Declaración de la propiedad markers

  ngOnInit() {
    this.getListaTiendas();
  }

  mapOptions: google.maps.MapOptions = {
    center: { lat: -12.03581, lng: -76.958392 },
    zoom: 15,
    mapTypeControl: false
  };

  handleMapInitialized(map: google.maps.Map) {
    console.log('Mapa inicializado correctamente');
    this.markers.forEach((marker: MarkerProperties) => {
      new google.maps.Marker({
        position: marker.position,
        label: marker.label,
        map,
      });
    });
  }

  listTiendas: Tienda[] = [];

  tiendaForm: FormGroup;

  constructor(private fb: FormBuilder,
              private router: Router,
              private _tiendaService: TiendaService){
    this.tiendaForm = this.fb.group({
        lat:  ['', Validators.required],
        lng: ['', Validators.required],
        title: ['', Validators.required],
        info:    ['', Validators.required]
    })
  }

  agregarTienda() {
    const nuevaTienda: Tienda = {
      lat: this.tiendaForm.get('lat')?.value,
      lng: this.tiendaForm.get('lng')?.value,
      title: this.tiendaForm.get('title')?.value,
      info: this.tiendaForm.get('info')?.value,
    };

    console.log(nuevaTienda);

    Swal.fire({
      title: 'Creación de Tienda',
      text: '¿Desea crear la tienda?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this._tiendaService.guardarTienda(nuevaTienda).subscribe(data => {
          console.log(data);
          this.getListaTiendas();
          this.limpiarFormulario();
          this.actualizarMapaConMarcadores();
        });
      }
    });
  }

  limpiarFormulario() {
    this.tiendaForm.reset();
  }

  actualizarMapaConMarcadores() {
    this.markers = [];

    this.listTiendas.forEach((tienda: Tienda) => {
      const markers: MarkerProperties = {
        position: { lat: tienda.lat, lng: tienda.lng },
        label: { color: 'black', text: tienda.title, fontSize: '20px', fontWeight: 'bold' },
        title: tienda.title,
        info: tienda.info,
      };
      
      this.markers.push(markers);
    });
  }

  getListaTiendas() {
    this._tiendaService.getTiendas().subscribe(data => {
      this.listTiendas = data;
      this.actualizarMapaConMarcadores();
    });
  }

  eliminarTienda(id: string | undefined) {
    if (id) {
      this._tiendaService.eliminarTienda(id).subscribe(
        () => {
          this.getListaTiendas();
          this.actualizarMapaConMarcadores();
        },
        (error) => {
          console.error('Error al eliminar la tienda:', error);
        }
      );
    } else {
      console.warn('El ID de la tienda es undefined o null');
    }
  }
}
