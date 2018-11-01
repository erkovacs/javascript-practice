const server = require("express")();
const cookieParser = require("cookie-parser");

const HTTP = {
  OPTIONS: "OPTIONS",
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  PATCH: "PATCH",
  DELETE: "DELETE"
};

const cors = (req, res, next) => {
  let headers = [];
  let code = 200;
  if (req.method === HTTP.GET) {
    headers = [
      ...headers,
      {
        "Access-Control-Allow-Origin": "http://arunranga.com"
      },

      {
        "Access-Control-Allow-Credentials": " true"
      },
      {
        "Cache-Control": " no-cache"
      },
      {
        Pragma: " no-cache"
      },
      {
        "Content-Type": " text/plain"
      }
    ];

    if (typeof req.cookies.pageAccess === "undefined") {
      res.cookie("pageAccess", "1", { maxAge: 10800 });
    } else {
      let accesses = req.cookies.pageAccess;
      res.cookie("pageAccess", ++accesses, { maxAge: 10800 });
    }
  } else if (req.method === HTTP.OPTIONS) {
    headers = [
      ...headers,
      {
        "Access-Control-Allow-Origin": "http://arunranga.com"
      },
      {
        "Access-Control-Allow-Methods": "GET, OPTIONS"
      },
      {
        "Access-Control-Allow-Credentials": "true"
      },
      {
        "Access-Control-Max-Age": "1728000"
      },
      {
        "Content-Length": "0"
      },
      {
        "Content-Type": "text/plain"
      }
    ];
    code = 403;
  } else {
    headers = [...headers, { "Content-Type": "text/plain" }];
    code = 400;
    res.cookie("pageAccess", "-1", { maxAge: -1 });
  }
  headers.forEach(header => res.header(header));
  res.status(code);
  next();
};

server.use(cookieParser());
server.use(cors);
/**
 * 
 * if($_SERVER['REQUEST_METHOD'] == "GET") {
  header('Access-Control-Allow-Origin: http://arunranga.com');
  header('Access-Control-Allow-Credentials: true');
  header('Cache-Control: no-cache');
  header('Pragma: no-cache');
  header('Content-Type: text/plain');

  // First See if There Is a Cookie   
  if (!isset($_COOKIE["pageAccess"])) {
    setcookie("pageAccess", 1, time()+2592000);
    echo 'I do not know you or anyone like you so I am going to';
    echo 'mark you with a Cookie :-)';    
  } else {
    $accesses = $_COOKIE['pageAccess'];
    setcookie('pageAccess', ++$accesses, time()+2592000);
    echo 'Hello -- I know you or something a lot like you!';
    echo 'You have been to ', $_SERVER['SERVER_NAME'], ';
    echo 'at least ', $accesses-1, ' time(s) before!';
  }  
} elseif($_SERVER['REQUEST_METHOD'] == "OPTIONS") {
  // Tell the Client this preflight holds good for only 20 days
  if($_SERVER['HTTP_ORIGIN'] == "http://arunranga.com") {
    header('Access-Control-Allow-Origin: http://arunranga.com');
    header('Access-Control-Allow-Methods: GET, OPTIONS');
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 1728000');
    header("Content-Length: 0");
    header("Content-Type: text/plain");
  } else {
    header("HTTP/1.1 403 Access Forbidden");
    header("Content-Type: text/plain");
    echo "You cannot repeat this request";
  }
} else {
  die("This HTTP Resource can ONLY be accessed with GET or OPTIONS");
}
 * 
 * 
 * 
 */

server.get("/", (req, res) => {
  res.end("");
  //console.log(req);
});

const running = server.listen(process.env.PORT || 8080, () => {
  let host = running.address().address;
  let port = running.address().port;
  console.log("Server started on " + host + ":" + port);
});
