import PageHeader from '../components/common/PageHeader'
import LoginForm from '../components/auth/LoginForm'

export default function LoginPage() {
  return (
    <div className="px-5 py-12 sm:px-8 md:px-12">
      <PageHeader
        title="Welcome back"
        subtitle="Log in to message companions, publish trips, and manage your profile."
      />
      <LoginForm />
    </div>
  )
}
