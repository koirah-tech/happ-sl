"use client";

import Link from "next/link";
import React, {useActionState, useState, useEffect} from "react";
import {motion} from "framer-motion";

import {loginAction} from "@/components/public-pages/auth-page/loginAction";
import { type LoginState} from "@/components/public-pages/auth-page/authSchema";

import {WandSparkles} from "lucide-react"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";

import {RiErrorWarningFill, RiEyeFill, RiEyeOffFill} from "@remixicon/react";
import {sbBrowserClient} from "@/lib/supabase-clients/browserClient";
import {useRouter} from "next/navigation";


/**
 * Initial “shape” of the action’s return data.
 * @type {LoginState}
 */
const initialState: LoginState = {
    errors: {
        email: [],
        password: []
    }
}



/**
 * LoginForm
 *
 * Renders the email/password login form.
 * Uses `useActionState` to tie into our server action,
 * and mirrors any returned errors into local state so
 * we can trigger our shake animation and inline error messages.
 */
const LoginForm = () => {

    // ──────────────────────────────────────────────────────────────────────────
    // Controlled inputs
    // ──────────────────────────────────────────────────────────────────────────

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const supabase  = sbBrowserClient()
    const router = useRouter()

    // ──────────────────────────────────────────────────────────────────────────
    // Local mirror of server errors for instant UX feedback + shake
    // ──────────────────────────────────────────────────────────────────────────

    const [fieldErrors, setFieldErrors] = useState<{
        email: string[],
        password: string[],
        _form: string[]
    }>({
        email: [],
        password: [],
        _form: []
    });

    // ──────────────────────────────────────────────────────────────────────────
    // tie into our action
    // ──────────────────────────────────────────────────────────────────────────

    // state holds the last return value of loginAction
    // formAction is the `<form action={...}>` handler
    // pending tells us if the action is in flight
    // @ts-ignore
    const [state, formAction, isPending] = useActionState<LoginState>(loginAction, initialState);

    // ──────────────────────────────────────────────────────────────────────────
    // sync server ↔ local error state
    // ──────────────────────────────────────────────────────────────────────────

    
    // ──────────────────────────────────────────────────────────────────────────
    // clear a single field’s error on change
    // ──────────────────────────────────────────────────────────────────────────

    /**
     * Handle typing in email input.
     * Clears any existing email errors to re-enable the form.
     */
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        if (fieldErrors.email.length) {
            setFieldErrors(fe => ({...fe, email: []}))
        }
    }

    /**
     * Handle typing in password input.
     * Clears any existing password errors to re-enable the form.
     */
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        if (fieldErrors.password.length) {
            setFieldErrors(fe => ({...fe, password: []}))
        }
    }

    // @ts-ignore
    return (
        <div className="grid items-center justify-center py-12">
            <div className="mx-auto grid lg:w-[350px] gap-6 px-2">
                {/* header */}
              <div className="grid gap-2 text-center">
                <h1 className="h2-bold lg:h1-bold">Welcome back 👋</h1>
                <p className="lg:w-sm body-regular">
                    Sign in to apply for temporal license, track housemanship placement and Pin-code issuing. Manage and audit applicant process.
                </p>
              </div>

                {/*Success or Error Message*/}
                {state.success && (
                    <Alert className="border-green-200 bg-green-50">
                        <AlertDescription className='text-green-800'>
                            {state.message}
                        </AlertDescription>
                    </Alert>
                )}

                {fieldErrors._form.length > 0 && (
                    <Alert className="border-2 border-red-400 text-red-400">
                        <RiErrorWarningFill color="red" />
                        <AlertTitle>Authentication Error</AlertTitle>
                        <AlertDescription className="text-red-400">
                            {fieldErrors._form.join(", ")}
                        </AlertDescription>
                    </Alert>
                )}

                {/* form */}
              <form
                  action={formAction}
                  className="grid gap-4 px-2 lg:px-0"
              >
                  {/** ─── EMAIL FIELD ─────────────────────────────────────────── */}
                <div className="grid gap-2 ">
                    <Label htmlFor="email">Email</Label>
                    <motion.div
                        className="w-full"
                        animate={fieldErrors.email.length > 0 ? {x: [0, -8, 8, -8, 8, 0]}: {x: 0}}
                        transition={{ duration: 0.4 }}
                    >
                        <Input
                            id="email"
                            type="email"
                            placeholder="sarahalph@gmail.com"
                            required
                            name="email"
                            value={email}
                            onChange={handleEmailChange}
                            disabled={isPending}
                            aria-describedby="emailHelp"
                            aria-invalid={fieldErrors.email.length > 0}
                            className="h-9 lg:h-10 border-secondary dark:border-primary shadow-lg"
                        />
                    </motion.div>

                    {fieldErrors.email.length > 0 && (
                        <p id="emailHelp" className="text-red-500 small-regular mt-1">
                            {fieldErrors.email.join(', ')}
                        </p>
                    )}
                </div>

                  {/** ─── PASSWORD FIELD ────────────────────────────────────── */}
                  <div className="grid gap-2">
                      <div className="flex items-center">
                          <Label htmlFor="password">Password</Label>
                          <Link
                              href={`/forgot-password`}
                              className="ml-auto inline-block text-sm underline"
                          >
                              Forgot your password?
                          </Link>
                      </div>
                      <motion.div
                          className="w-full relative"
                          animate={fieldErrors.password.length > 0 ? {x: [0, -8, 8, -8, 8, 0]} : {x: 0}}
                          transition={{duration: 0.4}}
                      >
                          <Input
                              id="password"
                              type={showPassword ? "text" : "password"}
                              required
                              placeholder="***********"
                              name="password"
                              value={password}
                              onChange={handlePasswordChange}
                              disabled={isPending}
                              aria-describedby="passwordHelp"
                              aria-invalid={fieldErrors.password.length > 0}
                              className="h-9 pr-10 pt-3 lg:h-10 border-secondary dark:border-primary shadow-lg"
                          />
                          <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                              disabled={isPending}
                          >
                              {showPassword ? <RiEyeOffFill className="h-4 w-4" /> : <RiEyeFill className="h-4 w-4" />}
                          </button>
                      </motion.div>
                      {fieldErrors.password.length > 0 && (
                          <p id="passwordHelp" className="text-red-500 small-regular mt-1">
                              {fieldErrors.password.join(', ')}
                          </p>
                      )}
                  </div>


                  {/** ─── SUBMIT BUTTON ─────────────────────────────────────── */}
                  <Button
                      type="submit"
                      disabled={isPending}
                      className="w-full cursor-pointer h-9 lg:h-10 gradient-radial-subtle font-bold hover:gradient-linear-alt"
                  >
                      {isPending ? "Signing in..." : "Sign in" }
                  </Button>


                  
              </form>

                {/** ─── SIGNUP LINK ───────────────────────────────────────── */}
                <div className="mt-4 text-center text-sm">
                    Don&apos;t have an account?{" "}
                    <Link href="mailto:koigorfogbawa@gmail.com" className="underline">
                        Go to Register
                    </Link>
                </div>
            </div>
      </div>
    )
}


export default LoginForm;