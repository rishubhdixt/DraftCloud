import conf from "../conf/conf";
import { Storage, Client, ID, Databases, Query } from "appwrite";

export class Service {
    client;
    databases;
    bucket;

    constructor() {
        this.client = new Client();
        this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost(slug, { title, content, featuredImage, status, userID }) {
        try {
            if (featuredImage && typeof featuredImage !== "string") {
                const fileResponse = await this.uploadFile(featuredImage);
                featuredImage = fileResponse.$id;
            }
            return await this.databases.createDocument(
                conf.databaseId,
                conf.collectionId,
                slug,
                {
                    TITLE: title,
                    CONTENT: content,
                    FEATURED_IMAGE: featuredImage,
                    STATUS: status,
                    USER_ID: userID,
                }
            );
        } catch (error) {
            console.error("Error in createPost:", error);
            throw error;
        }
    }

    async updatePost({ title, slug, content, featuredImage, status }) {
        try {
            if (featuredImage && typeof featuredImage !== "string") {
                const fileResponse = await this.uploadFile(featuredImage);
                featuredImage = fileResponse.$id;
            }
            return await this.databases.updateDocument(
                conf.databaseId,
                conf.collectionId,
                slug,
                {
                    TITLE: title,
                    CONTENT: content,
                    FEATURED_IMAGE: featuredImage,
                    STATUS: status,
                }
            );
        } catch (error) {
            console.error("Error in updatePost:", error);
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(conf.databaseId, conf.collectionId, slug);
            return true;
        } catch (error) {
            console.error("Error in deletePost:", error);
            return false;
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(conf.databaseId, conf.collectionId, slug);
        } catch (error) {
            console.error("Error in getPost:", error);
        }
    }

    async getPosts(queries = [Query.equal("STATUS", "active")]) {
        try {
            return await this.databases.listDocuments(conf.databaseId, conf.collectionId, queries);
        } catch (error) {
            console.error("Error in getPosts:", error);
            return false;
        }
    }

    async uploadFile(file) {
        try {
            return await this.bucket.createFile(conf.bucketId, ID.unique(), file);
        } catch (error) {
            console.error("Error in uploadFile:", error);
            return false;
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(conf.bucketId, fileId);
            return true;
        } catch (error) {
            console.error("Error in deleteFile:", error);
            return false;
        }
    }

    getFilePreview(fileId) {
        if (!fileId) {
            return "https://via.placeholder.com/800x400.png?text=No+Image+Available";
        }
        try {
            return this.bucket.getFilePreview(conf.bucketId, fileId);
        } catch (error) {
            console.error("Error in getFilePreview:", error);
            return "https://via.placeholder.com/800x400.png?text=No+Image+Available";
        }
    }
}

const service = new Service();
export default service;
