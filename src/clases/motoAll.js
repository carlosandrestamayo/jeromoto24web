//import { tipo } from "src/models/tipo";

export class MotoAll {
    constructor(obj = { id: 0, name: '',color:'',tipoId:0,personaId:0 }) {
        this.id = obj.id;
        this.name = obj.name;
        this.color = obj.color;
        this.tipoId	= obj.tipoId;
        this.personaId = obj.personaId;
        this.personaName = obj.personaName;
        
    }

    static url(){
        return "http://localhost/apijm/backend/moto.php"
    }

    /*static columns2() {
        return [
            {
                name: 'name',
                required: true,
                label: 'Placa',
                align: 'left',
                field: row => row.name,
                format: val => `${val}`,
                sortable: null
            },
            //{ name: 'id', align: 'left', label: 'Id', field: 'id', sortable: false },
            { name: 'color', align: 'left', label: 'Color', field: 'color', sortable: false },
            //{ name: 'tipoId', align: 'left', label: 'Tipo Id', field: 'tipoId', sortable: false },
            { name: 'tipoName', align: 'left', label: 'Referencia', field: row=> row.tipo.name, sortable: false },
            { name: 'personaName', align: 'left', label: 'Persona', field: row=> row.persona.nombre, sortable: false },
            //{ name: 'personaId', align: 'left', label: 'Persona Id', field: "personaId", sortable: false },
        ]
    }*/

    static columns() {
        return [
            {
                name: 'name',
                required: true,
                label: 'Placa',
                align: 'left',
                field: row => row.name,
                format: val => `${val}`,
                sortable: null
            },
            //{ name: 'id', align: 'left', label: 'Id', field: 'id', sortable: false },
            { name: 'color', align: 'left', label: 'Color', field: 'color', sortable: false },
            //{ name: 'tipoId', align: 'left', label: 'Tipo Id', field: 'tipoId', sortable: false },
            { name: 'tipoName', align: 'left', label: 'Referencia', field: 'tipoName', sortable: false },
            { name: 'marcaName', align: 'left', label: 'Marca', field: 'marcaName', sortable: false },
            { name: 'personaNombre', align: 'left', label: 'Propietario', field: 'personaNombre', sortable: false },
            //{ name: 'personaId', align: 'left', label: 'Persona Id', field: "personaId", sortable: false },
        ]
    } 

    static columnsPersona(){
        return [
            {
                name: 'name',
                required: true,
                label: 'Nombre',
                align: 'left',
                field: row => row.name,
                format: val => `${val}`,
                sortable: null
            },
            //{ name: 'id', align: 'left', label: 'Id', field: 'id', sortable: false },
            { name: 'nombre', align: 'left', label: 'Nombre', field: 'nombre', sortable: false },
            /*{ name: 'telefono', align: 'left', label: 'Telefono', field: 'telefono', sortable: false },
            { name: 'direccion', align: 'left', label: 'Direccion', field: 'direccion', sortable: false },
            { name: 'correo', align: 'left', label: 'Direccion', field: 'correo', sortable: false },*/
        ]
    }
}