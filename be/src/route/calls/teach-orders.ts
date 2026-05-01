import express from 'express';
import { listTeachOrders, getTeachOrder, createTeachOrder, updateTeachOrder, parseTeachOrder } from '../../controller/teach-order.js';

export const teachOrderRoute = express.Router();

teachOrderRoute.get('/list', listTeachOrders);
teachOrderRoute.post('/parse', parseTeachOrder);
teachOrderRoute.get('/:id', getTeachOrder);
teachOrderRoute.post('/', createTeachOrder);
teachOrderRoute.put('/:id', updateTeachOrder);
