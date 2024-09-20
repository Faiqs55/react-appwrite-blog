import { Client, Account, ID } from "appwrite";

export class AuthService {
    // VARS
    client = new Client();
    account;

    constructor(){
        // APPWRITE CLIENT 
        this.client
        .setEndpoint(import.meta.env.VITE_APPWRITE_URL)
        .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);
        // APPWRITE ACCOUNT 
        this.account = new Account(this.client);
    }

    // SIGNUP METHOD 
    async createAccount({email, password, name}) {

        try {
            const userAccount = await this.account.create(
                ID.unique(),
                email,
                password,
                name
            );

            // CHECK IF USER CREATED 
            if(userAccount){
            //    CALL LOGIN METHOD 
               return this.loginAccount({email, password});
            }else{
                return userAccount
            }
        } catch (error) { 
            throw error; // HANDLE ON CALL
        }
    }

    // LOGIN METHOD 
    async loginAccount({email, password}) {
        
         try {
            const session = await this.account.createEmailPasswordSession(email, password);
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