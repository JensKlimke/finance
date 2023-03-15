import express from "express";
import {authRoute} from "./auth";
import {router as userRouter} from "./user";
import {router as contractRouter} from "./contracts";
import {router as transfersRouter} from "./transfers";
import {router as stocksRouter} from "./stocks";
import {accountsRouter} from "./accounts";
import {balancesRouter} from "./balances";
import {ordersRouter} from "./orders";

const router = express.Router();

router.use('/auth', authRoute);
router.use('/user', userRouter);
router.use('/contracts', contractRouter);
router.use('/transfers', transfersRouter);
router.use('/stocks', stocksRouter);
router.use('/orders', ordersRouter);
router.use('/balances', balancesRouter);
router.use('/accounts', accountsRouter);

export const routes = router;
