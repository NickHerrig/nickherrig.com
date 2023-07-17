import { Link } from "@remix-run/react"

export default function Index() {

  const year = new Date().getFullYear()

  return (
    
    <div className="flex flex-col h-screen">

      <header>
        <nav className="flex justify-between p-6">
          <div className="">
            <Link to="/" className="text-xl uppercase">nickherrig.com</Link>
          </div>
          <div className="space-x-6 text-lg">
            <Link to="/quotes">Quotes</Link> 
            <Link to="/posts">Posts</Link>
          </div>
        </nav>
      </header>
      
      <main className="flex-grow">
  <div className="flex flex-col items-center justify-center m-8 md:m-32 space-y-4 h-4/6">
    <img
      className="object-contain rounded-full w-3/4 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 h-auto"
      src="https://aodxruaawhqiovynwfph.supabase.co/storage/v1/object/public/content/headshot.jpeg" 
      alt="headshot of nick herrig"
    ></img>
    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl p-4 text-center font-bold from-purple-600 via-pink-600 to-blue-600 bg-gradient-to-r bg-clip-text text-transparent">Hi, I'm Nick</h1>
  </div>
</main>


      <footer className="text-center p-6">
            <p>© {year} nickherrig.com</p>
      </footer>
    
    </div>

  )
}