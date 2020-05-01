export function SelftIntro({ selfintro }) {
    return (
    <>
        <h2>--- Self Introduction ---</h2>
        <table>
            <tbody>
                <tr>
                    <td>Name:</td><td>{selfintro.name}</td>
                </tr>
                <tr>
                    <td>Hobby:</td><td>{selfintro.hobby}</td>
                </tr>
                <tr>
                    <td>Hometown:</td><td>{selfintro.hometown}</td>
                </tr>
            </tbody>
        </table>
    </>)
}