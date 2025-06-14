import axiosInstance from "../helpers/axiosInstance";

const fetchCoinDetails = async(coinId)=>{
    try{
        const response = await axiosInstance.get(`/coins/${coinId}`);
        return response.data;
    }catch{
        throw new Error("Failed to fetch data");
    }
}
export default fetchCoinDetails;