import { db } from "@/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export interface Iglossary {
    id: string,
    word: string,
    meaning: string
}

export const GlossaryService = {
    async getGlossary() {
        try {
            const querySnapshot = await getDocs(collection(db, 'glossary'));
            const lista: Iglossary[] = querySnapshot.docs.map(doc => ({
                ...doc.data()
            })) as Iglossary[];
            return {status: "OK", result: lista};
        } catch (error) {
            return {status: "Erro ao buscar glossario" + error, result: []};
        }
    },
}