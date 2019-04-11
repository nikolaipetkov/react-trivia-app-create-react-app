import axios from "axios";

const api = {};

api.fetchData = async () => {
    const response = await axios.get(
        `https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=boolean`
    );

    return response.data.results;
};

export default api;