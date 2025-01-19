export class Marca {
    constructor(obj = { id: 0, name: '' }) {
        this.id = obj.id;
        this.name = obj.name;
    }

    static url(){
        return "http://localhost/apijm/backend/marca.php"
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