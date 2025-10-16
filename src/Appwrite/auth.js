import { Client, ID, Account } from "appwrite";
import cofi from '../confi-appwrite/cofi.js';

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(cofi.appwriteUrl)
      .setProject(cofi.appwriteProjectId);

    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(ID.unique(), email, password, { name });
    if (userAccount) {
      // Automatically log in after creating account
      return this.login({ email, password });
    }else{
      return userAccount;

    }
  }catch (error) {
      console.log("Appwrite servive::createAccount::error", error);
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      return await this.createEmailPasswordSession(email, password);
    } catch (error) {
      console.log("Appwrite servive::login::error", error);
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
  } catch (error) {
     console.log("Appwrite servive::getCurentUser::error",error);
    //  return null;
  } 
   return null;  
  }

  async logout(){
    try{
      return await this.account.deleteSessions();
    }catch(error){
      console.log("Appwrite servive::logout::error",error);
      throw error;
    }
  }
}

const authService = new AuthService();
export default authService;