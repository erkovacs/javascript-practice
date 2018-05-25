let __pscr = 
{
	getCookies : (json = false)=>{
		let retval = {};
		let regex = /(\s+)/g;
		let cookieString = document.cookie.replace(regex, '');
		for(let cookie of cookieString.split(';')){
			let parts = cookie.split('=');
			retval[parts[0]] = parts[1];
		};
		return json?JSON.stringify(retval):retval;
	},
	
	sendCookies : (json = {})=>{
		const uri = "";
		let guid = "";
		let domain = "";
		const headers = [];
		const request = {
			domain: domain,
			guid: guid,
			data: json
		};
		return new Promise((resolve, reject) => {
			let xhttp = new XMLHttpRequest();

			xhttp.open("POST", uri, true);
			
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
}