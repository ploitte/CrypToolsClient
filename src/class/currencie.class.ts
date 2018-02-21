export class Currencie{

    //Param market cap
    // day_vol:string;
    // nb_supply:string;
    id:string;
    // last_update:string;
    // market_cap:string;
    // max_supply:string;
    name:string;
    // change1h:string;
    // change7d:string;
    change24h:string;
    price_btc:string;
    price_usd:string;
    rank:string;
    symbol:string;
    // total_supply:string;

    //Favoris Param
    isFav:boolean;


    constructor(
        // day_vol:string,
        // nb_supply:string,
        id:string,
        // last_update:string,
        // market_cap:string,
        // max_supply:string,
        name:string,
        // change1h:string,
        // change7d:string,
        change24h:string,
        price_btc:string,
        price_usd:string,
        rank:string,
        symbol:string,
        // total_supply:string,      
    ){
        // this.day_vol = day_vol;
        // this.nb_supply = nb_supply;
        this.id = id;
        // this.last_update = last_update;
        // this.market_cap = market_cap;
        // this.max_supply = max_supply;
        this.name = name;
        // this.change1h = change1h;
        // this.change7d = change7d;
        this.change24h = change24h;
        this.price_btc = price_btc;
        this.price_usd = price_usd;
        this.rank = rank;
        this.symbol = symbol;
        // this.total_supply = total_supply;

        this.isFav = false;
    }

}