const axios = require("axios");
const db = require("../models");

exports = module.exports = {};

exports.signup = function(req, res) {
    res.render("signup");
};

exports.signin = function(req, res) {
    res.render("signin");
};

exports.dashboard = function(req, res) {
    
    const query = {};
    if (req.query.user_id) {
        query.UserId = req.query.user_id;
    }
    //Here we add an "include" property to our option in our findAll query
    //We set the value to an array of the models we want to include in a left outer join
    //In this case, just db.User
    db.Game.findAll({
        where: { UserId: req.user.id }
        // include: [db.User]
    }).then(function(dbGame) {
        // console.log(dbGame);
        // console.log(req.user);
        console.log('*******************************************************************************')
        console.log(dbGame);
        res.render("dashboard", { dbGames: dbGame, user: req.user });  //JSON.stringify
    });

    // console.log(url);
    // axios.get(url).then((response) =>{{
    //     console.log(response);
    //     // const {
    //     //     title,
    //     //     console,
    //     //     image,
    //     //     gsPriceBuy,
    //     //     gsPriceSell,
    //     //     userSellPrice
    //     // } = response.data;
    //     // data.gameData = {
    //     //     title,
    //     //     console, //gamePrice: gamePrice
    //     //     image,
    //     //     gsPriceBuy,
    //     //     gsPriceSell,
    //     //     userSellPrice
    // });

    // console.log(data.gameData);
};

exports.postGame = function(req, res) {
    const url = "https://www.pricecharting.com/api/products?" + process.env.PRICE_KEY + "&q=" + req.body.gameTitle + " " + req.body.gameConsole
    console.log(url);
    axios.get(url).then((response) => {
        res.json(response.data);
    });

    // const data = {
    //     user: req.user
    // };
    // console.log(data);
    // res.render("dashboard", data);
};

exports.searchGame = (req, res) => {
    const data = {
        user: req.user
    };

    const {
        gameTitle,
        gameConsole
    } = req.body;

    const url = `https://www.pricecharting.com/api/products?${process.env.PRICE_KEY}&q=${gameTitle} ${gameConsole}`;

    console.log(url);
    axios.get(url).then((response) => {
        const {
            gameTitle,
            gamePrice,
            gameStopPrice
        } = response.data;
        data.gameData = {
            gameTitle,
            gamePrice, //gamePrice: gamePrice
            gameStopPrice
        };

        data.table = [{
                myObj: 'value1'
            },
            {
                myObj: 'valu2'
            }
        ];

        res.render("postGame", data);
    });

};

exports.logout = function (req, res) {
    req.session.destroy(function () {
        req.logout();
        res.redirect("/");
    });
};