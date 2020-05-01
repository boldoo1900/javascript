import fetch from 'node-fetch'

async function getTasks() {
    const res = await fetch('http://localhost:3001/task')
    return await res.json();
}

export async function getServerSideProps() {
    return {
        props: {
            selfintro: {
                name: "MB",
                hobby: "basketball",
                hometown: "ulaanbaatar"
            },
            tasks: await getTasks(),
        },
    };
}