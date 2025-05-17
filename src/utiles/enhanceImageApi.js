import axios from "axios";

// const API_KEY = "wxnsv0yv5iw4sxgvv"
const API_KEY="wxa1iinkofk3dhxf0";
const BASE_URL = "https://techhk.aoscdn.com";

export const enhancedImageAPI = async (file) => {
    try {
        const taskId = await uploadImage(file);
        console.log("Image uploaded successfully. Task ID:", taskId);

        const enhancedImageData = await fetchEnhancedImage(taskId); // <-- fixed
        console.log("Enhanced image data:", enhancedImageData);

        return enhancedImageData;
    } catch (error) {
        console.error("Error enhancing image:", error.message);
    }
};

const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("image_file", file); // Use "image_url" for URL uploads

    const response = await axios.post(
        `${BASE_URL}/api/tasks/visual/scale`,
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
                "X-API-KEY": API_KEY,
            },
        }
    );

    const taskId = response?.data?.data?.task_id;
    if (!taskId) {
        throw new Error("Failed to retrieve task ID from response");
    }

    return taskId;
};

const fetchEnhancedImage = async (taskId) => {
    const response = await axios.get(
        `${BASE_URL}/api/tasks/visual/scale/${taskId}`,
        {
            headers: {
                "X-API-KEY": API_KEY,
            },
        }
    );

    const result = response?.data?.data;
    if (!result) {
        throw new Error("Failed to fetch enhanced image data");
    }

    // Optional: log the image URL if available
    if (result?.image) {
        console.log("Enhanced Image URL:", result);
    }

    return result;
};
