import { useState } from 'react';
import axios from 'axios';

const useCloudflareImageUploader = () => {
    const [variants, setVariants] = useState([]);

    const submitImage = async (formData) => {
        try {
            const response = await axios.post(
                "https://api.cloudflare.com/client/v4/accounts/ca9b43f77ee269734e8818fd05c17671/images/v1",
                formData,
                {
                    headers: {
                        "Authorization": "Bearer CixTrFlOR-KAInIJ83rGeynYMTDjgp8cIdhW4niz",
                        "Content-Type": "multipart/form-data",
                    },
                }
            );


            const { result } = response.data;
            if (result && result.variants) {
                setVariants(result.variants);
                        }
        } catch (error) {
            console.error("Error al cargar la imagen:", error);
        }
    };

    return { variants, submitImage };
};


export default useCloudflareImageUploader;
