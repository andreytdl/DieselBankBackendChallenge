import BinoBankRepository from '@modules/binoBank/repositories/BinoBankRepository';
import ProviderRepository from '@modules/providers/repositories/ProviderRepository'
import BinoBankReconciliationService from '@modules/binoBank/services/BinoBankReconciliationService.ts';
import express, { Router, Request, Response, NextFunction } from 'express';
import AppError from '../errors/Error';
import cors from 'cors';

const app = express();
app.use(express.json())
app.use(cors())
const routes = Router();
app.use(routes)


const binoBankReconciliationService = new BinoBankReconciliationService();
const binoBank = new BinoBankRepository()
const providers = new ProviderRepository()


//Tratativa de erros global
app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    
    //Caso for um erro lançado pela nossa aplicação
    if(err instanceof AppError){
        return response.status(err.statusCode).json({
            status: err.statusCode,
            message: err.message,
        })
    }
    
    //Caso seja algum erro interno na nossa api
    return response.status(500).json({
        status: 500,
        message: 'Internal Server Error'
    });
    
});

app.post('/notify', async (request, response) => {
    console.log('Called by a webhook!')
    const userNewBalance = await binoBankReconciliationService.execute(
        binoBank,
        providers,
    );

    return response.json({balance: userNewBalance}).status(200)
});

app.post('/cronjob', async (request, response) => {
    console.log('Called by a cronjob!')
    const userNewBalance = await binoBankReconciliationService.execute(
        binoBank,
        providers,
    );
    
    return response.json({balance: userNewBalance}).status(200)
});

app.listen(3333, () => {
    console.log('Server started on port 3333')
})

export default routes;
