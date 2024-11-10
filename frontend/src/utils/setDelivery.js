import api from '../api';


const setDelivery = async (orderId, address, city, postalCode) => {
    try {
        const response = await api.post(`/order/${orderId}/set_delivery/`, {
            address,
            city,
            postal_code: postalCode,
        });
        return response.data;
    } catch (error) {
        console.error("Error setting delivery information", error);
        throw error;
    }
};

export default setDelivery;
