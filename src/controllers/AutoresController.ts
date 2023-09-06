import { Request, Response } from "express";
import db from "../config/db"
import { DocumentReference, addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from "firebase/firestore/lite";

class AutoresController {
    static getAll = async (req: Request, res: Response) => {
        try{
            const autoresCollection = collection(db, 'autores');
            const autoresSnapshot = await getDocs(autoresCollection);
            const autoresData = autoresSnapshot.docs.map((doc) => doc.data());

            res.status(200).send(autoresData);
        }catch(err){
            res.status(500).send({
                message: "Erro interno do servidor"
            })
        }
    }

    static getById = async (req: Request, res: Response) => {
        try{
            const {id} = req.params;
            const autoresCollection = collection(db, 'autores');
            const docRef = doc(autoresCollection, id)
            const autorSnapshot = await getDoc(docRef);
            
            if(autorSnapshot.exists()){
                res.status(200).send(autorSnapshot.data());
            }else{
                res.status(404).send({
                    message: "Autor não encontrado"
                }); 
            }
        }catch(err){
            res.status(500).send({
                message: "Erro interno do servidor"
            });
        }
    }

    static create = async (req: Request, res: Response) => {
        try {
            const {id} = req.params;
            const autoresCollection = collection(db,'autores');
            
            await addDoc(autoresCollection, req.body).then((docRef: DocumentReference) => {
                res.status(201).send({
                    message: "Autor criado",
                    autor: {
                        id: docRef.id,
                        ...req.body
                    }
                });
            }).catch((err) => {
                res.status(400).send({
                    message: "Erro ao criar autor"
                });
            })
        } catch (err) {
            res.status(500).send({
                message: "Erro interno do servidor"
            });
        }
    }

    static update = async (req: Request, res: Response) => {
        try {
            const {id} = req.params;
            const autoresCollection = collection(db,'autores');
            const docRef = doc(autoresCollection, id);

            await updateDoc(docRef, req.body).then((val) => {
                res.status(200).send({
                    message: "Autor atualizado"
                });
            }).catch((err) => {
                res.status(400).send({
                    message: "Erro ao atualizar autor"
                });
            })
        } catch (err) {
            res.status(500).send({
                message: "Erro interno do servidor"
            });
        }
    }

    static delete = async (req: Request, res: Response) => {
        try {
            const {id} = req.params;
            const autoresCollection = collection(db,'autores');
            const docRef = doc(autoresCollection, id); 
            await deleteDoc(docRef).then(val => {
                res.status(200).send({
                    message: "Autor deletado"
                });
            }).catch((err) => {
                res.status(400).send({
                    message: "Erro ao deletar autor"
                });
            })
        } catch (err) {
            res.status(500).send({
                message: "Erro interno do servidor"
            });
        }
    }
}

export default AutoresController;