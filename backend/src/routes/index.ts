import { Router } from 'express';
import clienteRoutes from './clienteRoutes.js'
import telefoneRoutes from './telefoneRoutes.js'
import enderecoRoutes from './enderecoRoutes.js'
import documentoRoutes from './documentoRoutes.js'
import acomodacoesRoutes from './acomodacaoRoutes.js'
import hospedagemRoutes from './hospedagemRoutes.js'

const router = Router();

router.use('/cliente', clienteRoutes)
router.use('/telefone', telefoneRoutes)
router.use('/endereco', enderecoRoutes)
router.use('/documento', documentoRoutes)
router.use('/acomodacoes', acomodacoesRoutes)
router.use('/hospedagem', hospedagemRoutes)

export default router