import { Client, Databases, Storage, ID, Query } from "appwrite";

export class Services {
     client = new Client();
     database;
     storage;

     constructor() {
        this.client
        .setEndpoint(import.meta.env.VITE_APPWRITE_URL)
        .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

        this.database = new Databases(this.client);
        this.storage = new Storage(this.client);
     }

    //  CREATE POST 
    async createPost({title, slug, content, featuredImg, status, userId}) {
        try {
            return await this.database.createDocument(
                import.meta.env.VITE_APPWRITE_DATABASE_ID,
                import.meta.env.VITE_APPWRITE_COLLECTION_ID,
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
    async updatePost(slug, {title, content, featuredImg, status, userId}) {        
        try {
            return await this.database.updateDocument(
                import.meta.env.VITE_APPWRITE_DATABASE_ID,
                import.meta.env.VITE_APPWRITE_COLLECTION_ID,
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

    // DELETE POST 
    async deletePost(slug) {
        try {
            return await this.database.deleteDocument(
                import.meta.env.VITE_APPWRITE_DATABASE_ID,
                import.meta.env.VITE_APPWRITE_COLLECTION_ID,
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
                import.meta.env.VITE_APPWRITE_DATABASE_ID,
                import.meta.env.VITE_APPWRITE_COLLECTION_ID,
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
                import.meta.env.VITE_APPWRITE_DATABASE_ID,
                import.meta.env.VITE_APPWRITE_COLLECTION_ID,
                queries
            )
        } catch (error) {
            throw error;
        }
    }

    // UPLOAD FILE/IMAGE
    async uploadFile (file) {
        try {
            let res = await this.storage.createFile(
                import.meta.env.VITE_APPWRITE_BUCKET_ID,
                ID.unique(),
                file
            )
            return res;
        } catch (error) {
            throw error;
        }
    }

    // DELETE FILE/IMAGE
    async deleteFile(id) {
        try {
            return await this.storage.deleteFile(
                import.meta.env.VITE_APPWRITE_BUCKET_ID,
                id
            )
        } catch (error) {
            throw error
        }
    }

    // PREVIEW FILE/IMAGE 
     getFilePreview(id) {        
        const res = this.storage.getFilePreview(
            import.meta.env.VITE_APPWRITE_BUCKET_ID,
            id
        )
        return res.href
    }
};

const service = new Services();

export default service;

