'use client'

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import React, { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { toast } from 'react-toastify';
import Button from './input/Button';
import Input from './input/Input';
import axios from 'axios'

type Variant = "LOGIN" | "REGISTER";

const AuthForm = () => {
    const router = useRouter()
    const [variant, setVariant] = useState<Variant>("LOGIN");
    const [isLoading, setIsLoading] = useState(false);


    const toggleVariant = useCallback(() => {
        if (variant === "LOGIN") {
          setVariant("REGISTER");
        } else {
          setVariant("LOGIN");
        }
      }, [variant]);

      const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<FieldValues>({
        defaultValues: {
          name: "",
          email: "",
          password: "",
        },
      });

      const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        if (variant === 'REGISTER') {
          axios.post('/api/register', data)
          .then(() => signIn('credentials', {
            ...data,
            redirect: false,
          }))
          .then((callback) => {
            if (callback?.error) {
              toast.error('Invalid credentials!');
            }
    
            if (callback?.ok) {
              router.push('/users')
            }
          })
          .catch(() => toast.error('Something went wrong!'))
          .finally(() => setIsLoading(false))
        }

        if (variant === 'LOGIN') {
          signIn('credentials', {
            ...data,
            redirect: false
          })
          .then((callback) => {
            if (callback?.error) {
              toast.error('Invalid credentials!');
            }
    
            if (callback?.ok) {
              router.push('/users')
            }
          })
          .finally(() => setIsLoading(false))
        }
      }

    
  return (
    <div className='mt-8 w-full sm:mx-auto sm:max-w-md bg-white px-4 py-8'>
        <form className='space-y-6'>
        {variant === "REGISTER" && (
            <Input
              disabled={isLoading}
              register={register}
              errors={errors}
              required
              id="name"
              label="Name"
            />
          )}
          <Input
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            id="email"
            label="Email address"
            type="email"
          />
          <Input
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            id="password"
            label="Password"
            type="password"
          />
              <div>
            {variant === "LOGIN" ? (
              <Button
                label="Sign in"
                disabled={isLoading}
                fullWidth
                onClick={handleSubmit(onSubmit)}
              />
            ) : (
              <Button
                label="Register"
                disabled={isLoading}
                fullWidth
                onClick={handleSubmit(onSubmit)}
              />
            )}
          </div>
        </form>

      
        <div
          className="
          flex 
          gap-2 
          justify-center 
          text-sm 
          mt-6 
          px-2 
          text-gray-500
        "
        >
          <div>
            {variant === "LOGIN"
              ? "New to Messenger?"
              : "Already have an account?"}
          </div>
          <div onClick={toggleVariant} className="underline cursor-pointer">
            {variant === "LOGIN" ? "Create an account" : "Login"}
          </div>
        </div>
    </div>
  )
}

export default AuthForm