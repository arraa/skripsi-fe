import { getStudent } from "./api/student";

export default async function Home() {

  const response = await getStudent();
      console.log(response.data);
  return (
      <>
          holaaaa
      </>
  );
}
