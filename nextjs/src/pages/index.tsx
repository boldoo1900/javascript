import Head from 'next/head'
import fetch from 'node-fetch'

// import { getServerSideProps } from './taskRepository'
import { SelftIntro } from './components/selftintro'
import { Tasks } from './components/tasks'
import { Calc, Timer, ActiveLink } from './components/customfunc'

async function getTasks() {
    try {
        const res = await fetch('http://localhost:3001/task')
        return await res.json();
    } catch(ex){
        console.log("API CONNECTION ERROR !!!");
        return false;
    }
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

export default function Home({ selfintro, tasks }) {
    return (
        <div className="container">
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <h1 className="title">
                    Welcome to <a href="https://nextjs.org"> HELLOWORLD!!! 123</a>
                </h1>

                <SelftIntro selfintro={selfintro} />
                <Tasks tasks={tasks} />

                <h2>--- Additional task 1 ---</h2>
                <Calc />
                <Timer />

                <h2>--- Additional task 2 ---</h2>
                <ActiveLink children="Click Here" href="https://google.com" />
            </main>
        </div>
    )
}
