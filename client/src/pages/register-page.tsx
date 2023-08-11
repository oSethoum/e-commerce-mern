import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { object, string, email, regex, minLength, Input } from "valibot";

export const RegisterPage = () => {
  const schema = useMemo(
    () =>
      object({
        name: string([regex(/^[A-Za-z]+( [A-Za-z]+)*$/, "invalid name")]),
        email: string([email("invalid email")]),
        password: string([
          regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
            "must have uppercase lowercase and number"
          ),
          minLength(5, "minimum length is 5"),
        ]),
      }),
    []
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: valibotResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const onSubmit = async (data: Input<typeof schema>) => {
    console.log(data);

    const response = await fetch("http://localhost:4000/auth/register", {
      headers: {
        "content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    });
    console.log(await response.json());
  };

  return (
    <main className="flex items-center justify-center">
      <form
        className="border p-3 flex rounded-md flex-col gap-3 lg:w-96 mt-32 shadow"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-xl font-semibold">Register Form</h1>
        <div className="flex flex-col gap-1">
          <label htmlFor="name">Name</label>
          <input
            className="py-1 px-2 ring-1 rounded-md ring-gray-300 
            focus:outline-none focus:ring-2 focus:ring-slate-800 
            aria-[invalid=true]:ring-red-600 aria-[invalid=true]:focus-visible:ring-red-600 aria-[invalid=true]:text-red-500"
            type="text"
            aria-invalid={!!errors.name}
            placeholder="name"
            {...register("name")}
          />
          <span className="text-red-500 text-sm">{errors.name?.message}</span>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="email">Email</label>
          <input
            className="py-1 px-2 ring-1 rounded-md ring-gray-300 
            focus:outline-none focus:ring-2 focus:ring-slate-800 
            aria-[invalid=true]:ring-red-600 aria-[invalid=true]:focus-visible:ring-red-600 aria-[invalid=true]:text-red-500"
            type="email"
            aria-invalid={!!errors.email}
            placeholder="example@email.com"
            {...register("email")}
          />
          <span className="text-red-500 text-sm">{errors.email?.message}</span>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="password">Password</label>
          <input
            className="py-1 px-2 ring-1 rounded-md ring-gray-300 
            focus:outline-none focus:ring-2 focus:ring-slate-800 
            aria-[invalid=true]:ring-red-600 aria-[invalid=true]:focus-visible:ring-red-600 aria-[invalid=true]:text-red-500"
            type="password"
            aria-invalid={!!errors.password}
            placeholder="password"
            {...register("password")}
          />
          <span className="text-red-500 text-sm">
            {errors.password?.message}
          </span>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="mt-2 px-5 font-semibold py-1.5 rounded-md bg-slate-800 transition-colors
            hover:bg-slate-700 active:bg-slate-900 text-white 
            focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-offset-2 focus-visible:ring-slate-800
            disabled:bg-slate-400 disabled:active:bg-slate-400 disabled:hover:bg-slate-400 disabled:cursor-not-allowed"
            disabled={!!errors.name || !!errors.email || !!errors.password}
          >
            Register
          </button>
        </div>
      </form>
    </main>
  );
};

export default RegisterPage;
