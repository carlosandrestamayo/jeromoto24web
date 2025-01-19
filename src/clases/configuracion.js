export class Configuracion {
    constructor() {
        this.id = 0;
        this.razonsocial = "";
        this.actividad = ""
        this.telefono = "";
        this.telefono2 = "";
        this.direccion = "";  
        this.ciudad = "";
        this.correo = "";
    }

    static url(){
        return "http://localhost/apijm/backend/configuracion.php"
    }
    
    static columns() {
        return [
            {
                name: 'name',
                required: true,
                label: 'Marca',
                align: 'left',
                field: row => row.name,
                format: val => `${val}`,
                sortable: null
            }
        ]
    }
}