import cofi from '../confi-appwrite/cofi.js';
import { Client, ID, Databases, Storage, Query } from 'appwrite';
export class Service {

    client = new Client();
    databases;
    bucket;
    constructor() {
        this.client
            .setEndpoint(cofi.appwriteUrl)
            .setProject(cofi.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            return await this.databases.createDocument(
                cofi.appwriteDatabaseId,
                cofi.appwriteCollectionId,
                slug, {
                title,
                content,
                featuredImage,
                status,
                userId,
            }
            )

        } catch (error) {
            console.log("Appwrite servive::createPost::error", error);
        }

    }

    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            return await this.databases.updateDocument(
                cofi.appwriteDatabaseId,
                cofi.appwriteCollectionId,
                slug, {
                title,
                content,
                featuredImage,
                status
            }
            )

        } catch (error) {
            console.log("Appwrite Service:: updatePost::error", error);

        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                cofi.appwriteDatabaseId,
                cofi.appwriteCollectionId,
                slug
            )
            return true;
        } catch (error) {
            console.log("Appwrite Service:: deletePost::error", error);
            return false;
        }
    }

    async getPost(slug) {
        try {
            return await this.getDocument(
                cofi.appwriteDatabaseId,
                cofi.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("Appwrite Servivce::getPost::error", error);
            return false

        }
    }

    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                cofi.appwriteDatabaseId,
                cofi.appwriteCollectionId,
                queries,

            )
        } catch (error) {
            console.log("Appwrite Service::getPosts::error", error);
            return false;
        }
    }

    //file upload

    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                cofi.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite Service::uploadFile::error", error);
            return false;
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                cofi.appwriteBucketId,
                fileId
            )
            return true;
        } catch (error) {
            console.log("Appwrite Service::deleteFile::error", error);
            return false;
        }
}
    async getfilePreview(fileId){
        try {
            return await this.bucket.getFilePreview(
                cofi.appwriteBucketId,
                fileId
            )
        } catch (error) {
            console.log("Appwrite Service::getfilePreview::error", error);
            return false;
        }
    }
}
const service = new Service();
export default service;

