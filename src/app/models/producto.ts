export interface Producto {
    id_prod?:          number;
    nom_prod:         string;
    descrip_prod:     string;
    precio_unit_prod: number;
    stock_prod?:       number;
    nota_prod:        string;
    estado_prod:      string;
    id_cat:           number;
    nom_cat?:         string;
    nom_producto?:    string;
    gm_ref?:          number;
    cant_img?:        number;
}
