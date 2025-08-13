"use client"
import LoginForm from "@/components/login/LoginForm";
import {Suspense} from "react";

const LoginPage = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <LoginForm />
        </Suspense>
    )
}

export default LoginPage;
