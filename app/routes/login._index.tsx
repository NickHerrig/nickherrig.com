import { json, redirect } from "@remix-run/node"
import {Form, useActionData } from "@remix-run/react";

import type { ActionArgs } from "@remix-run/node";

import createServerSupabase from "~/utils/supabase.server"
import { badRequest } from "~/utils/request.server";


function validateEmail(email: string) {
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (!emailRegex.test(email)){
    return "Email not valid"
  }
}

function validatePassword(password: string) {
  if (password.length < 10) {
    return "Password too short"
  }
}

export const action = async ({request}: ActionArgs) => {
  const formData = await request.formData()
  const email = formData.get("email")
  const password = formData.get("password")

  if (
    typeof email !== "string" ||
    typeof password !== "string"
  ) {
    return badRequest({
      fieldErrors: null,
      fields: null,
      formError: "Form not submitted correctly"
    })
  }

  const fieldErrors = {
    email: validateEmail(email),
    password: validatePassword(password),
  }

  if (Object.values(fieldErrors).some(Boolean)) {
    const fields = { email, password }
    return badRequest({
      fieldErrors,
      fields,
      formError: null
    });
  }

  const response = new Response()
  const supabase = createServerSupabase({request, response})
  const { error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  })

  if (error) {
    console.log(error)
    const fields = { email, password }
    return badRequest({
      fieldErrors: null,
      fields,
      formError: error.message
    });
  }
  
  return redirect("/posts/admin", {headers: response.headers});

}


export default function Posts() {

  const inputClassName =  `w-full rounded border border-gray-500 px-2 py-1 text-lg`
  const actionData  = useActionData<typeof action>();

  return (
    <main className="text-center">
      
      <h1 className="text-2xl mt-10 text-blue-700 p-10">Login</h1>
      <Form method="post" className="mx-auto max-w-md">
        
        <label className="text-blue-400 text-left">Email{" "}

        {actionData?.fieldErrors?.email ? (
          <em
            className="text-red-500"
            id="email-error"
          >
            {actionData.fieldErrors.email}
          </em>    
        ) : null}

        <input 
          type="email" 
          name="email" 
          className={inputClassName}
          defaultValue={actionData?.fields?.email}
          aria-invalid={Boolean(
            actionData?.fieldErrors?.email
          )}
          aria-errormessage={
            actionData?.fieldErrors?.email
              ? "email-error"
              : undefined
          }
        />
        </label>
        
        <label>Password{" "}
        {actionData?.fieldErrors?.password ? (
          <em
            className="text-red-500"
            id="password-error"
          >
            {actionData.fieldErrors.password}
          </em>    
        ) : null}

        <input 
          type="password" 
          name="password" 
          className={inputClassName}
          defaultValue={actionData?.fields?.password}
          aria-invalid={Boolean(
            actionData?.fieldErrors?.password
          )}
          aria-errormessage={
            actionData?.fieldErrors?.password
              ? "password-error"
              : undefined
          }
        />
        </label>


        <button type="submit">Login</button>
      </Form>
      {actionData?.formError ? (
          <em className="text-red-500">
            {actionData.formError}
          </em>    
        ) : null}

    </main>
  );
  }