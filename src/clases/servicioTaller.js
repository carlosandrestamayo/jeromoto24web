export class ServicioTaller {
    constructor(obj = { id: 0, name: '',medible:0,ok:false }) {
        this.id = obj.id;
        this.name = obj.name;
        this.medible = obj.medible;  
        this.ok = obj.ok;
    }

    static url(){
        return "http://localhost/apijm/backend/serviciostaller.php"
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
            //{ name: 'medible', align: 'left', label: 'Medible', field: 'medible', sortable: false },
        ]
    }
}