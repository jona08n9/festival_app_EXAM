import Head from "next/head";
import LoginComponent from "../components/LoginComponent";

export default function Login() {
  return (
    <>
      <Head>
        <title>Login | Foofest </title>
      </Head>
      <section className="flex flex-col">
        <h1 className="text-center">Login to view booking details</h1>
        <LoginComponent />
      </section>
    </>
  );
}
