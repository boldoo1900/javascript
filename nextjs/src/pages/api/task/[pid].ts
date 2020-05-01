import { Task } from '../../type/type'

export default (req, res) => {
    if (req.method === 'GET'){
        const {
            query: { pid },
        } = req;

        if(!Number(pid)){
            res.statusCode = 404;
            res.end('Not found');
            return;
        }

        const task : Task = {
            id: Number(pid),
            title: "title",
            description: "desc",
            dueDateTime: new Date(),
            creationDateTime: new Date()
        };

        res.end(JSON.stringify(task));
    } else if(req.method === "POST"){
        res.end(JSON.stringify({ads: "POST"}));
    }
}