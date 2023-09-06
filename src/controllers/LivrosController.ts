import { Request, Response } from "express";
import db from "../config/db"
import { DocumentReference, addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from "firebase/firestore/lite";

class LivrosController {
    static getAll = async (req: Request, res: Response) => {
        try{
            const livrosCollection = collection(db, 'livros');
            const livrosSnapshot = await getDocs(livrosCollection);
            const livrosData = livrosSnapshot.docs.map((doc) => doc.data());

            res.status(200).send(livrosData);
        }catch(err){
            res.status(500).send({
                message: "Erro interno do servidor"
            })
        }
    }

    static getById = async (req: Request, res: Response) => {
        try{
            const {id, include} = req.params;
            const livrosCollection = collection(db, 'livros');
            const docRef = doc(livrosCollection, id)
            const livroSnapshot = await getDoc(docRef);
            
            const livro = {...livroSnapshot.data()}
            
            if(livroSnapshot.exists()){
                if(include == "true"){
                    const autorDocRef = doc(collection(db, 'autores'), livro.autorId);
                    const autorSnapshot = await getDoc(autorDocRef);

                    if(autorSnapshot.exists()){
                        livro.autor = autorSnapshot.data();
                    }
                }

                res.status(200).send(livro);
            }else{
                res.status(404).send({
                    message: "Livro não encontrado"
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
            const livrosCollection = collection(db,'livros');
            
            await addDoc(livrosCollection, req.body).then((docRef: DocumentReference) => {
                res.status(201).send({
                    message: "Livro criado",
                    livro: {
                        id: docRef.id,
                        ...req.body
                    }
                });
            }).catch((err) => {
                res.status(400).send({
                    message: "Erro ao criar livro"
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
            const livrosCollection = collection(db,'livros');
            const docRef = doc(livrosCollection, id);

            await updateDoc(docRef, req.body).then((val) => {
                res.status(200).send({
                    message: "Livro atualizado"
                });
            }).catch((err) => {
                res.status(400).send({
                    message: "Erro ao atualizar livro"
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
            const livrosCollection = collection(db,'livros');
            const docRef = doc(livrosCollection, id); 
            await deleteDoc(docRef).then(val => {
                res.status(200).send({
                    message: "Livro deletado"
                });
            }).catch((err) => {
                res.status(400).send({
                    message: "Erro ao deletar livro"
                });
            })
        } catch (err) {
            res.status(500).send({
                message: "Erro interno do servidor"
            });
        }
    }
}

export default LivrosController;