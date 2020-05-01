
import { Task } from '../type/type'

export default (req, res) => {
  if (req.method === 'GET') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');

    const mList: Task[] = [...Array(10)].map((_, index) => {
      return {
        id: index,
        title: "123123",
        description: "123123",
        dueDateTime: new Date(),
        creationDateTime: new Date()
      };
    });

    res.end(JSON.stringify(mList))
  } else {
    
    // Handle any other HTTP method
  }

  
}