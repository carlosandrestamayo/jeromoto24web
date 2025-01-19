export class Persona {
    constructor(obj = { id: 0, name: '',nombre:'',telefono:'',telefono2:'',direccion:'',correo:'',rol:0,rolId:1,roles:{id:1,rol:'0001'} }) {
        this.id = obj.id;
        this.name = obj.name;
        this.nombre = obj.nombre;
        this.telefono = obj.telefono;
        this.telefono2 = obj.telefono2;
        this.direccion = obj.direccion;
        this.correo = obj.correo;
        this.rol = obj.rol;
        this.rolId = obj.rolId;
        this.roles = obj.roles;
        this.arrRoles = obj.roles.rol.split("").map(n=>{ return n*1});
    }

    static config() { 
        return {
            listaName: "listaPersonas", key: "name", keySort: "nombre"
        }
    }

    static url(){
        return "http://localhost/apijm/backend/persona.php"
    }

    static columns() {
        return [
            {
                name: 'name',
                required: true,
                label: 'Nit',
                align: 'left',
                field: row => row.name,
                format: val => `${val}`,
                sortable: null
            },
            //{ name: 'id', align: 'left', label: 'Id', field: 'id', sortable: false },
            { name: 'nombre', align: 'left', label: 'Nombre', field: 'nombre', sortable: false },
            { name: 'telefono', align: 'left', label: 'Telefono 1', field: 'telefono', sortable: false },
            { name: 'telefono2', align: 'left', label: 'Telefono 2', field: 'telefono2', sortable: false },
            { name: 'direccion', align: 'left', label: 'Direccion', field: 'direccion', sortable: false },
            { name: 'correo', align: 'left', label: 'Correo', field: 'correo', sortable: false },
            { name: 'uid', align: 'left', label: 'Uid', field: 'uid'},
            { name: 'pwd', align: 'left', label: 'Pwd', field: 'pwd'},
            //{ name: 'rol', align: 'left', label: 'Tecnico', field: 'rol', sortable: false },
        ]
    }
}