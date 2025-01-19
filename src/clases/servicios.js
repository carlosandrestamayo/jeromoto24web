export class Orden {
    constructor(obj = { id: 0, km: '0',servicioTallerId:0,servicioTallerName:'',solicitado:false,realizado:false,ordenId:0 }) {
        this.id = obj.id;
        this.servicioTallerId = obj.servicioTallerId;
        this.servicioTallerName = obj.servicioTallerName;
        this.solicitado = obj.solicitado;
        this.realizado = obj.realizado;
        this.ordenId = obj.motoId;
    }
    
    static url(){
        return "http://localhost/apijm/backend/orden.php"
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
            { name: 'marcaName', align: 'left', label: 'Marca', field: row=> row.marca.name, sortable: false }
        ]
    }
}