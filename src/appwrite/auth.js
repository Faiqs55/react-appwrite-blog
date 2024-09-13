import { Client, Account, ID } from "appwrite";

export class AuthService {
    // VARS
    client = new Client();
    account;

    constructor(){
        // APPWRITE CLIENT 
        this.client
        .setEndpoint(import.meta.VITE_APPWRITE_URL)
        .setProject(import.meta.VITE_APPWRITE_PROJECT_ID);
        // APPWRITE ACCOUNT 
        this.account = new Account(this.client);
    }

    // SIGNUP METHOD 
    async createAccount({email, pass, name}) {

        try {
            const userAccount = await this.account.create(
                ID.unique(),
                email,
                pass,
                name
            );

            // CHECK IF USER CREATED 
            if(userAccount){
            //    CALL LOGIN METHOD 
                this.loginAccount(email, pass);
            }else{
                return userAccount
            }
        } catch (error) { 
            throw error; // HANDLE ON CALL
        }
    }

    // LOGIN METHOD 
    async loginAccount({email, pass}) {
        
         try {
            const session = await this.account.createEmailPasswordSession(email, pass);
            return session;
         } catch (error) {
            throw error;
         }
    }

    // CHECK LOGGED IN 
    async getCurrentUser() {
        try {
            const user = await this.account.get();
            return user;
        } catch (error) {
            throw error;
        }

        return null;
    }

    // LOGOUT METHOD
    async logoutUser() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            throw error;
        }
    }

};

const authService = new AuthService();

export default authService;