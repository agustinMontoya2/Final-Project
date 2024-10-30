// /@types/googlemaps.d.ts
declare namespace google {
    namespace maps {
      interface MapOptions {
        center: LatLng | LatLngLiteral;
        zoom: number;
        mapId?: string;
      }
      
      interface LatLng {
        lat: number;
        lng: number;
      }
      
      interface LatLngLiteral {
        lat: number;
        lng: number;
      }
  
      class Map {
        constructor(mapDiv: HTMLElement, opts: MapOptions);
      }
      
      // Agrega más interfaces y clases según sea necesario
    }
  }
  