import axiosInstance from "../helpers/axiosInstance";

const fetchCoinChart = async(days ,precision , currency , coinId)=>{
    try{
        const response = await axiosInstance.get(`/coins/${coinId}/market_chart?vs_currency=${currency}&days=${days}&precision=${precision}`);
        return response.data;
    }catch{
        throw new Error("Failed to fetch data");
    }
}
export default fetchCoinChart;