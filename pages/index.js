import Link from "next/link";

export default function Home() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Link href="/cube">
        <button style={{ fontSize: '20px', backgroundColor: 'red', color: 'white', padding: '10px 20px', border: 'none'}}>
          See this shit...
        </button>
      </Link>
    </div>
  )
}
