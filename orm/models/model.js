const db = require('../utils/db');

module.exports = class Model {
    constructor(id = 0){
        this.db = db;
        this._type = 'model';
        this._prefix = process.env.PREFIX || 'yc_';
        this._fillable = [];
        this.id = id;
        if(this.id){
            const row = this.db.select(1, 0, ['*']);
        }
    }

    _spreader(accumulator, element){
        return accumulator + ', ' + element
    }

    _valueParser(element){
        switch(typeof this[element]){
            case "undefined":
            case "object":
                return "NULL";
            case "string":
                return `'${this[element]}'`;
            case "number":
                if(isNaN(this[element]))
                    return "NULL";
                return this[element];
            case "boolean":
                return this[element] ? 1 : 0;
            default:
                return "NULL";
        }
    }

    insert(){
        const values = this._fillable.map(this._valueParser);
        const sql = `insert into '${this._prefix + this._type}' (${this._fillable.reduce(this._spreader, '')}) values (${values.reduce(this._spreader, '')})`;
        return this.db.query(sql);
    }

    update(){
        const values = this._fillable.map(this._valueParser);
        const sql = `update '${this._prefix + this._type}' set (${this._fillable.reduce((acc, elem, i) => acc + ', ' + elem + ' = ' + values[i])}) where '${this._type}_id' = ${this.id}`;
        return this.db.query(sql);
    }

    delete(){
        const sql = `delete from '${this._prefix + this._type}' where '${this._type}_id' = ${this.id}`;
        return this.db.query(sql);
    }

    toJson(){}
    toString(){}
    toHash(){}
}