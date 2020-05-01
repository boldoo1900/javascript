import { useReducer, useState, useEffect, useCallback } from "react";
import { useRouter } from 'next/router'
import Link from 'next/link'

const initialState = { calc: 0, input: 1 };

function reducer(state, action) {
    switch (action.type) {
        case 'increment':
            return { calc: state.calc + state.input, input: state.input };
        case 'decrement':
            return { calc: state.calc - state.input, input: state.input };
        case 'input':
            return { calc: state.calc, input: action.payload.input };
        default:
            throw new Error();
    }
}

export function Calc() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const handleChange = useCallback((event) => {
        // let nam = event.target.name;
        const val = event.target.value;

        dispatch({ type: 'input', payload: { input: Number(val) } });
    }, []);
    // console.log(state.count, state.input);

    return (
        <>
            <h3> useReducer, useCallback </h3>
            <input type="number" name="inputtest" onChange={handleChange} />
            <button onClick={useCallback(() => dispatch({ type: 'decrement' }), [])}>-</button>
            <button onClick={useCallback(() => dispatch({ type: 'increment' }), [])}>+</button>
            Result: {state.calc}
        </>
    );
}

export function Timer() {
    const [timeLeft, setTimeLeft] = useState(1000);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTimeLeft(_timeleft => Math.max(_timeleft - 1, 0));
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <>
            <h3> useEffect </h3>
            <h1>{timeLeft}</h1>
        </>
    );
};

export function ActiveLink({ children, href }) {
    const router = useRouter()
    const style = {
        marginRight: 10,
        color: router.pathname === href ? 'red' : 'black',
    }

    const handleClick = e => {
        e.preventDefault();
        router.push(href);
    }

    return (
        <>
            <h2>Link, useRouter  </h2>
            <Link href={href} prefetch={false}>
                <a target={"_blank"}>
                    {children} (Link)
                </a>
            </Link><br/>

            <a href={href} onClick={handleClick} style={style} target="_blank">
                {children} (useRouter)
            </a>
        </>
    )
}
