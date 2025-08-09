import { getSession } from "next-auth/react";
import Navbar from "../../components/Navbar";

export default function Admin({ user }) {
  return (
    <>
      <Navbar />
      <div className="p-8">
        <h1 className="text-3xl font-bold">Admin Panel</h1>
        <p>Only admins can see this.</p>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session || session.user.role !== "admin") {
    return {
      redirect: { destination: "/", permanent: false },
    };
  }
  return { props: { user: session.user } };
}
