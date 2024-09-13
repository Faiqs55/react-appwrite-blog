import { Client, Databases, Storage, ID, Query } from "appwrite";

export class Services {
     client = new Client();
     database;
     storage;

     constructor() {
        this.client
        .setEndpoint(import.meta.VITE_APPWRITE_URL)
        .setProject(import.meta.VITE_APPWRITE_PROJECT_ID);

        this.database = new Databases(this.client);
        this.storage = new Storage(this.client);
     }

    //  CREATE POST 
    async createPost({title, slug, content, featuredImg, status, userId}) {
        try {
            return await this.database.createDocument(
                import.meta.VITE_APPWRITE_DATABASE_ID,
                import.meta.VITE_APPWRITE_COLLECTION_ID,
                slug,
                {
                    title,
                    content,
                    featuredImg,
                    status,
                    userId
                }
            )
        } catch (error) {
            throw error;
        }
    }

    // UPDATE POST 
    async updatePost(slug, params) {
        try {
            return await this.database.updateDocument(
                import.meta.VITE_APPWRITE_DATABASE_ID,
                import.meta.VITE_APPWRITE_COLLECTION_ID,
                slug,
                {
                    ...params
                }
            )
        } catch (error) {
            throw error;
        }
    }

    // DELETE POST 
    async deletePost(slug) {
        try {
            return await this.database.deleteDocument(
                import.meta.VITE_APPWRITE_DATABASE_ID,
                import.meta.VITE_APPWRITE_COLLECTION_ID,
                slug
            )
        } catch (error) {
            throw error;
        }
    }

    // GET SINGLE POST 
    async getSinglePost(slug) {
        try {
            return await this.database.getDocument(
                import.meta.VITE_APPWRITE_DATABASE_ID,
                import.meta.VITE_APPWRITE_COLLECTION_ID,
                slug
            )
        } catch (error) {
            throw error;
        }
    }

    // GET ALL POSTS 
    async getAllPost(queries = [Query.equal('status', 'active')]) {
        try {
            return await this.database.listDocuments(
                import.meta.VITE_APPWRITE_DATABASE_ID,
                import.meta.VITE_APPWRITE_COLLECTION_ID,
                queries
            )
        } catch (error) {
            throw error;
        }
    }

    // UPLOAD FILE/IMAGE
    async uploadFile (file) {
        try {
            return await this.storage.createFile(
                import.meta.VITE_APPWRITE_BUCKET_ID,
                ID.unique(),
                file
            )
        } catch (error) {
            throw error;
        }
    }

    // DELETE FILE/IMAGE
    async deleteFile(id) {
        try {
            return await this.storage.deleteFile(
                import.meta.VITE_APPWRITE_BUCKET_ID,
                id
            )
        } catch (error) {
            throw error
        }
    }

    // PREVIEW FILE/IMAGE 
    async getFilePreview(id) {
        return this.storage.getFilePreview(
            import.meta.VITE_APPWRITE_BUCKET_ID,
            id
        )
    }
};

const service = new Services();

export default service;

