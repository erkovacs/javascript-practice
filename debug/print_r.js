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