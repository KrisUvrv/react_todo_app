import axios from 'axios';
const api = axios.create({
    baseURL: 'http://localhost:3001',
});
export const fetchTodos = async ({ page, limit, filter, sort, }) => {
    const response = await api.get('/todos', {
        params: {
            page,
            limit,
            filter,
            sort,
        },
    });
    return response.data;
};
export const createTodo = async (text) => {
    const response = await api.post(`/todos`, { text });
    return response.data;
};
export const updateTodo = async (id, payload) => {
    const response = await api.put(`/todos/${id}`, payload);
    return response.data;
};
export const toggleTodo = async (id) => {
    const response = await api.patch(`/todos/${id}/toggle`);
    return response.data;
};
export const deleteTodo = async (id) => {
    await api.delete(`/todos/${id}`);
};
