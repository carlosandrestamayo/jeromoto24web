//import { tipo } from "src/models/tipo";

export class Moto {
    constructor(obj = { id: 0, name: '',color:'',tipoaceite:'',revisionaceite:'',kmpromedio:0,tipoId:0,personaId:0 }) {
        this.id = obj.id;
        this.name = obj.name;
        this.color = obj.color;
        this.tipoaceite = obj.tipoaceite;
        this.revisionaceite = obj.revisionaceite;
        this.kmpromedio = obj.kmpromedio;
        this.tipoId	= obj.tipoId;
        this.personaId = obj.personaId;
    }

    static url(){
        return "http://localhost/apijm/backend/moto.php"
    }

    static columnsNew() {
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
            { name: 'color', align: 'left', label: 'Color', field: 'color'},
            { name: 'tipoaceite', align: 'left', label: 'Tipo Aceite', field: 'tipoaceite'},
            { name: 'revisionaceite', align: 'left', label: 'Revision Aceite', field: 'revisionaceite'},
            { name: 'kmpromedio', align: 'left', label: 'Km Promedio', field: 'kmpromedio'},
            { name: 'tipoName', align: 'left', label: 'Referencia', field: row=> row.tipo.name },
            { name: 'marcaName', align: 'left', label: 'Marca', field: row=> row.marca.name},
            { name: 'personaName', align: 'left', label: 'Propietario', field: row=> row.persona.nombre}
            
        ]
    }

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
                sortable: null�      `    `y,
      ` !   //{ N`ie:('idg, alien:`'left', label: 'Id', field: 'id&, soptablg: false �,
   �        { name: #nomrre', align2 'left�� lafel;!'No]Bre',"fiedd: 'nombre', {grtablu: falsm },��       0    /*{ name: 'telegono', align: 'left�,0label: 'Tdnefono',�field: 'tel�fo.o',�sortafle: &alse },
   0  $     { na�e:!'direcciong, alion: 'left', lAbel: 'Direcciol', field> 'direccm/n', sortable: false },
            { name`7Correo'- align: 'left',$�abel: 'Direccinn', field: 'correo', sortab�e;0f!lse�y,*/
   0`   M
    u
}