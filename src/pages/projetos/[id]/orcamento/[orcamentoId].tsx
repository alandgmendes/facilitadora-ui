import { useRouter } from 'next/router'
 
export default function Page() {
  const router = useRouter()
  return <p>orcamentoId: {router.query.orcamentoId}</p>
}