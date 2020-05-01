import express, {Express, Request, Response} from 'express';
import morgan from 'morgan';
import cors from "cors";

import { Task, SResponse } from "./type";


const createServer = (): Express => {
    const server = express();
    const bodyParser = require('body-parser');
    //get router
    // const router = express.Router();

    // support parsing of application/json type post data
    server.use(bodyParser.json());

    //support parsing of application/x-www-form-urlencoded post data
    server.use(bodyParser.urlencoded({ extended: true }));
    server.use(morgan(':method :url :status'));
    
    //options for cors midddleware
    const options:cors.CorsOptions = {
      allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
      credentials: true,
      methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
      origin: "*",
      preflightContinue: false
    };

    //use cors middleware
    server.use(cors(options));

    //enable pre-flight
    server.options("*", cors(options));

    const d = new Date();
    const nd = new Date(d.getTime() - (1000 * 60 * 60 * 24)*3);

    const count = 15;
    const response: SResponse = {
      result: true
    };    
    const mList: Task[] = [...Array(count - 1)].map((_, index) => {
      const nDate = nd.setDate(nd.getDate() + index);

      return {
        title: "123123",
        description: "123123",
        dueDateTime: new Date(nDate),
        creationDateTime: new Date(nDate)
      };
    });

    const mysql = require('mysql');
    const con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "123"
    });
    
    con.connect(function(err: any) {
      if (err) throw err;
      console.log("Connected!");
    });

    /////////////////////////////////////////////////////////////////////////////////////////////////
    server.get('/task', async (req: Request, res: Response) => {
        try {
          con.query("select * from testdb.tasks ", function (err: any, result: any, fields: any) {
            if (err) throw err;

            return res.json(result);
            // console.log(result);
          });
        } catch (error) {
          return res.json([]);
        }

        // return res.json(mList);
    });

    server.get('/task/:id', async (req: Request, res: Response) => {
        try {
          const id = Number(req.params.id);

          con.query("select * from testdb.tasks where task_id = " + id, function (err: any, result: any, fields: any) {
            if (err) throw err;

            return res.json(result);
          });
        } catch (error) {
          return res.json([]);
        }

        // return res.json(mList[0]);
    });

    server.put('/task/:id', async (req: Request, res: Response) => {
        try {
          const id = Number(req.params.id);
          const title = String(req.body.title);
          const description = String(req.body.description);

          con.query("update testdb.tasks set `title` = '"+ title +"', `description` = '"+ description +"' where `task_id` = "+id, function (err: any, result: any, fields: any) {
          if (err) throw err;

            const resArr : Task = {
              title: title,
              description: description
            }
            return res.json(resArr);
          });
        } catch (error) {
          return res.json(["update fail"]);
        }

        // return res.json(response);
    });
      
    server.delete('/task/:id', async (req: Request, res: Response) => {
        try {
          const id = Number(req.params.id);

          con.query("delete from testdb.tasks where `task_id` = "+id, function (err: any, result: any, fields: any) {
          if (err) throw err;

            return res.json(["SUCCESS"]);
          });
        } catch (error) {
          return res.json(["update fail"]);
        }

        // return res.json(response);
    });

    server.post('/task', async (req: Request, res: Response) => {
        try {
          const title = String(req.body.title);
          const description = String(req.body.description);
          const dueDateTime = String(req.body.dueDateTime);

          con.query("insert into testdb.tasks(title, description, dueDateTime, creationDateTime) values('"+title+"', '"+description+"', '"+dueDateTime+"', now()) ", function (err: any, result: any, fields: any) {
          if (err) throw err;

            const resArr : Task = {
              title: title,
              description: description,
              dueDateTime: new Date(dueDateTime)
            }
            return res.json(resArr);
          });
        } catch (error) {
          return res.json(["add fail"]);
        }
        
        // return res.json(response);
    });

    // get late task
    server.get('/tasklate', async (req: Request, res: Response) => {
        try {
          const offset = Number(req.body.offset);
          const limit = Number(req.body.limit);

          con.query("select * from testdb.tasks where dueDateTime < now() limit " + limit + " offset "+ offset, function (err: any, result: any, fields: any) {
            if (err) throw err;

            return res.json(result);
            // console.log(result);
          });
        } catch (error) {
          return res.json([]);
        }

        // return res.json(mList.filter(row => row.dueDateTime && row.dueDateTime.getTime() > d.getTime()));
    });

    // delete late tasks
    server.delete('/del-tasklate', async (req: Request, res: Response) => {
      try {
        await con.connect(function(err: any) {
          if (err) throw err;
          con.query("delete from testdb.tasks where dueDateTime < now() ", function (err: any, result: any, fields: any) {
            if (err) throw err;

            return res.json(["succesfully deleted late tasks"]);
            // console.log(result);
          });
        });

      } catch (error) {
        return res.json(["delete fail"]);
      }
      // return res.json(response);
    });
    /////////////////////////////////////////////////////////////////////////////////////////////////

    return server;
};

const app = async () => {
  const server = createServer();
  const port = 3001;
  server.listen(port, () => {
      console.log(`Server listening on port ${port}!`);
  });
};


app().catch(error => console.log('Exit (Error)', error));
