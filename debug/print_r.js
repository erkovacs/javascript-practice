var print_r = function(that)
{
    var stripCircularReferences = function(that)
    {
        var clone = {};

        for(var prop in that)
        {
            if(that[prop]!==that && that.hasOwnProperty(prop) && typeof that[prop]!=='function')
            {
                if(typeof that[prop]==='object')
                {
                    setTimeout(function(){
                        clone[prop] = stripCircularReferences(that[prop]);
                    }, 0);
                }
                else {
                    clone[prop] = that[prop];
                }
            }
        }

        return clone;
    }

    var retval = null;
    try {
        retval = JSON.stringify(stripCircularReferences(that));
    } 
    catch(err){
        console.error(err);
    }
    
    return retval || "{}";
}

// Better
var parseObject = function(obj){
    var out = '';
    if(typeof obj === 'object'){
        for(var prop in obj){
            if(obj[prop] !== obj && obj.hasOwnProperty(prop) && typeof obj[prop] !== 'function'){
                if(typeof obj[prop] === 'object'){
                    out += parseObject(obj[prop]);
                } else {
                    out += "\n\r["+prop+"] => "+obj[prop]+";\n\r";
                }
            }
        }
    } else {
        out += obj;
    }
    return out;
};