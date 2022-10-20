export default class GridHelpers {
    static eifRowHasOneTarAssociated( row ) {
        return row.entity.tarId !== null && row.entity.tarId !== "" ? true : false;
    }
}