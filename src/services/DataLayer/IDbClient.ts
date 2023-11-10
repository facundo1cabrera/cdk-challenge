export interface IDbClient {
    create(item: any);
    getById(id: string);
    deleteById(id: string);
    update(id: string, body: any);
    getAll();
}