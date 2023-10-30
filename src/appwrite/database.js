import config from '../config/config'
import {Client, ID, Databases} from 'appwrite'

export class AppwriteService{
    client = new Client();
    database;
    constructor(){
        this.client
        .setEndpoint(config.appwrite_url)
        .setProject(config.appwrite_project_id);
    this.database = new Databases(this.client);
    }
    async createDatabase({todo}){
        try {
            return await this.database.createDocument(config.appwrite_database_id, config.appwrite_collection_id, ID.unique(), {todo})
        } catch (error) {
            throw error
        }
    }
    async listDatabase(){
        try {
            return await this.database.listDocuments(config.appwrite_database_id, config.appwrite_collection_id)
        } catch (error) {
            throw error
        }
    }
    async deleteDatabase(id){
        try {
            return await this.database.deleteDocument(config.appwrite_database_id, config.appwrite_collection_id, id)
        } catch (error) {
            throw error
        }
    }
    // async updateDatabase(id){
    //     try {
    //         return await this.database.updateDocument(config.appwrite_database_id, config.appwrite_collection_id,id)
    //     } catch (error) {
    //         throw error
    //     }
    // }
}

const appwriteService = new AppwriteService;

export default appwriteService;