import conf from "../conf/conf";
import { Storage, Client, ID, Databases, Query } from "appwrite";

export class Service {
    client;
    databases;
    bucket;

    constructor() {
        this.client = new Client();
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
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
            throw error;
        }
    }

    async updatePost({ title, slug, content, featuredImage, status }) {
        try {
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
            console.log("Error in update post Appwrite:", error);
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.databaseId,
                conf.collectionId,
                slug
            );
            return true;
        } catch (error) {
            console.log("Error in delete post Appwrite service:", error);
            return false;
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                conf.databaseId,
                conf.collectionId,
                slug
            );
        } catch (error) {
            console.log("Error in get post Appwrite:", error);
        }
    }

    async getPosts(queries = [Query.equal("STATUS", "active")]) {
        try {
            return await this.databases.listDocuments(
                conf.databaseId,
                conf.collectionId,
                queries
            );
        } catch (error) {
            console.log("Error in get posts Appwrite:", error);
            return false;
        }
    }

    async uploadFile(file) {
        try {
            return await this.bucket.createFile(conf.bucketId, ID.unique(), file);
        } catch (error) {
            console.log("Upload file Appwrite service:", error);
            return false;
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(conf.bucketId, fileId);
            return true;
        } catch (error) {
            console.log("Delete file Appwrite service:", error);
            return false;
        }
    }

    async getFilePreview(fileId) {
        if (!fileId) {
            return "/path-to-placeholder-image.png";
        }
        try {
            const preview = await this.bucket.getFilePreview(conf.bucketId, fileId);
            if (preview && preview.href) {
                return preview.href;
            } else {
                return "/path-to-placeholder-image.png";
            }
        } catch (error) {
            return "/path-to-placeholder-image.png";
        }
    }
}

const service = new Service();
export default service;
