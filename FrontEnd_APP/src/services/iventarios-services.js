import { axiosConfig } from "../helpers/axios-config";


export async function getInventarios(){
    try {
        const response = await axiosConfig.get(`/inventarios`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export async function createInventario(inventario){
    try {
        const response = await axiosConfig.post(`/inventarios`, inventario);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export async function updateInventario(inventario){
    try {
        const response = await axiosConfig.put(`/inventarios/${inventario._id}`, inventario);
        return response.data;
    } catch (error) {
        console.log(error);
    }
} 

export async function deleteInventario(id){
    try {
        const response = await axiosConfig.delete(`/inventarios/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}