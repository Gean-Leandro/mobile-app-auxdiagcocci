import { db } from "@/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export interface IScientificNames {
    id: string,
    name: string,
}

export const ScientificNamesService = {
    async getScientificNames() {
        try {
            const querySnapshot = await getDocs(collection(db, 'scientificNames'));
            const lista: IScientificNames[] = querySnapshot.docs.map(doc => ({
                ...doc.data()
            })) as IScientificNames[];
            return {status: "OK", result: lista};
        } catch (error) {
            return {status: "Erro ao buscar glossario" + error, result: []};
        }
    },
}