import PageHeader from '../components/common/PageHeader'
import RegisterForm from '../components/auth/RegisterForm'

export default function RegisterPage() {
  return (
    <div className="px-5 py-12 sm:px-8 md:px-12">
      <PageHeader
        title="Join Solo Trip"
        subtitle="Create a profile so other women can learn your travel style and interests."
      />
      <RegisterForm />
    </div>
  )
}
