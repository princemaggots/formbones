import { signIn } from '../node_modules/next-auth/client'

export default function AccessDenied () {
  return (
    <div className="containerhome" style={{textAlign:"center"}}><h1>Access Denied</h1>
      <p>
        <a href="/api/auth/signin"
           onClick={(e) => {
           e.preventDefault()
           signIn()
        }}>You must be signed in to view this page</a>
      </p>
        </div>
      
  )
}
