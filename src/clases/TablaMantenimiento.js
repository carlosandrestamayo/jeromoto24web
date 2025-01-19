export class TablaMantenimiento {
    constructor(obj = { id: 0, km: 0,tipoId:0,name:'',servicioTallerId:0,medible:0 }) {
        this.id = obj.id;
        this.km = obj.km;
        this.tipoId = obj.tipoId;
        this.name = obj.name;  
        this.servicioTallerId = obj.servicioTallerId;
        this.medible = obj.medible;
    }

    static url(){
        return "http://localhost/apijm/backend/tablamantenimiento.php"
    }
    
    static columns() {
        return [
            {
                name: 'name',
                required: true,
                label: 'Servicio Taller',
                align: 'left',
                field: row => row.name,
                format: val => `${val}`,
                sortable: null
            },
            { name: 'km', align: 'left', label: 'Kilometraje', field: 'km'},
            //{ name: 'medible', align: 'left', label: 'Medible', field: 'medible', sortable: false },
        ]
    }
}