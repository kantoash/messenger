import Image from 'next/image'
import AuthForm from '@/components/AuthForm'

export default function Home() {
  return (
    <main className="flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-100 h-full ">
    <div className="sm:mx-auto w-full sm:max-w-md">
      <Image src="/images/logo.png" alt="logo" height={40} width={40} className="mx-auto" />
      <h2  className="mt-6 text-center text-2xl font-bold tracking-tight text-gray-900">
        Sign in to your account
      </h2>
    </div>
        <AuthForm/>
 </main>
  )
}
