export class Tipo {
    constructor(obj = { id: 0, name: '',marcaId:0 }) {
        this.id = obj.id;
        this.name = obj.name;
        this.marcaId = obj.marcaId 
    }
    
    static url(){
        return "http://localhost/apijm/backend/tipo.php"
    }

    static columns() {
        return [
            {
                name: 'name', 
                required: true,
                label: 'Referencia',
                align: 'left',
                field: row => row.name,
                format: val => `${val}`,
                sortable: null
            },
            //{ name: 'id', align: 'left', label: 'Id', field: 'id', sortable: false },
            { name: 'marcaName', align: 'left', label: 'Marca', field:'marcaName', sortable: false }
        ]
    }
}