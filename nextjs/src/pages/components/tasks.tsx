export function Tasks({ tasks }) {

    return (
    <>
        <h2>--- Task List ---</h2>
        <table>
            <thead>
                <tr>
                    <th>task id</th>
                    <th>title</th>
                    <th>description</th>
                </tr>
            </thead>
            <tbody>
                {!!tasks && tasks.map(row => (
                    <tr>
                        <td>{row.task_id}</td>
                        <td>{row.title}</td>
                        <td>{row.description}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </>)
}