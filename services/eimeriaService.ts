import { db } from "@/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";


export interface Iscore {
    level: number | string,
    img: string,
    imgPath: string,
    description: Array<string>
}

export interface eimeriaProps{
    id: string,
    name: string,
    imgLocal: string,
    imgPath: string,
    category: string,
    general_description: string,
    place_of_action: string,
    clinical_signs: Array<string>,
    score: Array<Iscore>
}

export const EimeriaService = {
    async getEimerias(): Promise<{status: string, result: Array<eimeriaProps>}> {
        try {
            const querySnapshot = await getDocs(collection(db, 'eimerias'));
            const lista: eimeriaProps[] = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as eimeriaProps[];
            return {status: "OK", result: lista};
        } catch (error) {
            return {status: "Erro ao buscar eimérias" + error, result: []};
        }
    },
}