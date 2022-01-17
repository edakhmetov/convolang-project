import { useRouter } from "next/router";

const userPage = () => {

  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <h1>this is user id = {id}</h1>
    </div>
  )
}

export default userPage
