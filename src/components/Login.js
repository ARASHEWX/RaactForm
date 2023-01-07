import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from "./SignUp.module.css";
import { notify } from './toast';
import { validate } from './validate';

const Login = () => {

    const [data, setData] = useState({
        email: "",
        password: ""
    })

    const [errors, setErrors] = useState({});

    const [touch, setTouch] = useState({})

    useEffect(() => {
        setErrors(validate(data, "logIn"));
    }, [data, touch])

    const changeHandler = event => {

        setData({
            ...data,
            [event.target.name]: event.target.value
        })

    }

    const focousHanler = event => {
        setTouch({
            ...touch,
            [event.target.name]: true
        })
    }

    const submitHandler = event => {
        event.preventDefault();
        if (!Object.keys(errors).length) {
            notify("success", "Successful ...")
        } else {
            setTouch({
                email: true,
                password: true
            })
            notify("error", "Invalid Data !!!")
        }
    }

    return (
        <div className={styles.container}>
            <form className={styles.formContainer} onSubmit={submitHandler}>
                <h2 className={styles.header}>Log In</h2>

                <div className={styles.formField}>
                    <label>Email</label>
                    <input
                        className={(errors.email && touch.email) ? styles.uncompleted : styles.formInput}
                        type="text"
                        name="email"
                        value={data.email}
                        onChange={changeHandler}
                        onBlur={focousHanler} />
                    {errors.email && touch.email && <span>{errors.email}</span>}
                </div>
                <div className={styles.formField}>
                    <label>Password</label>
                    <input
                        className={(errors.password && touch.password) ? styles.uncompleted : styles.formInput}
                        type="password"
                        name="password"
                        value={data.password}
                        onChange={changeHandler}
                        onBlur={focousHanler} />
                    {errors.password && touch.password && <span>{errors.password}</span>}
                </div>
                <div className={styles.formButtons}>
                    <Link to="/signup">Sign Up</Link>
                    <button type="submit">Login</button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
};

export default Login;