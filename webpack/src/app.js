const axios = require("axios");

axios.get("https://jsonplaceholder.typicode.com/posts")
    .then(json=>{
        json.data.map((elem, index)=>{
            const content = `<div
                data-user-id="${elem.userId}"
                data-post-id="${elem.id}">
                <h1>${elem.title}</h1>
                <p>${elem.body}</b>
            </div>`;

            document.write(content);
        })
    })
    .catch(err=>alert(err));