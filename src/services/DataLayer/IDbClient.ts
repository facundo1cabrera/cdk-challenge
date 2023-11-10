export interface IDbClient {
    create(item: any);
    getOneById(id: string);
    deleteById(id: string);
    update(id: string, body: any);
    getAll();
}