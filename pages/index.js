import Link from "next/link";

export default function Home() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Link href="/cube">
        <button style={{ fontSize: '20px', width: '200px', height: '50px', backgroundColor: 'red', color: 'white', padding: '10px 20px', border: 'none', marginBottom: '10px'}}>
          See this shit...
        </button>
      </Link>
      <Link href="/dinosaur">
        <button style={{ fontSize: '20px', width: '200px', height: '50px', backgroundColor: 'green', color: 'white', padding: '10px 20px', border: 'none'}}>
          Normal game
        </button>
      </Link>
    </div>
  )
}
