const express = require('express');
const app = express();
require('dotenv').config()
const Categories = require('./models/categories');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', function (request, response) {
    response.send('Serviço API Rest iniciada...');
})

app.get('/categories', async (req, res) => {
    await Categories.findAll({
        atributes: ['id', 'name', 'description'],
        order: [['name', 'ASC']]
    })
    .then((Categories) => {
        return res.json({
            erro: false,
            Categories
    });
    }).catch((err) => {
        return res.status(404).json({
            erro: true,
            mensagem: `Erro: ${err} ou Nenhum Produto encontrado!!!`
        })
    })
})

app.get('/categories/:id', async (req, res) => {
    const { id } = req.params;
    try{
        // await User.findAll({ where: { id: id }})
        const Categories = await User.findByPk(id);
        if(!Categories){
            return res.status(400).json({
                erro: true,
                mensagem: 'Erro usuário não encontrado!'
            })
        }
        res.status(200).json({
            erro: false,
            Categories
        })
    }catch(err) {
        res.status(404).json({
            erro: true,
            mensgem: `Erro: ${err}`
        })
    }
})

app.post('/categorie', async (req, res) => {
    var dados = req.body;
    await Categories.create(dados)
    .then(() =>{

        return res.json({
            erro: false,
            mensgem: 'Produto cadastrado com sucesso!'
        });
    }).catch(err => {
        return res.status(400).json({
            erro: true,
            mensgem: `Erro: Produto não cadastrado...${err}`
        })
    })
})

app.put("/categorie", async (req, res) => {
    const { id } = req.body;
    await Categories.update(req.body, {where: {id}})
    .then(() => {
        return res.json({
            erro: false,
            mensagem: 'Produto alterado com sucesso!'
        })
    }).catch((err) =>{
        return res.status(400).json({
            erro: true,
            mensagem: `Erro: Produto não alterado ...${err}`
        })
    })
})

app.delete("/categorie/:id", async (req, res) => {
    const { id } = req.params;
    await Categories.destroy({where: {id}})
    .then(() => {
        return res.json({
            erro: false,
            mensagem: 'Produto apagado com sucesso!!!'
        })
    }).catch((err) => {
        return res.status(400).json({
            erro: true,
            mensagem: `Erro: ${err} Produto não apagado...`
        })
    })
})

app.listen(process.env.PORT, () => {
    console.log(`Servidor iniciado na porta ${process.env.PORT} http://localhost:${process.env.PORT}`);
});