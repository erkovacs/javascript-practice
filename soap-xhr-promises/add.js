let add = (a, b) =>{

    let request = '<?xml version="1.0" encoding="utf-8"?>';
    request += '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">';
    request += '  <soap:Body>';
    request += '    <Add xmlns="http://tempuri.org/">';
    request += '      <intA>'+a+'</intA>';
    request += '      <intB>'+b+'</intB>';
    request += '    </Add>';
    request += '  </soap:Body>';
    request += '</soap:Envelope>';

    const headers = [
        {
            name:"Content-Type",
            value:"text/xml; charset=utf-8",
        },
        {
            name:"SOAPAction",
            value:"\"http://tempuri.org/Add\""
        },
        {
            name:"Cache-Control",
            value:"no-cache"
        }
    ];

    return new Promise((resolve, reject) => {
        var xhttp = new XMLHttpRequest();

        xhttp.open("POST", "https://cors-anywhere.herokuapp.com/http://www.dneonline.com/calculator.asmx", true);
        
        xhttp.onload = function() {
            if (this.status >= 200 && this.status < 300) {
                resolve(xhttp.responseXML);
            } else {
                reject({
                    status: this.status,
                    statusText: xhttp.statusText
                });
            }
        };

        headers.forEach(header=>xhttp.setRequestHeader(header.name, header.value));

        xhttp.send(request);
    });
}
