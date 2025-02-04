"use client"; // this lets this component be used in the client side

import { z } from "zod"; // zod is a library for validating data and it is from shadcn hook form

import { zodResolver } from "@hookform/resolvers/zod"; //  zod resolver is a library for validating data and it is from shadcn hook form
import { useForm } from "react-hook-form"; // this is a library for handling forms in react

import { Button } from "@/components/ui/button"; // this from react-hook from shadcn
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"; // this from react-hook from shadcn

import { Input } from "@/components/ui/input"; // this from react-hook from shadcn
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { createAccount, signInUser } from "@/lib/actions/user.actions";
import OtpModal from "./OTPModal";

type FormType = "sign-in" | "sign-up"; // this links to the sign-in and sign-up pages

const authFormSchema = (formType: FormType) => {
  return z.object({
    email: z.string().email(), // this makes sure that this will be a valid email format
    FullName:
      formType === "sign-up" // if it is sign-up
        ? z.string().min(2).max(50) // the string must be at least 2 characters
        : z.string().optional(), // else if it sign-in then full name ids optional
  });
}; 
const AuthForm = ({ type }: { type: FormType }) => { // AuthForm uses FormType for prop validation
  const [isLoading, setIsLoading] = useState(false);  // this tracks the loading state and it is set to false initially
  const [errorMessage, setErrorMessage] = useState(""); // this tracks the errorMessage and it is set to an empty string to store errors in a string
  const [accountId, setAccountId] = useState(null);

  const formSchema = authFormSchema(type);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      FullName: "",
      email: "",
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => { // this function will be called when the user clicks on the submit button
    // ✅ This will be type-safe and validated.
    setIsLoading(true); // this is to change the isLoading state when the user performs the task and activates the function
    setErrorMessage(""); // this then changes the errorMessage state to an empty string to clear former errors when the user tries to call the function again

    try {
      const user = type === "sign-up" ? await createAccount({
        FullName: values.FullName || "",
        email: values.email,
      })  : await signInUser({email: values.email})
      setAccountId(user.accountId);
    } catch {
      setErrorMessage("Failed to create Account. Please try again");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="auth-form">
          <h1 className="form-title"> 
            {type === "sign-in" ? "Sign In" : "Sign Up"} {/* this is to change the text 
             */}
          </h1>
          {type === "sign-up" && (
            <FormField
              control={form.control}
              name="FullName"
              render={({ field }) => (
                <FormItem>
                  <div className="shad-form-item">
                    <FormLabel className="shad-form-label">Full Name</FormLabel>

                    <FormControl>
                      <Input
                        placeholder="Enter your Full Name"
                        className="shad-input"
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage className="shad-form-message" />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <div className="shad-form-item">
                  <FormLabel className="shad-form-label">Email</FormLabel>

                  <FormControl>
                    <Input
                      placeholder="Enter your Email"
                      className="shad-input"
                      {...field}
                    />
                  </FormControl>
                </div>
                <FormMessage className="shad-form-message" />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="form-submit-button"
            disabled={isLoading}
          >
            {type === "sign-in" ? "Sign-In" : "Sign-Up"}
            {isLoading && (
              <Image
                src="/assets/icons/loader.svg"
                alt="loader"
                width={24}
                height={24}
                className="ml-2 animate-spin"
              />
            )}
          </Button>

          {errorMessage && <p className="error-message">*{errorMessage}</p>}
          <div className="body-2 flex justify-center">
            <p className="text-light-100">
              {type === "sign-in"
                ? "Don't have an account?"
                : "Already have an account?"}
            </p>
            <Link
              href={type === "sign-in" ? "/sign-up" : "/sign-in"}
              className="ml-1 font-medium text-brand"
            >
              {type === "sign-in" ? "Sign Up" : "Sign In"}
            </Link>
          </div>
        </form>
      </Form>

      {accountId && (
        <OtpModal email={form.getValues("email")} accountId={accountId} />
      )}
    </>
  );
};

export default AuthForm;
