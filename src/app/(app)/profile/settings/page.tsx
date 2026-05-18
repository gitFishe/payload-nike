import Link from 'next/link'
import { CustomInput } from '@/components/CustomInput'

export default function Settings()  {
  return (
    <div className="container">
      <div>
        <h2>Settings</h2>
        <ul>
          <li>
            <Link href="/profile">
              <div className="bg-black w-5 h-5" />
              <span>Account Details</span>
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <h2>Account Details</h2>
        <div className="mt-10">
          <CustomInput/>
        </div>
        <div>
          <h3>Password</h3>
          <div>
            <span>************</span>
            <button>Edit</button>
          </div>
        </div>
      </div>
    </div>
  )
}